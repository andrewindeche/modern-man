import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const SocialSection = () => (
  <section className="social-section">
    <h2 className="section-title">Follow Us</h2>
    <p className="section-subtitle">Stay connected on social media</p>
    <div className="social-icons">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
    </div>
  </section>
);

export default SocialSection;