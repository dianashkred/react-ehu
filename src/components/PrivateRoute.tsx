import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}


const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" />;
};


export default PrivateRoute;
