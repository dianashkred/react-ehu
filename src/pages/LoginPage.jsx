import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login';


const LoginPage = () => {
  return (
    <>
      <Header cartCount={0} />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
