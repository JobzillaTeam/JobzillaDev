import React from 'react'
import ApiServicesOrg from '../../../../../Services/ApiServicesOrg';
import { EDIT_PROFILE_NAME } from '../../../../../Utils/AppConst'
import RenderLoader from '../../../../CommonComp/Loader';
import { Context } from '../../../../../Context/ProfileContext';

const InformationComponent = ({ showPopup, candidateProfile }) => {
  const { state } = React.useContext(Context);
  const [candidateInfo, setCandidateInfo] = React.useState();
  if (state instanceof Promise) {
    state.then((data) => {
      setCandidateInfo(data.candidateInfo)
    })
  }
  const apiServicesOrg = new ApiServicesOrg();
  const [imagUrl, setImageUrl] = React.useState();
  const uploadHandler = (e) => {
    const files = e.target.files;
    const token = JSON.parse(localStorage.getItem('userDetails')).authToken;
    const formData = new FormData()
    formData.append(
      'imageFile',
      files[0]
    )
    const formheader = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    }

    apiServicesOrg.postProfilePhoto(formData, formheader)
      .then(Response => {
        apiServicesOrg.viewProfileImage()
        .then(Response => {
          setImageUrl(Response.data.responseObject)
        })
      })
      .catch(error => {
          console.log(error)
      })
  }
  React.useEffect(() => {
    apiServicesOrg.viewProfileImage()
    .then(Response => {
      setImageUrl(Response.data.responseObject)
    })
  }, [])
  if (candidateInfo) {
    const { firstName, lastName, currentRole, company, address, mobileNumber, emailId } = candidateInfo;
    return (
      <div class="bg-white pl-3 pr-5 py-5 section-divider align-items-center">
        <div class="row align-items-center">
          <div class="col col-md-3 col-xs-12 align-items-center">
            <img src={`data:image/jpeg;base64,${imagUrl}`} height="175" width="175" class="rounded-circle" alt="usera avatar" />
            <label htmlFor='picture'>
              <img src="/images/Dashboard-assets/ar_camera.svg" style={{ cursor: "pointer" }}
                data-toggle="tooltip" data-placement="right" title="Upload profile Photo"
                className="rounded-circle uploadIcon" width="30px" height="30px" />
            </label>
            <form style={{ display: "none" }}>
              <input type="file" name="imageFile"
                accept="image/*;capture=camera" accept=".gif,.jpg,.png,.tif|image/*"
                id='picture'
                onChange={uploadHandler}
              />
            </form>
          </div>
          <div class="col col-md-9 col-xs-12 align-items-center">
            <div>
              <img src="/images/Dashboard-assets/iconfinder_edit.svg" class="float-right" alt="Cinque Terre" onClick={() => showPopup(EDIT_PROFILE_NAME, true)} />
              <h3 class="mb-2">{firstName} {lastName}</h3>
            </div>
            <span class="visible-lg-inline">{currentRole} at {company}</span>
            <hr class="mb-4" />
            <div class="row">
              <div class="col col-md-4 col-xs-12">
                <img src="/images/Dashboard-assets/candidate/location.png" alt="Cinque Terre" />
                <span class="normal-text-medium mgl-10">{address}</span>
              </div>
              <div class="col col-md-4 col-xs-12">
                <img src="/images/Dashboard-assets/candidate/mobile.png" alt="Cinque Terre" />
                <span class="normal-text-medium mgl-10">{mobileNumber}</span>
              </div>
              <div class="col col-md-4 col-xs-12">
                <img src="/images/Dashboard-assets/candidate/message.png" alt="Cinque Terre" />
                <span class="normal-text-medium mgl-10">{emailId}</span>
              </div>
            </div>
            <div class="col-9 pl-0">
              <div class="progress progress-fashion">
                <div class="progress-bar bg-success" role="progressbar" style={{ width: '80%' }} aria-valuenow="80%" aria-valuemin="0" aria-valuemax="100">80%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <RenderLoader />
}
export const Information = React.memo(InformationComponent)