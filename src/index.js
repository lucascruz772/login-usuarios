import React from 'react';
import { createRoot } from 'react-dom/client'; // Nova importação
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')); // Cria o root
root.render(<App />); // Renderiza o App