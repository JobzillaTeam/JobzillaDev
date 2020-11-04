import React, { useContext } from 'react'
import { ADD_NEW_SKILL, EDIT_SKILL } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';
import ApiServicesOrgCandidate from '../../../../../Services/ApiServicesOrgCandidate';
import swal from 'sweetalert';

const SkillsComponent = ({ showPopup }) => {
  const { state } = useContext(Context);
  const [skill, setSkill] = React.useState('');
  state.then((data) => {
    setSkill(data);
  })
  const { getProfileInfo } = useContext(Context);
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
        } else {

        }
      });
  }
  return (
    <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/skills-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">Skills</span>
        </div>
        <div class="ml-2">
          <div class="col-9 ml-n3">
            <table class="table mb-3">
              <thead class="table-thead">
                <tr>
                  <th class="normal-text-medium-bold">Skills</th>
                  <th class="normal-text-medium-bold">Version</th>
                  <th class="normal-text-medium-bold">Experience</th>
                  <th class="normal-text-medium-bold">Proficiency</th>
                  <th class="normal-text-medium-bold text-center">Primary Skills</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>

                {(skill.skillList) ? skill.skillList.map((skill, i) => (
                  <tr>
                    <td>{skill.skillName}</td>
                    <td>{skill.version}</td>
                    <td>{skill.experience}</td>
                    <td>{skill.proficiency}</td>
                    <td class="text-center">{skill.isPrimarySkill ? <img src="/images/Dashboard-assets/candidate/correct_black.svg" alt="Cinque Terre" /> : null}</td>
                    <td class="edit-icon-column">
                      <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="edit-icon profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_SKILL, true, { resourceId: skill.skillId })} />
                      <img src="/images/Dashboard-assets/delete.svg" class="edit-icon profile__editIcon" alt="Cinque Terre" onClick={() => deleteSkill(skill.skillId)} />
                    </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
          <div class="d-flex flex-row-reverse">
            <button class="btn btn-outline-info btn-add" onClick={() => showPopup(ADD_NEW_SKILL, true)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Skills = React.memo(SkillsComponent)
