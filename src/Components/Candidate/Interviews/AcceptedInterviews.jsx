import React, { useState, useContext, useEffect, Fragment } from 'react'
import HeaderAll from '../../CommonComp/HeaderAll';
import Footer from '../../CommonComp/Footer';
import LeftNavCandidate from '../../CommonComp/LeftNavCandidate'
import { Link } from 'react-router-dom'
import ApiServicesOrgCandidate from '../../../Services/ApiServicesOrgCandidate';

const AcceptedInterviews = () => {
  const [inviteJobs, setInviteJobs] = useState([])
  const [cloneInviteJobs, setCloneInviteJobs] = useState([])
  let sortMethod = '';
  useEffect(() => {
    ApiServicesOrgCandidate.fetchInterviewAcceptedByCandidate().then(response => {
      setCloneInviteJobs(response);
      setInviteJobs(response)
    }).catch(error => {
      console.log(error)
    });
  }, []);

  const handleInputChange = e => {
    const { value } = e.target;
    const updatedInviteJobs = cloneInviteJobs.filter(inviteJob => {
      const { jobDetails } = inviteJob;
      return jobDetails.jobTitle.toLowerCase().includes(value) || jobDetails.jobCity.toLowerCase().includes(value) || jobDetails.primarySkills.toLowerCase().includes(value)
    });
    const sortJobs = getSortedInviteJobs(sortMethod.value, updatedInviteJobs)
    setInviteJobs(sortJobs);
  }

  const getSortedInviteJobs = (value, inviteJobsList) => {
    const updatedInviteJobs = inviteJobsList && inviteJobsList.sort((objA, objB) => {
      const dateA = new Date(objA.createdDate).getTime()
      const dateB = new Date(objB.createdDate).getTime()
      if (value === "recent_First" || '') {
        return dateB - dateA
      } else if (value === "recent_Last") {
        return dateA - dateB
      }
    });
    return updatedInviteJobs;
  }

  const handleDropdownChange = e => {
    const { value } = e.target;
    const sortJobs = getSortedInviteJobs(value, inviteJobs)
    console.log('aa', sortJobs)
    setInviteJobs(sortJobs);
  }
  console.log(inviteJobs)
  return (
    <Fragment>
      <LeftNavCandidate></LeftNavCandidate>
      <div className="maincontent">
        <HeaderAll isCandidate={true}></HeaderAll>
        <section class="content_section">
          <div class="row">
            <div class="col-md-12 pb-2 pt-2">
              <h5 class="job-heading">Accepted Interviews</h5>
              <p class="job-invite">You have {inviteJobs && inviteJobs.length ? inviteJobs.length : 0} accepted, View <span class="job-accepted"><Link to="/candidate/Interviews/InterviewInvites" class="job-accept">INTERVIEW INVITES</Link></span></p>
            </div>
          </div>
          <section class="white-middle-section ml-0 mr-1">
            <div class="row">
              <div class="col-md-12 pb-5">
                <div className="form-group">
                  <div class="row">
                    <div class="col-md-5">
                      <div class="input-group job-search">
                        <input class="form-control py-2 border-right-0 border" type="text" placeholder="Search by job title, skills, location" id="example-search-input" onChange={handleInputChange}/>
                        <span class="input-group-append">
                          <div class="input-group-text bg-transparent"><i class="fa fa-search"></i></div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="dropdown float-right">
                    <select ref={input => sortMethod = input} className="form-control" id="dropdown" name="dropdown"
                      onChange={handleDropdownChange}>
                      <option value="">Sort by</option>
                      <option value="recent_First">Recent First</option>
                      <option value="recent_Last">Recent Last</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {
              inviteJobs && inviteJobs[0] && inviteJobs.map(inviteJob => {
                console.log(inviteJob)
                const { jobDetails } = inviteJob;
                return (
                  <section class="job-white-card pb-4">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="row">
                          <div class="col-md-12 job-title">
                            <a href="">
                              {jobDetails.jobTitle}
                            </a>
                            <span class="ml-3 job-posting">Posted {jobDetails.postedAt} day ago</span>
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
                        <h6 class="job-desc">Job Description</h6>
                        {jobDetails.jobDescription}
                      </div>
                      <div class="col-md-3 ">
                        <div class="job-circle float-right">
                          <div class="job-text-wrap">
                            <span>{inviteJob.matchingPercentage}%</span>
                            <span>Match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row float-right job-full-detail"><Link to={{pathname: `/candidate/interviews/AcceptedInviteJobDetails/${jobDetails.jobId}`}}>view details <img src="/images/icons/view_details_arrow.svg" class="detail-arrow" /></Link></div>
                  </section>
                )
              })
            }
          </section>

        </section>
        <Footer></Footer>
      </div>
    </Fragment >
  );
}
export default AcceptedInterviews;

