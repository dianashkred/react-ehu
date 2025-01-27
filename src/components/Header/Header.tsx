import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import logoIcon from '../../assets/icons/logo.svg';
import cartIcon from '../../assets/icons/cart-icon.svg';


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 4rem;
  background-color: white;
`;

const Logo = styled.img`
  height: 45px;
  margin-right: auto;
  padding-left: 30px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  margin-right: 100px;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.isActive ? '#35b8be' : '#28224b')};  font-size: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #35b8be;
  }
`;

const Username = styled.span`
  color: #28224b;
  font-size: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const CartContainer = styled(Link)`
  position: relative;
  background-color: #35b8be;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const CartIcon = styled.img`
  width: 25px;
  height: 17px;
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: white;
  color: #35b8be;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const Header: FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const username = useSelector((state: RootState) => state.user.username);
  const location = useLocation();

  return (
    <HeaderContainer>
        <Logo  src={logoIcon} alt="Logo"/>
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
