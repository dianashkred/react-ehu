import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const { label, isActive = true, onClick } = this.props;
    return (
      <button
        className={`button ${!isActive ? 'inactive' : ''}`}
        onClick={isActive ? onClick : undefined}
        disabled={!isActive}
      >
        {label}
      </button>
    );
  }
}

export default Button;
