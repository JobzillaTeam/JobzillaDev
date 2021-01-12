import React, { Component } from 'react'
import CountUp from 'react-countup';
import ApiServicesOrgCandidate from '../../../Services/ApiServicesOrgCandidate';
import { Link } from "react-router-dom";

export default class CandidateOverviewCard extends Component {
    constructor() {
        super()
        this.state = {
            jobsApplied: '',
            selectedForInterviews: '',
            jobOffers: '',
            progressBarPercentage: ''
        }
        this.candidateDashboard = ApiServicesOrgCandidate;

    }
    componentDidMount() {
        //calling candidate dashboard api
        this.candidateDashboard.getcandidateDashboardDetails()
            .then(Response => {
                if (Response && Response.data) {
                    this.setState({
                        jobsApplied: Response.data.responseObject.jobApplied,
                        selectedForInterviews: Response.data.responseObject.selectedForInterviews,
                        jobOffers: Response.data.responseObject.jobOffers
                    })
                }
            });

        this.candidateDashboard.candidateGetProfileInfo()
            .then(Response => {
                if (Response && Response.data) {
                    this.setState({
                        progressBarPercentage: Response.data.responseObject.progressBarCompletion
                    })
                }
            });

    }

    render() {
        const { jobsApplied, selectedForInterviews, jobOffers } = this.state
        return (
            <div>
                {/* Overview Section */}
                <div className="row ml-0 mr-1 clearfix">
                    <div className="wid100 ml-4 marT20  profile_strength_text clearfix">Profile Strength</div>
                    <div className="col-6">
                        <div className="progressbar-text font-blue" style={{ width: `${this.state.progressBarPercentage}%` }}>{this.state.progressBarPercentage}%</div>
                        <div className="progress1 progress-fashion1 marB20 ml-2" >
                            <div className="progress-bar bg-success marT20" style={{ width: `${this.state.progressBarPercentage}%` }} role="progressbar" aria-valuenow={this.state.progressBarPercentage} aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                    <div className=" w-100 font-blue complete-now-text ml-4 marT20"><Link to="/candidate/profile">COMPLETE NOW</Link></div>
                    <div className="wid100 ml-4 overview marT30 overview_text">Overview-2021</div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="jobPosted_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4" src="/images/Dashboard-assets/recruiter-dashboard/job-posted-icon.svg" alt="Profile Uploaded image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={parseInt(jobsApplied)} duration={2.75} separator="," />
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
                                        <CountUp start={0} end={parseInt(selectedForInterviews)} duration={2.75} separator="," />
                                    </h5>
                            Selected for Interviews
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
                                        <CountUp start={0} end={parseInt(jobOffers)} duration={2.75} separator="," />
                                    </h5>
                            Job Offers
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
