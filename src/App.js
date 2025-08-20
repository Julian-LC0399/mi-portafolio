import React from 'react';
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
  // Función para scroll suave al principio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <LanguageProvider>
      <div className="App">
        <header className="app-header">
          <nav className="main-nav">
            <div className="nav-content">
              {/* Botón de inicio en lugar del título estático */}
              <button 
                onClick={scrollToTop}
                className="nav-logo-button"
                aria-label="Volver al inicio"
              >
                Volver al principio
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