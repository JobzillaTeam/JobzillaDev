import React, { useContext } from 'react'
import { EDIT_DESIRED_PROFILE, EDIT_CAREER_PROFILE } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';

const DesiredProfileComponent = ({ showPopup }) => {
  const { state } = useContext(Context);
  //Getting Desired career profile data from fetchProfileInfo api from profileContext
  const [careerInfo, setCareerInfo] = React.useState('');
  state.then((data) => {
    setCareerInfo(data)
  })
  const { candidateInfo } = careerInfo;
  if (candidateInfo) {
    return (
      <div class="bg-white px-4 py-4 section-divider align-items-center">
        <div class="col">
          <div class="mb-4 ml-4">
            <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_CAREER_PROFILE, true)} />
            <span class="subtitle-semi-bold">Desired Career Profile</span>
          </div>
          <div class="row col-9 px-4">
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Employment Type</span></div>
              {(candidateInfo && candidateInfo.employmentType) ? <span class="small-text-light">{candidateInfo.employmentType}</span> : null}
            </div>
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Preferred Locations</span></div>
              {(candidateInfo && candidateInfo.preferredLocation) ? <span class="small-text-light">{candidateInfo.preferredLocation}</span> : null}
            </div>
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Preferred Shift</span></div>
              {(candidateInfo && candidateInfo.preferredShift) ? <div><span class="small-text-light">{candidateInfo.preferredShift}</span></div> : null}
            </div>
          </div>
        </div>
      </div>
    )
  } return null
}

export const DesiredProfile = React.memo(DesiredProfileComponent)