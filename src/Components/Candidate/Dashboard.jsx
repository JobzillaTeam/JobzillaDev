import React, { Component } from 'react';
import TopSkillsCard from '../CommonComp/DashboardComp/TopSkillsCard';
import RecentMatches from '../CommonComp/DashboardComp/RecentMatches';
import Footer from '../CommonComp/Footer';
import LeftNavCandidate from '../CommonComp/LeftNavCandidate'
import HeaderAll from '../CommonComp/HeaderAll';
import ScrollUpButton from "react-scroll-up-button";
import OverviewCardCandidate from '../CommonComp/DashboardComp/OverviewCardCandidate';
import Popup from '../CommonComp/Popup';
import TermsCandidate from '../CommonComp/DashboardComp/TermsCandidate';

const Dashboard = () => {
	const [isPopupVisible, setPopupVisible] = React.useState(false);
	React.useEffect(() => {
			const acceptedTC = localStorage.getItem('acceptedTC')?.toLowerCase() === "true" ? true : false
		if (!acceptedTC) {
			setPopupVisible(true);
		}
	}, []);
	const showPopup = (isVisible) => {
		setPopupVisible(isVisible);
	}
	return (
		<div>
			<LeftNavCandidate></LeftNavCandidate>
			<div className="maincontent">
				<HeaderAll isCandidate={true}></HeaderAll>
				<div className="container-fluid">
					{isPopupVisible ? <Popup
					hideCloseButton={true}
					showPopup={showPopup}
					size="xl"
					title="Terms & Conditions"
      		body={<TermsCandidate showPopup={showPopup} />}
    /> : null}
					<div className="row flex-xl-nowrap">
						<section className="content_section col py-md-3 pl-md-4 bd-content">
							{/* Importing Overview Cards, Top skills card and monthly Report Bar Graph */}
							{/* To display login User Details */}
							<OverviewCardCandidate />
							<TopSkillsCard />
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