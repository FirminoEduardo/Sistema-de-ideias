import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './IdeaList.css'; // Importa o CSS

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [commentTexts, setCommentTexts] = useState({}); // Estado para armazenar textos de comentários
  const [isAdmin, setIsAdmin] = useState(false); // Estado para armazenar se o usuário é admin

  // Função para buscar ideias
  const fetchIdeas = async () => {
    try {
      const response = await api.get('/ideas'); // Faz a requisição para obter as ideias
      setIdeas(response.data); // Atualiza o estado com as ideias recebidas
    } catch (error) {
      console.error('Erro ao buscar ideias:', error);
      setIdeas([]); // Resete para um array vazio em caso de erro
    }
  };

  useEffect(() => {
    fetchIdeas(); // Busca as ideias quando o componente é montado
    // Verifica se o usuário é admin ao carregar o componente
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o token
      setIsAdmin(decodedToken.permissao === 'admin'); // Verifica se o usuário é admin
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ideas/submit', { titulo, descricao, categoria });
      setTitulo('');
      setDescricao('');
      setCategoria('');
      fetchIdeas(); // Atualiza a lista de ideias
    } catch (error) {
      alert('Erro ao submeter ideia: ' + error.response.data.message);
    }
  };

  const handleVote = async (id) => {
    try {
      await api.post(`/ideas/${id}/vote`);
      fetchIdeas(); // Atualiza a lista de ideias
    } catch (error) {
      alert('Erro ao votar: ' + error.response.data.message);
    }
  };

  const handleVoteComment = async (ideaId, commentId) => {
    try {
      await api.post(`/ideas/${ideaId}/comments/${commentId}/vote`);
      fetchIdeas(); // Atualiza a lista de ideias
    } catch (error) {
      alert('Erro ao votar no comentário: ' + error.response.data.message);
    }
  };

  const handleComment = async (ideaId) => {
    const commentText = commentTexts[ideaId]; // Obtém o texto do comentário para a ideia específica
    if (!commentText) {
        alert("O comentário não pode estar vazio.");
        return;
    }

    try {
        await api.post(`/ideas/${ideaId}/comments`, { comentario: commentText }); // Envia o comentário como 'comentario'
        fetchIdeas(); // Atualiza a lista de ideias após adicionar um comentário
        setCommentTexts((prev) => ({ ...prev, [ideaId]: '' })); // Limpa o campo de comentário para essa ideia
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        alert('Erro ao adicionar comentário: ' + (error.response?.data?.message || error.message));
    }
};

  const handleArchive = async (id) => {
    try {
      await api.put(`/ideas/${id}/archive`); // Chama a rota para arquivar a ideia
      fetchIdeas(); // Atualiza a lista de ideias
    } catch (error) {
      alert('Erro ao arquivar a ideia: ' + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Ideias</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" />
        <button type="submit">Submeter Ideia</button>
      </form>
      <ul className="idea-list">
        {ideas.length > 0 ? (
          ideas.map(idea => (
            <li key={idea.id}>
              <h4>{idea.titulo} ({idea.categoria})</h4>
              <p>{idea.descricao}</p>
              <p>Status: {idea.status} | Votos: {idea.votos}</p>
              <button className="vote-button" onClick={() => handleVote(idea.id)}>Votar</button>
              
              {isAdmin && (
                <button className="archive-button" onClick={() => handleArchive(idea.id)}>Arquivar</button>
              )}

              <div className="comment-section">
                <input 
                  type="text" 
                  placeholder="Adicionar comentário" 
                  value={commentTexts[idea.id] || ''} 
                  onChange={(e) => setCommentTexts({ ...commentTexts, [idea.id]: e.target.value })} 
                />
                <button onClick={() => handleComment(idea.id)}>Enviar</button>
              </div>

              <div className="comments-list">
  {idea.comments && idea.comments.length > 0 ? (
    idea.comments.sort((a, b) => b.votos - a.votos).map(comment => (
      <div key={comment.id} className="comment-item">
        <p>{comment.comentario}</p> {/* Altere para 'comentario' */}
        <p>Votos: {comment.votos}</p>
        <button onClick={() => handleVoteComment(idea.id, comment.id)}>Votar</button>
      </div>
    ))
  ) : (
    <p>Nenhum comentário encontrado.</p>
  )}
</div>
            </li>
          ))
        ) : (
          <p>Nenhuma ideia encontrada.</p>
        )}
      </ul>
    </div>
  );
};

export default IdeaList;
