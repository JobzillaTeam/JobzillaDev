import React, { Component } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import LeftNavProvider from '../CommonComp/LeftNavProvider';
import TopSkillsCard from '../CommonComp/DashboardComp/TopSkillsCard';
import ScrollUpButton from "react-scroll-up-button";
import OverviewCardRecruiter from '../CommonComp/DashboardComp/OverviewCardRecruiter';
import BarGraphRecruiter from '../CommonComp/DashboardComp/BarGraphRecruiter';

export default class RecruiterDashboard extends Component {
    constructor(props){
        super(props)
    }
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
                            <TopSkillsCard />
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
