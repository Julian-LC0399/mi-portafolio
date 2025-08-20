import React from 'react';
import '../styles/contact.css';
import { FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';

const Contact = () => {
  const { t } = useTranslation();
  
  const whatsappNumber = '584126918133';
  const formattedPhone = '+58 412-6918133';
  const whatsappMessage = t('contact.whatsappMessage');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="contact" className="contact-section">
      {/* Se ha eliminado el ícono flotante de WhatsApp */}

      <div className="contact-container">
        <h2 className="contact-title">{t('contact.title')}</h2>
        <p className="contact-subtitle">{t('contact.subtitle')}</p>
        
        <div className="contact-methods-grid">
          <div className="contact-card">
            <div className="contact-card-icon whatsapp-bg">
              <FaWhatsapp className="contact-icon" />
            </div>
            <div className="contact-card-content">
              <h3>{t('contact.whatsapp')}</h3>
              <a href={whatsappLink} 
                 target="_blank" 
                 rel="noopener noreferrer nofollow" 
                 className="contact-link">
                {formattedPhone}
              </a>
              <p className="contact-note">{t('contact.clickMessage')}</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon email-bg">
              <FaEnvelope className="contact-icon" />
            </div>
            <div className="contact-card-content">
              <h3>{t('contact.email')}</h3>
              <a href="mailto:julianlopezcastillo12@gmail.com" 
                 className="contact-link">
                julianlopezcastillo12@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon github-bg">
              <FaGithub className="contact-icon" />
            </div>
            <div className="contact-card-content">
              <h3>{t('contact.github')}</h3>
              <a href="https://github.com/Julian-LC0399" 
                 target="_blank" 
                 rel="noopener noreferrer nofollow" 
                 className="contact-link">
                Julian-LC0399
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;