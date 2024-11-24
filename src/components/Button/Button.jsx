import React from 'react';
import './Button.css';

const Button = ({ label, isActive = true, onClick }) => {
  return (
    <button
      className={`button ${!isActive ? 'inactive' : ''}`}
      onClick={isActive ? onClick : undefined}
      disabled={!isActive}
    >
      {label}
    </button>
  );
};

export default Button;
