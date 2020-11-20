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

const AcceptedInterviews = () => {
  const [resourceJobs, setResourceJobs] = useState([]);
  const [cloneResourceJobs, setCloneResourceJobs] = useState([]);
  const [allResourceJobs, setAllResourceJobs] = useState([]);
  const [pageDataLength, setPageDataLength] = useState(INITIAL_ITEM_LENGTH);
  const [isLoading, setIsLoading] = useState(false);
  let sortMethod = 'recent_First';

  useEffect(() => {
    setIsLoading(true)
    ApiServicesOrgCandidate.fetchInterviewAcceptedByCandidate().then(response => {
      setAllResourceJobs(response);
      const sortJobs = getSortedResourceJobs('recent_First', response)
      setCloneResourceJobs([...sortJobs]);
      setResourceJobs([...sortJobs].slice(0, INITIAL_ITEM_LENGTH));
      setPageDataLength(INITIAL_ITEM_LENGTH)
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
      console.log(error)
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
      setPageDataLength(INITIAL_ITEM_LENGTH)
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
        <section class="content_section">
          <div class="row">
            <div class="col-md-12 py-4">
              <h5 class="job-heading">Accepted Interviews</h5>
              <p class="job-invite mb-0">You have Accepted {cloneResourceJobs && cloneResourceJobs.length ? cloneResourceJobs.length : 0} Jobs, View <span class="job-accepted"><Link to="/candidate/Interviews/InterviewInvites" class="job-accept">Invites interviews</Link></span></p>
            </div>
          </div>
          <section class="bg-white ml-0">
            <div class="">
              <div class="col-md-12 mx-0 py-4 px-4">
                <div className="form-group">
                  <div class="row mx-0 d-flex justify-content-between">
                    <div class="input-group job-search">
                      <input class="form-control py-2 border-right-0 border" type="search" placeholder="Search by job title, skills, location" id="example-search-input" onChange={handleInputChange} />
                      <span class="input-group-append">
                        <div class="input-group-text bg-transparent"><i class="fa fa-search"></i></div>
                      </span>
                    </div>
                    <div class="dropdown">
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
              <div class='jobListItems'>
                {
                  resourceJobs && resourceJobs[0] ? resourceJobs.map((resourceJob, resourceIndex) => {
                    const { jobDetails } = resourceJob;
                    return (
                      <div class="jobListItem">
                        <section class={`row mx-0 px-4 ${resourceIndex !== 0 && 'pt-4'} pb-4`}>
                          <div class="col-md-9 px-0">
                            <div class="row">
                              <div class="col-md-12 job-title">
                                <Link to={`/candidate/jobDetails/${jobDetails.jobId}/accepted`}>
                                  {jobDetails.jobTitle}
                                </Link>
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
                            <div class="float-right">
                              <div class="interview-status">
                                <div class="float-left"><img src="/images/icons/interview_status.svg" /></div>
                                <div class="float-left"> <span>Interview Status</span>
                                  <p>Shortlisted</p></div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 px-0 text-right"><Link to={{ pathname: `/candidate/jobDetails/${jobDetails.jobId}/accepted` }}>view details <img src="/images/icons/view_details_arrow.svg" class="detail-arrow" /></Link></div>
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
export default React.memo(AcceptedInterviews)

