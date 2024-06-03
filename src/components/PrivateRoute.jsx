import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, user, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        user ? <Element /> : <Navigate to="/login" replace state={{ from: rest.location }} />
      }
    />
  );
};

export default ProtectedRoute;
