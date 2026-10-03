import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLanguage } from '../context/LanguageContext';
import '../styles/download-buttons.css';

const DownloadButtons = () => {
  const { language, setLanguage } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

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
      if (language !== lang) {
        setLanguage(lang);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

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
            {language === 'es'
              ? 'Generando PDF, por favor espere...'
              : 'Generating PDF, please wait...'
            }
          </p>
        </div>
      )}

      <button
        onClick={() => generateHighQualityPDF(language)}
        className={`download-btn ${language === 'es' ? 'spanish' : 'english'}`}
        disabled={isGenerating}
        aria-label={
          language === 'es'
            ? 'Descargar PDF en español'
            : 'Download PDF in English'
        }
      >
        {isGenerating
          ? (language === 'es' ? '⏳ Generando...' : '⏳ Generating...')
          : (language === 'es' ? '📄 Descargar CV (ES)' : '📄 Download CV (EN)')
        }
      </button>
    </div>
  );
};

export default DownloadButtons;