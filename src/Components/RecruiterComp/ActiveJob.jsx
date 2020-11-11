import { Card } from 'primereact/card';
import React, { Component, Fragment } from 'react'
import Footer from '../CommonComp/Footer'
import { Toast } from 'primereact/toast'
import LeftNavProvider from '../CommonComp/LeftNavProvider'
import HeaderAll from '../CommonComp/HeaderAll';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import { Link } from 'react-router-dom';

class ActiveJob extends Component {
  constructor() {
    super();
    this.state = {
      matchingCandidates: [],
      jobDetails: [],
      search: '',
      noOfActiveJobs: '',
      daysPostedAgo: '',
       days: [],
      candidates: [],
      jobId: '',
      jobDescription: [],
      selectedId: [],
      selectValue: ''
    }
    this.activeJobs = new ApiServicesOrg();
    this.MatchingCandidate = new ApiServicesOrg();
    this.inviteCandidate = new ApiServicesOrg();
    this.updateSearch = this.updateSearch.bind(this);
    this.onInviteButtonClick = this.onInviteButtonClick.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
  }
  updateSearch(e) {
    this.setState({ search: e.target.value })
  }

  componentDidMount() {
    //To get all active jobs

    this.activeJobs.getAllActiveJobs()
      .then(Response =>
        {
        //console.log(Response.data.responseObject),
        if(Response.data.responseObject){
          this.setState({
            jobDetails: Response.data.responseObject,
            noOfActiveJobs: Response.data.responseObject.length,
          }, () => {
            this.state.jobDetails && this.state.jobDetails[0] && this.state.jobDetails.map(job => {
              this.MatchingCandidate.getViewAllMatchingCandidate(job.jobId)
                .then(Response => {
  
                  //console.log(Response.data.responseObject)
                  const detail = {
                    jobDescription: job,
                    matchingCandidates: Response.data.responseObject
                  }
                  this.state.candidates.push(detail)
                  this.setState({
                    candidates: this.state.candidates,
                  })
                })
            })
          })
        }}
          )}
          
  onInviteButtonClick = (jobId, candidateId, applicationStatus) => {
    applicationStatus = 'Invite_Sent_By_Recruiter'
    return (
      this.inviteCandidate.putApplicationStatus(jobId, candidateId, applicationStatus)
        .then(Response => {
          console.log(Response)
          this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite send Successfully', life: 2000 })
          window.location.reload()
        })
        .catch(error => {
          console.log("Error Occured..", error)
          this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
        })
    )
  }

  handleDropdownChange(e) {
    const updatedJobs = this.state.candidates.sort((objA, objB) => {
    const dateA = new Date(objA.jobDescription.createdDate).getTime()
    const dateB = new Date(objB.jobDescription.createdDate).getTime()
    const PositionsA = objA.jobDescription.noOfPositionsAvailable-objA.jobDescription.noOfHiredPositions
    const PositionsB = objB.jobDescription.noOfPositionsAvailable-objB.jobDescription.noOfHiredPositions
    if (e.target.value === "recent_First") {
    return dateB - dateA
    } else if (e.target.value === "recent_Last") {
    return dateA - dateB
    } else if(e.target.value ==="unfulfilled_Highest"){
      return PositionsB - PositionsA
    } else if(e.target.value ==="unfulfilled_Lowest"){
      return PositionsA - PositionsB
    }
    });
    this.setState({
    candidates: updatedJobs
    });
    }

