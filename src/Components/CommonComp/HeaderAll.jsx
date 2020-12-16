import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import { Context } from '../../Context/ProfileContext'

class HeaderAll extends Component {
  static contextType = Context;
  constructor() {
    super()
    this.state = {
      userData: [],
      userId: localStorage.getItem('candidateId'),
      status: '',
      imageUrl: ''
    }
    this.toggleHandeler = this.toggleHandeler.bind(this)
    this.viewImage = new ApiServicesOrg()
  }
  /** To handle Recruiter and Provider Toggle button **/
  toggleHandeler = (status) => {
    this.setState({ status });
    localStorage.setItem('status', status)
    // console.log(status);
    const providerRecruiterStatus = status;
  }

  componentDidMount() {
    this.viewImage.viewProfileImage()
      .then(Response => {
        //console.log(Response.data.responseObject)
        if (Response && Response.data && Response.data.responseObject) {
          this.setState({
            imageUrl: Response.data.responseObject
          })
          // localStorage.setItem('imageUrl', `${Response.data.responseObject}`)
        }
      })
  }


  render() {
    console.log('Render Header')
    const { isCandidate } = this.props;
    const { isSetting } = this.props;
    const { isProfile } = this.props;
    const { status } = this.state
    const userName = localStorage.getItem('userName');
    const providerRecruiterStatus = localStorage.getItem('status')
    const userRole = localStorage.userRole

    if (userRole === "candidate_role") {
      if (this.context.state instanceof Promise) {
        this.context.state.then((data) => {
          if (data) {
            const imageUrlPath = data.userImage ? `data:image/jpeg;base64,${data.userImage}` : '/images/Dashboard-assets/user-f.png'
            const firstNameValue = data.candidateInfo && data.candidateInfo.firstName ? data.candidateInfo.firstName : '';
            const lastNameValue = data.candidateInfo && data.candidateInfo.lastName ? data.candidateInfo.lastName : '';
            const userNameValue = (firstNameValue || lastNameValue) ? `${firstNameValue} ${lastNameValue}` : localStorage.getItem('userName')
            const imageElement = document.getElementById("_userImageAvatarIcon")
            const innerHtmlElement = document.getElementById("_currentUserName")
            const imageSrc = imageElement.src;
            const innerHtmlText = innerHtmlElement.innerHTML
            if (imageSrc !== imageUrlPath) {
              imageElement.src = imageUrlPath
            }
            if (innerHtmlText !== userNameValue) {
              innerHtmlElement.innerHTML = userNameValue
            }
          }
        })
      }
    } else if (userRole === 'Owner') {
      new ApiServicesOrg().getOrganizationProfile().then((response) => {
        const responseObject = response && response.data && response.data.responseObject;
        const userNameValue = responseObject && responseObject.contactPerson ? responseObject.contactPerson : localStorage.getItem('userName');
        const innerHtmlElement = document.getElementById("_currentUserName")
        const innerHtmlText = innerHtmlElement.innerHTML
        if (innerHtmlText !== userNameValue) {
          innerHtmlElement.innerHTML = userNameValue;
        }
      });
    }

    return (
      <div>
        {this.state.status === "provider" && <Redirect to="/providerDashboard" />}
        {this.state.status === "recruiter" && <Redirect to="/recruiterDashboard" />}

        <header className="Header bg-white">
          {/* <div className="float-left logo_container col-xl-2">
                <img src="/images/Dashboard-assets/logo-white.png" className="logo"/>
            </div> */}
          {(!isCandidate) && (!isSetting) && (!isProfile) ?
            <div className="float-left d-inline-flex marL34">
              <div className="mx-3 sub-title1 d-flex align-items-center">JOB : </div>
              <div className="btn-group btn-group-toggle my-auto" data-toggle="buttons">
                <label className={`btn btn-toggler ${providerRecruiterStatus === "provider" ? " active" : " "}`}>                  <input type="radio"
                  value="provider"
                  checked={providerRecruiterStatus === "provider"}
                  autoComplete="off"
                  onClick={(e) => this.toggleHandeler("provider")}
                  defaultChecked="provider"
                /> Provider
            </label>
                <label className={`btn btn-toggler ${providerRecruiterStatus === "recruiter" ? "active" : " "}`}>
                  <input type="radio"
                    value="recruiter"
                    checked={providerRecruiterStatus === "recruiter"}
                    autoComplete="off"
                    onClick={(e) => this.toggleHandeler("recruiter")}
                  /> Recruiter

            </label>
              </div>
            </div> : null}
          <ul className="nav mr-3">
            <li>
              {this.state.imageUrl ? <img id="_userImageAvatarIcon" className="rounded-circle profile-icon mr-2" src={`data:image/jpeg;base64,${this.state.imageUrl}`} width="35" height="35" />
                : <img id="_userImageAvatarIcon" className="rounded-circle profile-icon mr-2" src="/images/Dashboard-assets/user-f.png" width="35" height="35" alt="User profile" />}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" data-toggle="dropdown">
                <span className="font-blue text-small marL10" ><span id="_currentUserName">{userName}</span><i className="fa fa-angle-down pl-2" aria-hidden="true"></i></span>
              </a>
              <ul className="dropdown-menu">
                {(!isCandidate) ?
                  <li>
                    <Link className="dropdown-item" to="/orgProfile" >
                      {/* <i className="fa fa-user pr-2" aria-hidden="true"></i>*/} Profile
                    </Link>
                  </li>
                  :
                  <li>
                    <Link className="dropdown-item" to="/candidate/changePassword" >
                      {/* <i className="fa fa-user pr-2" aria-hidden="true"></i>*/} Change Password
                  </Link>
                  </li>}

                {/* If candidate is logged in then candidate Email settings will open otherwise provider/Recruiter Email Settings will open */}
                <li>
                  {
                    (!isCandidate) ?
                      (<Link className="dropdown-item" to="/emailSetting">
                        {/* <i className="fa fa-cog pr-2" aria-hidden="true"></i>  */}
                    Settings
                      </Link>)
                      :
                      (<Link className="dropdown-item" to="/candidate/candidateEmailsetting">
                        Settings
                      </Link>)

                  }
                </li>


                <li>
                  <Link className="dropdown-item" to="/logout">
                    {/* Toast.info("User Logout Successfully") */}
                    {/* <i className="fa fa-sign-out pr-2" aria-hidden="true"></i>  */}
                    Logout
                          </Link>

                  {/* <a className="dropdown-item" href="#">
                   <i className="fa fa-sign-out pr-2" aria-hidden="true"></i> Logout</a> */}
                </li>
              </ul>
            </li>
          </ul>
        </header>
      </div>
    )
  }
}
export default React.memo(HeaderAll)