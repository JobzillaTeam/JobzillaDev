import React from 'react';
import ApiServicesOrg from '../../../Services/ApiServicesOrg';
import { useHistory } from "react-router-dom";

const TermsCandidate = ({ showPopup, setTemplateName }) => {
  let history = useHistory();
  const apiServicesOrg = new ApiServicesOrg();
  const handleOnDecline = e => {
    showPopup(false);
    history.replace({ pathname: "/logout" })
  }
  const handleOnAccepted = e => {
    apiServicesOrg.updateAcceptedTC().then(Response => {
      const acceptedTC = Response && Response.data && Response.data.responseObject && Response.data.responseObject.acceptedTC
      if (acceptedTC) {
        localStorage.setItem('acceptedTC', true)
        showPopup(false);
        setTemplateName('CHANGE_PASSWORD')
        setTimeout(() => {
          showPopup(true);
        }, 200)
      }
    }
    ).catch(
      err => console.log(err)
    );
  }
  return (
    <React.Fragment>
      <p className="modal-body-title">
        By choosing to visit and/or avail any Services provided by ECOSS, you agree that:
      </p>
      <ul>
        <li className="modal-body-content">You hereby expressly grant a consent to use and share your personal information to third parties for the purpose of availing the services under this website.</li>
        <li className="pt-4 modal-body-content">We reserve the right to use or disclose your Personal Information and/ or resume to any of potential recruiter’s/ training company/psychometric test company etc.</li>
        <li className="pt-4 modal-body-content">We may share your personal information with third party service providers to perform certain processing activities on our behalf, such as Parties involved in enabling our Services.</li>
        <li className="pt-4 modal-body-content">You have the right to provide Personal Information to us and may change that decision at any time.</li>
        <li className="pt-4 modal-body-content">We will only use your personal data in a fair and reasonable manner</li>
        <li className="pt-4 modal-body-content">Your Personal Information will not be retained by ECOSS any longer than it is necessary for the purposes for which the Personal Information is processed and/or in accordance with legal, regulatory, contractual or statutory obligations as applicable.</li>
        <li className="pt-4 modal-body-content">If you do not agree to the above terms, promptly exit this page and stop accessing the Services.</li>
      </ul>
      <div className="pt-4">
        <button className="btn lightBlue float-right" onClick={handleOnAccepted}>Accept</button>
        <button className="btn btn-outline-info btn-outline-button float-right mr-4" onClick={handleOnDecline}>Decline</button>
      </div>
    </React.Fragment>
  )
}

export default TermsCandidate;