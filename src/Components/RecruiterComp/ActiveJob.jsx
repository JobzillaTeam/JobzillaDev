import { Card } from 'primereact/card';
import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ProgressBar from 'react-customizable-progressbar'
import RecruiterService from '../../Services/RecruiterService.js';
import { TabMenu } from 'primereact/tabmenu';
import LeftNavProvider from '../CommonComp/LeftNavProvider'
import { Dropdown } from 'primereact/dropdown';
import HeaderAll from '../CommonComp/HeaderAll';
import JobPostingCollection from "../RecruiterComp/RecruiterJobPosting/JobPostingCollection"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateJob from './CreateJob.jsx';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

class ActiveJob extends Component {
  constructor() {
    super();
    this.state = {
      customer: [],
      customerData: [],    //original reference data
      job: [],
      search: '',
      searchjob: '',


      ShowMe: true
    }
    this.RecruiterService = new RecruiterService();

  }
  updateSearch(e) {
    this.setState({ search: e.target.value })
  }
  updateJobSearch(e) {
    this.setState({ searchjob: e.target.value })
  }


  componentDidMount() {
    this.setState({ loading: true });

    this.RecruiterService.getCustomersLarge().then(data => {
      this.setState({
        customer: data.data.data,
        customerData: data.data.data,
        // loading: false
      }, () => { console.log(this.state) });
      // console.log(data)
      const { activity } = this.state;

      // activity = customer.map(p => p.act.substr(3));
      // this.setState({ activity })
    });

    this.RecruiterService.getCustomersXLarge().then(data => {
      this.setState({
        job: data.data.data,
        customerData: data.data.data,
        // loading: false
      }, () => { console.log(this.state) });
      // console.log(data)
    });


  }
  

  cardDelete(task, index) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      let customer = [...this.state.customer]
      customer.splice(index, 1);
      this.setState({ customer: customer })
    }
  }

  jobDelete(task, index) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      let job = [...this.state.job]
      job.splice(index, 1);
      this.setState({ job: job })
    }
  }

  render() {

    const percentage = 76
    let filterData = this.state.customer.filter(
      (data) => {
        return (data.location.toLowerCase().includes(this.state.search.toLowerCase()) || data.name.toLowerCase().includes(this.state.search.toLowerCase()))
      }
    );
    let filterJobData = this.state.job.filter(
      (data) => {
        return (data.location.toLowerCase().includes(this.state.searchjob.toLowerCase()) || data.name.toLowerCase().includes(this.state.searchJob.toLowerCase()))
      }
    );

    let progress = this.state.customer.activity;
    const cities = [
      { name: 'Date', code: 'NY' },
      { name: 'Time', code: 'RM' },
      { name: 'ShortFall', code: 'LDN' },
      { name: 'Unfulfilled', code: 'IST' }

    ]


    return (
      <div>
        <LeftNavProvider></LeftNavProvider>
        <div className="maincontent">
          <HeaderAll></HeaderAll>
          <div className="container-fluid">
            <div className=" main">
              {/* top title */}
              <div className="row">
                <div className="col-md-6 ml-10 mt-4 mb-4">
                  <div className="active_job_heading active_padding">Active Jobs</div>
                  <div className="active_job_subtitle active_padding">You have 2 active jobs, View <Link to="/closedJobs" className="font-blue">Closed</Link></div>
                </div>
                <div className="col-md-6 text-md-right mt-4 mb-4">
                <Link to="/createJob"><button className="btn btn-blue">Create New Job</button></Link>
                </div>
              </div>
            </div>
            <div className="active_padding">
              <div id="main" className="col mb-4 mt-4" >
                <div className="row border-bottom-thin mb-4 mt-4">
                  <div className="col-md-6">
                    <div className="p-input-icon-right">
                      <i className="pi pi-search" />
                      <InputText className="searchbar_text"
                        type="text"
                        value={this.state.search}
                        onChange={this.updateSearch.bind(this)}
                        placeholder="search by job title, skills, location"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <Dropdown className="sortby_box mb-4 mt-4" optionLabel="name" value={this.state.city} options={cities} onChange={(e) => { this.setState({ city: e.value }) }} placeholder="Sort By" />
                  </div>
                </div>

                {[1, 2, 3].map((i) => {
                  return (
                    <div className="border-bottom-thin mb-3">
                      <div className="job-title-header">
                        <span className="mr-3 job-title-text" id="designation">Sr. Software Engineer</span>
                        <span className="job-posted-time-text">Posted 1 day ago</span>
                      </div>
                      <div>
                        <ul className="job-skills">
                          <li className="job-skills-text"><img src="/images/Dashboard-assets/recent-matches/category.svg" />Development</li>
                          <li className="job-skills-text"><img src="/images/Dashboard-assets/recent-matches/experience.svg" />5-6 years</li>
                          <li className="job-skills-text"><img src="/images/Dashboard-assets/recent-matches/job_role.svg" />Permanent</li>
                          <li className="job-skills-text"><img src="/images/Dashboard-assets/recent-matches/location.svg" />Mumbai, India</li>
                          <li className="job-skills-text"><img src="/images/Dashboard-assets/recent-matches/technology.svg" /> Java, J2EE</li>
                          <li className="job-skills-text"><img src="/images/Dashboard-assets/recent-matches/vaccency.svg" />2</li>
                        </ul>
                      </div>
                      <div className="row">
                        {filterData.map((data, index) =>
                          <div className="col-md-4 active-job" >
                            <Card className="custom" key={index}   >
                              <div className="row">
                                <div className="location" className="col-md-8">
                                  <h5 id="name">{data.name}</h5>
                                  <p id="body">{data.company}</p>
                                  <hr></hr>
                                  <i className="pi pi-map-marker mr-2"></i>{data.location}
                                </div>
                                <div className="col-md-4">
                                  <div style={{ width: 65, height: 65 }}>
                                    <CircularProgressbarWithChildren styles={{
                                      path: {
                                        stroke: '#147AD6',
                                      }
                                    }} strokeWidth={4} value={percentage} >
                                      <strong><span style={{ fontSize: 12 }}>
                                        {percentage}%
                            </span></strong>
                                      <span className="Circular_ProgressBar_text">
                                        Match
                            </span>
                                    </CircularProgressbarWithChildren>
                                  </div>
                                </div>

                              </div>
                              <div className="row pt-4" >
                                <div className="col-md-12 p-0 ">
                                  <button type="button" id="header" className="btn w-100 btn-blue  " >Invite</button>
                                </div>
                              </div>
                            </Card>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="job-full-detail  text-right text-md-right mt-4 mb-4"><Link to="/jobPostingCollection">VIEW Details <img src="/images/icons/view_details_arrow.svg" class="detail-arrow" /></Link></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

}
export default ActiveJob
