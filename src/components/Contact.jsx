import React from 'react';
import '../styles/contact.css';
import { FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa'; // Eliminé FaPhone que no se usa

const Contact = () => {
  // Número en formato internacional para WhatsApp (sin '+' inicial)
  const whatsappNumber = '584126918133';
  // Número formateado para visualización
  const formattedPhone = '+58 412-6918133';
  // Mensaje predeterminado para WhatsApp
  const whatsappMessage = 'Hola Julián, vi tu portafolio y me gustaría contactarte';
  // Genera el enlace de WhatsApp correctamente codificado
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="contact" className="contact-section">
      {/* Botón flotante de WhatsApp */}
      <a 
        href={whatsappLink} 
        className="whatsapp-float"
        target="_blank" 
        rel="noopener noreferrer nofollow"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>

      <div className="contact-container">
        <h2 className="contact-title">Contáct<span className="highlight">ame</span></h2>
        <p className="contact-subtitle">Estoy disponible por estos medios directos:</p>
        
        <div className="contact-methods-grid">
          {/* WhatsApp/Teléfono */}
          <div className="contact-card">
            <div className="contact-card-icon whatsapp-bg">
              <FaWhatsapp className="contact-icon" />
            </div>
            <div className="contact-card-content">
              <h3>WhatsApp/Teléfono</h3>
              <a href={whatsappLink} 
                 target="_blank" 
                 rel="noopener noreferrer nofollow" 
                 className="contact-link">
                {formattedPhone}
              </a>
              <p className="contact-note">Haz clic para enviar un mensaje directo</p>
            </div>
          </div>

          {/* Email */}
          <div className="contact-card">
            <div className="contact-card-icon email-bg">
              <FaEnvelope className="contact-icon" />
            </div>
            <div className="contact-card-content">
              <h3>Correo Electrónico</h3>
              <a href="mailto:julianlopezcastillo12@gmail.com" 
                 className="contact-link">
                julianlopezcastillo12@gmail.com
              </a>
            </div>
          </div>

          {/* GitHub */}
          <div className="contact-card">
            <div className="contact-card-icon github-bg">
              <FaGithub className="contact-icon" />
            </div>
            <div className="contact-card-content">
              <h3>GitHub</h3>
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