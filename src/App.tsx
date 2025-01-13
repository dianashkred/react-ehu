import React, { FC } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
//HomePage LoginPage MenuPage
const App: FC = () => {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
};

export default App;
