import React from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <header className="app-header">
          <nav className="main-nav">
            <div className="nav-content">
              <h1 className="nav-logo">Julián López</h1>
              <LanguageSwitcher />
            </div>
          </nav>
        </header>
        
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </LanguageProvider>
  );
}

export default App;