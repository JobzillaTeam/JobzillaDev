import React, { Component } from 'react'
import CountUp from 'react-countup';
import ApiServicesOrg from '../../../Services/ApiServicesOrg'

export default class OverviewCardProvider extends Component {
    constructor() {
        super()
        this.state = {
            profileUploaded: '',
            activeProfile: '',
            hiredProfile: ''
        }
        this.dashboardDetails = new ApiServicesOrg();
    }
    componentDidMount() {
        const today = new Date()
        const year = today.getFullYear()
        //Calling provider's dashboard api from apiServicesOrg
        this.dashboardDetails.getProviderDashboardDetails(year)
            .then(Response => {
                if (Response && Response.data) {
                    this.setState({
                        profileUploaded: Response.data.responseObject.profileUploadedCount,
                        activeProfile: Response.data.responseObject.activeProfilesCount,
                        hiredProfile: Response.data.responseObject.hiredProfilesCount
                    })
                }
            });

    }
    render() {
        const { profileUploaded, activeProfile, hiredProfile } = this.state
        return (
            <div>
                {/* Overview Section */}
                <div className="row ml-0 mr-1">
                    <h5 className="wid100 ml-4 mt-3">Dashboard</h5>
                    <div className="wid100 overview ml-4 marT30 overview_text">Overview-2021</div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="uploadedProfile_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4" src="/images/Dashboard-assets/recruiter-dashboard/job-posted-icon.svg" alt="Profile Uploaded image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={Number(profileUploaded)} duration={2.75} separator="," />
                                    </h5>
                            Profiles Uploaded
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="activeProfile_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4" src="/images/Dashboard-assets/active-profile.svg" alt="Active Profile image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={Number(activeProfile)} duration={2.75} separator="," />
                                    </h5>
                            Active Profiles
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="hiredProfile_section_Card">
                            <div className="media">
                                <img className="ml-5 mr-4 mt-2" src="/images/Dashboard-assets/offer-ico.svg" alt="Hired Profile image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">
                                        <CountUp start={0} end={Number(hiredProfile)} duration={2.75} separator="," />
                                    </h5>
                            Hired Profiles
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
