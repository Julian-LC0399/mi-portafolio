import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>Sobre mí</h2>
        <div className="about-content">
          <div className="about-section">
            <h3>Mi historia</h3>
            <p>
              Soy Julián López, estudiante de Ingeniería Informática en la Universidad Nacional 
              Experimental de Guayana (UNEG). Como persona con discapacidad motora, tengo un 
              especial interés en el desarrollo de tecnologías accesibles.
            </p>
          </div>

          <div className="about-section">
            <h3>Entorno de trabajo</h3>
            <p>
              Desarrollo mis proyectos en <strong>Visual Studio Code</strong> con configuraciones 
              personalizadas para eficiencia y accesibilidad, utilizando extensiones como ESLint, 
              Prettier y herramientas para WCAG. Mi entorno está optimizado para productividad 
              en desarrollo Full-Stack.
            </p>
          </div>

          <div className="about-section">
            <h3>Enfoque profesional</h3>
            <p>
              Desarrollador Full-Stack especializado en soluciones JavaScript (React, Node.js) y PHP (Laravel). 
              Combino mis conocimientos técnicos con mi perspectiva única sobre accesibilidad digital.
            </p>
          </div>

          <div className="about-section">
            <h3>Habilidades clave</h3>
            <ul className="skills-list">
              <li>React.js / Next.js</li>
              <li>Node.js / Express</li>
              <li>PHP / Laravel</li>
              <li>Accesibilidad WCAG</li>
              <li>Git y control de versiones</li>
              <li>Desarrollo ágil</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;