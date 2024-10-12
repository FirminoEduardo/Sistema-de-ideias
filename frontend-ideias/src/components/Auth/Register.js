import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Importando o CSS


const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [permissao, setPermissao] = useState('colaborador'); // Colaborador por padrão
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { nome, email, senha, permissao });
      alert('Usuário registrado com sucesso!');
      navigate('/login'); // Redireciona para login após registro
    } catch (error) {
      alert('Erro ao registrar: ' + error.response.data.message);
    }
  };

  return (
    <div className='register-container'>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
        <select value={permissao} onChange={(e) => setPermissao(e.target.value)}>
          <option value="colaborador">Colaborador</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
