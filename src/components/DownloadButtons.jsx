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
      '.contact-form',
      '.app-header'
    ];
    
    const hiddenElements = [];
    
    // Añadir clase de impresión al body
    document.body.classList.add('print-mode');
    
    // Ocultar elementos no deseados
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
    
    // Preparar enlaces para PDF - asegurar que sean visibles y accesibles
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      // Guardar estilo original
      link.setAttribute('data-original-color', link.style.color);
      link.setAttribute('data-original-text-decoration', link.style.textDecoration);
      
      // Hacer enlaces visibles para impresión
      link.style.color = '#0000EE';
      link.style.textDecoration = 'underline';
      
      // Asegurar que los enlaces tengan URL absoluta para el PDF
      if (link.href && !link.href.startsWith('http') && link.getAttribute('href')) {
        const href = link.getAttribute('href');
        if (href.startsWith('/')) {
          link.setAttribute('data-original-href', href);
          link.setAttribute('href', window.location.origin + href);
        }
      }
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
          
          // Reaplicar estilos a enlaces después del cambio de idioma
          setTimeout(() => {
            const newLinks = document.querySelectorAll('a');
            newLinks.forEach(link => {
              link.style.color = '#0000EE';
              link.style.textDecoration = 'underline';
            });
            
            window.print();
            
            // Restaurar todo después de imprimir
            setTimeout(restoreElements, 500);
          }, 300);
        }, 800);
        return;
      }
    }
    
    // Si ya está en el idioma correcto
    window.print();
    
    // Restaurar elementos después de un breve retraso
    setTimeout(restoreElements, 500);
    
    function restoreElements() {
      // Remover clase de impresión
      document.body.classList.remove('print-mode');
      
      // Restaurar elementos ocultos
      hiddenElements.forEach(el => {
        const originalDisplay = el.getAttribute('data-original-display');
        el.style.display = originalDisplay || '';
        el.removeAttribute('data-original-display');
      });
      
      // Restaurar enlaces a su estado original
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        const originalColor = link.getAttribute('data-original-color');
        const originalTextDecoration = link.getAttribute('data-original-text-decoration');
        const originalHref = link.getAttribute('data-original-href');
        
        link.style.color = originalColor || '';
        link.style.textDecoration = originalTextDecoration || '';
        
        if (originalHref) {
          link.setAttribute('href', originalHref);
          link.removeAttribute('data-original-href');
        }
        
        link.removeAttribute('data-original-color');
        link.removeAttribute('data-original-text-decoration');
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
        📄 Descargar PDF en español
      </button>
      <button 
        onClick={() => prepareForPrint('en')}
        className="download-btn english"
        aria-label="Download PDF in English"
      >
        📄 Download PDF in English
      </button>
    </div>
  );
};

export default DownloadButtons;