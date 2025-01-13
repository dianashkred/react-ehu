import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const LoginPage: FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);


  return (
    <>
      <Header/> 
      <Login/>
      <Footer />
    </>
  );
};

export default LoginPage;
