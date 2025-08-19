import React from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import DownloadButtons from './components/DownloadButtons'; // Importación añadida

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <header className="app-header">
          <nav className="main-nav">
            <div className="nav-content">
              <h1 className="nav-logo">Portafolio</h1>
              <LanguageSwitcher />
            </div>
          </nav>
        </header>
        
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        
        <DownloadButtons /> {/* Componente añadido */}
      </div>
    </LanguageProvider>
  );
}

export default App;