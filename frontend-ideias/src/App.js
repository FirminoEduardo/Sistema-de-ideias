import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/TempLogin.js'; 
import Register from './components/Auth/Register.js';
import IdeaList from './components/Ideas/IdeaList.js';
import NotificationList from './components/Notifications/NotificationList.js';
import ReportList from './components/Report/ReportList.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para que o próximo renderize a UI de fallback.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode também registrar o erro em um serviço de erro.
    console.error("Erro capturado por Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza uma UI de fallback
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children; 
  }
}

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica se o token existe
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div>
          <Routes>
            {/* Página inicial será a de login */}
            <Route path="/login" element={<Login />} />

            {/* Registro */}
            <Route path="/register" element={<Register />} />

            {/* Rota protegida para a lista de ideias */}
            <Route
              path="/ideas"
              element={isAuthenticated() ? <IdeaList /> : <Navigate to="/login" />}
            />

            {/* Rota protegida para a lista de notificações */}
            <Route
              path="/notifications"
              element={isAuthenticated() ? <NotificationList /> : <Navigate to="/login" />}
            />

            {/* Rota protegida para a lista de relatórios */}
            <Route
              path="/reports"
              element={isAuthenticated() ? <ReportList /> : <Navigate to="/login" />}
            />

            {/* Redirecionar para /login por padrão */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
