import React, { useContext } from 'react'
import { EDIT_PROFILE_NAME, EDIT_ABOUT } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';

const AboutComponent = ({ showPopup }) => {
  const { state } = useContext(Context);
  const [about, setAbout] = React.useState('');
  state.then((data) => {
    setAbout(data.candidateInfo.about)
  })
  return (
    <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_ABOUT, true)} />
          <img src="/images/Dashboard-assets/about-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">About</span>
        </div>
        <div class="pl-4 pr-4">
          <p class="normal-text-light mb-0 pr-4 wd-ba">{about}</p>
        </div>
      </div>
    </div>
  )
}

export const About = React.memo(AboutComponent)