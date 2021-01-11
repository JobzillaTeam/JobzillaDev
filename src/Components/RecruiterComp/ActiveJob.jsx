import React, { Fragment } from 'react'
import HeaderAll from '../CommonComp/HeaderAll';
import Footer from '../CommonComp/Footer';
import LeftNavCandidate from '../CommonComp/LeftNavCandidate'
import { Link } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollUpButton from "react-scroll-up-button";
import RenderLoader from '../CommonComp/Loader';
import { INITIAL_ITEM_LENGTH } from '../../Utils/AppConst';
import ApiServicesOrgRecruiter from '../../Services/ApiServicesOrgRecruiter';
import ClosedJobCandidates from './RecruiterJobPosting/ClosedJobCandidates';
import LeftNavProvider from '../CommonComp/LeftNavProvider';
import ApiServicesOrg from '../../Services/ApiServicesOrg';
import MatchingCandidate from './RecruiterJobPosting/MatchingCandidate';
import ActiveJobCandidates from './RecruiterJobPosting/ActiveJobCandidates';
import { Toast } from 'primereact/toast'

class ActiveJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceJobs: [],
      cloneResourceJobs: [],
      allResourceJobs: [],
      pageDataLength: [],
      isLoading: false
    }
    this.sortMethod = 'recent_First';
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getSortedResourceJobs = this.getSortedResourceJobs.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.fetchMoreResourceJobs = this.fetchMoreResourceJobs.bind(this);
  }

  componentDidMount() {
    new ApiServicesOrg().getAllActiveJobs().then(response => {
      if (response && response.data && response.data.responseObject) {
        const { responseObject } = response.data;
        const sortJobs = this.getSortedResourceJobs('recent_First', responseObject)
        this.setState({
          allResourceJobs: responseObject,
          cloneResourceJobs: [...sortJobs],
          resourceJobs: [...sortJobs].slice(0, INITIAL_ITEM_LENGTH),
          pageDataLength: INITIAL_ITEM_LENGTH,
          isLoading: false
        })
      }
    }).catch(error => {
      // console.log(error);
      this.setState({
        isLoading: false
      })
    });
  }

  handleInputChange = e => {
    let { value } = e.target;
    const { allResourceJobs, } = this.state;
    this.setState({
      isLoading: true
    }, () => {
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
        const sortJobs = this.getSortedResourceJobs(this.sortMethod.value, updatedResourceJobs)
        this.setState({
          cloneResourceJobs: [...sortJobs],
          resourceJobs: [...sortJobs].slice(0, INITIAL_ITEM_LENGTH),
          pageDataLength: INITIAL_ITEM_LENGTH,
          isLoading: false
        })
      } else {
        this.setState({ isLoading: false })
      }
    })
  }

  getSortedResourceJobs = (value, resourceJobsListView) => {
    const updatedResourceJobs = resourceJobsListView && resourceJobsListView.sort((objA, objB) => {
      const dateA = new Date(objA.jobDetails.createdDate).getTime()
      const dateB = new Date(objB.jobDetails.createdDate).getTime()
      const PositionsA = objA.jobDetails.noOfHiredPositions;
      const PositionsB = objB.jobDetails.noOfHiredPositions;
      if (value === "recent_First" || '') {
        return dateB - dateA
      } else if (value === "recent_Last") {
        return dateA - dateB
      } else if (value === "unfulfilled_Highest") {
        return PositionsB - PositionsA;
      } else if (value === "unfulfilled_Lowest") {
        return PositionsA - PositionsB;
      }
    });
    return updatedResourceJobs;
  }

  handleDropdownChange = e => {
    const { value } = e.target;
    const { cloneResourceJobs } = this.state;
    const sortJobs = this.getSortedResourceJobs(value, cloneResourceJobs)
    this.setState({
      cloneResourceJobs: [...sortJobs],
      resourceJobs: [...sortJobs].slice(0, INITIAL_ITEM_LENGTH),
      pageDataLength: INITIAL_ITEM_LENGTH
    })
  }

  fetchMoreResourceJobs = () => {
    const { cloneResourceJobs, pageDataLength } = this.state;
      if (cloneResourceJobs.length >= pageDataLength) {
        this.setState({
          resourceJobs: [...cloneResourceJobs].slice(0, (pageDataLength + INITIAL_ITEM_LENGTH)),
          pageDataLength: pageDataLength + INITIAL_ITEM_LENGTH
        })
      }
  }
  render() {
    const { cloneResourceJobs, pageDataLength, isLoading, resourceJobs } = this.state;
    return (
      <Fragment>
        <LeftNavProvider></LeftNavProvider>
        <div className="maincontent">
          <HeaderAll></HeaderAll>
          <section class="content_section">
            <Toast className="toast_padding" ref={(el) => this.toast = el}></Toast>
            <div class="row py-4">
              <div class="col-md-6">
                <h5 class="job-heading">Active Jobs</h5>
                <p class="job-invite mb-0">You have {cloneResourceJobs && cloneResourceJobs.length ? cloneResourceJobs.length : 0} Active jobs, View <span class="job-accepted"><Link to="/closeJobs" class="job-accept">Closed</Link></span></p>
              </div>
              <div className="col-md-6 text-md-right">
                <Link to="/createJob">
                  <button className="btn btn-blue">Create New Job</button>
                </Link>
              </div>
            </div>
            <section class="ml-0">
              <div class="bg-white">
                <div class="col-md-12 mx-0 py-4 px-4">
                  <div className="form-group">
                    <div class="row mx-0 d-flex justify-content-between">
                      <div class="input-group job-search">
                        <input class="form-control py-2 border-right-0 border" type="search" placeholder="Search by job title, skills, location" id="example-search-input" onChange={this.handleInputChange} />
                        <span class="input-group-append">
                          <div class="input-group-text bg-transparent"><i class="fa fa-search"></i></div>
                        </span>
                      </div>
                      <div class="dropdown">
                        <select ref={input => this.sortMethod = input} className="form-control" id="dropdown" name="dropdown"
                          onChange={this.handleDropdownChange}>
                          <option value="" disabled>Sort by</option>
                          <option value="recent_First">Recent First</option>
                          <option value="recent_Last">Recent Last</option>
                          <option value="unfulfilled_Highest">
                            Unfulfilled Positions-Highest to Lowest
                          </option>
                          <option value="unfulfilled_Lowest">
                            Unfulfilled Positions-Lowest to Highest
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <InfiniteScroll
                dataLength={resourceJobs.length}
                next={this.fetchMoreResourceJobs}
                hasMore={cloneResourceJobs.length > 0 && cloneResourceJobs.length >= pageDataLength}
                loader={<RenderLoader />}
              >
                <div>
                  {
                    resourceJobs && resourceJobs[0] ? resourceJobs.map((resourceJob, resourceIndex) => {
                      const { jobDetails, candidateRecruitmentList } = resourceJob;
                      return (
                        <div class="bg-white mb-4">
                          <section class={`row mx-0 px-4 ${resourceIndex !== 0 && 'pt-4'} pb-4`}>
                            <div class="col-md-12 px-0">
                              <div class="row">
                                <div class="col-md-12 job-title">
                                  <Link to={`/recruiter/jobDetails/active/${jobDetails.jobId}`}>
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
                            </div>
                          </section>
                          <ActiveJobCandidates toast={this.toast} matchingCandidates={candidateRecruitmentList} jobId={jobDetails.jobId} />
                          <div class="mx-0 px-4 col-12 text-right pb-3"><Link to={{ pathname: `/recruiter/jobDetails/active/${jobDetails.jobId}` }}>view details <img src="/images/icons/view_details_arrow.svg" class="detail-arrow" /></Link></div>
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
}
export default React.memo(ActiveJob)