import React from 'react';
import '../styles/hero.css';
import profileImage from '../assets/images/perfil.jpg';

const Hero = () => {
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
        <h2>Desarrollador Full-Stack</h2> {/* Cambiado a Full-Stack */}
        <p>
          Especializado en arquitecturas JavaScript (React, Node.js) y PHP (Laravel). 
          Desarrollo soluciones completas desde el frontend interactivo hasta APIs robustas, 
          con especial enfoque en accesibilidad.
        </p> {/* Descripción ampliada */}
        <div className="tech-highlights"> {/* Nuevo elemento */}
          <span>React</span>
          <span>Node.js</span>
          <span>Laravel</span>
          <span>Accesibilidad</span>
        </div>
        <button className="cta-button" onClick={scrollToProjects}>
          Ver proyectos Full-Stack
        </button> {/* Texto actualizado */}
      </div>
      <div className="hero-image">
        <img src={profileImage} alt="Julián López" />
      </div>
    </section>
  );
};

export default Hero;