import React, { Component, Fragment } from "react";
import LeftNavProvider from "../CommonComp/LeftNavProvider";
import HeaderAll from "../CommonComp/HeaderAll";
import Footer from "../CommonComp/Footer";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import ApiServicesOrgRecruiter from "../../Services/ApiServicesOrgRecruiter";
class CloseJobs extends Component {
  constructor() {
    super();
    this.state = {
      closedJobs: [],
    };
  }
  componentDidMount() {
    ApiServicesOrgRecruiter.getListOfClosedJobs().then((response) => {
      let closedJobList = [];
      if (response) {
        closedJobList = response.data.responseObject;
      }
      this.setState({
        closedJobs: closedJobList,
      });
      console.log(closedJobList);
    });
  }
  render() {
    const {closedJobs} = this.state;
    return (
      <Fragment>
        <LeftNavProvider></LeftNavProvider>
        <div className="maincontent">
          <div className="content">
            {/*  Header */}
            <HeaderAll></HeaderAll>
            {/* Main Content on the page */}
            <div className="content_section main">
              <Toast ref={(el) => (this.toast = el)}></Toast>
              <div className=" main">
                {/* top title */}
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="active_job_heading active_padding">
                      Closed Jobs
                    </h5>
                    <div className="sub-title1">
                      You have 2 closed jobs, View <a href="#">ACTIVE</a>
                    </div>
                  </div>
                  <div className="col-md-6 text-md-right">
                    {/* <button className="btn btn-blue">Create New Job</button> */}
                    <Link to="/createJob">
                      <button className="btn btn-blue">Create New Job</button>
                    </Link>
                  </div>
                </div>
                {/* main content display area */}
                
                <section className="white-middle-section mt-5 mb-0 border-bottom">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="input-group">
                        <input
                          className="form-control py-2 border-right-0 border"
                          type="text"
                          value="search"
                        />
                        <span className="input-group-append">
                          <div className="input-group-text bg-transparent">
                            <i className="fa fa-search"></i>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 offset-md-6">
                      <select className="form-control">
                        <option>Sort by</option>
                      </select>
                    </div>
                  </div>
                </section>
                {/* detail Sections */}
                {closedJobs && closedJobs.map((jobDetails) => (
                  <section className="white-middle-section mb-3 mt-0 p-0">
                  <div className="px-5 pt-3">
                    <div>
                      <span className="job-title pr-3">
                        {jobDetails.jobTitle}
                      </span>
                      <span className="job-posting">Posted {jobDetails.postedAt} day ago</span>
                    </div>
                    <div>
                      <ul className="job-skills">
                        <li>
                          <img src="/images/Dashboard-assets/recent-matches/category.svg" />
                          {jobDetails.category}
                        </li>
                        <li>
                          <img src="/images/Dashboard-assets/recent-matches/experience.svg" />
                {jobDetails.experienceReqFrom}-{jobDetails.experienceReqTo}years
                        </li>
                        <li>
                          <img src="/images/Dashboard-assets/recent-matches/job_role.svg" />
                          {jobDetails.employmentType}
                        </li>
                        <li>
                          <img src="/images/Dashboard-assets/recent-matches/location.svg" />
                          {jobDetails.jobCity}, {jobDetails.jobCountry}
                        </li>
                        <li>
                          <img src="/images/Dashboard-assets/recent-matches/technology.svg" />{" "}
                          {jobDetails.primarySkills}
                        </li>
                        <li>
                          <img src="/images/Dashboard-assets/recent-matches/vaccency.svg" />
                          {jobDetails.noOfHiredPositions}
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Table */}
                  <div>
                    <table className="table table-borderless custom-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Candidates</th>
                          <th>Status</th>
                          <th>Comments</th>
                          <th>Last updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <p className="tb-title-text">John Doe</p>
                            <p>Software developer at TCS</p>
                            <p>
                              <img
                                src="/images/icons/category.svg"
                                alt="email"
                                className="pr-2"
                              />
                              johndoe@tcs.com
                            </p>
                            <p>
                              <img
                                src="/images/icons/category.svg"
                                alt="mobile number"
                                className="pr-2"
                              />
                              +91 1234567890
                            </p>
                            <p>
                              <img
                                src="/images/icons/location.svg"
                                alt="location"
                                className="pr-2"
                              />
                              {jobDetails.jobCity}, {jobDetails.jobCountry}
                            </p>
                          </td>
                <td>{jobDetails.jobStatus}</td>
                          <td>19 June Joining Date</td>
                          <td>19 June, 2020</td>
                        </tr>
                        <tr>
                          <td
                            colSpan="5"
                            className="job-full-detail text-right"
                          >
                            <Link to='/closedjobdetails'>
                              VIEW Details{" "}
                              <img
                                src="/images/icons/view_details_arrow.svg"
                                class="detail-arrow"
                              />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                ))}
                
                {/* 2nd table */}
              </div>
            </div>
            <Footer></Footer>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CloseJobs;
