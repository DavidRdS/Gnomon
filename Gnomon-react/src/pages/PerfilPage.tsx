// src/pages/PerfilPage.tsx

import { Link, useNavigate } from 'react-router-dom';
// Vamos usar uma imagem de placeholder para a foto de perfil por enquanto
import placeholderAvatar from '../assets/Gnomon Logo _ SEM NOME.png'; 
// Importa os estilos que acabamos de criar
import './PerfilPage.css'; 

export default function PerfilPage() {
    const navigate = useNavigate();

    // Dados do usuário (mockados/exemplo)
    const userData = {
        name: 'João Marcos',
        email: 'jaomavil@email.com',
        avatar: placeholderAvatar
    };

    const handleLogout = () => {
        // Lógica futura para limpar tokens de autenticação, etc.
        console.log('Usuário deslogado');
        
        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                
                <img 
                    src={userData.avatar} 
                    alt="Foto do perfil" 
                    className="profile-picture" 
                />

                <h1 className="profile-name">{userData.name}</h1>
                <p className="profile-email">{userData.email}</p>

                <div className="profile-actions">
                    <button onClick={handleLogout} className="logout-button">
                        Sair (Logout)
                    </button>
                    
                    <Link to="/mapa" className="back-link">
                        Voltar para o Mapa
                    </Link>
                </div>

            </div>
        </div>
    );
}