import React, { useContext } from 'react';
import ApiServicesOrgCandidate from '../../../../Services/ApiServicesOrgCandidate';
import { Context } from '../../../../Context/ProfileContext';
import { useForm } from "react-hook-form";

const CTC = ({ showPopup }) => {
  const [inputData, setFormInputData] = React.useState({ currentCtcInLakh: '', currentCtcInThousand: '', expectedCtcInLakh: '', expectedCtcInThousand: '', currencyType: '' })
  const [candidateProfile, setCandidateProfile] = React.useState('');
  const { state, getProfileInfo } = useContext(Context);
  const { register, errors, handleSubmit } = useForm({mode: 'all'});

  React.useEffect(() => {
    state.then((response) => {
      setCandidateProfile(response)
    })
  }, []);

  React.useEffect(() => {
    if (candidateProfile && candidateProfile.candidateInfo) {
      const { currencyType, currentCTC, expectedCTC, } = candidateProfile.candidateInfo;
      setFormInputData({
        currencyType: currencyType,
        currentCtcInLakh: currentCTC && parseFloat(currentCTC).toFixed(2).split('.')[0],
        currentCtcInThousand: currentCTC && parseFloat(currentCTC).toFixed(2).split('.')[1],
        expectedCtcInLakh: expectedCTC && parseFloat(expectedCTC).toFixed(2).split('.')[0],
        expectedCtcInThousand: expectedCTC && parseFloat(expectedCTC).toFixed(2).split('.')[1]
      });
    }
  }, [candidateProfile]);
  const handleFormInputData = (e) => {
    return (
      setFormInputData({
        ...inputData,
        [e.target.name]: e.target.value
      })
    )
  }
  const onSubmit = (e) => {
    // e.preventDefault();
    const candidateId = localStorage.getItem('candidateId')
    let data = {
      "currencyType": inputData.currencyType,
      "currentCTC": `${inputData.currentCtcInLakh}.${inputData.currentCtcInThousand}`,
      "expectedCTC": `${inputData.expectedCtcInLakh}.${inputData.expectedCtcInThousand}`,
      "candidateId": candidateId
    }
    console.log(data)
    ApiServicesOrgCandidate.updateProfileInfo(data, getProfileInfo, showPopup);
  }
  console.log('inputData', inputData)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="mb-4">
          <div className="form-group">
            <div>
              <div class={inputData.currencyType === 'INR' ? "modal-label form-check form-check-inline" : "modal-label form-check form-check-inline modal-fade"}>
                <input
                  type="radio"
                  class="form-check-input"
                  id="currencyType"
                  name="currencyType"
                  value="INR"
                  checked={inputData.currencyType === 'INR'}
                  onChange={handleFormInputData}
                />
                <label class="radio-inline form-check-label" for="materialChecked2">INR</label>
              </div>
              <div class={inputData.currencyType === 'USD' ? "modal-label form-check form-check-inline" : "modal-label form-check form-check-inline modal-fade"}>
                <input
                  type="radio"
                  class="form-check-input"
                  id="currencyType"
                  name="currencyType"
                  value="USD"
                  checked={inputData.currencyType === 'USD'}
                  onChange={handleFormInputData}
                />
                <label class="radio-inline form-check-label" for="materialChecked3">USD</label>
              </div>
            </div>
          </div>
          <label htmlFor="University">Current Salary</label>
          <div className="form-group">
            <div class="form-row">
              <div className="col mr-4">
                <select id="currentCtcInLakh" name="currentCtcInLakh" value={inputData.currentCtcInLakh} onChange={(e) => handleFormInputData(e)} className="form-control" >
                  {Array(40).fill().map((_, i) => (
                    <option>{i}</option>
                  ))}
                </select>
                <label class="w-100 text-right small-text-light mt-2" htmlFor="University">Lakhs</label>
              </div>
              <div className="col  ml-4">
                <select id="currentCtcInThousand" className="form-control" name="currentCtcInThousand" value={inputData.currentCtcInThousand} onChange={(e) => handleFormInputData(e)} >
                  {Array(11).fill().map((_, i) => (
                    <option value={i * 5}>{i * 5}</option>
                  ))}
                  {/* <option value={"00"}>0</option>
                  <option value={"05"}>5</option>
                  <option value={"10"}>10</option>
                  <option value={"15"}>15</option> */}
                </select>
                <label class="w-100 text-right small-text-light mt-2" htmlFor="University">Thousand</label>
              </div>
            </div>
          </div>
          <label htmlFor="University">Expected Salary</label>
          <div className="form-group">
            <div class="form-row">
              <div className="col mr-4">
                <select id="expectedCtcInLakh" className="form-control" name="expectedCtcInLakh" value={inputData.expectedCtcInLakh} onChange={(e) => handleFormInputData(e)} >
                  {Array(40).fill().map((_, i) => (
                    <option>{i}</option>
                  ))}
                </select>
                <label class="w-100 text-right small-text-light mt-2" htmlFor="University">Lakhs</label>
              </div>
              <div className="col ml-4">
                <select id="expectedCtcInThousand" className="form-control" name="expectedCtcInThousand" value={inputData.expectedCtcInThousand} onChange={(e) => handleFormInputData(e)} >
                  {Array(11).fill().map((_, i) => (
                    <option value={i * 5}>{i * 5}</option>
                  ))}
                  {/* <option value={"00"}>0</option>
                  <option value={"05"}>5</option>
                  <option value={"10"}>10</option>
                  <option value={"15"}>15</option> */}
                </select>
                <label class="w-100 text-right small-text-light mt-2" htmlFor="University">Thousand</label>
              </div>
            </div>
          </div>
        </div>

        <button class="btn lightBlue float-right px-5">Save</button>
      </form>
    </>
  );
}
export default CTC