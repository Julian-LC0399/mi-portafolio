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

function App() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') || 'es'
  );

  // Efecto para detectar cambios de idioma (misma lógica que DownloadButtons)
  useEffect(() => {
    // Función para manejar el cambio de idioma
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };
    
    // Escuchar eventos personalizados de cambio de idioma
    window.addEventListener('languageChange', handleLanguageChange);
    
    // También escuchar cambios en localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'language') {
        setCurrentLanguage(e.newValue || 'es');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Verificar periódicamente si el idioma ha cambiado (como fallback)
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

  // Función para scroll suave al principio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Textos traducidos para el botón
  const backToTopTexts = {
    es: "Volver al principio",
    en: "Back to top"
  };

  return (
    <LanguageProvider>
      <div className="App">
        <header className="app-header">
          <nav className="main-nav">
            <div className="nav-content">
              {/* Botón de inicio con cambio de idioma */}
              <button 
                onClick={scrollToTop}
                className="nav-logo-button"
                aria-label={backToTopTexts[currentLanguage]}
              >
                {backToTopTexts[currentLanguage]}
              </button>
              <LanguageSwitcher />
            </div>
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