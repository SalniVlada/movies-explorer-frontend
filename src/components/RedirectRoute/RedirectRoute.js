import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return rest.isRedirect === true ? (
          <Redirect to={rest.redirectPath} />
        ) : (
          children
        );
      }}
    />
  );
};

export default RedirectRoute;