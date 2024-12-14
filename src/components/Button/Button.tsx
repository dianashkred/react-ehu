import React, { CSSProperties, FC } from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
  style?: CSSProperties;
  className?: string;
}

const Button: FC<ButtonProps> = ({ label, isActive = true, onClick, style }) => {
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
