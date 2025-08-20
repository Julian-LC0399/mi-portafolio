import { useLanguage } from '../context/LanguageContext';
import esTranslations from '../translations/es.json';
import enTranslations from '../translations/en.json';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const translations = language === 'es' ? esTranslations : enTranslations;
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key "${key}" not found`);
        return key;
      }
      value = value[k];
    }
    
    return value;
  };
  
  return { t, language };
};