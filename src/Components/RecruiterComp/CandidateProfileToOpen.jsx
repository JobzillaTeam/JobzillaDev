import React, { Component, createRef } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import RenderLoader from '../CommonComp/Loader';
import { Link } from 'react-router-dom'
import LeftNavProvider from '../CommonComp/LeftNavProvider';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import ScrollUpButton from "react-scroll-up-button";
import '../Candidate/Profile/profile.css';
import '../../Assets/css/Candidate.css'
import ApiServicesOrg from '../../Services/ApiServicesOrg';
//import Dropzone from 'react-dropzone'

class CandidateProfileToOpen extends Component {

    constructor() {
      super()
      this.profileService = new ApiServicesOrg()
      this.fileService2 = new ApiServicesOrg()
      this.scrollToTopWithCallback = this.scrollToTopWithCallback.bind(this);
      this.state = {
        CandidateDetails: {},
        candidateInfo:[],
        candidateLanguageList:[],
        candidateCertificatesList:[],
        educationDetailsList:[],
        employmentDetailsList:[],
        skillList:[],
        offset: -90,
        currentTabIndex: 0
      }
    }

    componentDidMount() {
        
        this.profileService.getCandidateInfo()
        .then(Response =>
          
          this.setState({
            CandidateDetails: Response.data.responseObject,
            candidateInfo:Response.data.responseObject.candidateInfo,
            skillList:Response.data.responseObject.skillList,
            educationDetailsList:Response.data.responseObject.educationDetailsList,
            employmentDetailsList:Response.data.responseObject.employmentDetailsList,
            candidateCertificatesList:Response.data.responseObject.candidateCertificatesList,
            candidateLanguageList:Response.data.responseObject.candidateLanguageList

            
          }, () => { console.log(this.state.candidateInfo) },

          ),
        ) 
    window.onscroll = function () { myFunction() };

    var navbar = document.getElementById("profileNavbar");
    var sticky = navbar.offsetTop;

    const myFunction = () => {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        this.setState({
          offset: -45
        })
      } else {
        navbar.classList.remove("sticky");
        this.setState({
          offset: -90
        })
      }
    }
    scrollToComponent(this.refs.name, {
      offset: 500,
      align: 'top',
      duration: 500,
      ease: 'inCirc',
    });
   }

   scrollToTopWithCallback() {
    let scroller = scrollToComponent(this.Violet, {
      offset: 0,
      align: 'top',
      duration: 1500,
    });
    scroller.on('end', () => console.log('Scrolling end!'));
  }

  downloadResume = () => {

    // Calling Download Resume File Service from Service file:-
        var blob;
        //alert("Download")
        this.fileService2.downloadResumeFile()
        .then(Response => {
            var data1=Response.data.responseObject
            console.log(data1)
            blob = this.convertBase64toBlob(data1, 'application/msword'); 
            var blobURL = URL.createObjectURL(blob)
            var blobURL = URL.createObjectURL(blob);
                window.open(blobURL); 
            })
        }
    
 convertBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
  }

