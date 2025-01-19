import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomeMainSection from '../components/HomeMainSection/HomeMainSection';
//import { useUser } from '../context/UserContext';


const HomePage: FC = () => {
  /*const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      alert('You need to log in to access this page.');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Access denied. Please log in.</div>;
  }
*/
  return (
    <>
      <Header />
      <HomeMainSection />
      <Footer />
    </>
  );
};

export default HomePage;
