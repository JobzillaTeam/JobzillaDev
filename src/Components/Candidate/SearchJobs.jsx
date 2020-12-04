import React, { useState, useEffect, Fragment } from 'react'
import HeaderAll from '../CommonComp/HeaderAll';
import Footer from '../CommonComp/Footer';
import LeftNavCandidate from '../CommonComp/LeftNavCandidate'
import { Link } from 'react-router-dom'
import ApiServicesOrgCandidate from '../../Services/ApiServicesOrgCandidate';
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollUpButton from "react-scroll-up-button";
import RenderLoader from '../CommonComp/Loader';
import { INITIAL_ITEM_LENGTH } from '../../Utils/AppConst';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar'

const SearchJobs = () => {
  const [resourceJobs, setResourceJobs] = useState([]);
  const [cloneResourceJobs, setCloneResourceJobs] = useState([]);
  const [allResourceJobs, setAllResourceJobs] = useState([]);
  const [pageDataLength, setPageDataLength] = useState(INITIAL_ITEM_LENGTH);
  const [isLoading, setIsLoading] = useState(false);
  let sortMethod = 'recent_First';

  useEffect(() => {
    setIsLoading(true)
    ApiServicesOrgCandidate.fetchJobListForCandidate().then(response => {
      const jobListResponse = response && response[0] ? response.map(res =>  ({jobDetails: res})) : [];
      setAllResourceJobs(jobListResponse );
      const sortJobs = getSortedResourceJobs('recent_First', jobListResponse )
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
      const dateA = new Date(objA.jobDetails.createdDate).getTime()
      const dateB = new Date(objB.jobDetails.createdDate).getTime()
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
  const getPath = (jobId, applicationStatus) => {
    if (!applicationStatus) {
      return ({
        pathname: `/candidate/jobDetails/searchJobs/${jobId}/?isFreshJob=true`,
        isFreshJob: true
      })
    } else {
      const pathFor = applicationStatus === 'Invite_Sent_By_Recruiter' ? 'invites' : 'searchJobs'
      return ({
        pathname: `/candidate/jobDetails/${pathFor}/${jobId}`
      });
    }
  }
  
  return (
    <Fragment>
      <LeftNavCandidate></LeftNavCandidate>
      <div className="maincontent">
        <HeaderAll isCandidate={true}></HeaderAll>
        <section class="content_section">
          <div class="row">
            <div class="col-md-12 py-4">
              <h5 class="job-heading">Job Listings</h5>
              <p class="job-invite mb-0">You have {cloneResourceJobs && cloneResourceJobs.length ? cloneResourceJobs.length : 0} Jobs</p>
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
                                <Link to={getPath(jobDetails.jobId, jobDetails.applicationStatus)}>
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
                            <h6 class="job-desc mt-3">Job Description</h6>
                            {jobDetails.jobDescription}
                          </div>
                          <div class="col-md-3 px-0">
                            <div class="job-circle float-right">
                              <div class="job-text-wrap">
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
                          <div class="col-12 px-0 text-right"><Link to={getPath(jobDetails.jobId, jobDetails.applicationStatus)}>view details <img src="/images/icons/view_details_arrow.svg" class="detail-arrow" /></Link></div>
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
export default React.memo(SearchJobs)

