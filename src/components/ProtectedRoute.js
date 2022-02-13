import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/user-auth-context';
const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;
