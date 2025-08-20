import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/download-buttons.css';

const DownloadButtons = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // (smoothScrollTo function removed because it was unused)

  // Función para asegurar que todas las imágenes estén cargadas
  const waitForImages = () => {
    const images = document.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Continuar incluso si hay error en alguna imagen
      });
    });
    return Promise.all(promises);
  };

  const generateHighQualityPDF = async (lang) => {
    setIsGenerating(true);
    
    try {
      // 1. Cambiar idioma si es necesario
      const currentLang = localStorage.getItem('language') || 'es';
      if (currentLang !== lang) {
        const event = new CustomEvent('languageChange', { detail: lang });
        window.dispatchEvent(event);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // 2. Guardar la posición actual de scroll
      const originalScrollPosition = window.pageYOffset;
      
      // 3. Obtener el elemento a capturar
      const element = document.getElementById('portfolio-content') || document.body;
      
      // 4. Esperar a que todas las imágenes se carguen
      await waitForImages();
      
      // 5. Ocultar elementos no deseados
      const elementsToHide = document.querySelectorAll(
        '.no-pdf, .main-nav, .download-buttons, .language-switcher, footer, .contact-form, .app-header'
      );
      
      const originalStyles = [];
      elementsToHide.forEach(el => {
        originalStyles.push({
          element: el,
          display: el.style.display
        });
        el.style.display = 'none';
      });
      
      // 6. Añadir clase especial para la captura
      document.body.classList.add('pdf-capture-mode');
      
      // 7. Scroll al inicio para asegurar que todo el contenido esté renderizado
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 8. Configuración de html2canvas para máxima calidad
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
          // Asegurar que todos los estilos se apliquen correctamente
          clonedDoc.body.style.width = '100%';
          clonedDoc.body.style.overflow = 'visible';
          
          // Forzar la visualización de todos los proyectos
          const projects = clonedDoc.querySelectorAll('.project-card, .project-item');
          projects.forEach(project => {
            project.style.display = 'block';
            project.style.opacity = '1';
            project.style.visibility = 'visible';
          });
        }
      });
      
      // 9. Restaurar elementos ocultos
      elementsToHide.forEach(el => {
        const originalStyle = originalStyles.find(style => style.element === el);
        if (originalStyle) {
          el.style.display = originalStyle.display;
        }
      });
      
      // 10. Remover clase de captura
      document.body.classList.remove('pdf-capture-mode');
      
      // 11. Restaurar posición de scroll
      window.scrollTo(0, originalScrollPosition);
      
      // 12. Crear PDF con la imagen
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calcular relación de aspecto para la imagen
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      // Añadir imagen al PDF
      pdf.addImage(
        imgData, 
        'JPEG', 
        imgX, 
        imgY, 
        imgWidth * ratio, 
        imgHeight * ratio
      );
      
      // Guardar PDF
      pdf.save(`portfolio-${lang}-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback a impresión estándar
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="download-buttons">
      {isGenerating && (
        <div className="pdf-generating-overlay">
          <div className="pdf-generating-spinner"></div>
          <p>Generando PDF, por favor espere...</p>
        </div>
      )}
      
      <button 
        onClick={() => generateHighQualityPDF('es')}
        className="download-btn spanish"
        disabled={isGenerating}
        aria-label="Descargar PDF en español"
      >
        {isGenerating ? '⏳ Generando...' : '📄 Descargar PDF (ES)'}
      </button>
      
      <button 
        onClick={() => generateHighQualityPDF('en')}
        className="download-btn english"
        disabled={isGenerating}
        aria-label="Download PDF in English"
      >
        {isGenerating ? '⏳ Generating...' : '📄 Download PDF (EN)'}
      </button>
    </div>
  );
};

export default DownloadButtons;