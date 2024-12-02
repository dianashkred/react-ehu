import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomeMainSection from '../components/HomeMainSection/HomeMainSection'; 

const HomePage = () => {
 
  return (
    <div>
      <Header  />
      <Main>
        <HomeMainSection />
      </Main>
      <Footer />
      </div>
  );
};    



export default HomePage;

const Main = styled.main`
  background-color: #f9f9f9;
`;
