import { Card } from 'primereact/card';
import React, { Component, Fragment } from 'react'
import Footer from '../CommonComp/Footer'
import { Toast } from 'primereact/toast'
//import { InputText } from 'primereact/inputtext';
import LeftNavProvider from '../CommonComp/LeftNavProvider'
//import { Dropdown } from 'primereact/dropdown';
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
      jobs: [],
      activeJobIds: [],
      candidateId: [],
      days: [],
      candidates: [],
      jobId: '',
      jobDescription: [],
      selectedId: [],
      positions : '',
      selectValue : null
    }
    this.activeJobs = new ApiServicesOrg();
    this.MatchingCandidate = new ApiServicesOrg();
    this.inviteCandidate = new ApiServicesOrg();
    this.updateSearch = this.updateSearch.bind(this);
    this.onInviteButtonClick = this.onInviteButtonClick.bind(this);
    this.dateDiffInDays =this.dateDiffInDays.bind(this)
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
  }
  updateSearch(e) {
    this.setState({ search: e.target.value })
  }

  componentDidMount() {
    //To get all active jobs

    this.activeJobs.getAllActiveJobs()
      .then(Response =>
        //console.log(Response.data.responseObject),
        this.setState({
          jobDetails: Response.data.responseObject,
          noOfActiveJobs: Response.data.responseObject.length,
          daysPostedAgo: (Response.data.responseObject).map((day) => {
            this.state.days.push(day.createdDate).toString()
          })
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
        }
        )
      )
  }

  onInviteButtonClick = (jobId,candidateId,applicationStatus) => {
     applicationStatus = 'Invite_Sent'
    return (
      this.inviteCandidate.putApplicationStatus(jobId,candidateId,applicationStatus)
        .then(Response => {
          console.log(Response)
          // this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite send Successfully', life: 2000 })
          window.location.reload()
        })
        .catch(error => {
          console.log("Error Occured..", error)
          this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
        })
    )

  }


  sortByUnfulfilfilledHighest=()=>{
    this.setState(prevState => {
      this.state.candidates.map((data)=>{
        const positions=data.jobDescription.noOfPositionsAvailable
      },console.log(this.state.positions))
  });
  }

  // sortByRecentFirst = () => {
  //   this.setState({
  //     jobDetails: this.state.jobDetails.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
  //   }, console.log(this.stata.jobDetails))
  // }

  sortByRecentLast = () => {
    this.setState({
      jobDetails: this.state.jobDetails.reverse()
    })
  }
  getCurrentDate() {
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const currDate = date;
    return currDate;
    console.log(currDate)
  }

  dateDiffInDays(date1, date2) {
    // round to the nearest whole number
    return Math.round((date2-date1)/(1000*60*60*24));
}
handleDropdownChange=(e)=>{
  let selectValue= this.state.selectValue;
  selectValue[e.target.name] = e.target.value;
  this.setState({
    selectValue 
  },console.log(this.state.selectValue))
}



  render() {
    var tempDate = new Date();
    var date2 = []
    var date1 = []
    var day = []
    var month = []
    var year = []
    var fullDate = []
    var date = new Date();
    var day, moth,year,tempDate,date5,currDate,d;
   var daysDiff=[]

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
                    {/* <button className="btn btn-blue">Create New Job</button> */}
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
                       onChange={ (e) => {this.handleDropdownChange(e)}}> 
                        <option value="NA">Sort by</option>
                        <option value="1">Recent First</option>
                        <option value="2">Recent Last</option>
                        <option value="3">Unfulfilled Positions-Highest to Lowest</option>
                        <option value="4">Unfulfilled Positions-Lowest to Highest</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* {console.log(this.state.candidates)} */}
                {candidates ? (candidates.map((data, index) =>
                
                  <div className="white-middle-section5  mt-0 p-0 border-bottom-thin">
                    
                    <div className="px-5 pt-3">
                      <div>
                      {
                              d=new Date(data.jobDescription.createdDate),
                              day = d.getDate(),
                               month = d.getMonth()+1,
                               year = d.getFullYear(),
                               fullDate = year + '-' + month + '-' + day,
                               tempDate = new Date(),
                               date5 = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate(),
                               currDate = date5,
                             daysDiff=this.dateDiffInDays(new Date(fullDate), new Date(currDate))
                          
                        }
                        <span className="mr-3 job-title-text" id="designation">{data.jobDescription.jobTitle}</span>
                        <span className="job-posted-time-text">Posted {daysDiff} day ago</span>
                      </div>
                      <div>
                        <ul className="job-skills">
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/category.svg" />{data.jobDescription.category}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/experience.svg" />{data.jobDescription.experienceReqFrom}-{data.jobDescription.experienceReqTo} years</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/job_role.svg" />{data.jobDescription.employmentType}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/location.svg" />{data.jobDescription.jobCity},{data.jobDescription.jobCountry}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/technology.svg" />{data.jobDescription.primarySkills},{data.jobDescription.secondarySkills}</li>
                          <li className="job-skills-text"><img src="images/Dashboard-assets/recent-matches/vaccency.svg" />{data.jobDescription.noOfPositionsAvailable}</li>
                        </ul>
                      </div>
                      <div className="row">
                        {(data.matchingCandidates) ? data.matchingCandidates.slice(0, 3).map((match, index) =>
                          <div className="col-md-4 active-job" key={index} >
                            {(match.matchingCandidates === "undefined") ? <h6 className="noMatchingcandidateText">You have no matching candidates</h6> :
                              (<Card className="custom h-100" style={{position:"relative"}} >
                                <div className="row">
                                  <div className="location" className="col-md-8">
                                    {/* {console.log(match.candidate.firstName)} */}
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
                                    <button type="button" id="footer" style={{position:"absolute"}} className="btn w-100 btn-blue" onClick={() => this.onInviteButtonClick( data.jobDescription.jobId,match.candidate.candidateId)}>Invite</button>
                                  </div>
                                </div>
                              </Card>)}
                          </div>
                        ) : <div className="noMatchingcandidateText">No matching Candidates Found</div>}
                      </div>
                      <div>
                        <div className="job-full-detail text-right text-md-right mt-4 mb-4"><Link to="/jobPostingCollection" onClick={localStorage.setItem('jobId2',data.jobDescription.jobId)}>VIEW Details <img src="/images/icons/view_details_arrow.svg" class="detail-arrow" /></Link></div>
                      </div>

                    </div>
                  </div>
                ))
                  : (<div>You have no active jobs</div>)}
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
