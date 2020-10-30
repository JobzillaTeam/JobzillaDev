import React, { useContext } from 'react'
import { ADD_NEW_EMPLOYMENT, EDIT_EMPLOYMENT } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';
import moment from 'moment';

const EmploymentComponent = ({ showPopup }) => {
  const { state } = useContext(Context);
  const [employmentInfo, setEmploymentInfo] = React.useState('');
  state.then((data) => {
    setEmploymentInfo(data)
  })
  const { employmentDetailsList } = employmentInfo;
  const employmentDetailsListSorted = employmentDetailsList && employmentDetailsList.sort((empA, empB) => {
    const newDate = new Date();
    const fullMonth = newDate.getMonth() -1;
    const fullYear = newDate.getFullYear();
    if (empA.currentCompany) {
      empA.workedTillMonth = fullMonth;
      empA.workedTillYear = fullYear
    }
    if (empB.currentCompany) {
      empB.workedTillMonth = fullMonth;
      empB.workedTillYear = fullYear
    }
    if (empA.workedTillMonth && empA.workedTillYear && empB.workedTillMonth, empB.workedTillYear) {
      const startMonthValue = parseInt(moment().month(empA.workedTillMonth).format("M")) - 1;
      const endMonthValue = parseInt(moment().month(empB.workedTillMonth).format("M")) - 1;
      const startDate = new Date(parseInt(empA.workedTillYear), empA.currentCompany ? empA.workedTillMonth : startMonthValue).getTime();
      const endDate = new Date(parseInt(empB.workedTillYear), empB.currentCompany ? empB.workedTillMonth : endMonthValue).getTime();
      return endDate - startDate;
    }
  })
  return (
    <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/employment-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">Employment</span>
        </div>
        <div class="px-4 mb-3">
          {(employmentDetailsListSorted) ? employmentDetailsListSorted.map((employment, i) => (
            <div class="col-12 px-0 py-3">
              <div>
                <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right" alt="Cinque Terre" onClick={() => showPopup(EDIT_EMPLOYMENT, true, { resourceId: employment.employmentId })} />
                <span class="subtitle-semi-bold">{employment.designation}</span>
              </div>
              <div><span class="normal-text-semi-bold">{employment.organization}</span></div>
              <div><span class="normal-text-light">{employment.startedWorkingFromMonth}{employment.startedWorkingFromYear && employment.startedWorkingFromMonth ? ' , ' : ''}{employment.startedWorkingFromYear} | {!employment.currentCompany ? `${employment.workedTillMonth} ${employment.workedTillYear && employment.workedTillMonth ? ' , ' : ''} ${employment.workedTillYear}` : ' - Present'} ({employment.employmentType})</span></div>
              <p class="normal-text-light">{employment.description}</p>
            </div>
          )) : null}
        </div>
        <div class="d-flex flex-row-reverse">
          <button class="btn btn-outline-info btn-add" onClick={() => showPopup(ADD_NEW_EMPLOYMENT, true)}>Add</button>
        </div>
      </div>
    </div>
  )
}
export const Employment = React.memo(EmploymentComponent)