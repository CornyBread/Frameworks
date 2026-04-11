import React from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <h2 style={{ marginTop: 0, color: 'var(--accent-color)', textAlign: 'center' }}>Contacto Directo</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>
          ¿Tienes un proyecto en mente o quieres colaborar? Escríbeme directamente.
        </p>

        <div className="contact-info-container">
          <div className="contact-item">
            <span className="contact-label">Correo Electrónico</span>
            {/* Cambia esto por tu correo real */}
            <a href="mailto:davidesber7@gmail.com" className="contact-value">davidesber7@gmail.com</a>
          </div>
          
          <div className="contact-item">
            <span className="contact-label">Teléfono / WhatsApp</span>
            {/* Cambia esto por tu número real */}
            <span className="contact-value">+58 414-0665853</span>
          </div>
          
          <div className="contact-item">
            <span className="contact-label">Ubicación</span>
            <span className="contact-value">Maracaibo, Venezuela</span>
          </div>
        </div>

        <div className="social-links">
          <a href="https://github.com/CornyBread" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://instagram.com/davidesberr" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;