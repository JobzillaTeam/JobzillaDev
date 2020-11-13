import React, { useEffect, Fragment, useState } from 'react'
import HeaderAll from '../../CommonComp/HeaderAll';
import LeftNavCandidate from '../../CommonComp/LeftNavCandidate'
import Footer from '../../CommonComp/Footer'
import { Link, useHistory } from 'react-router-dom'
import ApiServicesOrg from '../../../Services/ApiServicesOrg';


const InterviewInvitesJobdetails = (props) => {
  const jobID = props.match.params.jobID;
  const applicationStatus = props.match.params.applicationStatus;
  const isBottomActionButtonsVisible = applicationStatus === 'Invite_Sent_By_Recruiter';
  const [jobDetails, setJobDetails] = useState();
  const [isActionButtonsVisible, setIsActionButtonsVisible] = useState(isBottomActionButtonsVisible);
  let history = useHistory();
  useEffect(() => {
    new ApiServicesOrg().getAllJobDetails(jobID)
      .then(Response => {
        if (Response && Response.data && Response.data.responseObject) {
          setJobDetails(Response.data.responseObject)
        }
      });
  }, [])
  const handleStatusUpdate = (e, isAccepted) => {
    const status = isAccepted ? 'Invite_Accepted_By_Candidate' : 'Invite_Declined_By_Candidate'
    const candidateId = localStorage.getItem('candidateId');
    new ApiServicesOrg().updateApplicationStatus(jobID, candidateId, status)
      .then(Response => {
        const isVisible = Response && Response.responseObject && Response.responseObject.applicationStatus === 'Invite_Sent_By_Recruiter'
        setIsActionButtonsVisible(isVisible);
        history.goBack()
      })
  }
  return (
    <Fragment>
      <LeftNavCandidate></LeftNavCandidate>
      <div className="maincontent">
        <HeaderAll isCandidate={true}></HeaderAll>
        <div className="container-fluid">
          <div aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/candidate/interviews/interviewInvites">Interview Invites</Link></li>
              <li class="breadcrumb-item active" aria-current="page">Job Details</li>
            </ol>
          </div>
          {jobDetails && <div>
            <div className="card job_details">
              <div className="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-12 job-title-link">
                        <a href=""> {jobDetails.jobTitle}</a>
                        <span class="job-posting"> Posted {jobDetails.postedAt} day ago</span>
                      </div>
                    </div>
                    <ul class="job-skills">
                      <li><img src="/images/icons/category.svg" />{jobDetails.category}</li>
                      <li><img src="/images/icons/experience.svg" />{jobDetails.experienceReqFrom}-{jobDetails.experienceReqTo} years</li>
                      <li><img src="/images/icons/job_role.svg" />{jobDetails.employmentType}</li>
                      <li><img src="/images/icons/location.svg" />{jobDetails.jobCity}, {jobDetails.jobCountry}</li>
                      <li><img src="/images/icons/technology.svg" /> {jobDetails.primarySkills}</li>
                      <li><img src="/images/icons/vaccency.svg" />{jobDetails.noOfPositionsAvailable}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card content_card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="content_headings">
                      <span><img src="/images/icons/skills.svg" /></span>
                      <h6 >Nice to have</h6>
                      <span>{jobDetails.primarySkills}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="content_headings">
                      <span><img src="/images/icons/salary.svg" /></span>
                      <h6 >Annual Salary</h6>
                      <span>{jobDetails.annualSalaryFrom} - {jobDetails.annualSalaryTo} Lakh</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <div className="content_headings">
                      <span><img src="/images/icons/job_desc.svg" /></span>
                      <h6 >Job Description</h6>
                      {jobDetails.jobDescription}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="content_headings">
                      <span><img src="/images/icons/responsibilities.svg" /></span>
                      <h6>Responsibilities</h6>
                      {jobDetails.responsibilities}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="content_headings">
                      <span><img src="/images/icons/others.svg" /></span>
                      <h6>Others</h6>
                      <div className="row">
                        <div className="col-xs-12 col-md-5 others_section_firstcol">
                          <div>Working Hours</div>
                        </div>
                        <div className="col-xs-12 col-md-6 others_section_secondcol">
                          <div>{jobDetails.expectedWorkinghrsFrom}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-md-5 others_section_firstcol">
                          <div>Visa</div>
                        </div>
                        <div className="col-xs-12 col-md-6 others_section_secondcol">
                          <div>{jobDetails.visa ? 'Nice to have H1B' : ''}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-md-5 others_section_firstcol">
                          <div>Passport</div>
                        </div>
                        <div className="col-xs-12 col-md-6 others_section_secondcol">
                          <div>{jobDetails.mustHavePasport ? 'Must have Passport' : ''} </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                {isActionButtonsVisible && <div className="action_buttons">
                  <button type="button" className="btn btn-primary" onClick={e => handleStatusUpdate(e, true)}>Accept</button>
                  <button type="button" className="btn btn-outline-primary ml-4" onClick={e => handleStatusUpdate(e, false)}>Decline</button>
                </div>}

              </div>
            </div>
          </div>}

        </div>
        <Footer></Footer>
      </div>
    </Fragment>
  )
}
export default InterviewInvitesJobdetails;

