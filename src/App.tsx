import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
           <Route index element={<HomePage />} />
           <Route path="login" element={<LoginPage />} />
           <Route path="menu" element={<MenuPage />} />
           <Route element={<PrivateRoute />}>
             <Route path="order" element={<OrderPage />} />
           </Route>
         </Route>
       </Routes>
      </Router>
    </div>
  );
};

export default App;
