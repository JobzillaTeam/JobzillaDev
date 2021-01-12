import React, { Component } from 'react'
import 'bootstrap/dist/js/bootstrap.js';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import LeftNavProvider from '../CommonComp/LeftNavProvider';
import ScrollUpButton from "react-scroll-up-button";
import OverviewCardRecruiter from '../CommonComp/DashboardComp/OverviewCardRecruiter';
import BarGraphRecruiter from '../CommonComp/DashboardComp/BarGraphRecruiter';
import TopSkillsRecruiter from '../CommonComp/DashboardComp/TopSkillsRecruiter';

export default class RecruiterDashboard extends Component {
    render() {  
        return (
            <div>    
                <div className="maincontent">
                <HeaderAll></HeaderAll>
                <LeftNavProvider></LeftNavProvider>
                <div className="container-fluid">
                    <div className="row flex-xl-nowrap">
                        <section className="content_section col py-md-3 pl-md-4 bd-content">
                            <OverviewCardRecruiter />
                            <TopSkillsRecruiter />
                            <BarGraphRecruiter />
                        </section>
                    </div>
                    <ScrollUpButton />
                </div>
                <Footer></Footer>
                </div>
            </div>
        )
    }
}
