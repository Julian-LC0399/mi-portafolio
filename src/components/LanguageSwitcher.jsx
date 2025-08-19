import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/language-switcher.css';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
    >
      {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
    </button>
  );
};

export default LanguageSwitcher;