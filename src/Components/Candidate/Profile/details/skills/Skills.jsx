import React, { useContext } from 'react'
import { ADD_NEW_SKILL, EDIT_SKILL } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';
import ApiServicesOrgCandidate from '../../../../../Services/ApiServicesOrgCandidate';
import swal from 'sweetalert';

const SkillsComponent = ({ showPopup }) => {
  //Getting skills data from fetchProfileInfo api from profileContext
  const { state } = useContext(Context);
  const [skill, setSkill] = React.useState('');
  state.then((data) => {
    setSkill(data);
  })
  const { getProfileInfo } = useContext(Context);

  //To delete skill
  const deleteSkill = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          ApiServicesOrgCandidate.deleteSkill(id, getProfileInfo);
        }
      });
  }
  return (
    <div className="bg-white px-4 py-4 section-divider align-items-center">
      <div className="col">
        <div className="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/skills-icon.svg" alt="Cinque Terre" className="mr-2" />
          <span className="subtitle-semi-bold">Skills</span>
        </div>
        <div className="ml-2">
          <div className="col-10 ml-n3">
            <table className="table mb-3 table-fixed-layout">
              <thead className="table-thead">
                <tr>
                  <th className="normal-text-medium-bold">Skills</th>
                  <th className="normal-text-medium-bold">Version</th>
                  <th className="normal-text-medium-bold">Experience</th>
                  <th className="normal-text-medium-bold">Proficiency</th>
                  <th className="normal-text-medium-bold text-center">Primary Skills</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>

                {(skill.skillList) ? skill.skillList.map((skill, i) => {
                  const skillExperience = skill.experience ? skill.experience : 0
                  const skillExperienceInFormat = skillExperience > 0 ? parseFloat(skillExperience).toFixed(2) : skillExperience;
                  return (
                    <tr key={skill.skillId}>
                      <td>{skill.skillName}</td>
                      <td>{skill.version}</td>
                      <td>{skillExperienceInFormat}</td>
                      <td>{skill.proficiency}</td>
                      <td className="text-center">{skill.isPrimarySkill ? <img src="/images/Dashboard-assets/candidate/correct_black.svg" alt="Cinque Terre" /> : null}</td>
                      <td className="edit-icon-column">
                        <img src="/images/Dashboard-assets/iconfinder_edit.svg" className="edit-icon profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_SKILL, true, { resourceId: skill.skillId })} />
                        <img src="/images/Dashboard-assets/delete.svg" className="edit-icon profile__editIcon" alt="Cinque Terre" onClick={() => deleteSkill(skill.skillId)} />
                      </td>
                    </tr>
                  );
                }) : null}
              </tbody>
            </table>
          </div>
          <div className="d-flex flex-row-reverse">
            <button className="btn btn-outline-info btn-add" onClick={() => showPopup(ADD_NEW_SKILL, true)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Skills = React.memo(SkillsComponent)
