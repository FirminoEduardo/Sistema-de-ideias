import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './IdeaList.css'; // Importa o CSS

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [commentTexts, setCommentTexts] = useState({}); // Estado para armazenar textos de comentários

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ideas/submit', { titulo, descricao, categoria });
      setTitulo('');
      setDescricao('');
      setCategoria('');
      // Atualiza a lista de ideias
      fetchIdeas(); // Busca as ideias novamente após adicionar uma nova
    } catch (error) {
      alert('Erro ao submeter ideia: ' + error.response.data.message);
    }
  };

  const handleVote = async (id) => {
    try {
      await api.post(`ideas/${id}/vote`);
      // Atualiza a lista de ideias
      fetchIdeas(); // Busca as ideias novamente após votar
    } catch (error) {
      alert('Erro ao votar: ' + error.response.data.message);
    }
  };

  const handleComment = async (ideaId) => {
    const commentText = commentTexts[ideaId]; // Pega o texto do comentário para a ideia específica
    if (!commentText) return; // Não faz nada se o campo de comentário estiver vazio

    try {
      await api.post(`/ideas/${ideaId}/comments`, { conteudo: commentText }); // Envia o comentário
      fetchIdeas(); // Atualiza a lista de ideias após adicionar um comentário
      setCommentTexts((prev) => ({ ...prev, [ideaId]: '' })); // Limpa o campo de comentário para essa ideia
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      alert('Erro ao adicionar comentário: ' + error.response?.data?.message || error.message);
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
                  idea.comments.map(comment => (
                    <div key={comment.id}>
                      <p>User ID: {comment.userId} (Votos: {comment.votos})</p>
                      <p>{comment.conteudo}</p>
                      <button onClick={() => handleVote(comment.id)}>Votar</button>
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
