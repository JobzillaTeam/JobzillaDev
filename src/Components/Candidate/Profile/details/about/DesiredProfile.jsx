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
      <div className="bg-white px-4 py-4 section-divider align-items-center">
        <div className="col">
          <div className="mb-4 ml-4">
            <img src="/images/Dashboard-assets/iconfinder_edit.svg" className="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_CAREER_PROFILE, true)} />
            <span className="subtitle-semi-bold">Desired Career Profile</span>
          </div>
          <div className="row col-9 px-4">
            <div className="col-4 mb-4">
              <div><span className="font-weight-bold">Employment Type</span></div>
              {(candidateInfo && candidateInfo.employmentType) ? <span className="small-text-light">{candidateInfo.employmentType}</span> : null}
            </div>
            <div className="col-4 mb-4">
              <div><span className="font-weight-bold">Preferred Locations</span></div>
              {(candidateInfo && candidateInfo.preferredLocation) ? <span className="small-text-light">{candidateInfo.preferredLocation}</span> : null}
            </div>
            <div className="col-4 mb-4">
              <div><span className="font-weight-bold">Preferred Shift</span></div>
              {(candidateInfo && candidateInfo.preferredShift) ? <div><span className="small-text-light">{candidateInfo.preferredShift}</span></div> : null}
            </div>
          </div>
        </div>
      </div>
    )
  } return null
}

export const DesiredProfile = React.memo(DesiredProfileComponent)