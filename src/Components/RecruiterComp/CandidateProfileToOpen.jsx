import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom'
import LeftNavProvider from '../CommonComp/LeftNavProvider';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import { Breadcrumbs } from '../CommonComp/breadcrumbs/index';
import ScrollUpButton from "react-scroll-up-button";
import '../Candidate/Profile/profile.css';
import '../../Assets/css/Candidate.css'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import Dropzone from 'react-dropzone'

class CandidateProfileToOpen extends Component {

    constructor() {
      super()
      this.profileService = new ApiServicesOrg()
      this.state = {
        CandidateDetails: {},
      }
    }

    componentDidMount() {
        
        this.profileService.getCandidateInfo()
        .then(Response =>
          
          this.setState({
            CandidateDetails: Response.data.responseObject,
            
          }, () => { console.log(this.state.CandidateDetails) },

          ),
        ) 
   }

   downLoadResume(){
    alert(`Hii`)
}

renderAbout = () => {
    return (
      <div class="card border-0">
        <div class="row profile-row-fashion">
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/about.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">About</span>
          </div>
          <div class="profile-col-right right-sec">
            
          </div>
          <div class="col-12 mt-4">
            <p class="normal-text-light profie-description">Senior Python Developer responsibilities include participating in all phases of the software development lifecycle and coaching junior developers. If you’re a seasoned developer with a love for back-end technologies, we’d like to meet you..</p>
          </div>
        </div>
        <hr class="border-1" />
        <div class="row profile-row-fashion">
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/about.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">Current CTC</span>
          </div>
          <div class="profile-summary-col-right-30 right-sec">
            <span class="normal-text-medium mgl-10">INR 9 LAKHS 60 THOUSAND</span>
          </div>
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/about.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">Expected CTC</span>
          </div>
          <div class="profile-summary-col-right-30 right-sec">
            
            <span class="normal-text-medium mgl-10">INR 9 LAKHS 60 THOUSAND</span>
          </div>
        </div>
        <hr class="border-1" />
        <div class="row profile-row-fashion">
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/desired_profile.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">Desired Profile</span>
          </div>
          <div class="profile-col-right right-sec">
            
          </div>
          <div class="col-12">
            <div class="row row-pad-row">
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Employment Type</span></div>
                <div><span class="small-text-light">Full Time</span></div>
              </div>
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Preferred Locations</span></div>
                <div><span class="small-text-light">Mumbai, Pune</span></div>
              </div>
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Preferred Shift</span></div>
                <div><span class="small-text-light">Day</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
  renderResume = () => {
    const dropzoneRef = createRef();
    const openDialog = () => {
      // Note that the ref is set async,
      // so it might be null at some point 
      if (dropzoneRef.current) {
        dropzoneRef.current.open()
      }
    };
    return (
      <div class="row profile-row-fashion">
        <div class="profile-col-left left-sec-heading">
          <img src="/images/Dashboard-assets/candidate/resume.png" alt="Cinque Terre" class="left-sec-icon" />
          <span class="subtitle-semi-bold left-sec-heading-text">Upload Resume</span>
        </div>
        <div class="profile-col-right right-sec">
          <Link to="#" style={{ color: '#007EFF' }}>John_doe_resume.pdf</Link><span class="small-text-light mgl-10">Last updated on 19 June 2020</span>
        </div>
        <div class="col-12">
          <Dropzone ref={dropzoneRef} noClick noKeyboard>
            {({ getRootProps, getInputProps, acceptedFiles }) => {
              return (
                <div className="dropzone-box">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div><span class="normal-text-medium">Drag and drop file here</span></div>
                    <div><span class="normal-text-medium">or</span></div>
                    <button onClick={openDialog} class="btn lightBlue choose-file">Choose file</button>
                  </div>
                  <aside>
                    <ul>
                      {acceptedFiles ? acceptedFiles.map(file => (
                        <li key={file.path}>
                          {file.path} - {file.size} bytes
                        </li>
                      )) : <li key='no-file'>
                          No file choosen
                    </li>}
                    </ul>
                  </aside>
                </div>
              );
            }}
          </Dropzone>
        </div>
      </div>
    );
  }
  renderSkills = () => {
    return (
      <div class="row profile-row-fashion">
     
        <div class="col-12" >
          <table class="table">
            <thead class="table-thead">
              <tr>
                <th class="normal-text-medium">SKILLS</th>
                <th class="normal-text-medium">VERSION</th>
                <th class="normal-text-medium">EXPERIENCE</th>
                <th class="normal-text-medium">PROFICIENCY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Skill 1</td>
                <td>V5.1</td>
                <td>5 Years</td>
                <td>Expert</td>
                
              </tr>
              <tr>
                <td>Skill 2</td>
                <td>V2.1</td>
                <td>1 Years</td>
                <td>Expert</td>
                
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12">
          <div class="row row-pad-row">
            <div class="profile-col-left mt30">
            </div>
            
          </div>
        </div>
      </div>
    )
  }
  renderEducation = () => {
    return (
      <div>
        <div class="row profile-row-fashion">
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/education.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">Education</span>

          </div>
          
          <div class="col-12">
            <div class="row row-pad-row">
              <div class="profile-col-left mt30 pad-left">
                <div><span class="normal-text-semi-bold">Bachelor of Technology </span></div>
                <div><span class="small-text-light">Bachelor of Technology (2011-2015)</span></div>
                <div><span class="small-text-light">University Name</span></div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="row profile-row-fashion">
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/certification.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">Certifications</span>

          </div>
          <div class="profile-col-right right-sec">
            
            <div><span class="normal-text-light">XYZ Certifications</span></div>
            <div><span class="normal-text-light">TCS Issued on Sept 2019 </span></div>
          </div>
          <div class="col-12">
            <div class="row row-pad-row">
              <div class="profile-col-left mt30">
              </div>
              
            </div>
          </div>
        </div>
      </div>);
  }

  renderEmployment = () => {
    return (<div class="row profile-row-fashion employment">
      {/* <div class="profile-col-left left-sec-heading">
        <img src="/images/Dashboard-assets/candidate/employment.png" alt="Cinque Terre" class="left-sec-icon" />
        <span class="subtitle-semi-bold left-sec-heading-text">Employment</span>

      </div> */}
      <div class="profile-col-right right-sec">

      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-12 mt30">
            <div>
              
              <span class="subtitle-semi-bold">Software Developer</span>
            </div>
            <div><span class="normal-text-light">TCS-FullTime</span></div>
            <div><span class="normal-text-light">Sept 2008 present</span></div>
            <p class="mt25 normal-text-light">Senior Python Developer responsibilities include participating in all phases of the software development lifecycle lifecycle and coaching junior developers. If you’re a seasoned developer with a love for back-end technologies, we’d like to meet you.</p>
          </div>
          <div class="col-12 mt30">
            <div>
              
              <span class="subtitle-semi-bold">Software Developer</span>
            </div>
            <div><span class="normal-text-light">TCS-FullTime</span></div>
            <div><span class="normal-text-light">Sept 2008 present</span></div>
            <p class="mt25 normal-text-light">Senior Python Developer responsibilities include participating in all phases of the software development lifecycle lifecycle and coaching junior developers. If you’re a seasoned developer with a love for back-end technologies, we’d like to meet you.</p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row row-pad-row">
          <div class="profile-col-left mt30">
          </div>
         
        </div>
      </div>
    </div>);
  }

  renderOther = () => {
    return (
      <div>



        <div class="row profile-row-fashion">
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/about.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">Personal Details</span>

          </div>
          <div class="profile-col-right right-sec">
            
          </div>
          <div class="col-12">
            <div class="row row-pad-row">
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Date of Birth</span></div>
                <div><span class="small-text-light">4th may 1993</span></div>
              </div>
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Gender</span></div>
                <div><span class="small-text-light">Male</span></div>
              </div>
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Marital Status</span></div>
                <div><span class="small-text-light">Married</span></div>
              </div>
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Passport ID</span></div>
                <div><span class="small-text-light">LJ24545</span></div>
              </div>
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Work Permit</span></div>
                <div><span class="small-text-light">India US HB</span></div>
              </div>
              <div class="profile-col-left mt30">
                <div><span class="normal-text-medium">Address</span></div>
                <div><span class="small-text-light">Flat 39 D Navi Mumbai Maharastra</span></div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row row-pad-row">
              <div class="profile-col-left mt30">
              </div>
              
            </div>
          </div>
        </div>
      
        <div class="row profile-row-fashion">
          <div class="profile-col-left left-sec-heading">
            <img src="/images/Dashboard-assets/candidate/about.png" alt="Cinque Terre" class="left-sec-icon" />
            <span class="subtitle-semi-bold left-sec-heading-text">Language Known</span>

          </div>
          <div class="profile-col-right">
            <table class="table">
              <thead class="table-thead">
                <tr>
                  <th class="normal-text-medium">LANGUAGE</th>
                  <th class="normal-text-medium">PROFICIENCY</th>
                  <th class="normal-text-medium">READ</th>
                  <th class="normal-text-medium">WRITE</th>
                  <th class="normal-text-medium">SPEAK</th>
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
                  
                </tr>
                <tr>
                  <td>Skill 2</td>
                  <td>Proficient</td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  <td><img src="/images/Dashboard-assets/candidate/correct.png" alt="Cinque Terre" /></td>
                  
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-12">
            <div class="row row-pad-row">
              <div class="profile-col-left mt30">
              </div>
              
            </div>
          </div>
        </div>


      </div>
    );
  }

render() {

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
                    {/* <a class="download-right" href="" onClick={this.downLoadResume}><img alt="" class="edit-icon" src="../images/ActiveJob-JobDetails/Group 555.svg"></img> Download Resume</a> */}
    <h4 class="h4-fashion">John Doe</h4>
                      <span class="subtitle-medium">Software Developer at TCS</span>
                      <hr class="border" />
                      <div class="row">
                        <div class="col">
                          <img src="/images/Dashboard-assets/candidate/location.png" alt="Cinque Terre" />
                          <span class="normal-text-medium mgl-10">Mumbai, India</span>
                        </div>
                        <div class="col">
                          <img src="/images/Dashboard-assets/candidate/mobile.png" alt="Cinque Terre" />
                          <span class="normal-text-medium mgl-10">+91 1234567890</span>
                        </div>
                        <div class="col">
                          <img src="/images/Dashboard-assets/candidate/message.png" alt="Cinque Terre" />
                          <span class="normal-text-medium mgl-10">Johndoe@tcs.com</span>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <Tabs
                    defaultTab="one"
                    onChange={(tabId) => { console.log(tabId) }}
                  >
                    <TabList>
                      <Tab tabFor="one">About</Tab>
                      <Tab tabFor="two">Resume</Tab>
                      <Tab tabFor="three">Skills</Tab>
                      <Tab tabFor="four">Education</Tab>
                      <Tab tabFor="five">Employment</Tab>
                      <Tab tabFor="six">Personal Details</Tab>
                    </TabList>
                    <TabPanel tabId="one">
                      {this.renderAbout()}
                    </TabPanel>
                    <TabPanel tabId="two">
                      {this.renderResume()}
                    </TabPanel>
                    <TabPanel tabId="three">
                      {this.renderSkills()}
                    </TabPanel>
                    <TabPanel tabId="four">
                      {this.renderEducation()}
                    </TabPanel>
                    <TabPanel tabId="five">
                      {this.renderEmployment()}
                    </TabPanel>
                    <TabPanel tabId="six">
                      {this.renderOther()}
                    </TabPanel>
                  </Tabs>


                </div>
                {/* Importing Overview Cards, Top skills card and monthly Report Bar Graph */}

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