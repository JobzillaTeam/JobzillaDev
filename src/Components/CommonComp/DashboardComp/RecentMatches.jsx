import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../Assets/css/Style.css'
import { Link } from 'react-router-dom';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ApiServicesOrgCandidate from '../../../Services/ApiServicesOrgCandidate';

export default class RecentMatches extends Component {
  constructor(){
    super()
    this.state={
      matchingJobs:[]
    }
    this.candidateDashboard = ApiServicesOrgCandidate;
  }
  componentDidMount() {
    this.candidateDashboard.getcandidateDashboardDetails(this.state.candidateId)
        .then(Response => {
             //console.log(Response.data.responseObject.matchingJobs)
            if (Response && Response.data) {
              this.setState({
                matchingJobs: Response.data.responseObject.matchingJobs
              })
            }
        });
}


  render() {
    const matchingJobs = this.state.matchingJobs
    return (
      <div>
        {/* Monthly Reports percentage section */}
        <div className="row ml-0 mr-1">
          <div className="col col-sm-12 col-md-12 col-lg-12">
            <h4 className="wid100 ml-3 marT30">Recent Matches</h4>
            <section className="recent_matches_section1">
              {matchingJobs ? matchingJobs.map((data,index) => {
                return (
                  <div key={index} className="row align-items-center">
                    <div className={"col-12 col-sm-12 col-md-8 col-lg-8 pl-0 align-items-center"}>
                      <div className="job-title-header">
                <span className="mr-3 job-title-text font-blue">{data.jobTitle}</span>
                        <span className="job-posted-time-text">Posted {data.postedAt} day ago</span>
                      </div>
                      <div className="job-content">
                <span className="mr-19 job-content-attributes"><i><img className="mr-8" src="/images/Dashboard-assets/recent-matches/category.svg" alt="category"></img></i>{data.category}</span>
                <span className="mr-19 job-content-attributes"><i><img className="mr-8" src="/images/Dashboard-assets/recent-matches/experience.svg" alt="experience"/></i>{data.experienceReqFrom}-{data.experienceReqTo} years</span>
                <span className="mr-19 job-content-attributes"><i><img className="mr-8" src="/images/Dashboard-assets/recent-matches/job_role.svg" alt="job-role"/></i>{data.employmentType}</span>
                <span className="mr-19 job-content-attributes"><i><img className="mr-8" src="/images/Dashboard-assets/recent-matches/location.svg" alt="location"/></i>{data.jobCity}, {data.jobCountry}</span>
                <span className="mr-19 job-content-attributes"><i><img className="mr-8" src="/images/Dashboard-assets/recent-matches/technology.svg" alt="infra-oprations"/></i>{data.primarySkills}</span>
                <span className="mr-19 job-content-attributes"><i><img className="mr-8" src="/images/Dashboard-assets/recent-matches/vaccency.svg" alt="vaccency"/></i>{data.noOfPositionsAvailable}</span>
                      </div>
                    </div>
                    <div className={"col-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-row-reverse align-items-center"}>
                      <div className="p-2 ml-3"><Link to={{pathname: `/candidate/jobDetails/recentMatches/${data.jobId}`}}><span className="mr-2">View Details</span><i className="fa fa-angle-right mr-2" aria-hidden="true"></i></Link></div>
                      <div className="p-2">
                        <div style={{ width: 65, height: 65 }}>
                          <CircularProgressbarWithChildren styles={{
                            path: {
                              stroke: '#147AD6',
                            }
                          }} strokeWidth={4} value={data.matchingPercentage} >
                            <strong><span style={{ fontSize: 12 }}>
                              {data.matchingPercentage}%
                            </span></strong>
                            <span className="Circular_ProgressBar_text">
                              Match
                            </span>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>     
                );
              }):<div>No Jobs Found</div>}
            </section>
          </div>
        </div>
      </div>
    )
  }
}
