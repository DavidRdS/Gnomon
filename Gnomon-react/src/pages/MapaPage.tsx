// src/pages/MapaPage.tsx

import { Link } from 'react-router-dom';
import logoIcon from '../assets/Gnomon Logo _ SEM NOME.png';

// Crie um arquivo MapaPage.css e cole o conteúdo do seu antigo CSS/mapa.css nele
import './MapaPage.css';

export default function MapaPage() {
    return (
        <div id="map-app-container">
            <header className="top-bar">
                <i className="fa-solid fa-bars menu-icon"></i>
                <Link to="/" className="logo-container">
                    <img src={logoIcon} alt="Ícone Gnomon" />
                    <span>GNOMON</span>
                </Link>
                <i className="fa-solid fa-circle-user profile-icon"></i>
            </header>

            <main className="content-area">
                <div className="search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="search" placeholder="Buscar local, sala ou serviço..." />
                </div>
                
                <div id="map-container">
                    <div className="map-placeholder">
                        <i className="fa-regular fa-map"></i>
                        <p>O mapa interativo será carregado aqui...</p>
                    </div>
                </div>
            </main>

            <footer className="bottom-nav">
                {/* ... conteúdo da barra de navegação ... */}
            </footer>
        </div>
    );
}