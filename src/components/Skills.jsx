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
  SiBootstrap
} from 'react-icons/si';
import { useTranslation } from '../hooks/useTranslation';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.categories.frontend'),
      icon: <FaLaptopCode />,
      skills: [
        { name: "React.js/Next.js", icon: <SiReact /> },
        { name: "Tailwind/Sass", icon: <SiTailwindcss /> },
        { name: "Bootstrap", icon: <SiBootstrap /> }
      ]
    },
    {
      title: t('skills.categories.backend'),
      icon: <FaServer />,
      skills: [
        { name: "Node.js/Express", icon: <FaNodeJs /> },
        { name: "PHP/Laravel", icon: <SiLaravel /> },
        { name: "XAMPP/PhpMyAdmin", icon: <SiXampp /> }
      ]
    },
    {
      title: t('skills.categories.database'),
      icon: <FaDatabase />,
      skills: [
        { name: "MySQL", icon: <SiMysql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
      ]
    },
    {
      title: t('skills.categories.devops'),
      icon: <FaTools />,
      skills: [
        { name: "Git/GitHub", icon: <SiGithub /> },
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2>{t('skills.title')}</h2>
        <p className="section-subtitle">
          {t('skills.subtitle')}
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