import React, { useContext } from 'react'
import { EDIT_PROFILE_NAME, EDIT_ABOUT } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';

const AboutComponent = ({ showPopup }) => {
  //Getting about data from fetchProfileInfo api from profileContext
  const { state } = useContext(Context);
  const [about, setAbout] = React.useState('');
  state.then((data) => {
    setAbout(data.candidateInfo.about)
  })
  return (
    <div className="bg-white px-4 py-4 section-divider align-items-center">
      <div className="col">
        <div className="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/iconfinder_edit.svg" className="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_ABOUT, true)} />
          <img src="/images/Dashboard-assets/about-icon.svg" alt="Cinque Terre" className="mr-2" />
          <span className="subtitle-semi-bold">About</span>
        </div>
        <div className="pl-4 pr-4">
          <p className="normal-text-light mb-0 pr-4 wd-ba">{about}</p>
        </div>
      </div>
    </div>
  )
}

export const About = React.memo(AboutComponent)