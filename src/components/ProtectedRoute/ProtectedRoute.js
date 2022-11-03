import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return rest.loggedIn ? (
          children
        ) : (
          rest.loggedIn == null ? '' : <Redirect to="/" />
        );
      }}
    />
  );
};

export default ProtectedRoute;