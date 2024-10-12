import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ReportList.css'; // Importando o CSS


const ReportList = () => {
  const [topIdeas, setTopIdeas] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const ideasResponse = await api.get('/reports/top-ideas');
      const usersResponse = await api.get('/reports/active-users');
      setTopIdeas(ideasResponse.data);
      setActiveUsers(usersResponse.data);
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h2>Relatórios</h2>
      <h3>Top Ideias</h3>
      <ul>
        {topIdeas.map(idea => (
          <li key={idea.id}>
            <h4>{idea.titulo}</h4>
            <p>Votos: {idea.votos}</p>
          </li>
        ))}
      </ul>

      <h3>Usuários Mais Ativos</h3>
      <ul>
        {activeUsers.map(user => (
          <li key={user.id}>
            <h4>{user.nome}</h4>
            <p>Comentários: {user.comments.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
