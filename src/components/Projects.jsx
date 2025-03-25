import React from 'react';
import '../styles/projects.css';
import Eduneg from '../assets/images/eduneg.png';

const projects = [
  {
    id: 1,
    title: "Eduneg",
    description: "Aplicación para gestión de materias.",
    technologies: ["Next.js", "Tailwind"],
    github: "https://github.com/Vdiaz127/EDUNEG",
    demo: "https://eduneg.onrender.com/",
    image: Eduneg,
    alt: "Captura de pantalla de la aplicación Gestión de Materias"
  },

];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Mis <span className="highlight">Proyectos</span></h2>
        <p className="section-subtitle">Algunos de mis trabajos recientes</p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.alt} 
                  className="project-image"
                />
                <div className="project-overlay"></div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Ver Código
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link demo"
                    >
                      Ver Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;