render() {
    const skill=this.state
    return (
      <div>
        <LeftNavProvider></LeftNavProvider>
        <div className="maincontent">
        <HeaderAll isCandidate={true}></HeaderAll>
          {/* <UploadProfile/> */}
          <div className="container-fluid">
            <div className="row flex-xl-nowrap">
              <section className="content_section col py-md-3 pl-md-4 bd-content">
                {/* Importing Overview Cards, Top skills card and monthly Report Bar Graph */}
                {/* To display login User Details */}
                <div aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <Link to ="/jobPostingCollection">Active Jobs > Job Details </Link></li>
                        <li class="breadcrumb-item active" aria-current="page"> Profile </li>
                    </ol>
                </div>
                
                <div class="container-fashion">
                  <div class="row profile-details">
                    <div class="profile-summary-col-left">
                      <div class="camera-container">
                        <img src="/images/Dashboard-assets/candidate/camera.png" class="camera-icon" alt="Cinque Terre" />
                      </div>
                      <img src="/images/Dashboard-assets/candidate/profile-pic.png" class="rounded-circle" alt="Cinque Terre" />
                    </div>
                    <div class="profile-summary-col-right">
                    {/* <RenderLoader /> */}
                     <a class="download-right" href="" onClick={this.downloadResume}><img alt="" class="edit-icon" src="../images/ActiveJob-JobDetails/Group 555.svg"></img> Download Resume</a>
                     <h4 class="h4-fashion">{this.state.candidateInfo.firstName}  {this.state.candidateInfo.lastName}</h4>
                     <span class="subtitle-medium">{this.state.candidateInfo.currentRole} at {this.state.candidateInfo.company}</span>
                      <hr class="border" />
                      <div class="row">
                        <div class="col">
                          <img src="/images/Dashboard-assets/candidate/location.png" alt="Cinque Terre" />
                          <span class="normal-text-medium mgl-10">{this.state.candidateInfo.city} , {this.state.candidateInfo.country}</span>
                        </div>
                        <div class="col">
                          <img src="/images/Dashboard-assets/candidate/mobile.png" alt="Cinque Terre" />
                          <span class="normal-text-medium mgl-10">{this.state.candidateInfo.mobileNumber}</span>
                        </div>
                        <div class="col">
                          <img src="/images/Dashboard-assets/candidate/message.png" alt="Cinque Terre" />
                          <span class="normal-text-medium mgl-10">{this.state.candidateInfo.emailId}</span>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className='profile__button_group' id="profileNavbar">
           <div
            class={`profileTabs ${this.state.currentTabIndex === 0 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.AboutSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({currentTabIndex: 0})
            }}
          >
            About
          </div>
          {/* <div
            class={`profileTabs ${this.state.currentTabIndex === 1 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.ResumeSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({currentTabIndex: 1})
            }}
          >
            Resume
          </div> */}
          <div
            class={`profileTabs ${this.state.currentTabIndex === 1 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.SkillsSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({currentTabIndex: 1})
            }}
          >
            Skills
          </div>
          <div
            class={`profileTabs ${this.state.currentTabIndex === 2 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.EducationSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({currentTabIndex: 2})
            }}
          >
            Education & Certifications
          </div>
        <div
          class={`profileTabs ${this.state.currentTabIndex === 3 ? 'profileTabsSelected' : ''}`}
          onClick={() => {
            scrollToComponent(this.EmploymentSection, {
              offset: this.state.offset,
              align: 'top',
              duration: 1500,
            });
            this.setState({currentTabIndex: 3})
          }}
          >
            Employment
          </div>
      <div
        class={`profileTabs ${this.state.currentTabIndex === 4 ? 'profileTabsSelected' : ''}`}
        onClick={() => {
          scrollToComponent(this.PersonalDetailsSection, {
            offset: this.state.offset,
            align: 'top',
            duration: 1500,
          });
          this.setState({currentTabIndex: 4})
        }}
      >
        Personal Details
          </div>
        </div >
        
        <div>
          <section class="mb-3"
            ref={(section) => {
              this.AboutSection = section;
            }}
          >
        <div class="bg-white px-4 py-4 section-divider align-items-center">
        <div class="col">
         <div class="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/about-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">About</span>
        </div>
        <div class="pl-4 pr-4">
          <p class="normal-text-light mb-0 pr-4">{this.state.candidateInfo.about}</p>
        </div>
      </div>
    </div>
    <div class="bg-white section-divider align-items-center row mx-0">
        <div class="col-6 px-4 py-4 section-divider" style={{ borderRight: '1px solid #F1F1F1' }}>
          <div class="col">
            <div class="mb-4">
              <span class="subtitle-semi-bold ml-4">Current CTC</span>
            </div>
            <div class="px-4">
              <span class="normal-text-medium">{this.state.candidateInfo.currencyType} {this.state.candidateInfo.currentCTC}</span>
            </div>
          </div>
        </div>
        <div class="col-6 px-4 py-4 section-divider">
          <div class="col">
            <div class="mb-4">
              <span class="subtitle-semi-bold">Expected CTC</span>
            </div>
            <div >
              <span class="normal-text-medium">{this.state.candidateInfo.currencyType} {this.state.candidateInfo.expectedCTC}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white px-4 py-4 section-divider align-items-center">
        <div class="col">
          <div class="mb-4 ml-4">
            <span class="subtitle-semi-bold">Desired Career Profile</span>
          </div>
          <div class="row col-9 px-4">
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Employment Type</span></div>
             <span class="small-text-light">{this.state.candidateInfo.employmentType}</span>
            </div>
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Preferred Locations</span></div>
             <span class="small-text-light">{this.state.candidateInfo.preferredLocation}</span>
            </div>
            <div class="col-4 mb-4">
              <div><span class="font-weight-bold">Preferred Shift</span></div>
              <div><span class="small-text-light">{this.state.candidateInfo.preferredShift}</span></div>
            </div>
          </div>
        </div>
      </div>
          </section>
          {/* <section class="mb-3"
              ref={(section) => {
              this.ResumeSection = section;
            }}
          >
             <Resume showPopup={this.props.showPopup} /> 
          </section> */}
          <section class="mb-3"
            ref={(section) => {
              this.SkillsSection = section;
            }}
          >
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
                  {/* <th class="normal-text-medium-bold text-center">Primary Skills</th> */}
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
                    {/* <td class="text-center">{skill.primarySkill ? <img src="/images/Dashboard-assets/candidate/correct_black.svg" alt="Cinque Terre" /> : null}</td> */}

                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          </section>
          <section class="mb-3"
            ref={(section) => {
              this.EducationSection = section;
            }}
          >
           <div class="bg-white px-4 py-4 section-divider align-items-center">
         <div class="col">
        <div class="mb-4 align-items-center">

          <img src="/images/Dashboard-assets/education-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">Education</span>
        </div>
        <div class="px-4 mb-3">
          {(this.state.educationDetailsList) ? this.state.educationDetailsList.map((data) => (
            <div class="col-12 px-0 py-3">
              <div>
                <span class="subtitle-semi-bold">{data.university}</span>
              </div>
              <div><span class="normal-text-semi-bold"> {data.educationType}{` - ${data.course} ${data.specialization}`} </span></div>
              <div><span class="normal-text-light">{data.passingOutYear} {data.courseType}</span></div>
            </div>
          )) : null}
        </div>
      </div>
    </div>
    <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4">
          <span class="subtitle-semi-bold ml-4">Certifications</span>
        </div>
        <div class="px-4 mb-3">
          {(this.state.candidateCertificatesList) ? this.state.candidateCertificatesList.map((data) => (
            <div class="col-12 px-0 py-3">
              <div>
                <span class="subtitle-semi-bold">{data.certificationName}</span>
              </div>
              <div><span class="normal-text-light">Issued on {data.issueMonth}{data.issueYear && data.issueMonth ? ' , ' : ''}{data.issueYear} | {data.expirationMonth || data.expirationYear ? `${data.expirationMonth} ${data.expirationMonth && data.expirationYear ? ' , ' : ''} ${data.expirationYear}` : 'No Expiration Date'}</span></div>
              <div><span class="normal-text-light">Credential ID {data.credentialId}</span></div>
              <a className="forgot_link" target="_blank" href={data.credentialURL}>{data.credentialURL}</a>
            </div>
          )) : null}
        </div>
      </div>
    </div>
          </section>
          <section class="mb-3"
            ref={(section) => {
              this.EmploymentSection = section;
            }}
          >
             <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/employment-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">Employment</span>
        </div>
        <div class="px-4 mb-3">
          {(this.state.employmentDetailsList) ? this.state.employmentDetailsList.map((employment, i) => (
            <div class="col-12 px-0 py-3">
              <div>
                <span class="subtitle-semi-bold">{employment.designation}</span>
              </div>
              <div><span class="normal-text-semi-bold">{employment.organization}</span></div>
              <div><span class="normal-text-light">{employment.startedWorkingFromMonth}{employment.startedWorkingFromYear && employment.startedWorkingFromMonth ? ' , ' : ''}{employment.startedWorkingFromYear} | {!employment.currentCompany ? `${employment.workedTillMonth} ${employment.workedTillYear && employment.workedTillMonth ? ' , ' : ''} ${employment.workedTillYear}` : ' - Present'} ({employment.employmentType})</span></div>
              <p class="normal-text-light">{employment.description}</p>
            </div>
          )) : null}
        </div>
      </div>
    </div>
          </section>
          <section class="mb-3"
            ref={(section) => {
              this.PersonalDetailsSection = section;
            }}
          >
            <div class="bg-white px-4 py-4 section-divider align-items-center">
      <div class="col">
        <div class="mb-4 align-items-center">
          <img src="/images/Dashboard-assets/profile-icon.svg" alt="Cinque Terre" class="mr-2" />
          <span class="subtitle-semi-bold">Personal Details</span>
        </div>
        <div class="row col-9 px-4">
          <div class="col-4 mb-4">
            <div><span class="font-weight-bold">Date of Birth</span></div>
            <div><span class="small-text-light">{this.state.candidateInfo.dob}</span></div>
          </div>
          <div class="col-4 mb-4">
            <div><span class="font-weight-bold">Gender</span></div>
            <div><span class="small-text-light">{this.state.candidateInfo.gender}</span></div>
          </div>
          <div class="col-4">
            <div><span class="font-weight-bold">Marital Status</span></div>
            <div><span class="small-text-light">{this.state.candidateInfo.maritalStatus}</span></div>
          </div>
          <div class="col-4 mb-4">
            <div><span class="font-weight-bold">Address</span></div>
            <div><span class="small-text-light">{this.state.candidateInfo.address}</span></div>
          </div>
          <div class="col-4">
            <div><span class="font-weight-bold">Passport ID</span></div>
            <div><span class="small-text-light">{this.state.candidateInfo.passportId}</span></div>
          </div>
          <div class="col-4">
            <div><span class="font-weight-bold">Work Permit</span></div>
           <div><span class="small-text-light">{this.state.candidateInfo.workPermit}</span></div>
          </div>
        </div>
      </div>
    </div>
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
                {(this.state.candidateLanguageList) ? this.state.candidateLanguageList.map((candidateLanguages, i) => (
                  <tr>
                    <td>{candidateLanguages.language}</td>
                    <td>{candidateLanguages.proficiency}</td>
                    <td>{(candidateLanguages.canRead) ? <img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /> : null}</td>
                    <td>{(candidateLanguages.canWrite) ? <img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /> : null}</td>
                    <td>{(candidateLanguages.canSpeak) ? <img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /> : null}</td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          </section>
        </div>
          </div>

          <Footer></Footer>
        </div>
        <ScrollUpButton />
      </div>

    );
  }
}

export default CandidateProfileToOpen