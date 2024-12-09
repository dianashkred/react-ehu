import React from 'react';
import './Button.css';

const Button = ({ label, isActive = true, onClick, style }) => {
  return (
    <button
      className={`button ${!isActive ? 'inactive' : ''}`}
      onClick={isActive ? onClick : undefined}
      disabled={!isActive}
      style={style}
    >
      {label}
    </button>
  );
};

export default Button;
