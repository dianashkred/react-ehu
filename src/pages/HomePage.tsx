import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomeMainSection from '../components/HomeMainSection/HomeMainSection';

const HomePage: FC = () => {
  return (
    <>
      <Header cartCount={0} />
      <HomeMainSection />
      <Footer />
    </>
  );
};

export default HomePage;
