import React from 'react';
import './RSVPPopup.css';

const RSVPPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>×</button>
        <h2 className="popup-title">RSVP Confirmation</h2>
        <p className="popup-message">
          Please WhatsApp Sharvs or Apala to confirm your attendance!
        </p>
        <div className="popup-contacts">
          <div className="popup-contact">
            <span className="popup-contact-name">Sharvs or Apala</span>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="popup-whatsapp-button"
            >
              <span className="popup-whatsapp-icon">📱</span>
              Open WhatsApp ↗
            </a>
          </div>
        </div>
        <button className="popup-ok-button" onClick={onClose}>
          OK, Got it!
        </button>
      </div>
    </div>
  );
};

export default RSVPPopup;
