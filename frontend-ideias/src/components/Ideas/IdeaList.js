import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './IdeaList.css'; // Importando o CSS


const IdeaList = () => {
  console.log('IdeaList component is rendering');
  const [ideas, setIdeas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    console.log('Fetching ideas...'); // Adicione esta linha
    const fetchIdeas = async () => {
      try {
        const response = await api.get('/ideas');
        console.log('Ideias recebidas:', response.data);
        setIdeas(response.data);
      } catch (error) {
        console.error('Erro ao buscar ideias:', error);
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
      window.location.reload(); // Atualiza a lista de ideias
    } catch (error) {
      alert('Erro ao submeter ideia: ' + error.response.data.message);
    }
  };

  return (
    <div className='container'>
      <h2>Ideias</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" />
        <button type="submit">Submeter Ideia</button>
      </form>
      <ul className='ideal-list'>
        {ideas.map(idea => (
          <li key={idea.id}>
            <h4>{idea.titulo} ({idea.categoria})</h4>
            <p>{idea.descricao}</p>
            <p>Status: {idea.status} | Votos: {idea.votos}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaList;
