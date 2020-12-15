import React, { Component, useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ChangePassword from '../Components/Candidate/ChangePassword';
import ChangePasswordPopup from '../Components/Candidate/ChangePasswordPopup';
import TermsCandidate from '../Components/CommonComp/DashboardComp/TermsCandidate';
import Popup from '../Components/CommonComp/Popup';
import { AppHelper } from '../Utils/AppHelper';
import { Toast } from 'primereact/toast';


const CandidateLayoutView = ({ children }) => {
  const toast = useRef(null);
  const [isPopupVisible, setPopupVisible] = React.useState(false);
  const [templateName, setTemplateName] = React.useState('TERMS_AND_CONDITIONS');
  React.useEffect(() => {
    const acceptedTC = localStorage.getItem('acceptedTC')?.toLowerCase() === "true" ? true : false
    if (!acceptedTC) {
      setPopupVisible(true);
    }
  }, []);
  const showPopup = (isVisible) => {
    setPopupVisible(isVisible);
  }
  
  const RenderTermsAndConditionPopup = () => {
    return (
      <Popup
        hideCloseButton={true}
        showPopup={showPopup}
        size="xl"
        title="Terms & Conditions"
        body={<TermsCandidate showPopup={showPopup} setTemplateName={setTemplateName} />}
      />
    );
  }
  const RenderChangePasswordPopup = () => {
    return (
      <Popup
        showPopup={showPopup}
        size="md"
        title="Change Password"
        body={<ChangePasswordPopup showPopup={showPopup} toast={toast} />}
      />
    );
  }
  const getTemplate = () => {
    switch(templateName) {
      case 'CHANGE_PASSWORD': {
        return <RenderChangePasswordPopup />;
      }
      case 'TERMS_AND_CONDITIONS': {
        return <RenderTermsAndConditionPopup />
      }
    }
  }
  return (
    <React.Fragment>
      <Toast className="toast_padding" ref={toast} />
      {isPopupVisible ? getTemplate() : null}
      {children}
    </React.Fragment>
  );
}

const CandidateLayout = ({ component: Component, ...rest }) => {
  const isLoggedIn = AppHelper.isLoggedIn('candidate', true);
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