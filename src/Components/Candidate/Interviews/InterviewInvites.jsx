import React, { useState, useEffect, Fragment } from 'react'
import HeaderAll from '../../CommonComp/HeaderAll';
import Footer from '../../CommonComp/Footer';
import LeftNavCandidate from '../../CommonComp/LeftNavCandidate'
import { Link } from 'react-router-dom'
import ApiServicesOrgCandidate from '../../../Services/ApiServicesOrgCandidate';
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollUpButton from "react-scroll-up-button";
import RenderLoader from '../../CommonComp/Loader';
import { INITIAL_ITEM_LENGTH } from '../../../Utils/AppConst';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar'

const InterviewInvites = () => {
  const [resourceJobs, setResourceJobs] = useState([]);
  const [cloneResourceJobs, setCloneResourceJobs] = useState([]);
  const [allResourceJobs, setAllResourceJobs] = useState([]);
  const [pageDataLength, setPageDataLength] = useState(INITIAL_ITEM_LENGTH);
  const [isLoading, setIsLoading] = useState(false);
  let sortMethod = 'recent_First';

  useEffect(() => {
    setIsLoading(true)
    ApiServicesOrgCandidate.fetchInterviewInvitesForCandidate().then(response => {
      setAllResourceJobs(response);
      const sortJobs = getSortedResourceJobs('recent_First', response)
      setCloneResourceJobs([...sortJobs]);
      setResourceJobs([...sortJobs].slice(0, INITIAL_ITEM_LENGTH));
      setPageDataLength(INITIAL_ITEM_LENGTH)
      setIsLoading(false);
    }).catch(error => {
      // console.log(error);
      setIsLoading(false);
    });
  }, []);

  const handleInputChange = e => {
    setIsLoading(true);
    let { value } = e.target;
    value = value ? value.toLowerCase() : '';
    if (allResourceJobs && allResourceJobs[0]) {
      const updatedResourceJobs = allResourceJobs.filter(resourceJob => {
        const { jobDetails } = resourceJob;
        if (jobDetails) {
          let { jobTitle, jobCity, primarySkills } = jobDetails;
          jobTitle = jobTitle ? jobTitle.toLowerCase() : '';
          jobCity = jobCity ? jobCity.toLowerCase() : '';
          primarySkills = primarySkills ? primarySkills.toLowerCase() : '';
          return jobTitle.includes(value) || jobCity.includes(value) || primarySkills.includes(value)
        }
      });
      const sortJobs = getSortedResourceJobs(sortMethod.value, updatedResourceJobs)
      setCloneResourceJobs([...sortJobs])
      setResourceJobs([...sortJobs].slice(0, INITIAL_ITEM_LENGTH));
      setPageDataLength(INITIAL_ITEM_LENGTH);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  const getSortedResourceJobs = (value, resourceJobsListView) => {
    const updatedResourceJobs = resourceJobsListView && resourceJobsListView.sort((objA, objB) => {
      const dateA = new Date(objA.createdDate).getTime()
      const dateB = new Date(objB.createdDate).getTime()
      if (value === "recent_First" || '') {
        return dateB - dateA
      } else if (value === "recent_Last") {
        return dateA - dateB
      }
    });
    return updatedResourceJobs;
  }

  const handleDropdownChange = e => {
    const { value } = e.target;
    const sortJobs = getSortedResourceJobs(value, cloneResourceJobs)
    setCloneResourceJobs([...sortJobs]);
    setResourceJobs([...sortJobs].slice(0, INITIAL_ITEM_LENGTH));
    setPageDataLength(INITIAL_ITEM_LENGTH)
  }

  const fetchMoreResourceJobs = () => {
    setTimeout(() => {
      setResourceJobs([...cloneResourceJobs].slice(0, (pageDataLength + INITIAL_ITEM_LENGTH)));
      setPageDataLength(pageDataLength + INITIAL_ITEM_LENGTH);
    }, 500);
  }

  return (
    <Fragment>
      <LeftNavCandidate></LeftNavCandidate>
      <div className="maincontent">
        <HeaderAll isCandidate={true}></HeaderAll>
        <section className="content_section">
          <div className="row">
            <div className="col-md-12 py-4">
              <h5 className="job-heading">Interview Invites</h5>
              <p className="job-invite mb-0">You have {cloneResourceJobs && cloneResourceJobs.length ? cloneResourceJobs.length : 0} invites, View <span className="job-accepted"><Link to="/candidate/Interviews/AcceptedInterviews" className="job-accept">Accepted interviews</Link></span></p>
            </div>
          </div>
          <section className="bg-white ml-0">
            <div className="">
              <div className="col-md-12 mx-0 py-4 px-4">
                <div className="form-group">
                  <div className="row mx-0 d-flex justify-content-between">
                    <div className="input-group job-search">
                      <input className="form-control py-2 border-right-0 border" type="search" placeholder="Search by job title, skills, location" id="example-search-input" onChange={handleInputChange} />
                      <span className="input-group-append">
                        <div className="input-group-text bg-transparent"><i className="fa fa-search"></i></div>
                      </span>
                    </div>
                    <div className="sortDropdown mx-10 justify-content-between">
                    <div className="input-group sortBy"></div>
                      <select ref={input => sortMethod = input} className="form-control" id="dropdown" name="dropdown"
                        onChange={handleDropdownChange}>
                        <option value="" disabled>Sort by</option>
                        <option value="recent_First">Recent First</option>
                        <option value="recent_Last">Recent Last</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InfiniteScroll
              dataLength={resourceJobs.length}
              next={fetchMoreResourceJobs}
              hasMore={cloneResourceJobs.length >= pageDataLength}
              loader={<RenderLoader />}
            >
              <div className='jobListItems'>
                {
                  resourceJobs && resourceJobs[0] ? resourceJobs.map((resourceJob, resourceIndex) => {
                    const { jobDetails } = resourceJob;
                    return (
                      <div className="jobListItem " key={jobDetails.jobId}>
                        <section className={`row mx-0 px-4 ${resourceIndex !== 0 && 'pt-4'} pb-4`}>
                          <div className="col-md-9 px-0">
                            <div className="row">
                              <div className="col-md-12 job-title">
                                <Link to={`/candidate/jobDetails/invites/${jobDetails.jobId}`}>
                                  {jobDetails.jobTitle}
                                </Link>
                                <span className="ml-3 job-posting">Posted {jobDetails.postedAt} day ago</span>
                                <span className="ml-3 job-posting">{jobDetails.orgName}</span>
                              </div>
                            </div>
                            <ul className="job-skills">
                              <li><img src="/images/icons/category.svg" />{jobDetails.category}</li>
                              <li><img src="/images/icons/experience.svg" />{jobDetails.experienceReqFrom}-{jobDetails.experienceReqTo} years</li>
                              <li><img src="/images/icons/job_role.svg" />{jobDetails.employmentType}</li>
                              <li><img src="/images/icons/location.svg" />{jobDetails.jobCity}, {jobDetails.jobCountry}</li>
                              <li><img src="/images/icons/technology.svg" /> {jobDetails.primarySkills}</li>
                              <li><img src="/images/icons/vaccency.svg" />{jobDetails.noOfPositionsAvailable}</li>
                            </ul>
                            <h6 className="job-desc mt-3">Job Description</h6>
                            {jobDetails.jobDescription}
                          </div>
                          <div className="col-md-3 px-0">
                            <div className="job-circle float-right">
                              <div className="job-text-wrap">
                              <div style={{ width: 65, height: 65 }}>
                                  <CircularProgressbarWithChildren styles={{
                                      path: {
                                              stroke: '#147AD6',
                                      }
                                  }} strokeWidth={4} value={resourceJob.matchingPercentage} >
                                    <strong><span style={{ fontSize: 12 }}>
                                    {resourceJob.matchingPercentage}%
                                      </span></strong>
                                      <span className="Circular_ProgressBar_text">
                                          Match
                                      </span>
                                  </CircularProgressbarWithChildren>
                                </div>
                              </div>
                            </div>
                            </div>
                          <div className="col-12 px-0 text-right marB10"><Link to={{ pathname: `/candidate/jobDetails/invites/${jobDetails.jobId}` }}>view details <img src="/images/icons/view_details_arrow.svg" className="detail-arrow" /></Link></div>
                        </section>
                      </div>
                    )
                  }) : null
                }
                {isLoading ? <RenderLoader /> : null}
              </div>
            </InfiniteScroll>
            <ScrollUpButton />
          </section>
        </section>
        <Footer></Footer>
      </div>
    </Fragment >
  );
}
export default React.memo(InterviewInvites)

