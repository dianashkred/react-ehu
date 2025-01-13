import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomeMainSection from '../components/HomeMainSection/HomeMainSection';
import { useUser } from '../context/UserContext';

const HomePage: FC = () => {


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
    <>
      <Header cartCount={0} />
      <HomeMainSection />
      <Footer />
    </>
  );
};

export default HomePage;
