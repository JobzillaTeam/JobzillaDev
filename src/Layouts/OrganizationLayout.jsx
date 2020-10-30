import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppHelper } from '../Utils/AppHelper';

const OrganizationLayoutView = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

const OrganizationLayout = ({ component: Component, ...rest }) => {
  const isLoggedIn = AppHelper.isLoggedIn('organization', true);
  return (
    <React.Fragment>
    {
      isLoggedIn ? <Route {...rest} render={matchProps => (
        <OrganizationLayoutView>
          <Component {...matchProps} />
        </OrganizationLayoutView>
      )} /> : <Redirect to="/login" />
    }
    </React.Fragment>
  )
};

export default OrganizationLayout;