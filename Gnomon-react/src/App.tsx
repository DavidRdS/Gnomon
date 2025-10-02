// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Importa TODOS os componentes que representam cada página
import HomePage from './pages/Intro/Intro';
import LoginPage from './pages/Login/LoginPage';
import CadastroPage from './pages/Cadastro/CadastroPage';
import MapaPage from './pages//Mapa/MapaPage';
import PerfilPage from './pages//Perfil/PerfilPage';
import EsqueceuSenhaPage from './pages//EsqueceuSenha/EsqueceuSenhaPage';
import RedefinirSenhaPage from './pages/RedefinirSenha/RedefinirSenha';

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

        {/* Rota para a página de perfil */}
        <Route path="/perfil" element={<PerfilPage />} />

        {/* Rota para a página de esqueceu senha */}
        <Route path="/esqueceu-senha" element={<EsqueceuSenhaPage />} />
        
        {/* Rota para a página de redefinir senha */}
        <Route path="/reset-password" element={<RedefinirSenhaPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;