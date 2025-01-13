import React, { FC } from 'react';
import './App.css';
import MenuPage from './pages/MenuPage';
//HomePage LoginPage MenuPage
const App: FC = () => {
  return (
    <div className="App">
      <MenuPage />
    </div>
  );
};

export default App;
