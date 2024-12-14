import React, { FC, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MenuContent from '../components/MenuContent/MenuContent';

const MenuPage: FC = () => {
  const [cartCount, setCartCount] = useState<number>(0); // Указываем тип состояния

  const addToCart = () => {
    setCartCount((prevCartCount) => prevCartCount + 1);
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
