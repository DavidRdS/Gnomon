// src/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>GNOMON</h3>
                        <p>Um guia interativo para simplificar a navegação no campus universitário.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Links Úteis</h3>
                        {/* O Link sem "to" atualiza a página, com "to" navega internamente */}
                        <a href="#hero">Início</a>
                        <a href="#about-project">Sobre</a>
                        <Link to="/login">Acessar o Guia</Link>
                    </div>
                    <div className="footer-section">
                        <h3>Projeto</h3>
                        <p>UNINASSAU - Caruaru, PE</p>
                        <p>Análise e Des. de Sistemas</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Projeto Gnomon. Desenvolvido por Lucas Hiago, David Roberto e João Marcos.</p>
            </div>
        </footer>
    );
}