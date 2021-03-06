import React from 'react'
import { EDIT_LANGUAGE, ADD_NEW_LANGUAGE } from '../../../../../Utils/AppConst'

export const LanguageKnown = ({ showPopup }) => {
  return (
    <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4">
          <span class="subtitle-semi-bold ml-4">Languages Known</span>
        </div>
        <div class="px-2">
          <div class="col-9 ml-n3">
            <table class="table">
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
                <tr>
                  <td>Skill 1</td>
                  <td>Proficient</td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td class="edit-icon-column">
                    <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="edit-icon" alt="Cinque Terre" onClick={() => showPopup(EDIT_LANGUAGE, true)} />
                    <img src="/images/Dashboard-assets/delete.svg" class="edit-icon" alt="Cinque Terre" />
                  </td>
                </tr>
                <tr>
                  <td>Skill 2</td>
                  <td>Proficient</td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td class="edit-icon-column">
                    <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="edit-icon" alt="Cinque Terre" onClick={() => showPopup(EDIT_LANGUAGE, true)} />
                    <img src="/images/Dashboard-assets/delete.svg" class="edit-icon" alt="Cinque Terre" />
                  </td>
                </tr>
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