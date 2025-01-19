import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import logoIcon from '../../assets/icons/logo.svg';
import './HeaderStyle.css';


const Header: FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);

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
        <span className="cart-count">{cartCount}</span>
      </div>
    </header>
  );
};

export default Header;
