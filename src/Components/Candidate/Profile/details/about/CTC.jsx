import React, { useContext, useState } from 'react'
import { EDIT_CTC } from '../../../../../Utils/AppConst'
import { Context } from '../../../../../Context/ProfileContext';
import { getCTCInLakhAndThousand } from '../../../../../Utils/ProfileFormHelper';

const CTCComponent = ({ showPopup }) => {
  //Getting CTC data from fetchProfileInfo api from profileContext
  const { state } = useContext(Context);
  const [ctc, setCtc] = useState('');
  state.then((data) => {
    setCtc(data)
  })
  if (ctc && ctc.candidateInfo) {
    const currentCTC = ctc && ctc.candidateInfo && ctc.candidateInfo.currentCTC ? ctc.candidateInfo.currentCTC : 0;
    const expectedCTC = ctc && ctc.candidateInfo && ctc.candidateInfo.expectedCTC ? ctc.candidateInfo.expectedCTC : 0;
    return (
      <div class="bg-white section-divider align-items-center row mx-0">
        <div class="col-6 px-4 py-4 section-divider" style={{ borderRight: '1px solid #F1F1F1' }}>
          <div class="col">
            <div class="mb-4">
              <span class="subtitle-semi-bold ml-4">Current CTC</span>
            </div>
            <div class="px-4">
              <span class="normal-text-medium">{ctc.candidateInfo.currencyType} {getCTCInLakhAndThousand(currentCTC)}</span>
            </div>
          </div>
        </div>
        <div class="col-6 px-4 py-4 section-divider">
          <div class="col">
            <div class="mb-4">
              <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right profile__editIcon" alt="Cinque Terre" onClick={() => showPopup(EDIT_CTC, true)} />
              <span class="subtitle-semi-bold">Expected CTC</span>
            </div>
            <div >
              <span class="normal-text-medium">{ctc.candidateInfo.currencyType} {getCTCInLakhAndThousand(expectedCTC)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  } return null;
}

export const CTC = React.memo(CTCComponent)