import React, { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { ThemeContext } from '../../context/ThemeContext';
import logoIcon from '../../assets/icons/logo.svg';
import cartIcon from '../../assets/icons/cart-icon.svg';
import ThemeToggle from "../ThemeToggle/ThemeToggle";


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 4rem;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const Logo = styled.img`
  height: 45px;
  padding-left: 30px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  margin-right: 100px;
  margin-left: auto;
`;
const NavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.isActive ? 'var(--text-color-turquoise)' : 'var(--text-color-header)')};  font-size: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-color-hover);
  }
`;

const Username = styled.span`
  color: var(--text-color-header);
  font-size: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const CartContainer = styled(Link)`
  position: relative;
  background-color: var(--text-color-turquoise);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &:hover {
    background-color: var(--button-bg-hover-color);
    transform: scale(1.1);

  }
`;

const CartIcon = styled.img`
  width: 25px;
  height: 17px;
  transform: scale(1.1);

`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: white;
  color: var(--text-color-turquoise);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
`;


const Header: FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const username = useSelector((state: RootState) => state.user.username);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <HeaderContainer>
      <Logo src={logoIcon} alt="Logo"/>
      <ThemeToggle />
      <Nav>
        <NavLink to="/" isActive={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/menu" isActive={location.pathname === '/menu'}>
          Menu
        </NavLink>
        <NavLink to="" isActive={false}>
          Company
        </NavLink>
        {isLoggedIn ? (
          <Username>{username}</Username>
        ) : (
          <NavLink to="/login" isActive={location.pathname === '/login'}>
            Login
          </NavLink>
        )}
      </Nav>
      <CartContainer to="/order">
        <CartIcon src={cartIcon} alt="Cart"/>
        <CartCount>{cartCount} </CartCount>
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;
