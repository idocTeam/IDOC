import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredToken, getStoredUser } from '../../utils/session';

const ProtectedRoute = ({ children, roles = [] }) => {
  const token = getStoredToken();
  const user = getStoredUser();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
