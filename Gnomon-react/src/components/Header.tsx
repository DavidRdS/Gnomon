// src/components/Header.tsx

// Importa as funcionalidades necessárias do React
import { useState, useEffect } from 'react';
// Importa o componente Link para navegação sem recarregar a página
import { Link } from 'react-router-dom';
// Importa a imagem do logo da pasta de assets
import logoIcon from '../assets/Gnomon Logo _ SEM NOME.png';

// Define o componente Header
export default function Header() {
    // Cria um "estado" para controlar o tema atual.
    // O valor inicial é pego do localStorage ou 'dark' como padrão.
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    // useEffect é um "efeito colateral" que roda quando o componente é montado
    // ou quando uma de suas dependências (no caso, a variável 'theme') muda.
    useEffect(() => {
        // Aplica ou remove a classe 'light-mode' do body
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        // Salva a preferência do tema no localStorage para visitas futuras
        localStorage.setItem('theme', theme);
    }, [theme]); // O array de dependências garante que este código só rode quando 'theme' mudar

    // Função que é chamada quando o interruptor do tema é alterado
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'light' : 'dark');
    };

    // A parte "return" contém o JSX, que é o nosso "HTML" do componente
    return (
        <header>
            <div className="container">
                {/* O Link com to="/" leva para a página inicial */}
                <Link to="/" className="logo-container">
                    <img src={logoIcon} alt="Ícone do Gnomon" />
                    <span>GNOMON</span>
                </Link>
                <nav>
                    <div className="theme-switcher">
                        <i className="fas fa-sun"></i>
                        <label className="theme-switch-wrapper">
                            <input 
                                type="checkbox" 
                                id="theme-switcher" 
                                className="theme-switch-checkbox"
                                // O estado do checkbox é controlado pela variável 'theme'
                                checked={theme === 'light'}
                                // A função handleThemeChange é chamada a cada clique
                                onChange={handleThemeChange}
                            />
                            <div className="theme-switch">
                                <div className="slider"></div>
                            </div>
                        </label>
                        <i className="fas fa-moon"></i>
                    </div>
                    {/* O Link com to="/login" leva para a página de login */}
                    <Link to="/login" className="cta-button">Abrir Guia</Link>
                </nav>
            </div>
        </header>
    );
}