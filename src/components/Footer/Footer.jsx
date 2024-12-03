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
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Style Guide</a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Changelog</a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Licence</a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Webflow University</a>
          </div>
          <div className="footer-links-group">
            <p className="footer-heading">Flowbase</p>
            <a href="#more-cloneables">More Cloneables</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Built by <a href="#flowbase">Flowbase</a> · Powered by <a href="#webflow">Webflow</a>
        </p>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
