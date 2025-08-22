import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/download-buttons.css';

const DownloadButtons = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') || 'es'
  );

  // Efecto para detectar cambios de idioma
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

  // Función para asegurar que todas las imágenes estén cargadas
  const waitForImages = () => {
    const images = document.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    return Promise.all(promises);
  };

  // Función de restauración de emergencia
  const restoreAllElements = () => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.style.display === 'none') el.style.display = '';
      if (el.style.visibility === 'hidden') el.style.visibility = '';
    });
    document.body.classList.remove('pdf-capture-mode');
  };

  const generateHighQualityPDF = async (lang) => {
    setIsGenerating(true);
    
    try {
      // 1. Cambiar idioma si es necesario
      const currentLang = localStorage.getItem('language') || 'es';
      if (currentLang !== lang) {
        const event = new CustomEvent('languageChange', { detail: lang });
        window.dispatchEvent(event);
        // Actualizar también el estado local inmediatamente
        setCurrentLanguage(lang);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Resto del código sin cambios...
      const originalScrollPosition = window.pageYOffset;
      const element = document.getElementById('portfolio-content') || document.body;
      
      await waitForImages();
      
      const elementsToHide = document.querySelectorAll(
        '.no-pdf, .main-nav, .download-buttons, .language-switcher, footer, .contact-form, .app-header, button[aria-label*="PDF"], button[aria-label*="Download"], button[aria-label*="Descargar"]'
      );
      
      const originalStyles = new Map();
      elementsToHide.forEach(el => {
        originalStyles.set(el, {
          display: window.getComputedStyle(el).display,
          visibility: window.getComputedStyle(el).visibility
        });
        el.style.display = 'none';
        el.style.visibility = 'hidden';
      });
      
      document.body.classList.add('pdf-capture-mode');
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
        onclone: (clonedDoc) => {
          clonedDoc.body.style.width = '100%';
          clonedDoc.body.style.overflow = 'visible';
          
          const projects = clonedDoc.querySelectorAll('.project-card, .project-item');
          projects.forEach(project => {
            project.style.display = 'block';
            project.style.opacity = '1';
            project.style.visibility = 'visible';
          });
        }
      });
      
      elementsToHide.forEach(el => {
        const originalStyle = originalStyles.get(el);
        if (originalStyle) {
          el.style.display = originalStyle.display;
          el.style.visibility = originalStyle.visibility;
        } else {
          el.style.display = '';
          el.style.visibility = '';
        }
      });
      
      document.body.classList.remove('pdf-capture-mode');
      window.scrollTo(0, originalScrollPosition);
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(
        imgData, 
        'JPEG', 
        imgX, 
        imgY, 
        imgWidth * ratio, 
        imgHeight * ratio
      );
      
      pdf.save(`portfolio-${lang}-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      restoreAllElements();
      window.print();
    } finally {
      restoreAllElements();
      setIsGenerating(false);
    }
  };

  return (
    <div className="download-buttons">
      {isGenerating && (
        <div className="pdf-generating-overlay">
          <div className="pdf-generating-spinner"></div>
          <p>
            {currentLanguage === 'es' 
              ? 'Generando PDF, por favor espere...' 
              : 'Generating PDF, please wait...'
            }
          </p>
        </div>
      )}
      
      <button 
        onClick={() => generateHighQualityPDF(currentLanguage)}
        className={`download-btn ${currentLanguage === 'es' ? 'spanish' : 'english'}`}
        disabled={isGenerating}
        aria-label={
          currentLanguage === 'es' 
            ? 'Descargar PDF en español' 
            : 'Download PDF in English'
        }
      >
        {isGenerating 
          ? (currentLanguage === 'es' ? '⏳ Generando...' : '⏳ Generating...')
          : (currentLanguage === 'es' ? '📄 Descargar CV (ES)' : '📄 Download CV (EN)')
        }
      </button>
    </div>
  );
};

export default DownloadButtons;