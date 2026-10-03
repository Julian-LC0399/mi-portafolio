import React, { useState } from 'react';
import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { useLanguage } from '../context/LanguageContext';
import '../styles/download-buttons.css';

const DownloadButtons = () => {
  const { language, setLanguage } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  const waitForImages = () => {
    const images = document.querySelectorAll('img');
    const promises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    return Promise.all(promises);
  };

  const restoreAllElements = () => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      if (el.style.display === 'none') el.style.display = '';
      if (el.style.visibility === 'hidden') el.style.visibility = '';
    });
    document.body.classList.remove('pdf-capture-mode');
  };

  const generateHighQualityPDF = async (lang) => {
    setIsGenerating(true);

    try {
      // 1. Cambiar idioma si es necesario
      if (language !== lang) {
        setLanguage(lang);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      const originalScrollPosition = window.pageYOffset;
      const element = document.getElementById('portfolio-content');

      if (!element) {
        throw new Error('No se encontró el elemento #portfolio-content en el DOM.');
      }

      await waitForImages();

      // 2. Ocultar elementos que no queremos en el PDF
      const elementsToHide = document.querySelectorAll(
        '.no-pdf, .main-nav, .download-buttons, .language-switcher, .app-header, button[aria-label*="PDF"], button[aria-label*="Download"], button[aria-label*="Descargar"]'
      );

      const originalStyles = new Map();
      elementsToHide.forEach((el) => {
        originalStyles.set(el, {
          display: window.getComputedStyle(el).display,
          visibility: window.getComputedStyle(el).visibility
        });
        el.style.display = 'none';
        el.style.visibility = 'hidden';
      });

      document.body.classList.add('pdf-capture-mode');
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 3. Capturar con html-to-image (no usa blobs, no falla con CORS)
      const dataUrl = await toJpeg(element, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        style: {
          transform: 'none',
          animation: 'none',
          transition: 'none'
        },
        filter: (node) => {
          if (node.classList && node.classList.contains('no-pdf')) return false;
          if (node.classList && node.classList.contains('download-buttons')) return false;
          if (node.classList && node.classList.contains('language-switcher')) return false;
          if (node.tagName === 'FOOTER') return false;
          return true;
        }
      });

      // 4. Restaurar elementos ocultados
      elementsToHide.forEach((el) => {
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

      // 5. Cargar la imagen en un canvas para hacer slicing multipágina
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // 6. Generar PDF multipágina con cortes inteligentes
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = pdfWidth / canvas.width;
      const pxPerPage = Math.floor(pdfHeight / ratio);

      // ---- Detectar breakpoints (dónde SÍ podemos cortar) ----
      const elementRect = element.getBoundingClientRect();
      const scaleY = canvas.height / elementRect.height;

      const breakpoints = new Set([canvas.height]);

      element.querySelectorAll(
        'section, .project-card, .skill-category-card, .about-section, .contact-card'
      ).forEach((node) => {
        const rect = node.getBoundingClientRect();
        const bottomInCanvas = Math.round((rect.bottom - elementRect.top) * scaleY);
        if (bottomInCanvas > 50 && bottomInCanvas < canvas.height - 20) {
          breakpoints.add(bottomInCanvas);
        }
      });

      const sortedBreaks = Array.from(breakpoints).sort((a, b) => a - b);

      // ---- Calcular cortes óptimos ----
      const pages = [];
      let cursor = 0;

      while (cursor < canvas.height - 30) {
        const idealEnd = cursor + pxPerPage;

        if (idealEnd >= canvas.height) {
          if (canvas.height - cursor > 50) {
            pages.push({ start: cursor, end: canvas.height });
          }
          break;
        }

        let bestBreak = -1;
        for (const bp of sortedBreaks) {
          if (bp > cursor + 50 && bp <= idealEnd) {
            bestBreak = bp;
          } else if (bp > idealEnd) {
            break;
          }
        }

        const end = bestBreak > cursor ? bestBreak : idealEnd;

        if (end - cursor > 50) {
          pages.push({ start: cursor, end });
        }

        cursor = end;
      }

      // ---- Dibujar cada página ----
      pages.forEach((pageRange, index) => {
        const sliceHeight = pageRange.end - pageRange.start;
        if (sliceHeight <= 0) return;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        const pageCtx = pageCanvas.getContext('2d');
        pageCtx.drawImage(
          canvas,
          0,
          pageRange.start,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);

        if (index > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          pageImgData,
          'JPEG',
          0,
          0,
          pdfWidth,
          sliceHeight * ratio
        );
      });

      // 7. Guardar sin fecha en el nombre
      pdf.save(`portfolio-${lang}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      restoreAllElements();
      alert(
        language === 'es'
          ? 'Hubo un error al generar el PDF. Revisa la consola para más detalles.'
          : 'There was an error generating the PDF. Check the console for details.'
      );
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
              : 'Generating PDF, please wait...'}
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
          ? language === 'es'
            ? '⏳ Generando...'
            : '⏳ Generating...'
          : language === 'es'
            ? '📄 Descargar CV (ES)'
            : '📄 Download CV (EN)'}
      </button>
    </div>
  );
};

export default DownloadButtons;