    render() {
    const jobs = this.state.jobs
    let candidates = this.state.candidates.filter(
      (data) => {
        //console.log(data)
        return (data.jobDescription.jobTitle.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.jobDescription.primarySkills.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.jobDescription.secondarySkills.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.jobDescription.jobCity.toLowerCase().includes(this.state.search.toLowerCase()))
      }
    );

    return (
      <Fragment>
        <LeftNavProvider></LeftNavProvider>
        <div className="maincontent">
          <div className="content">
            {/*  Header */}
            <HeaderAll></HeaderAll>
            {/* Main Content on the page */}
            <div className="content_section main">
              <Toast ref={(el) => this.toast = el}></Toast>
              <div className=" main">
                {/* top title */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="active_job_heading active_padding">Active Jobs</div>
                    {(this.state.noOfActiveJobs >= 1) ?
                      (<div className="active_job_subtitle active_padding">You have {this.state.noOfActiveJobs} active jobs, View <Link to="/closeJobs" className="font-blue">Closed</Link></div>)
                      :
                      (<div className="active_job_subtitle active_padding">You have no active jobs, View <Link to="/closeJobs" className="font-blue">Closed</Link> </div>)
                    }
                  </div>
                  <div className="col-md-6 text-md-right">
                    <Link to="/createJob"><button className="btn btn-blue">Create New Job</button></Link>
                  </div>
                </div>
                {/* main content display area */}
                <div className="white-middle-section5 mt-4 mb-0 border-bottom">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="input-group">
                        <input className="form-control py-2 border-right-0 border" type="text"
                          placeholder="search by job title, skills, location"
                          value={this.state.search}
                          onChange={this.updateSearch.bind(this)}
                        />
                        <span className="input-group-append">
                          <div className="input-group-text bg-transparent"><i className="fa fa-search"></i></div>
                        </span>
                      </div>
                    </div>
                    
                    <div className="col-md-2 offset-md-6">
                      <select className="form-control" id="dropdown" name="dropdown"
                        onChange={this.handleDropdownChange}>
                        <option value="NA">Sort by</option>
                        <option value="recent_First">Recent First</option>
                        <option value="recent_Last">Recent Last</option>
                        <option value="unfulfilled_Highest">Unfulfilled Positions-Highest to Lowest</option>
                        <option value="unfulfilled_Lowest">Unfulfilled Positions-Lowest to Highest</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* {console.log(this.state.candidates)} */}
                {candidates ? (candidates.map((data, index) =>
                  <div className="white-middle-section5  mt-0 p-0 border-bottom-thin h-100">
                    <div className="px-5 pt-3" key={index}>
                      <div>
                        <span className="mr-3 job-title-text" id="designation">{data.jobDescription.jobTitle}</span>
                        <span className="job-posted-time-text">Posted {data.jobDescription.postedAt} day ago</span>
                      </div>
                      <div>
                        {console.log(data.jobDescription)}
                        <ul className="job-skills">
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/category.svg" />{data.jobDescription.category}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/experience.svg" />{data.jobDescription.experienceReqFrom}-{data.jobDescription.experienceReqTo} years</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/job_role.svg" />{data.jobDescription.employmentType}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/location.svg" />{data.jobDescription.jobCity},{data.jobDescription.jobCountry}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/technology.svg" />{data.jobDescription.primarySkills}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/vaccency.svg" />{data.jobDescription.noOfPositionsAvailable-data.jobDescription.noOfHiredPositions}</li>
                        </ul>
                      </div>
                      <div className="row">
                        {(data.matchingCandidates) ? data.matchingCandidates.slice(0, 3).map((match, index) =>
                          <div className="col-md-4 active-job" key={index} >
                            {/* {console.log(data.jobDescription.jobId)} */}

                            {(match.matchingCandidates === "undefined") ? <h6 className="noMatchingcandidateText">You have no matching candidates</h6> :
                              (<Card className="custom h-100" style={{}} >
                                <div className="row">
                                  <div className="location" className="col-md-8">
                                    {/* {console.log(match)} */}
                                    <h5 id="name">{match.candidate.firstName} {match.candidate.lastName}</h5>
                                    <p id="body">{match.candidate.currentRole} at {match.candidate.company}</p>
                                    <hr></hr>
                                    <i className="pi pi-map-marker mr-2"></i>{match.candidate.city}, {match.candidate.country}
                                  </div>
                                  <div className="col-md-4">
                                    <div style={{ width: 65, height: 65 }}>
                                      <CircularProgressbarWithChildren styles={{
                                        path: {
                                          stroke: '#147AD6',
                                        }
                                      }} strokeWidth={4} value={match.matchingPercentage} >
                                        <strong><span style={{ fontSize: 12 }}>
                                          {match.matchingPercentage}%
                            </span></strong>
                                        <span className="Circular_ProgressBar_text">
                                          Match
                            </span>
                                      </CircularProgressbarWithChildren>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-4" >
                                  <div className="col-md-12 p-0">
                                    <button type="button" id="footer" style={{bottom:"0px", position:"relative"}} className="btn w-100 btn-blue" onClick={() => this.onInviteButtonClick(data.jobDescription.jobId, match.candidate.candidateId)}>Invite</button>
                                  </div>
                                </div>
                              </Card>)}
                          </div>
                        ) : <div className="noMatchingcandidateText">No matching Candidates Found</div>}
                      </div>
                      <div>
                      <div className="job-full-detail text-right text-md-right mt-4 mb-4"><Link to={`/jobPostingCollection/${data.jobDescription.jobId}`}>VIEW Details <img src="/images/icons/view_details_arrow.svg" class="detail-arrow" /></Link></div>
                      </div>
                    </div> 
                  </div>
                 )):
                 <div className=" white-middle-section5 ">You have no active jobs</div>}
              </div>
            </div>
            <Footer></Footer>
          </div>
        </div>
      </Fragment>
    )
  }

}
export default ActiveJob
