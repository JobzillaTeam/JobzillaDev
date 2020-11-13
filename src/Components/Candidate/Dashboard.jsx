import React, { Component } from 'react';
import RecentMatches from '../CommonComp/DashboardComp/RecentMatches';
import Footer from '../CommonComp/Footer';
import LeftNavCandidate from '../CommonComp/LeftNavCandidate'
import HeaderAll from '../CommonComp/HeaderAll';
import ScrollUpButton from "react-scroll-up-button";
import OverviewCardCandidate from '../CommonComp/DashboardComp/OverviewCardCandidate';
import Popup from '../CommonComp/Popup';
import TermsCandidate from '../CommonComp/DashboardComp/TermsCandidate';
import TopSkillsCandidate from '../CommonComp/DashboardComp/TopSkillsCandidate';

const Dashboard = () => {
	return (
		<div>
			<LeftNavCandidate></LeftNavCandidate>
			<div className="maincontent">
				<HeaderAll isCandidate={true}></HeaderAll>
				<div className="container-fluid">
					<div className="row flex-xl-nowrap">
						<section className="content_section col py-md-3 pl-md-4 bd-content">
							{/* Importing Overview Cards, Top skills card and monthly Report Bar Graph */}
							{/* To display login User Details */}
							<OverviewCardCandidate />
							<TopSkillsCandidate />
							<RecentMatches />
							{/* Importing Overview Cards, Top skills card and monthly Report Bar Graph */}

						</section>
					</div>
					<ScrollUpButton />
				</div>

				<Footer></Footer>
			</div>
		</div>
	);
}

export default Dashboard  