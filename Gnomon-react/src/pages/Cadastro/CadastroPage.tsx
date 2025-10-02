// src/pages/CadastroPage.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../../assets/Gnomon Logo _ SEM NOME.png';

// Importa os estilos da página (certifique-se que o arquivo existe)
import './CadastroPage.css'; 

export default function CadastroPage() {
    // Hooks para controlar o estado dos campos do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Função handleSubmit atualizada para se comunicar com o back-end
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Validação no front-end: verifica se as senhas coincidem
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // 1. Monta o objeto de dados para enviar para a API
        const userData = { name, email, password };

        try {
            // 2. Faz a requisição 'fetch' para o endpoint de registro do back-end
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // 3. Converte a resposta do back-end
            const responseData = await response.json();

            // 4. Verifica se a resposta da API indica um erro
            if (!response.ok) {
                // Lança um erro com a mensagem vinda do back-end (ex: "E-mail já em uso")
                throw new Error(responseData.message || 'Falha ao cadastrar.');
            }
            
            // 5. Se o cadastro foi bem-sucedido, avisa o usuário e o redireciona para o login
            alert('Cadastro realizado com sucesso! Faça o login para continuar.');
            navigate('/login');

        } catch (error: any) {
            // 6. Captura qualquer erro (de rede ou da API) e o exibe para o usuário
            console.error('Erro no cadastro:', error);
            alert(`Erro no cadastro: ${error.message}`);
        }
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
                            value={name} 
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <i className="fas fa-envelope input-icon"></i>
                        <input type="email" id="email" placeholder="seuemail@exemplo.com" required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Crie uma Senha</label>
                        <i className="fas fa-lock input-icon"></i>
                        <input type="password" id="password" placeholder="Mínimo de 8 caracteres" required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirme a Senha</label>
                        <i className="fas fa-lock input-icon"></i>
                        <input type="password" id="confirm-password" placeholder="Repita a senha" required 
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