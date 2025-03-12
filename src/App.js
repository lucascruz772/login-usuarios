import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UsuariosTabela from './UsuariosTabela/Usuarios';
import Login from './Login/Login';


function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/login-usuarios' : '/';

  useEffect(() => {
    // Verifica se há usuários no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
      // Se não houver usuários, cria o usuário padrão
      const defaultUser = { email: 'admin@admin.com', password: 'admin' };
      localStorage.setItem('users', JSON.stringify([defaultUser]));
    }
  }, []);

  return (
    <Router basename={basename}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<UsuariosTabela />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;