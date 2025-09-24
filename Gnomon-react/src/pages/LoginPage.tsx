// src/pages/LoginPage.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/Gnomon Logo _ SEM NOME.png';

// Importe o CSS específico do login
// Crie um arquivo LoginPage.css e cole o conteúdo do seu antigo CSS/login.css nele
import './LoginPage.css'; 

export default function LoginPage() {
    // Hooks do React para controlar o estado dos inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Hook do React Router para navegar programaticamente
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Impede o recarregamento da página
        // Aqui, futuramente, virá a lógica de validação com o back-end
        console.log('Tentativa de login com:', { email, password });
        // Simula um login bem-sucedido e navega para a página do mapa
        navigate('/mapa');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <Link to="/" className="logo-container">
                        <img src={logoIcon} alt="Ícone do Gnomon" />
                    </Link>
                    <h1>Acessar Plataforma</h1>
                </div>
                
                <form onSubmit={handleSubmit}>
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

                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <i className="fas fa-lock input-icon"></i>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id="password" 
                            placeholder="Sua senha" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i 
                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>

                    <div className="options-group">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Lembrar-me</label>
                        </div>
                        <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
                    </div>

                    <button type="submit" className="cta-button login-button">Entrar</button>

                    <div className="signup-link">
                        <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}