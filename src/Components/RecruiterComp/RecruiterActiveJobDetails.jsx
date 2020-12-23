import React, { useEffect, Fragment, useState } from 'react'
import HeaderAll from '../CommonComp/HeaderAll';
import Footer from '../CommonComp/Footer'
import { Link } from 'react-router-dom'
import ApiServicesOrg from '../../Services/ApiServicesOrg';
import { TabView, TabPanel } from 'primereact/tabview';
import CandidateApplication from './RecruiterJobPosting/CandidateApplication'
import MatchingCandidate from './RecruiterJobPosting/MatchingCandidate';
import ShortlistedCandidate from './RecruiterJobPosting/ShortlistedCandidate'
import LeftNavProvider from '../CommonComp/LeftNavProvider';



export default class RecruiterActiveJobDetails extends React.Component {
  constructor(props) {
    super(props)
    this.ApiServicesOrg = new ApiServicesOrg();
    this.state = {
      jobDetails: null,
      open:false
    }
  }
  componentDidMount() {
    const jobID = this.props.match.params.jobID;
    this.ApiServicesOrg.getAllJobDetails(jobID)
      .then(Response => {
        if (Response && Response.data && Response.data.responseObject) {
          this.setState({
            jobDetails: Response.data.responseObject
          });
        }
      })
  }

  toggle=()=>{
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    const jobID = this.props.match.params.jobID;
    const { jobDetails } = this.state;
    const perviousLink = '/activeJob';
    const perviousLinkText = 'Active Jobs';
    return (
      <Fragment>
        <LeftNavProvider></LeftNavProvider>

        <div className="maincontent">
          <HeaderAll></HeaderAll>
          <div className="content_section">
            <div class="row">
              <div class="col-md-12 py-4">
                <h5 class="job-heading"><Link className="link" to={perviousLink}>{perviousLinkText}</Link> > Job Details</h5>
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
              <section className="white-middle-section4  mt-4">
               
                  {this.state.open ? (
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
                            <h6>Job Description</h6>
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
                                <div>Shifts</div>
                              </div>
                              <div className="col-xs-12 col-md-6 others_section_secondcol">
                                <div>{jobDetails.shift}</div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xs-12 col-md-5 others_section_firstcol">
                                <div>Visa</div>
                              </div>
                              <div className="col-xs-12 col-md-6 others_section_secondcol">
                                <div>{jobDetails.visa}</div>
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
                    </div>
                     ) :  <div className="viewdetails">View More Details</div>}
                 </section> 
                </div>
                <div className="arrowButton">
                  {this.state.open ? <img src="/images/icons/view_more_icon.svg" onClick={this.toggle}></img>  : <img src="/images/icons/view_more_icon.svg" onClick={this.toggle}></img> }
              </div>
              <div>
                <section className="white-middle-section2  mt-4">
                  <TabView className="marB60">
                  <TabPanel header="Shortlisted Candidates">
                      <ShortlistedCandidate jobID={jobID}></ShortlistedCandidate>
                    </TabPanel>
                    <TabPanel header="Matching Candidates">
                      <MatchingCandidate jobID={jobID}></MatchingCandidate>
                    </TabPanel>
                    <TabPanel header="Candidate Applications">
                      <CandidateApplication jobID={jobID}></CandidateApplication>
                    </TabPanel>
                   
                  </TabView>
                </section>
              </div>
            </div>
            }

          </div>
          <Footer></Footer>
        </div>
      </Fragment>
    )
  }
}