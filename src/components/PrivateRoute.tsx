import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';



const PrivateRoute:FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const location = useLocation();


  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return  <Outlet />;
};

export default PrivateRoute;
