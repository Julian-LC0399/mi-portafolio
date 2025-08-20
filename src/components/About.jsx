import React from 'react';
import '../styles/about.css';
import { useTranslation } from '../hooks/useTranslation';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>{t('about.title')}</h2>
        <div className="about-content">
          <div className="about-section">
            <h3>{t('about.sections.history.title')}</h3>
            <p>{t('about.sections.history.content')}</p>
          </div>

          <div className="about-section">
            <h3>{t('about.sections.environment.title')}</h3>
            <p>{t('about.sections.environment.content')}</p>
          </div>

          <div className="about-section">
            <h3>{t('about.sections.focus.title')}</h3>
            <p>{t('about.sections.focus.content')}</p>
          </div>

          <div className="about-section">
            <h3>{t('about.sections.skills.title')}</h3>
            <ul className="skills-list">
              {t('about.sections.skills.items').map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;