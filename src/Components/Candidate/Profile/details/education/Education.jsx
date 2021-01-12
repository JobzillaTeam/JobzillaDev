import React, { useContext } from 'react'
import { EDIT_EDUCATION, ADD_NEW_EDUCATION } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';

export const Education = ({ showPopup }) => {
  const { state } = useContext(Context);
  //Getting education data from fetchProfileInfo api from profileContext
  const [profileInfo, setProfileInfo] = React.useState('');
  state.then((data) => {
    setProfileInfo(data)
  })
  const { educationDetailsList } = profileInfo;
  const isSchoolEducation = (education) => {
    return education.educationType === '10th' || education.educationType === '12th'
  };
  const educationDetailsListSorted = educationDetailsList && educationDetailsList.sort((eduA, eduB) => {
    if (eduA.passingOutYear && eduB.passingOutYear) {
      return eduB.passingOutYear - eduA.passingOutYear;
    }
  })
  return (
    <div className="bg-white px-4 py-4 section-divider align-items-center">
      <div className="col">
        <div className="mb-4 align-items-center">

          <img src="/images/Dashboard-assets/education-icon.svg" alt="Cinque Terre" className="mr-2" />
          <span className="subtitle-semi-bold">Education</span>
        </div>
        <div className="px-4 mb-3">
          {(educationDetailsListSorted) ? educationDetailsListSorted.map((data) => (
            <div className="col-12 px-0 py-3" key={data.educationId}>
              <div>
                <img src="/images/Dashboard-assets/iconfinder_edit.svg" className="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_EDUCATION, true, { resourceId: data.educationId })} />
                <span className="subtitle-semi-bold">{isSchoolEducation(data) ? data.board : data.university}</span>
              </div>
              <div><span className="normal-text-semi-bold"> {data.educationType}{isSchoolEducation(data) ? `` : ` - ${data.course} ${data.specialization}`} </span></div>
              <div><span className="normal-text-light">{data.passingOutYear} {data.courseType}</span></div>
            </div>
          )) : null}
        </div>
        <div className="d-flex flex-row-reverse">
          <button className="btn btn-outline-info btn-add" onClick={() => showPopup(ADD_NEW_EDUCATION, true)}>Add</button>
        </div>
      </div>
    </div>
  )
}