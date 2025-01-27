import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login';


const LoginPage: FC = () => {

  return (
    <div className="login-page"> 
      <Header/> 
      <Login/>
      <Footer />
    </div>
  );
};

export default LoginPage;
