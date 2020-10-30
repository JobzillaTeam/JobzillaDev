import React, { Component } from 'react'
import CountUp from 'react-countup';

export default class OverviewCard extends Component {
    constructor(){
        super()
        this.state={
            profileUploaded:20345,
            activeProfile:15145,
            hiredProfile:1345
        }
    }
    render() {
        const {profileUploaded,activeProfile,hiredProfile} =this.state
        return (
            <div>
                {/* Overview Section */}
                <div className="row ml-0 mr-1">
                <h5 className="wid100 ml-4 marT20">Dashboard</h5>
                    <p1 className="wid100 ml-4 marT30">Overview-2020</p1>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <section className="uploadedProfile_section_Card">
                            <div className="media">
                            <img className="ml-5 mr-4" src="/images/Dashboard-assets/uploaded-profile.svg" alt="Profile Uploaded image" />
                                <div className="media-body">
                                    <h5 className="mt-0 overview_numbers">            
                            <CountUp start={0} end={profileUploaded} duration={2.75} separator="," />
                                    </h5>
                            Profile Uploaded
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
                            Active Profile
                            {/* <img src="/images/Dashboard-assets/more_ico.png" width="10" height="10" className="more_ico" /> */}
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
                            Hired Profile
                            {/* <img src="/images/Dashboard-assets/more_ico.png" width="10" height="10" className="more_ico" /> */}
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
