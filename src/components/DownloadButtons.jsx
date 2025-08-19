import React from 'react';
import '../styles/download-buttons.css';

const DownloadButtons = () => {
  const prepareForPrint = (lang) => {
    // Guardar el idioma actual
    const currentLang = localStorage.getItem('language') || 'es';
    
    // Ocultar elementos que no deben aparecer en el PDF
    const elementsToHide = [
      '.main-nav', 
      '.download-buttons',
      '.language-switcher',
      'footer',
      '.contact-form'
    ];
    
    const hiddenElements = [];
    
    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el.style.display !== 'none') {
          el.setAttribute('data-original-display', el.style.display);
          el.style.display = 'none';
          hiddenElements.push(el);
        }
      });
    });
    
    // Ajustar estilos para impresión
    const originalBackground = document.body.style.background;
    document.body.style.background = 'white';
    
    // Si necesita cambiar de idioma
    if (currentLang !== lang) {
      const langButton = document.querySelector('.language-switcher');
      if (langButton) {
        // Mostrar temporalmente el botón para poder hacer clic
        langButton.style.display = 'block';
        langButton.click();
        
        // Esperar a que el contenido se actualice al nuevo idioma
        setTimeout(() => {
          // Ocultar el botón de nuevo después del cambio
          langButton.style.display = 'none';
          window.print();
          
          // Restaurar todo después de imprimir
          setTimeout(restoreElements, 500);
        }, 800);
        return;
      }
    }
    
    // Si ya está en el idioma correcto
    window.print();
    
    // Restaurar elementos después de un breve retraso
    setTimeout(restoreElements, 500);
    
    function restoreElements() {
      // Restaurar elementos ocultos
      hiddenElements.forEach(el => {
        const originalDisplay = el.getAttribute('data-original-display');
        el.style.display = originalDisplay || '';
        el.removeAttribute('data-original-display');
      });
      
      // Restaurar fondo
      document.body.style.background = originalBackground;
      
      // Asegurarse de que el botón de idioma esté visible nuevamente
      const langButton = document.querySelector('.language-switcher');
      if (langButton) {
        langButton.style.display = '';
      }
    }
    
    // Agregar event listener para restaurar elementos si el usuario cancela la impresión
    window.addEventListener('afterprint', restoreElements);
  };

  return (
    <div className="download-buttons">
      <button 
        onClick={() => prepareForPrint('es')}
        className="download-btn spanish"
        aria-label="Descargar PDF en español"
      >
        📄 Español
      </button>
      <button 
        onClick={() => prepareForPrint('en')}
        className="download-btn english"
        aria-label="Download PDF in English"
      >
        📄 English
      </button>
    </div>
  );
};

export default DownloadButtons;