import React from 'react';
import '../styles/hero.css';
import profileImage from '../assets/images/perfil.jpg';
import { useTranslation } from '../hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Julián López</h1>
        <h2>{t('hero.title')}</h2>
        <p>{t('hero.description')}</p>
        <div className="tech-highlights">
          {t('hero.techs').map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>
        <button className="cta-button" onClick={scrollToProjects}>
          {t('hero.cta')}
        </button>
      </div>
      <div className="hero-image">
        <img src={profileImage} alt="Julián López Castillo" />
      </div>
    </section>
  );
};

export default Hero;