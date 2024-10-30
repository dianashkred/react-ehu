import React from 'react';
import logoIcon from '../../assets/icons/logo.svg';
import './HeaderStyle.css';

const Header = () => {
  return (
    <header className="header">
      <img src={logoIcon} alt="Logo" className="header-logo" />

      <nav className="header-nav">
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#company">Company</a>
        <a href="#login">Login</a>
      </nav>
      
      <div className="header-cart">
        <i className="cart-icon"></i>
        <span className="cart-count">0</span>
      </div>
    </header>
  );
};

export default Header;


