import React, { Component } from 'react'
import CountUp from 'react-countup';
import ApiServicesOrg from '../../../Services/ApiServicesOrg'

export default class OverviewCardProvider extends Component {
    constructor(){
        super()
        this.state={
            profileUploaded:'',
            activeProfile:'',
            hiredProfile:''
        }
        this.dashboardDetails = new ApiServicesOrg();
    }
    componentDidMount(){
        this.dashboardDetails.getProviderDashboardDetails()
        .then(Response => {
            if (Response && Response.data) {
        //   console.log(Response.data.responseObject)
           this.setState({
            profileUploaded:Response.data.responseObject.profileUploadedCount,
            activeProfile:Response.data.responseObject.activeProfilesCount,
            hiredProfile:Response.data.responseObject.hiredProfilesCount

           })
           }
        });

    }
    render() {
        const {profileUploaded,activeProfile,hiredProfile} =this.state
        return (
            <div>
                {/* Overview Section */}
                <div className="row ml-0 mr-1">
                <h5 className="wid100 ml-4 marT20">Dashboard</h5>
                    <div className="wid100 overview ml-4 marT30 overview_text">Overview-2020</div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="uploadedProfile_section_Card">
                            <div className="media">
                            <img className="ml-5 mr-4" src="/images/Dashboard-assets/recruiter-dashboard/job-posted-icon.svg" alt="Profile Uploaded image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">            
                            <CountUp start={0} end={profileUploaded} duration={2.75} separator="," />
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
                            <CountUp start={0} end={activeProfile} duration={2.75} separator="," />
                                    </h5>
                            Active Profiles
                            {/* <img src="images/Dashboard-assets/more_ico.png" width="10" height="10" className="more_ico" /> */}
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
                            <CountUp start={0} end={hiredProfile} duration={2.75} separator="," />
                                    </h5>
                            Hired Profiles
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
