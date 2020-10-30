import React from 'react';
import { Route } from 'react-router-dom';

const OrganizationLayoutView = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

const OrganizationLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <OrganizationLayoutView>
        <Component {...matchProps} />
      </OrganizationLayoutView>
    )} />
  )
};

export default OrganizationLayout;