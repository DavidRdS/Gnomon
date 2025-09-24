// src/pages/MapaPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/Gnomon Logo _ SEM NOME.png';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './MapaPage.css';

export default function MapaPage() {
    const [activeNav, setActiveNav] = useState('Mapa');

    // ==========================================================================
    //  COORDENADAS PRECISAS ATUALIZADAS CONFORME SUA SELEÇÃO
    // ==========================================================================
    const position: [number, number] = [-8.302728, -35.991291];

    return (
        <div id="map-app-container">
            <header className="top-bar">
                <i className="fa-solid fa-bars menu-icon"></i>
                <Link to="/" className="logo-container">
                    <img src={logoIcon} alt="Ícone Gnomon" />
                    <span>GNOMON</span>
                </Link>
                <Link to="/perfil">
                    <i className="fa-solid fa-circle-user profile-icon"></i>
                </Link>
            </header>

            <main className="content-area">
                <div className="search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="search" placeholder="Buscar local, sala ou serviço..." />
                </div>
                
                <div id="map-container">
                    <MapContainer center={position} zoom={18} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Marcador principal na localização exata que você definiu */}
                        <Marker position={position}>
                            <Popup>
                                <b>Ponto Central do Campus</b> <br/> Entrada do Campus da Uninassau.
                            </Popup>
                        </Marker>

                        {/* Futuramente, você pode adicionar outros marcadores para locais específicos
                          usando o mesmo método para obter as coordenadas de cada um.
                          Exemplo:
                          <Marker position={[-8.30250, -35.99150]}>
                            <Popup>Bloco B</Popup>
                          </Marker> 
                        */}
                    </MapContainer>
                </div>
            </main>

            <footer className="bottom-nav">
                <div className={`nav-item ${activeNav === 'Mapa' ? 'active' : ''}`} onClick={() => setActiveNav('Mapa')}>
                    <i className="fa-solid fa-map-location-dot"></i>
                    <span>Mapa</span>
                </div>
                <div className={`nav-item ${activeNav === 'Locais' ? 'active' : ''}`} onClick={() => setActiveNav('Locais')}>
                    <i className="fa-solid fa-list-ul"></i>
                    <span>Locais</span>
                </div>
                <div className={`nav-item ${activeNav === 'Favoritos' ? 'active' : ''}`} onClick={() => setActiveNav('Favoritos')}>
                    <i className="fa-solid fa-star"></i>
                    <span>Favoritos</span>
                </div>
                <div className={`nav-item ${activeNav === 'Ajustes' ? 'active' : ''}`} onClick={() => setActiveNav('Ajustes')}>
                    <i className="fa-solid fa-gear"></i>
                    <span>Ajustes</span>
                </div>
            </footer>
        </div>
    );
}