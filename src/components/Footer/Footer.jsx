import React from 'react';
import './FooterStyle.css';
import logoIcon from '../../assets/icons/logo.svg'; 
import instagramIcon from '../../assets/icons/social-instagram.svg';
import twitterIcon from '../../assets/icons/social-twitter.svg';
import youtubeIcon from '../../assets/icons/social-youtube.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <img src={logoIcon} alt="Logo" className="footer-logo" />
          <p className="footer-description">Takeaway & Delivery template for small - medium businesses.</p>
        </div>
       
        <div className="footer-links-section">
          <div className="footer-links-group">
            <p className="footer-heading">Company</p>
            <a href="#home">Home</a>
            <a href="#order">Order</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-links-group">
            <p className="footer-heading">Template</p>
            <a href="#style-guide">Style Guide</a>
            <a href="#changelog">Changelog</a>
            <a href="#licence">Licence</a>
            <a href="#university">Webflow University</a>
          </div>

          <div className="footer-links-group">
            <p className="footer-heading">Flowbase</p>
            <a href="#more-cloneables">More Cloneables</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Built by <a className="social-icon" href="#flowbase">Flowbase</a> · Powered by <a href="#webflow">Webflow</a></p>
        <div className="social-icons">
          <a className="social-icon-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a className="social-icon-link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" className="social-icon" />
          </a>
          <a className="social-icon-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="YouTube" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


