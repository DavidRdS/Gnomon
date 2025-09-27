// src/pages/HomePage.tsx

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CtaButton from '../../components/CtaButton';
import fotoLucas from '../../assets//Lucas.jpg';
import fotoDavid from '../../assets/David.jpg';
import fotoJoao from '../../assets/Joao.jpg';
// Importa os estilos específicos para esta página
import './Intro.css';

export default function Intro() {
    return (
        // Usamos um Fragment (<>) para agrupar os elementos sem adicionar um div extra
        <>
            <Header />

            <main>
                <section id="hero">
                    <div className="container">
                        <h1>Seu Guia Definitivo para o Campus</h1>
                        <p>O Gnomon foi criado para simplificar sua vida acadêmica, ajudando você a encontrar qualquer sala, laboratório ou serviço com facilidade e rapidez.</p>
                        
                        {/* Usando nosso componente de botão reutilizável! */}
                        <CtaButton 
                            to="/login" 
                            style={{ fontSize: '1.2em', padding: '15px 40px' }}
                        >
                            Comece a Explorar
                        </CtaButton>
                    </div>
                </section>

                <section id="features">
                    <div className="container">
                        <h2>Tudo o que você precisa, em um só lugar.</h2>
                        <div className="features-grid">
                            <div className="feature-item">
                                <i className="fa-solid fa-map-location-dot"></i>
                                <h3>Nunca mais se perca</h3>
                                <p>Nossa principal missão é resolver a dificuldade de localização no ambiente acadêmico. Encontre qualquer ponto do campus de forma intuitiva.</p>
                            </div>
                            <div className="feature-item">
                                <i className="fa fa-blind"></i>
                                <h3>Descrição e Ajuda</h3>
                                <p>Já se sentiu perdido na área? Cola com a gente que é sucesso.</p>
                            </div>
                            <div className="feature-item">
                                <i className="fa-solid fa-mobile-screen-button"></i>
                                <h3>Autonomia na sua mão</h3>
                                <p>Feito para ser um aplicativo web progressivo (PWA), funciona em qualquer dispositivo sem precisar instalar nada.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="about-project">
                    <div className="container about" id="about">
                         <div className="about-text">
                               <h2>Sobre o Projeto</h2>
                               <p>O Gnomon nasceu da necessidade de criar uma experiência de boas-vindas mais fluida para novos integrantes da comunidade acadêmica. A transição para um novo campus pode gerar ansiedade e perda de tempo. Nosso objetivo é eliminar essa fricção, oferecendo um guia digital completo, rápido e que funciona até mesmo sem internet. Queremos proporcionar autonomia e segurança para que todos possam se concentrar no que realmente importa: o aprendizado e a colaboração.</p>
                         </div>
                         <div className="about-image">
                               <i className="fas fa-university"></i>
                         </div>
                    </div>
                </section>

                <section id="team">
                    <div className="container">
                        <h2>Nossa Equipe</h2>
                        <div className="team-grid">
                            <div className="team-member">
                                <div className="photo"><img src={fotoLucas} alt="Lucas Hiago" /></div>
                                <h3>Lucas Hiago</h3>
                                <p>Desenvolvedor & Testes</p>
                            </div>
                            <div className="team-member">
                                <div className="photo"><img src={fotoDavid} alt="David Roberto" /></div>
                                <h3>David Roberto</h3>
                                <p>Desenvolvedor & Banco de Dados</p>
                            </div>
                            <div className="team-member">
                                <div className="photo"><img src={fotoJoao} alt="João Marcos" /></div>
                                <h3>João Marcos</h3>
                                <p>Gerente & Desenvolvedor</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="final-cta">
                    <div className="container">
                        <h2>Pronto para navegar pelo campus sem estresse?</h2>
                        <p style={{ marginBottom: '30px' }}>Abra o guia interativo agora e transforme sua experiência na universidade.</p>
                        <CtaButton 
                            to="/login"
                            style={{ fontSize: '1.2em', padding: '15px 40px' }}
                        >
                            Acessar o Guia
                        </CtaButton>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}