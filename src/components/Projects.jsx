import React from 'react';
import '../styles/projects.css';
import Eduneg from '../assets/images/eduneg.png';
import Gestion from '../assets/images/gestion.png';
import Simpol from '../assets/images/SIMPOL.jpg';
import { useTranslation } from '../hooks/useTranslation';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      titleKey: "eduneg",
      technologies: ["Next.js", "Tailwind"],
      image: Eduneg,
      alt: "Captura de pantalla de la aplicación Gestión de Materias"
    },
    {
      id: 2,
      titleKey: "accountModule",
      context: "Internship",
      technologies: ["PHP", "MySQL"],
      image: Gestion,
      alt: "Captura de pantalla del módulo de movimiento de cuentas"
    },
    {
      id: 3,
      titleKey: "simpol",
      context: "DegreeProject",
      technologies: ["Python", "Streamlit", "MySQL", "PRTG", "psutil"],
      image: Simpol,
      alt: "Logo del Sistema Inteligente de Monitoreo Permanente Online (SIMPOL)"
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
                <div className="project-title-row">
                  <h3>{t(`projects.projectsList.${project.titleKey}.title`)}</h3>
                  {project.context && (
                    <span className="project-context-badge">
                      {t(`projects.context.${project.context}`)}
                    </span>
                  )}
                </div>
                <p>{t(`projects.projectsList.${project.titleKey}.description`)}</p>
                <div className="technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
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