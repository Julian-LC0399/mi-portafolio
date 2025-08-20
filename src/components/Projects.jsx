import React from 'react';
import '../styles/projects.css';
import Eduneg from '../assets/images/eduneg.png';
import Gestion from '../assets/images/gestion.png';
import { useTranslation } from '../hooks/useTranslation';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      titleKey: "eduneg",
      technologies: ["Next.js", "Tailwind"],
      github: "https://github.com/Vdiaz127/EDUNEG",
      //demo: "https://eduneg.onrender.com/",
      demo:   "https://youtube.com/shorts/qLrfNkXZRZk",
      image: Eduneg,
      alt: "Captura de pantalla de la aplicación Gestión de Materias"
    },
    {
      id: 2,
      titleKey: "accountModule",
      technologies: ["PHP", "MySQL"],
      github: "https://github.com/Julian-LC0399/Sistema-descriptivo-de-movimiento-de-cuenta",
      image: Gestion,
      alt: "Captura de pantalla del módulo de movimiento de cuentas" 
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-subtitle">{t('projects.subtitle')}</p>
        
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
                <h3>{t(`projects.projectsList.${project.titleKey}.title`)}</h3>
                <p>{t(`projects.projectsList.${project.titleKey}.description`)}</p>
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
                      {t('projects.viewCode')}
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link demo"
                    >
                      {t('projects.viewDemo')}
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