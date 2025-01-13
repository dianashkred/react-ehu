import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MenuContent from '../components/MenuContent/MenuContent';
//import { useUser } from '../context/UserContext';
import { addToCart } from '../features/cart/cartSlice';


const MenuPage: FC = () => {
  //const dispatch = useDispatch();
 /* const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
  
  useEffect(() => {
    if (!isLoggedIn) {
      alert('You need to log in to access this page.');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Access denied. Please log in.</div>;
  }
*/
  /*const handleAddToCart = (id: string, quantity: number) => {
    dispatch(addToCart({ id, quantity }));
  };*/

  return (
    <div className="menu-page">
      <Header />
      <MenuContent />
      <Footer />
    </div>
  );
};

export default MenuPage;
