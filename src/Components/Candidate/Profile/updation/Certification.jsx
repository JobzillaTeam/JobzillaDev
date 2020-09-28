import React, { useContext } from 'react';
import ApiServicesOrgCandidate from '../../../../Services/ApiServicesOrgCandidate';
import { Context } from '../../../../Context/ProfileContext';
import { MONTH_NAMES } from '../../../../Utils/AppConst';

const Certification = ({ dataAttributes }) => {
  const [inputData, setFormInputData] = React.useState({ certificationName: '', issuingOrganization: '', issueMonth: '', issueYear: '', expirationMonth: '', expirationYear: '', credentialId: '', credentialURL: '' })
  const [certificationInfo, setCertificationInfo] = React.useState('');
  const [isExpirationDate, setIsExpirationDate] = React.useState(true)
  const { state } = useContext(Context);
  const resourceId = dataAttributes && dataAttributes.resourceId;
  React.useEffect(() => {
    state.then((response) => {
      if (response && response.candidateCertificatesList) {
        const certificationInfoObject = response.candidateCertificatesList.filter(certificate => {
          return certificate.certificationId === resourceId
        })[0]
        setCertificationInfo(certificationInfoObject)
      }
    })
  }, []);
  React.useEffect(() => {
    if (resourceId && certificationInfo) {
      const { certificationName, issuingOrganization, issueMonth, issueYear, expirationMonth, expirationYear, credentialId, credentialURL } = certificationInfo;
      console.log(resourceId)
      setFormInputData({
        certificationName: certificationName,
        issuingOrganization: issuingOrganization,
        issueMonth: issueMonth,
        issueYear: issueYear,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        credentialId: credentialId,
        credentialURL: credentialURL
      });
    }
  }, [certificationInfo]);
  const handleFormInputData = (e) => {
    return (
      setFormInputData({
        ...inputData,
        [e.target.name]: e.target.value
      })
    )
  }
  const handleSubmit = (e) => {
    // e.preventDefault();
    let data = {
      "certificationName": inputData.certificationName,
      "issuingOrganization": inputData.issuingOrganization,
      "issueMonth": inputData.issueMonth,
      "issueYear": inputData.issueYear,
      "expirationMonth": inputData.expirationMonth,
      "expirationYear": inputData.expirationYear,
      "credentialId": inputData.credentialId,
      "credentialURL": inputData.credentialURL
    }
    if (resourceId) {
      ApiServicesOrgCandidate.updateCertification({ ...data, certificationId: resourceId });
    } else {
      ApiServicesOrgCandidate.addCertification(data);
    }
  }

  return (
    <>
      <form>
        <div class="mb-4">
          <div className="form-group">
            <label htmlFor="certificationName">Certification Name</label>
            <input class="form-control" type="text"
              name="certificationName"
              value={inputData.certificationName}
              onChange={(e) => handleFormInputData(e)} placeholder="Enter Certification Name" />
          </div>
          <div className="form-group">
            <label htmlFor="issuingOrganization">Issuing Organization</label>
            <input class="form-control" type="text"
              name="issuingOrganization"
              value={inputData.issuingOrganization}
              onChange={(e) => handleFormInputData(e)} placeholder="Enter Issuing Organization" />
          </div>

          <div class="custom-control custom-checkbox mr-sm-2">
            <input type="checkbox" class="custom-control-input" id="customControlAutosizing" onChange={() => setIsExpirationDate(!isExpirationDate)} />
            <label class="custom-control-label" for="customControlAutosizing">This credentials does not expire</label>
          </div>

          <label htmlFor="University" class="mt-2">Issue Date</label>
          <div className="form-group">
            <div class="form-row">
              <div className="col mr-3">
                <select id="issueMonth" className="form-control" name="issueMonth" value={inputData.issueMonth} onChange={(e) => handleFormInputData(e)}>
                  {Array(50).fill().map((_, i) => (
                    <option key={`${i}_years`}>{parseInt(new Date().getFullYear()) - i}</option>
                  ))}
                </select>
              </div>
              <div className="col ml-3">
                <select id="issueYear" className="form-control" name="issueYear" value={inputData.issueYear} onChange={(e) => handleFormInputData(e)}>
                  {MONTH_NAMES.map((monthName, i) => (
                    <option key={`monthName`}>{monthName}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {isExpirationDate ? <div> <label htmlFor="University">Expiration Date</label>
            <div className="form-group">
              <div class="form-row">
                <div className="col mr-3">
                  <select id="expirationMonth" className="form-control" name="expirationMonth" value={inputData.expirationMonth} onChange={(e) => handleFormInputData(e)}>
                    {Array(100).fill().map((_, i) => (
                      <option key={`${i}_years`}>{(parseInt(new Date().getFullYear()) + 50) - i
                      }  </option>
                    ))}
                  </select>
                </div>
                <div className="col ml-3">
                  <select id="expirationYear" className="form-control" name="expirationYear" value={inputData.expirationYear} onChange={(e) => handleFormInputData(e)}>
                    {MONTH_NAMES.map((monthName, i) => (
                      <option key={`monthName`}>{monthName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div></div> : <div class="col text-right mt-2 px-0">
              <span class="small-text-light ">This certification does not expire</span>
            </div>}
          <div className="form-group">
            <label htmlFor="credentialId">Credential ID</label>
            <input class="form-control" type="text"
              name="credentialId"
              value={inputData.credentialId}
              onChange={(e) => handleFormInputData(e)} placeholder="Enter Credential ID" />
          </div>
          <div className="form-group">
            <label htmlFor="credentialURL">Credential URL</label>
            <input class="form-control" type="text"
              name="credentialURL"
              value={inputData.credentialURL}
              onChange={(e) => handleFormInputData(e)} placeholder="Enter Credential URL" />
          </div>

        </div>
        <button class="btn lightBlue float-right px-5" onClick={handleSubmit}>Save</button>
      </form>
    </>
  );
}
export default Certification