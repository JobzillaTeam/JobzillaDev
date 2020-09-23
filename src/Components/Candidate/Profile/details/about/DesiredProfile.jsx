import React, { useContext } from 'react'
import { EDIT_DESIRED_PROFILE, EDIT_CAREER_PROFILE } from '../../../../../Utils/AppConst'
import ProfileContext from '../../../../../Context/ProfileContext';

export const DesiredProfile = ({ showPopup, }) => {
  const profileInfo = useContext(ProfileContext);
  if (profileInfo.candidateInfo) {
    const { employmentType, preferredLocation, preferredShift } = profileInfo.candidateInfo;
    return (
      <div class="bg-white px-4 py-4 section-divider align-items-center">
        <div class="col">
          <div class="mb-4 ml-4">
            <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right" alt="Cinque Terre" onClick={() => showPopup(EDIT_CAREER_PROFILE, true)} />
            <span class="subtitle-semi-bold">Desired Career Profile</span>
          </div>
          <div class="row col-9 px-4">
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Employment Type</span></div>
              {(employmentType) ? <span class="small-text-light">{employmentType}</span> : null}
            </div>
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Preferred Locations</span></div>
              <span class="small-text-light">{preferredLocation}</span>
            </div>
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Preferred Shift</span></div>
              <div><span class="small-text-light">{preferredShift}</span></div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}