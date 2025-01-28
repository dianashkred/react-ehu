import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";

const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  margin-left: 70px;
  padding: 10px;
`;

const ToggleSwitch = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + div {
    background-color: var(--button-bg-hover-color);
  }

  &:checked + div::before {
    transform: translateX(26px);
  }
`;

const Slider = styled.div`
  width: 50px;
  height: 24px;
  background-color: var(--button-bg-color);
  border-radius: 12px;
  position: relative;
  transition: background-color 0.3s;

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.3s;
  }
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleWrapper>
      <span>{theme === "light" ? "☀️" : "🌙"}</span>
      <ToggleSwitch type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
      <Slider />
    </ToggleWrapper>
  );
};

export default ThemeToggle;
