import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import UsuariosTabela from './UsuariosTabela/Usuarios';

// Componente para verificar autenticação
  const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Não autenticado, redirecionando para /');
      // Redireciona para / mantendo o caminho original para voltar depois
      Navigate({ to: '/', state: { from: location.pathname } });
    } else {
      console.log('Autenticado, permitindo acesso');
    }
  }, [isAuthenticated, location.pathname]);

  return isAuthenticated ? children : null; // Renderiza os filhos apenas se autenticado
};

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/login-usuarios' : '/';

  // Inicializa o usuário padrão
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
      const defaultUser = { email: 'admin@admin.com', password: 'admin' };
      localStorage.setItem('users', JSON.stringify([defaultUser]));
    }
  }, []);

  return (
    <Router basename={basename}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <UsuariosTabela />
              </ProtectedRoute>
            }
          />
          {/* Rota catch-all para redirecionar URLs inválidas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;