// src/components/Header.tsx

/**
 * Importações de dependências.
 * useState e useEffect são Hooks do React para gerenciamento de estado e efeitos colaterais.
 * Link é um componente do react-router-dom para navegação client-side.
 * logoIcon é um asset estático (imagem) importado para uso no componente.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/Gnomon Logo _ SEM NOME.png';

/**
 * @component Header
 * @description Renderiza o cabeçalho principal da aplicação, incluindo o logo,
 * o seletor de tema (dark/light) e o botão de navegação principal.
 */
export default function Header() {
    /**
     * Estado para gerenciar o tema atual ('dark' ou 'light').
     * O valor inicial é recuperado do localStorage para persistir a escolha do usuário.
     * Se nenhum tema estiver salvo, o padrão é 'dark'.
     */
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark');

    /**
     * Efeito colateral (useEffect) que monitora mudanças na variável de estado 'theme'.
     * É executado uma vez na montagem do componente e sempre que o estado 'theme' é atualizado.
     * Sua função é aplicar a classe 'light-mode' ao `<body>` e salvar a preferência
     * do usuário no localStorage.
     */
    useEffect(() => {
        const bodyClass = document.body.classList;
        theme === 'light' ? bodyClass.add('light-mode') : bodyClass.remove('light-mode');
        localStorage.setItem('theme', theme);
    }, [theme]);

    /**
     * Manipulador de evento para o interruptor de tema.
     * Atualiza o estado 'theme' com base no estado 'checked' do input checkbox.
     * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança do input.
     */
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'light' : 'dark');
    };

    /**
     * A renderização do componente em JSX.
     * Retorna a estrutura do cabeçalho, conectando os estados e manipuladores de evento
     * aos elementos da interface.
     */
    return (
        <header>
            <div className="container">
                <Link to="/" className="logo-container">
                    <img src={logoIcon} alt="Ícone do Gnomon" />
                    <span>GNOMON</span>
                </Link>
                <nav>
                    <div className="theme-switcher">
                        <i className="fas fa-moon"></i>
                        <label className="theme-switch-wrapper">
                            <input 
                                type="checkbox" 
                                id="theme-switcher" 
                                className="theme-switch-checkbox"
                                // O estado visual do interruptor é controlado pelo estado 'theme'.
                                checked={theme === 'light'}
                                // O evento onChange dispara a função de mudança de tema.
                                onChange={handleThemeChange}
                            />
                            <div className="theme-switch">
                                <div className="slider"></div>
                            </div>
                        </label>
                        <i className="fas fa-sun"></i>
                    </div>
                    {/* O componente Link renderiza um <a>, mas gerencia a navegação via JavaScript, sem recarregar a página. */}
                    <Link to="/login" className="cta-button">Abrir Guia</Link>
                </nav>
            </div>
        </header>
    );
}