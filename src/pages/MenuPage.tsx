import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MenuContent from '../components/MenuContent/MenuContent';
import { useUser } from '../context/UserContext';


const MenuPage: FC = () => {
  
  const [cartCount, setCartCount] = useState<number>(0); 

  const handleAddToCart = (id: string, quantity: number) => {
    setCartCount((prevCount) => prevCount + quantity);
  };
  
  /*const { isLoggedIn } = useUser();
  useEffect(() => {
    if (!isLoggedIn) {
      alert('You need to log in to access this page.');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Access denied. Please log in.</div>;
  }*/

  

  return (
    <div className="menu-page">
      <Header cartCount={cartCount} />
      <MenuContent addToCart={handleAddToCart} />
      <Footer />
    </div>
  );
};

export default MenuPage;
