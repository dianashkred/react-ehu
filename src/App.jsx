import React from 'react';
import MenuPage from './pages/MenuPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MenuPage />
      <Footer />

    </div>
  );
}

export default App;

