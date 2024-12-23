import React, { FC } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getUserCheckStatus,
  getUserData
} from '../../services/slices/user/index';
import { Preloader } from '../ui/preloader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const user = useSelector(getUserData);
  const checkUserStatus = useSelector(getUserCheckStatus);
  const location = useLocation();

  if (!checkUserStatus) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }

  return <>{children}</>;
};
