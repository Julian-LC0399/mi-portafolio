import React from 'react';
import '../styles/skills.css';
import { 
  FaDatabase, 
  FaLaptopCode, 
  FaTools,
  FaServer,
  FaNodeJs
} from 'react-icons/fa';
import { 
  SiMysql, 
  SiMongodb, 
  SiLaravel, 
  SiXampp, 
  SiGithub, 
  SiReact,
  SiTailwindcss,
  SiBootstrap // Importación añadida para Bootstrap
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaLaptopCode />,
      skills: [
        { name: "React.js/Next.js", icon: <SiReact /> },
        { name: "Tailwind/Sass", icon: <SiTailwindcss /> },
        { name: "Bootstrap", icon: <SiBootstrap /> } // Añadido aquí
      ]
    },
    {
      title: "Backend",
      icon: <FaServer />,
      skills: [
        { name: "Node.js/Express", icon: <FaNodeJs /> },
        { name: "PHP/Laravel", icon: <SiLaravel /> },
        { name: "XAMPP/PhpMyAdmin", icon: <SiXampp /> }
      ]
    },
    {
      title: "Bases de Datos",
      icon: <FaDatabase />,
      skills: [
        { name: "MySQL", icon: <SiMysql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
      ]
    },
    {
      title: "DevOps & Herramientas",
      icon: <FaTools />,
      skills: [
        { name: "Git/GitHub", icon: <SiGithub /> },
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2>Dominio <span className="highlight">Full-Stack</span></h2>
        <p className="section-subtitle">
          Tecnologías que domino tanto en frontend como backend
        </p>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category-card">
              <div className="category-header">
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              <div className="skills-container">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;