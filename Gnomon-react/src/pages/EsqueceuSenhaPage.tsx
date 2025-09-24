// src/pages/EsqueceuSenhaPage.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/Gnomon Logo _ SEM NOME.png';

// Importa os estilos específicos que acabamos de criar
import './EsqueceuSenhaPage.css'; 

export default function EsqueceuSenhaPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Lógica futura para enviar o email de recuperação para o back-end
        console.log('Solicitação de recuperação para o email:', email);
        
        // Simula o envio e informa o usuário
        alert('Se este e-mail estiver cadastrado, um link de recuperação será enviado.');
        
        // Redireciona o usuário de volta para a página de login
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <Link to="/" className="logo-container">
                        <img src={logoIcon} alt="Ícone do Gnomon" />
                    </Link>
                    <h1>Recuperar Senha</h1>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <p style={{ textAlign: 'center', marginBottom: '25px', color: 'var(--cor-texto-secundario)' }}>
                        Sem problemas! Digite seu e-mail abaixo e enviaremos um link para você redefinir sua senha.
                    </p>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <i className="fas fa-envelope input-icon"></i>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="seuemail@exemplo.com" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="cta-button login-button">
                        Enviar Link de Recuperação
                    </button>

                    <div className="signup-link">
                        <p>Lembrou a senha? <Link to="/login">Voltar para o Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}