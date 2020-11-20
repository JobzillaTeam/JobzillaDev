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
      selectValue: "",
      search: "",
      candidates: [],
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }
  updateSearch(e) {
    this.setState({ search: e.target.value });
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
    });
  }

  handleDropdownChange(e) {
    const updatedJobs = this.state.closedJobs.sort((objA, objB) => {
      const dateA = new Date(objA.jobDetails.createdDate).getTime();
      const dateB = new Date(objB.jobDetails.createdDate).getTime();
      const PositionsA = objA.jobDetails.noOfHiredPositions;
      const PositionsB = objB.jobDetails.noOfHiredPositions;
      if (e.target.value === "recent_First") {
        return dateB - dateA;
      } else if (e.target.value === "recent_Last") {
        return dateA - dateB;
      } else if (e.target.value === "unfulfilled_Highest") {
        return PositionsB - PositionsA;
      } else if (e.target.value === "unfulfilled_Lowest") {
        return PositionsA - PositionsB;
      }
    });
    this.setState({
      closedJobs: updatedJobs,
    });
  }
  render() {
    let closedJobsObjects = this.state.closedJobs;
    const closedJobsFilterObjects = closedJobsObjects.filter(
      (data) => {
        return (data.jobDetails.jobTitle.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.jobDetails.primarySkills.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.jobDetails.secondarySkills.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.jobDetails.jobCity.toLowerCase().includes(this.state.search.toLowerCase()))
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
              <Toast ref={(el) => (this.toast = el)}></Toast>
              <div className=" main">
                {/* top title */}
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="active_job_heading ">Closed Jobs</h5>
                    <div className="sub-title1">
                      You have {closedJobsFilterObjects && closedJobsFilterObjects[0] ? closedJobsFilterObjects.length : 0} closed jobs, View <a href="#">ACTIVE</a>
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
                <section className="white-middle-section p-4 mt-5 mb-0 border-bottom">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="input-group">
                        <input
                          className="form-control py-2 border-right-0 border"
                          type="text"
                          placeholder="search by job title, skills, location"
                          value={this.state.search}
                          onChange={this.updateSearch.bind(this)}
                        />
                        <span className="input-group-append">
                          <div className="input-group-text bg-transparent">
                            <i className="fa fa-search"></i>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 offset-md-5">
                      <select
                        className="form-control"
                        id="dropdown"
                        name="dropdown"
                        onChange={this.handleDropdownChange}
                      >
                        <option value="NA">Sort by</option>
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
                </section>
                {/* detail Sections */}
                {closedJobsFilterObjects &&
                  closedJobsFilterObjects.map((closedJob) => {
                    const { jobDetails } = closedJob;
                    return (
                      <section className="white-middle-section mb-3 mt-0 p-0">
                        <div className="px-4 pt-3">
                          <div>
                            <span className="job-title">
                              {jobDetails.jobTitle}
                            </span>
                            <span className="job-posting">
                              Posted {jobDetails.postedAt} day ago
                          </span>
                          </div>
                          <div>
                            <ul className="job-skills">
                              <li>
                                <img src="/images/Dashboard-assets/recent-matches/category.svg" />
                                {jobDetails.category}
                              </li>
                              <li>
                                <img src="/images/Dashboard-assets/recent-matches/experience.svg" />
                                {jobDetails.experienceReqFrom}-{jobDetails.experienceReqTo} years
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
                                {/* <th>#</th> */}
                                <th>Candidates</th>
                                <th>Status</th>
                                <th>Comments</th>
                                <th>Last updated</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                closedJob.joinedCandidateRecruitmentList && closedJob.joinedCandidateRecruitmentList.map(joinedCandidate => {
                                  return (
                                    <tr>
                                      <td>
                                        <p className="tb-title-text">{`${joinedCandidate.candidate.firstName} ${joinedCandidate.candidate.lastName}`}</p>
                                        <p>{`${joinedCandidate.candidate.currentRole} at ${joinedCandidate.candidate.company}`}</p>
                                        <p>
                                          <img
                                            src="/images/icons/category.svg"
                                            alt="email"
                                            className="pr-2"
                                          />
                                          {joinedCandidate.candidate.emailId}
                                        </p>
                                        <p>
                                          <img
                                            src="/images/icons/category.svg"
                                            alt="mobile number"
                                            className="pr-2"
                                          />
                                          {joinedCandidate.candidate.mobileNumber}
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
                                      <td>{joinedCandidate.interviewStatus}</td>
                                      <td>{joinedCandidate.comment}</td>
                                      <td>{joinedCandidate.lastModifiedDate.slice(0, -19)}</td>
                                    </tr>
                                  );
                                })
                              }
                              <tr>
                                <td
                                  colSpan="5"
                                  className="job-full-detail text-right"
                                >
                                  <Link to={`/jobPostingCollection/${jobDetails.jobId}`}>
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
                    );
                  }
                  )}
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