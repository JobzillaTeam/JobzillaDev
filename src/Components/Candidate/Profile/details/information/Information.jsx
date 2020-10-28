import React,{useRef,useState} from 'react'
import ApiServicesOrg from '../../../../../Services/ApiServicesOrg';
import { EDIT_PROFILE_NAME } from '../../../../../Utils/AppConst'
import RenderLoader from '../../../../CommonComp/Loader';
import { Context } from '../../../../../Context/ProfileContext';
import { Toast } from 'primereact/toast';
import ApiServicesOrgCandidate from '../../../../../Services/ApiServicesOrgCandidate';

const InformationComponent = ({ showPopup, candidateProfile }) => {
  const { state } = React.useContext(Context);
  const [candidateInfo, setCandidateInfo] = React.useState();
  const toast = useRef(null);
  if (state instanceof Promise) {
    state.then((data) => {
      setCandidateInfo(data.candidateInfo)
    })
  }
  const apiServicesOrg = new ApiServicesOrg();
  const apiServicesOrgCandidate = ApiServicesOrgCandidate;
  const [imagUrl, setImageUrl] = React.useState();
  const [progressbar,setProgressbar] = useState();
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
          toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Profile Photo uploaded Successfully'},60000);
          setAvatar();
      })
      .catch(error => {
          console.log(error)
          toast.current.show({severity: 'error', summary: 'Error', detail: 'Server Error '},50000)
      })
  }
  React.useEffect(() => {
    setAvatar();
  }, [])

  React.useEffect(() => {
    apiServicesOrgCandidate.candidateGetProfileInfo()
    .then(Response => {
      setProgressbar(Response.data.responseObject.progressBarCompletion)
      //window.location.reload();
    })
  }, [])

  const setAvatar = () => {
    apiServicesOrg.viewProfileImage()
    .then(Response => {
      setImageUrl(Response.data.responseObject)
    })
  }

  if (candidateInfo) {
    const { firstName, lastName, currentRole, company, address, mobileNumber, emailId } = candidateInfo;
    return (
      <div class="bg-white pl-3 pr-5 py-5 section-divider align-items-center">
        <Toast ref={toast} /> 
        <div class="row align-items-center">
          <div class="col col-md-3 col-xs-12 align-items-center">
          {imagUrl ? <img src={`data:image/jpeg;base64,${imagUrl}`} height="175" width="175" class="rounded-circle" alt="usera avatar" />
         : <img src="/images/Dashboard-assets/user-f.jpg" height="175" width="175" class="rounded-circle" alt="User profile"/>}

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
              <div class="col col-md-4 col-xs-12 pl-0">
                <img src="/images/Dashboard-assets/candidate/mobile.png" alt="Cinque Terre" />
                <span class="normal-text-medium mgl-10">{mobileNumber}</span>
              </div>
              <div class="col col-md-4 col-xs-12 pl-0">
                <img src="/images/Dashboard-assets/candidate/message.png" alt="Cinque Terre" />
                <span class="normal-text-medium mgl-10">{emailId}</span>
              </div>
            </div>
            <div class="col-9 pl-0">
              <div class="progress progress-fashion">
              <div class="progress-bar bg-success" role="progressbar" style={{ width :`${progressbar}%` }} aria-valuenow={progressbar} aria-valuemin="0" aria-valuemax="100">{progressbar}%</div>
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
