import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login';

const LoginPage: FC = () => {
  return (
    <>
      <Header cartCount={0} /> {/* Указываем cartCount явно */}
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
