import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children?: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const location = useLocation();


  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
