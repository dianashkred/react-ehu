import React from 'react';
//import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomeMainSection from '../components/HomeMainSection/HomeMainSection'; 

const HomePage = () => {
  const [cartCount] = useState(0);
  return (
    //<HomePage>
    <div>
      <Header cartCount={cartCount} />
      <Main>
        <HomeMainSection />
      </Main>
      <Footer />
      </div>
   //</HomePage>
  );
};    



export default HomePage;

/*const Main = styled.main`
  background-color: #f9f9f9;
`;*/
