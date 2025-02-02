import React, { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


interface ButtonProps {
  label: string;
  isActive?: boolean;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  variant?: 'primary' | 'transparent';
}

interface StyledButtonProps {
  $variant: 'primary' | 'transparent';
}


const StyledButton = styled.button<StyledButtonProps>`
  width: 140px;
  height: 52px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: var(--button-bg-color);
  color: var(--button-ac-text-color);
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.36px;
  transition: background-color 0.3s;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
      background-color: var(--button-bg-color);
      color: var(--button-ac-text-color);
      &:hover {
        background-color: var(--button-bg-hover-color);
      } `
      : `
      background-color: transparent;
      border: 1px solid var(--border-botton-inac);
      color: var(--button-inac-text-color);
      &:hover {
        background-color: var(--button-bg-hover-color);
      }
    `}

  &.inactive {
    background-color: transparent;
    border: 1px solid var(--border-botton-inac);
    color: var(--button-inac-text-color);
    cursor: not-allowed;
  } `;

const Button: FC<ButtonProps> = ({ label, isActive = true, to, onClick, style, variant = 'primary' }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick(e);
    }
  };
  return (
    <StyledButton
      className={!isActive ? 'inactive' : ''}
      onClick={isActive ? handleClick : undefined}
      disabled={!isActive}
      style={style}
      $variant={variant} 
    >
      {label}
    </StyledButton>
  );
};

export default Button;
