import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import UsuariosTabela from './UsuariosTabela/Usuarios';


function App() {
  return (
    <Router>
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