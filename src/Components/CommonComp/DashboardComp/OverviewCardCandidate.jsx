import React, { Component } from 'react'
import CountUp from 'react-countup';

export default class CandidateOverviewCard extends Component {
    constructor() {
        super()
        this.state = {
            jobsApplied: 20,
            selectedForInterviews: 15,
            jobOffers: 2
        }
    }
    render() {
        const { jobsApplied, selectedForInterviews, jobOffers } = this.state
        return (
            <div>
                {/* Overview Section */}
                <div className="row ml-0 mr-1 clearfix">
                    
                    <div className="wid100 ml-4 marT20  profile_strength_text clearfix">Profile Strength</div>
                    <div class="col-md-9">
                        <div className="progressbar-text font-blue" style={{ width: '34%' }}>80%</div>
                        <div class="progress1 progress-fashion1 marB20 ml-2 " >
                            <div class="progress-bar1 bg-success marT20" role="progressbar" aria-valuenow="80%" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>

                    <div className="row ml-4 marT20 profile_strength_subtext clearfix">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper.<span className="font-blue complete-now-text">COMPLETE NOW</span></div>
                    <p1 className="wid100 ml-4 marT30 overview_text">Overview-2020</p1>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="jobPosted_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4" src="/images/Dashboard-assets/recruiter-dashboard/job-posted-icon.svg" alt="Profile Uploaded image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={jobsApplied} duration={2.75} separator="," />
                                    </h5>
                                    Jobs Applied

                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="activeJobs_section_Card">
                            <div className="media">
                                <img className="ml-4 mr-3" src="/images/Dashboard-assets/active-profile.svg" alt="Active Profile image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={selectedForInterviews} duration={2.75} separator="," />
                                    </h5>
                            Selected for Interviews
                            {/* <img src="images/Dashboard-assets/more_ico.png" width="10" height="10" className="more_ico" /> */}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="candidateHired_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4 mt-2" src="/images/Dashboard-assets/offer-ico.svg" alt="Hired Profile image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={jobOffers} duration={2.75} separator="," />
                                    </h5>
                            Job Offers
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
