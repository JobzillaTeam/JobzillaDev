import React from 'react'
import { EDIT_PROFILE_NAME } from '../../../../../Utils/AppConst'
import RenderLoader from '../../../../CommonComp/Loader';

const InformationComponent = ({ showPopup, candidateProfile }) => {
  if (candidateProfile) {
    const { candidateInfo } = candidateProfile;
    const { firstName, lastName, currentRole, company, address, mobileNumber, emailId } = candidateInfo;
    return (
      <div class="bg-white pl-3 pr-5 py-5 section-divider align-items-center">
        <div class="row align-items-center">
          <div class="col col-md-3 col-xs-12 align-items-center">
            <img src="/images/Dashboard-assets/candidate/profile-pic.png" class="rounded-circle" alt="usera avatar" />
          </div>
            <div class="col col-md-9 col-xs-12 align-items-center">
              <div>
              <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right" alt="Cinque Terre" onClick={() => showPopup(EDIT_PROFILE_NAME, true)} />
                <h3 class="mb-2">{firstName} {lastName}</h3>
              </div>
              <span class="visible-lg-inline">{currentRole} at {company}</span>
              <hr class="mb-4" />
              <div class="row">
                <div class="col col-md-4 col-xs-12">
                  <img src="/images/Dashboard-assets/candidate/location.png" alt="Cinque Terre" />
                  <span class="normal-text-medium mgl-10">{address}</span>
                </div>
                <div class="col col-md-4 col-xs-12">
                  <img src="/images/Dashboard-assets/candidate/mobile.png" alt="Cinque Terre" />
                  <span class="normal-text-medium mgl-10">{mobileNumber}</span>
                </div>
                <div class="col col-md-4 col-xs-12">
                  <img src="/images/Dashboard-assets/candidate/message.png" alt="Cinque Terre" />
                  <span class="normal-text-medium mgl-10">{emailId}</span>
                </div>
              </div>
              <div class="col-9 pl-0">
                <div class="progress progress-fashion">
                  <div class="progress-bar bg-success" role="progressbar" style={{ width: '80%' }} aria-valuenow="80%" aria-valuemin="0" aria-valuemax="100">80%</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
  return <RenderLoader />
}
export const Information = React.memo(InformationComponent)