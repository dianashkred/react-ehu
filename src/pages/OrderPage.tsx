import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import OrderMainSection from '../components/Order/OrderMainSection';


const OrderPage: FC = () => {


  return (
    <div className="order-page">
      <Header />
      <OrderMainSection />
      <Footer />
    </div>
  );
};

export default OrderPage;