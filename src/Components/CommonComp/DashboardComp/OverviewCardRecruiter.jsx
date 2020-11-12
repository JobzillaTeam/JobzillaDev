import React, { Component } from 'react'
import CountUp from 'react-countup';

export default class RecruiterOverviewCard extends Component {
    constructor(){
        super()
        this.state={
            noOfJobPosted:20345,
            noOfActiveJobs:15145,
            noOfCandidatesHired:1345
        }
    }
    render() {
        const {noOfJobPosted,noOfCandidatesHired,noOfActiveJobs} =this.state
        return (
            <div>
                {/* Overview Section */}
                <div className="row ml-0 mr-1">
                <h5 className="wid100 ml-4 marT20">Dashboard</h5>
                    <p1 className="wid100 ml-4 marT30 overview_text">Overview-2020</p1>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="jobPosted_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4" src="/images/Dashboard-assets/recruiter-dashboard/job-posted-icon.svg" alt="Profile Uploaded image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">            
                            <CountUp start={0} end={noOfJobPosted} duration={2.75} separator="," />
                                    </h5>
                                    Jobs Posted

                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="activeJobs_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4" src="images/Dashboard-assets/active-profile.svg" alt="Active Profile image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                            <CountUp start={0} end={noOfActiveJobs} duration={2.75} separator="," />
                                    </h5>
                            Open Positions
                            {/* <img src="images/Dashboard-assets/more_ico.png" width="10" height="10" className="more_ico" /> */}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="candidateHired_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4 mt-2" src="images/Dashboard-assets/offer-ico.svg" alt="Hired Profile image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                            <CountUp start={0} end={noOfCandidatesHired} duration={2.75} separator="," />
                                    </h5>
                            Hired Positions
                            {/* <img src="images/Dashboard-assets/more_ico.png" width="10" height="10" className="more_ico" /> */}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                {/* Overview Section */}
            </div>
        )
    }
}
