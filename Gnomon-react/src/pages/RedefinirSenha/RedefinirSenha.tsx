// src/pages/RedefinirSenha.tsx

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logoIcon from '../../assets/Gnomon Logo _ SEM NOME.png';
import './RedefinirSenha.css'; 

export default function RedefinirSenhaPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email'); 

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem!');
            setIsLoading(false);
            return;
        }
        
        // Monta o corpo da requisição para a API
        const resetData = { email, password, token };

        try {
            // Envia os dados para o endpoint de redefinição de senha no back-end
            const response = await fetch('http://localhost:3001/api/users/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resetData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Falha ao redefinir a senha.');
            }

            alert('Senha redefinida com sucesso! Você já pode fazer o login.');
            navigate('/login');

        } catch (error: any) {
            console.error('Erro ao redefinir senha:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Se o token ou o e-mail não estiverem presentes na URL, exibe uma mensagem de erro.
    if (!token || !email) {
        return (
            <div className="login-container">
                <div className="login-card" style={{ textAlign: 'center' }}>
                    <h1>Token Inválido ou Expirado</h1>
                    <p style={{ margin: '20px 0' }}>O link de redefinição de senha é inválido ou já expirou.</p>
                    <Link to="/esqueceu-senha" className="cta-button">Solicitar um novo link</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <Link to="/" className="logo-container">
                        <img src={logoIcon} alt="Ícone do Gnomon" />
                    </Link>
                    <h1>Redefinir Senha</h1>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <p style={{ textAlign: 'center', marginBottom: '25px', color: 'var(--cor-texto-secundario)' }}>
                        Digite sua nova senha abaixo.
                    </p>

                    <div className="input-group">
                        <label htmlFor="password">Nova Senha</label>
                        <i className="fas fa-lock input-icon"></i>
                        <input 
                            type="password"
                            id="password" 
                            placeholder="Mínimo de 6 caracteres" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirme a Nova Senha</label>
                        <i className="fas fa-lock input-icon"></i>
                        <input 
                            type="password"
                            id="confirm-password" 
                            placeholder="Repita a nova senha" 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Exibe a mensagem de erro na tela, se houver */}
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="cta-button login-button" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Salvar Nova Senha'}
                    </button>
                </form>
            </div>
        </div>
    );
}