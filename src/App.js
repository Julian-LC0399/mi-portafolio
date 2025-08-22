import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import DownloadButtons from './components/DownloadButtons';
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') || 'es'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efecto para detectar cambios de idioma
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };
    
    const handleStorageChange = (e) => {
      if (e.key === 'language') {
        setCurrentLanguage(e.newValue || 'es');
      }
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('storage', handleStorageChange);
    
    const intervalId = setInterval(() => {
      const lang = localStorage.getItem('language') || 'es';
      if (lang !== currentLanguage) {
        setCurrentLanguage(lang);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [currentLanguage]);

  // Textos traducidos para la navegación
  const navTexts = {
    es: {
      backToTop: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
      menu: "Menú"
    },
    en: {
      backToTop: "Home",
      about: "About me",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      menu: "Menu"
    }
  };

  // Función para scroll suave a una sección
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false); // Cerrar menú después de hacer clic
  };

  // Función para scroll suave al principio (Hero)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <LanguageProvider>
      <div className="App">
        <header className="app-header">
          <nav className="main-nav">
            <div className="nav-content">
              {/* Botón de inicio */}
              <button 
                onClick={scrollToTop}
                className="nav-logo-button"
                aria-label={navTexts[currentLanguage].backToTop}
              >
                {navTexts[currentLanguage].backToTop}
              </button>
              
              {/* Menú de navegación interno (escritorio) */}
              <div className="internal-nav desktop-only">
                <button onClick={() => scrollToSection('about')}>
                  {navTexts[currentLanguage].about}
                </button>
                <button onClick={() => scrollToSection('projects')}>
                  {navTexts[currentLanguage].projects}
                </button>
                <button onClick={() => scrollToSection('skills')}>
                  {navTexts[currentLanguage].skills}
                </button>
                <button onClick={() => scrollToSection('contact')}>
                  {navTexts[currentLanguage].contact}
                </button>
              </div>

              {/* Menú hamburguesa para móviles */}
              <div className="mobile-nav-container">
                <button 
                  className="mobile-menu-toggle"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={navTexts[currentLanguage].menu}
                >
                  {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
              
              <LanguageSwitcher />
            </div>

            {/* Menú desplegable para móviles */}
            {isMobileMenuOpen && (
              <div className="mobile-nav-menu">
                <button onClick={() => scrollToSection('about')}>
                  {navTexts[currentLanguage].about}
                </button>
                <button onClick={() => scrollToSection('projects')}>
                  {navTexts[currentLanguage].projects}
                </button>
                <button onClick={() => scrollToSection('skills')}>
                  {navTexts[currentLanguage].skills}
                </button>
                <button onClick={() => scrollToSection('contact')}>
                  {navTexts[currentLanguage].contact}
                </button>
              </div>
            )}
          </nav>
        </header>
        
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        
        <DownloadButtons />
      </div>
    </LanguageProvider>
  );
}

export default App;