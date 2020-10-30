import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TermsCandidate from '../Components/CommonComp/DashboardComp/TermsCandidate';
import Popup from '../Components/CommonComp/Popup';
import { AppHelper } from '../Utils/AppHelper';


const CandidateLayoutView = ({ children }) => {
  const [isPopupVisible, setPopupVisible] = React.useState(false);
  React.useEffect(() => {
    const acceptedTC = localStorage.getItem('acceptedTC')?.toLowerCase() === "true" ? true : false
    if (!acceptedTC) {
      setPopupVisible(true);
    }
  }, []);
  const showPopup = (isVisible) => {
    setPopupVisible(isVisible);
  }
  return (
    <React.Fragment>
      {isPopupVisible ? <Popup
        hideCloseButton={true}
        showPopup={showPopup}
        size="xl"
        title="Terms & Conditions"
        body={<TermsCandidate showPopup={showPopup} />}
      /> : null}
      {children}
    </React.Fragment>
  );
}

const CandidateLayout = ({ component: Component, ...rest }) => {
  const isLoggedIn = AppHelper.isLoggedIn('candidate');

  return (
    <React.Fragment>
    {
      isLoggedIn ? <Route {...rest} render={matchProps => (
        <CandidateLayoutView>
          <Component {...matchProps} />
        </CandidateLayoutView>
      )} /> : <Redirect to="/login" />
    }
    </React.Fragment>
  )
};

export default CandidateLayout;