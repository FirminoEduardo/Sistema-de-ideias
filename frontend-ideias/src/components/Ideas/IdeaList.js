import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './IdeaList.css'; // Importa o CSS

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await api.get('/ideas');
        setIdeas(response.data);
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
      setIdeas(response.data);
    } catch (error) {
      alert('Erro ao submeter ideia: ' + error.response.data.message);
    }
  };

  const handleVote = async (id) => {
    try {
      await api.post(`ideas/${id}/vote`);
      // Atualiza a lista de ideias
      const response = await api.get('/ideas');
      setIdeas(response.data);
    } catch (error) {
      alert('Erro ao votar: ' + error.response.data.message);
    }
  };

  const handleComment = async (id, commentText) => {
    try {
      await api.post(`ideas/${id}/comments`, { comentario: commentText });
      // Atualiza a lista de ideias
      const response = await api.get('/ideas');
      setIdeas(response.data);
    } catch (error) {
      alert('Erro ao comentar: ' + error.response.data.message);
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
                <input type="text" placeholder="Adicionar comentário" 
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleComment(idea.id, e.target.value);
                      e.target.value = ''; // Limpa o campo de texto após enviar
                    }
                  }} 
                />
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
