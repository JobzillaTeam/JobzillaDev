import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppHelper } from '../Utils/AppHelper';

const AuthLayoutView = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

const AuthLayout = ({ component: Component, ...rest }) => {
  const isLoggedIn = AppHelper.isLoggedIn(null, false);
  if (isLoggedIn && localStorage.getItem('userRole') === 'candidate_role') {
    return <Redirect to="/candidate/dashboard" />
  } else if (isLoggedIn && localStorage.getItem('userRole') === 'Owner') {
    return <Redirect to="/providerDashboard" />
  } else {
    return (
      <Route {...rest} render={matchProps => (
        <AuthLayoutView>
          <Component {...matchProps} />
        </AuthLayoutView>
      )} />
    )
  }
  
};

export default AuthLayout;