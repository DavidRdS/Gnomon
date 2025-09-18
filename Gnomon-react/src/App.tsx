// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Importa TODOS os componentes que representam cada página
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import MapaPage from './pages/MapaPage';

function App() {
  return (
    <BrowserRouter>
      {/* O componente <Routes> gerencia qual rota será exibida */}
      <Routes>
        {/* 2. Define cada rota e o componente que ela deve renderizar */}

        {/* Rota principal (página inicial) */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rota para a página de login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rota para a página de cadastro */}
        <Route path="/cadastro" element={<CadastroPage />} />
        
        {/* Rota para a página do mapa */}
        <Route path="/mapa" element={<MapaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;