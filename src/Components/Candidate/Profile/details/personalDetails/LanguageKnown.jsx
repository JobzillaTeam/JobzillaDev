import React, { useContext } from 'react'
import { EDIT_LANGUAGE, ADD_NEW_LANGUAGE } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';
import ApiServicesOrgCandidate from '../../../../../Services/ApiServicesOrgCandidate';
import swal from 'sweetalert';

const LanguageKnownComponent = ({ showPopup }) => {
  //Getting known languages data from fetchProfileInfo api from profileContext
  const { state } = useContext(Context);
  const [profileInfo, setProfileInfo] = React.useState('');
  state.then((data) => {
    setProfileInfo(data)
  })
  const { getProfileInfo } = useContext(Context);
  const { candidateLanguageList } = profileInfo;
  const deleteLanguage = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          ApiServicesOrgCandidate.deleteLanguage(id, getProfileInfo);
        } else {

        }
      });
  }
  return (
    <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4">
          <span class="subtitle-semi-bold ml-4">Languages Known</span>
        </div>
        <div class="px-2">
          <div class="col-10 ml-n3">
            <table class="table table-fixed-layout">
              <thead class="table-thead">
                <tr>
                  <th class="normal-text-medium-bold">Language</th>
                  <th class="normal-text-medium-bold">Proficiency</th>
                  <th class="normal-text-medium-bold">Read</th>
                  <th class="normal-text-medium-bold">Write</th>
                  <th class="normal-text-medium-bold">Speak</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(candidateLanguageList) ? candidateLanguageList.map((candidateLanguages, i) => (
                  <tr>
                    <td>{candidateLanguages.language}</td>
                    <td>{candidateLanguages.proficiency}</td>
                    <td>{(candidateLanguages.canRead) ? <img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /> : null}</td>
                    <td>{(candidateLanguages.canWrite) ? <img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /> : null}</td>
                    <td>{(candidateLanguages.canSpeak) ? <img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /> : null}</td>
                    <td class="edit-icon-column">
                      <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="edit-icon profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_LANGUAGE, true, { resourceId: candidateLanguages.languageId })} />
                      <img src="/images/Dashboard-assets/delete.svg" class="edit-icon profile__editIcon" alt="Cinque Terre" onClick={() => deleteLanguage(candidateLanguages.languageId)} />
                    </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
          <div class="d-flex flex-row-reverse">
            <button class="btn btn-outline-info btn-add" onClick={() => showPopup(ADD_NEW_LANGUAGE, true)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export const LanguageKnown = React.memo(LanguageKnownComponent)