import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './IdeaList.css'; // Importa o CSS

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [comentarios, setComentarios] = useState({}); // Estado para comentários

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await api.get('/ideas');
        // Certifique-se de que 'Comments' é um array
        const formattedIdeas = response.data.map(idea => ({
          ...idea,
          Comments: idea.Comments || [] // Define como array se não existir
        }));
        setIdeas(formattedIdeas);
      } catch (error) {
        console.error('Erro ao buscar ideias:', error);
        setIdeas([]); // Resete para um array vazio em caso de erro
      }
    };
    fetchIdeas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ideas/submit', { titulo, descricao, categoria });
      setTitulo('');
      setDescricao('');
      setCategoria('');
      // Atualiza a lista de ideias
      const response = await api.get('/ideas');
      const formattedIdeas = response.data.map(idea => ({
        ...idea,
        Comments: idea.Comments || [] // Define como array se não existir
      }));
      setIdeas(formattedIdeas);
    } catch (error) {
      alert('Erro ao submeter ideia: ' + error.response.data.message);
    }
  };

  const handleVote = async (id) => {
    try {
      await api.post(`ideas/${id}/vote`);
      const response = await api.get('/ideas');
      const formattedIdeas = response.data.map(idea => ({
        ...idea,
        Comments: idea.Comments || [] // Define como array se não existir
      }));
      setIdeas(formattedIdeas);
    } catch (error) {
      alert('Erro ao votar: ' + error.response.data.message);
    }
  };

  const handleCommentChange = (id, value) => {
    setComentarios(prev => ({ ...prev, [id]: value }));
  };

  const handleComment = async (id) => {
    const commentText = comentarios[id]; // Pega o comentário correspondente
    if (!commentText) return; // Se não houver texto, não faz nada

    try {
      const response = await api.post(`/ideas/${id}/comments`, { conteudo: commentText });
      // Atualiza a lista de ideias após comentar
      console.log('Comentário adicionado com sucesso');
      // Limpa o campo de comentário após envio
      setComentarios(prev => ({ ...prev, [id]: '' }));

      // Atualiza a lista de ideias
      const updatedIdeas = ideas.map(idea => {
        if (idea.id === id) {
          return { ...idea, Comments: [...idea.Comments, response.data.comment] }; // Adiciona o novo comentário
        }
        return idea;
      });
      setIdeas(updatedIdeas);
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
        {ideas && ideas.length > 0 ? (
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
                  value={comentarios[idea.id] || ''} // Usa o valor armazenado para cada ideia
                  onChange={(e) => handleCommentChange(idea.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleComment(idea.id);
                    }
                  }} 
                />
              </div>
              
              <div className="comments">
                {/* Exibe comentários relacionados à ideia, caso existam */}
                {idea.Comments && idea.Comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <p><strong>User ID: {comment.userId}</strong>: {comment.conteudo} (Votos: {comment.votos})</p>
                  </div>
                ))}
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
