import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MenuContent from '../components/MenuContent/MenuContent';

const MenuPage = () => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(prevCartCount => prevCartCount + 1);
  };

  return (
    <div className="menu-page">
      <Header cartCount={cartCount} />
      <MenuContent addToCart={addToCart} />
      <Footer />
    </div>
  );
};

export default MenuPage;
