import React, { useContext } from 'react'
import { EDIT_PERSONAL } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';
import moment from 'moment';


const PersonalDetailsComponent = ({ showPopup }) => {
  const { state } = useContext(Context);
  const [personalInfo, setPersonalInfo] = React.useState('');
  state.then((data) => {
    setPersonalInfo(data)
  })
  const { candidateInfo } = personalInfo;
  return (
    <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_PERSONAL, true)} />
          <img src="/images/Dashboard-assets/profile-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">Personal Details</span>
        </div>
        <div class="row col-9 px-4">
          <div class="col-4 mb-4">
            <div><span class="font-weight-bold">Date of Birth</span></div>
            {(candidateInfo && candidateInfo.dob) ? <div><span class="small-text-light">{moment(candidateInfo.dob).format('DD MMMM YYYY')}</span></div> : null}
          </div>
          <div class="col-4 mb-4">
            <div><span class="font-weight-bold">Gender</span></div>
            {(candidateInfo && candidateInfo.gender==="male") ? <div><span class="small-text-light">Male</span></div> : <div><span class="small-text-light">Female</span></div>}
          </div>
          <div class="col-4">
            <div><span class="font-weight-bold">Marital Status</span></div>
            {(candidateInfo && candidateInfo.maritalStatus) ? <div><span class="small-text-light">{candidateInfo.maritalStatus}</span></div> : null}
          </div>
          <div class="col-4 mb-4">
            <div><span class="font-weight-bold">Address</span></div>
            {(candidateInfo && candidateInfo.address) ? <div><span class="small-text-light">{candidateInfo.address}</span></div> : null}
          </div>
          <div class="col-4">
            <div><span class="font-weight-bold">Passport ID</span></div>
            {(candidateInfo && candidateInfo.passportId) ? <div><span class="small-text-light">{candidateInfo.passportId}</span></div> : null}
          </div>
          <div class="col-4">
            <div><span class="font-weight-bold">Work Permit</span></div>
            {(candidateInfo && candidateInfo.workPermit) ? <div><span class="small-text-light">{candidateInfo.workPermit}</span></div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export const PersonalDetails = React.memo(PersonalDetailsComponent)