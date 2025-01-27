import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MenuContent from '../components/MenuContent/MenuContent';


const MenuPage: FC = () => {

  return (
    <div className="menu-page">
      <Header />
      <MenuContent />
      <Footer />
    </div>
  );
};

export default MenuPage;
