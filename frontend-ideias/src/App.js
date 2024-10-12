import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      // Você pode renderizar qualquer UI de fallback
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children; 
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<IdeaList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ideas" element={<IdeaList />} />
            <Route path="/notifications" element={<NotificationList />} />
            <Route path="/reports" element={<ReportList />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
