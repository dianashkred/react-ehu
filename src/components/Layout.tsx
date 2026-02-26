import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styled from 'styled-components';


const Layout: FC = () => {
  return (
    <>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout;

const MainContent = styled.main`
  padding-top: 80px; 
`;