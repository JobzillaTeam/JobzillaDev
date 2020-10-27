import React from 'react';
import Popup from '../../CommonComp/Popup';
import ProfileName from './updation/ProfileName';
import { EDIT_PROFILE_NAME, EDIT_ABOUT, EDIT_CTC, EDIT_SKILL, EDIT_CERTIFICATE, EDIT_EMPLOYMENT, EDIT_EDUCATION, EDIT_PERSONAL, EDIT_LANGUAGE, ADD_NEW_CERTIFICATE, ADD_NEW_EDUCATION, ADD_NEW_EMPLOYMENT, ADD_NEW_LANGUAGE, ADD_NEW_SKILL, EDIT_CAREER_PROFILE } from '../../../Utils/AppConst';
import Language from './updation/Language';
import About from './updation/About';
import CTC from './updation/CTC';
import Skill from './updation/Skill';
import Certification from './updation/Certification';
import Employment from './updation/Employment';
import Education from './updation/Education';
import Personal from './updation/Personal';
import CareerProfile from './updation/CareerProfile';
export const PopupContentComponent = ({ title, showPopup, dataAttributes, id }) => {
  let bodyComponent;
  switch (title) {
    case EDIT_PROFILE_NAME:
      bodyComponent = <ProfileName
        showPopup={showPopup}
      />
      break;
    case EDIT_ABOUT:
      bodyComponent = <About
        showPopup={showPopup}
      />
      break;
    case EDIT_CTC:
      bodyComponent = <CTC
        showPopup={showPopup}
      />
      break;
    case EDIT_SKILL:
      bodyComponent = <Skill
        dataAttributes={dataAttributes}
        showPopup={showPopup}
      />
      break;
    case ADD_NEW_SKILL:
      bodyComponent = <Skill
        showPopup={showPopup}
      />
      break;
    case EDIT_CERTIFICATE:
      bodyComponent = <Certification
        dataAttributes={dataAttributes}
        showPopup={showPopup}
      />
      break;
    case ADD_NEW_CERTIFICATE:
      bodyComponent = <Certification
        showPopup={showPopup}
      />
      break;
    case EDIT_EMPLOYMENT:
      bodyComponent = <Employment
        dataAttributes={dataAttributes}
        showPopup={showPopup}
      />
      break;
    case ADD_NEW_EMPLOYMENT:
      bodyComponent = <Employment
        showPopup={showPopup}
      />
      break;
    case EDIT_EDUCATION:
      bodyComponent = <Education
        dataAttributes={dataAttributes}
        showPopup={showPopup}
      />
      break;
    case ADD_NEW_EDUCATION:
      bodyComponent = <Education
        showPopup={showPopup}
      />
      break;
    case EDIT_PERSONAL:
      bodyComponent = <Personal
        showPopup={showPopup}
      />
      break;
    case EDIT_CAREER_PROFILE:
      bodyComponent = <CareerProfile
        showPopup={showPopup}
      />
      break;
    case EDIT_LANGUAGE:
      bodyComponent = <Language
        dataAttributes={dataAttributes}
        showPopup={showPopup}
      />
      break;
    case ADD_NEW_LANGUAGE:
      bodyComponent = <Language
        showPopup={showPopup}
      />
      break;
    default:
      break;
  }
  return (
    <Popup
      showPopup={showPopup}
      title={title}
      body={bodyComponent}
    />

  );
}

export const PopupContent = React.memo(PopupContentComponent)