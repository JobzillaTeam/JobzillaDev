import React, { Component } from 'react'
import CountUp from 'react-countup';
import ApiServicesOrg from '../../../Services/ApiServicesOrg'

export default class RecruiterOverviewCard extends Component {
    constructor() {
        super()
        this.state = {
            jobsPosted: '',
            openPositions: '',
            hiredPositions: ''
        }
        this.dashboardDetails = new ApiServicesOrg();
    }
    componentDidMount() {
        //Calling recruiter dashboard api from apiServiceOrg
        const today = new Date()
        const year = today.getFullYear()
        this.dashboardDetails.getRecruiterDashboardDetails(year)
            .then(Response => {
                if (Response && Response.data) {
                    this.setState({
                        jobsPosted: Response.data.responseObject.jobsPosted,
                        openPositions: Response.data.responseObject.openPositions,
                        hiredPositions: Response.data.responseObject.hiredPositions
                    })
                }
            });
    }

    render() {
        const { jobsPosted, openPositions, hiredPositions } = this.state
        return (
            <div>
                {/* Overview Section */}
                <div className="row ml-0 mr-1">
                    <h5 className="wid100 ml-4 mt-3">Dashboard</h5>
                    <div className="wid100 overview ml-4 marT30 overview_text">Overview-2021</div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="jobPosted_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4" src="/images/Dashboard-assets/recruiter-dashboard/job-posted-icon.svg" alt="Profile Uploaded image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={parseInt(jobsPosted)} duration={2.75} separator="," />
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
                                        <CountUp start={0} end={parseInt(openPositions)} duration={2.75} separator="," />
                                    </h5>
                            Open Positions
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
                                        <CountUp start={0} end={parseInt(hiredPositions)} duration={2.75} separator="," />
                                    </h5>
                            Hired Positions
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
