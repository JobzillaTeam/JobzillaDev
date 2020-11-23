import React, { useEffect, Fragment, useState } from 'react'
import HeaderAll from '../CommonComp/HeaderAll';
import LeftNavCandidate from '../CommonComp/LeftNavCandidate'
import Footer from '../CommonComp/Footer'
import { Link, useHistory } from 'react-router-dom'
import ApiServicesOrgCandidate from '../../Services/ApiServicesOrgCandidate';
import ApiServicesOrg from '../../Services/ApiServicesOrg';

const CandidateJobDetails = (props) => {
  const jobID = props.match.params.jobID;
  const jobStatus = props.match.params.jobStatus;
  const [JobAndCandidateDetails, setJobAndCandidateDetails] = useState();
  const [isActionButtonsVisible, setIsActionButtonsVisible] = useState(false);
  let history = useHistory();
  useEffect(() => {
    ApiServicesOrgCandidate.getJobAndCandidateDetailsByIds(jobID)
      .then(response => {
        if (response) {
          const { applicationStatus } = response;
          console.log('applicationStatus', applicationStatus)
          if (jobStatus === 'recentMatches' || jobStatus === 'searchJobs') {
            if (applicationStatus === 'Invite_Sent_By_Recruiter') {
              history.push(`/candidate/jobDetails/${jobID}/invites`)
            } else if (applicationStatus === 'Application_Matched') {
              setIsActionButtonsVisible(true)
            }
          }
          else if (jobStatus === 'invites' && applicationStatus === 'Invite_Sent_By_Recruiter') {
            setIsActionButtonsVisible(true)
          }
          setJobAndCandidateDetails(response)
        }
      });
  }, [])
  const handleStatusUpdate = (e, isAccepted) => {
    let status = '';
    if (jobStatus === 'invites') {
      status = isAccepted ? 'Invite_Accepted_By_Candidate' : 'Invite_Declined_By_Candidate'
    } else if (jobStatus === 'searchJobs' || jobStatus === 'recentMatches') {
      status = isAccepted ? 'Application_Sent_By_Candidate' : ''
      if (!isAccepted) {
        history.goBack();
      }
    }
    const candidateId = localStorage.getItem('candidateId');
    new ApiServicesOrg().updateApplicationStatus(jobID, candidateId, status)
      .then(Response => {
        const interviewStatusResponse = Response && Response.data && Response.data.responseObject && Response.data.responseObject.applicationStatus;
        if (interviewStatusResponse === 'Invite_Accepted_By_Candidate') {
          history.push(`/candidate/jobDetails/${jobDetails.jobId}/accepted`);
        } else if (interviewStatusResponse === 'Invite_Declined_By_Candidate') {
          history.goBack();
        }
        setIsActionButtonsVisible(false)
      });
  }
  const { jobDetails } = JobAndCandidateDetails || {};
  const primaryButtonName = jobStatus === 'searchJobs' || jobStatus === 'recentMatches' ? 'Apply' : 'Accept'
  const secondaryButtonName = jobStatus === 'searchJobs' || jobStatus === 'recentMatches' ? 'Cancel' : 'Decline'
  let perviousLink = '';
  let perviousLinkText = '';
  switch (jobStatus) {
    case 'invites': {
      perviousLink = '/candidate/Interviews/InterviewInvites';
      perviousLinkText = 'Interview Invites';
    }
      break;
    case 'accepted': {
      perviousLink = '/candidate/Interviews/AcceptedInterviews';
      perviousLinkText = 'Accepted Interviews';
    }
      break;
    case 'jobOffers': {
      perviousLink = '/candidate/JobOffers';
      perviousLinkText = 'Job Offers';
    }
      break;
    case 'searchJobs': {
      perviousLink = '/candidate/SearchJobs';
      perviousLinkText = 'Job Listings';
    }
      break;
    case 'recentMatches': {
      perviousLink = '/candidate/Dashboard';
      perviousLinkText = 'Recent Matches';
    }
      break;
  }
  return (
    <Fragment>
      <LeftNavCandidate></LeftNavCandidate>
      <div className="maincontent">
        <HeaderAll isCandidate={true}></HeaderAll>
        <div className="content_section">
          <div class="row">
            <div class="col-md-12 py-4">
              <h5 class="job-heading"><Link to={perviousLink}>{perviousLinkText}</Link> > Job Details</h5>
            </div>
          </div>
          {jobDetails && <div>
            <div className="card mb-4">
              <div className="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-12 job-title-link align-items-center" style={{ display: 'flex' }}>
                        <a href="#"><h5> {jobDetails.jobTitle}</h5></a>
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

            <div className="card my-4">
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
                  <button type="button" className="btn btn-primary" onClick={e => handleStatusUpdate(e, true)}>{primaryButtonName}</button>
                  <button type="button" className="btn btn-outline-primary ml-4" onClick={e => jobStatus === 'searchJobs' || jobStatus === 'recentMatches' ? history.goBack() : handleStatusUpdate(e, false)}>{secondaryButtonName}</button>
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
export default React.memo(CandidateJobDetails);