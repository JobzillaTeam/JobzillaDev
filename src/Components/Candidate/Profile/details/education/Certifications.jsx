import React, { useContext } from 'react'
import { EDIT_CERTIFICATE, ADD_NEW_CERTIFICATE } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';
import moment from 'moment';

export const Certifications = ({ showPopup }) => {
  const { state } = useContext(Context);
  //Getting Certifications data from fetchProfileInfo api from profileContext
  const [profileInfo, setProfileInfo] = React.useState('');
  state.then((data) => {
    setProfileInfo(data)
  })
  const { candidateCertificatesList } = profileInfo;
  const candidateCertificatesListSorted = candidateCertificatesList && candidateCertificatesList.sort((certA, certB) => {
    if (certA.issueYear && certB.issueYear) {
      const startMonthValue = certA.issueMonth ? parseInt(moment().month(certA.issueMonth).format("M")) - 1 : 0;
      const endMonthValue = certB.issueMonth ? parseInt(moment().month(certB.issueMonth).format("M")) - 1 : 0;
      const startDate = new Date(parseInt(certA.issueYear), startMonthValue).getTime();
      const endDate = new Date(parseInt(certB.issueYear), endMonthValue).getTime();
      return endDate - startDate;
    }
  });
  return (
    <div className="bg-white px-4 py-4 section-divider align-items-center">
      <div className="col">
        <div className="mb-4">
          <span className="subtitle-semi-bold ml-4">Certifications</span>
        </div>
        <div className="px-4 mb-3">
          {(candidateCertificatesListSorted) ? candidateCertificatesListSorted.map((data) => (
            <div className="col-12 px-0 py-3" key={data.certificationId}>
              <div>
                <img src="/images/Dashboard-assets/iconfinder_edit.svg" className="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_CERTIFICATE, true, { resourceId: data.certificationId })} />
                <span className="subtitle-semi-bold">{data.certificationName}</span>
              </div>
              <div><span className="normal-text-light">Issued on {data.issueMonth}{data.issueYear && data.issueMonth ? ' , ' : ''}{data.issueYear} | {data.expirationMonth || data.expirationYear ? `${data.expirationMonth} ${data.expirationMonth && data.expirationYear ? ' , ' : ''} ${data.expirationYear}` : 'No Expiration Date'}</span></div>
              {(data.credentialId) ? (<div><span className="normal-text-light">Credential ID {data.credentialId}</span></div>) : null}
              <a className="forgot_link" target="_blank" href={data.credentialURL}>{data.credentialURL}</a>
            </div>
          )) : null}
        </div>
        <div className="d-flex flex-row-reverse">
          <button className="btn btn-outline-info btn-add" onClick={() => showPopup(ADD_NEW_CERTIFICATE, true)}>Add</button>
        </div>
      </div>
    </div>
  )
}