// src/pages/CadastroPage.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/Gnomon Logo _ SEM NOME.png';

// Supondo que você criou e importou o CSS
import './LoginPage.css'; 

export default function CadastroPage() {
    // Hooks para controlar o estado dos campos do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        console.log('Criando conta para:', { nome, email, password });
        alert('Cadastro realizado com sucesso! Faça o login para continuar.');
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <Link to="/" className="logo-container">
                        <img src={logoIcon} alt="Ícone do Gnomon" />
                    </Link>
                    <h1>Criar Conta</h1>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Nome Completo</label>
                        <i className="fas fa-user input-icon"></i>
                        <input type="text" id="username" placeholder="Seu nome completo" required 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <i className="fas fa-envelope input-icon"></i>
                        <input type="email" id="email" placeholder="seuemail@exemplo.com" required 
                            // CORRIGIDO AQUI:
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Crie uma Senha</label>
                        <i className="fas fa-lock input-icon"></i>
                        <input type="password" id="password" placeholder="Mínimo de 8 caracteres" required 
                            // CORRIGIDO AQUI:
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirme a Senha</label>
                        <i className="fas fa-lock input-icon"></i>
                        <input type="password" id="confirm-password" placeholder="Repita a senha" required 
                            // CORRIGIDO AQUI:
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="cta-button login-button">Cadastrar</button>

                    <div className="signup-link">
                        <p>Já tem uma conta? <Link to="/login">Faça o login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}