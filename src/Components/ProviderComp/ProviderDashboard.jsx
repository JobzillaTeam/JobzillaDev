import React, { Component } from 'react'
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import ScrollUpButton from "react-scroll-up-button";
import LeftNavProvider from '../CommonComp/LeftNavProvider'
import OverviewCardProvider from '../CommonComp/DashboardComp/OverviewCardProvider';
import BarGraphProvider from '../CommonComp/DashboardComp/BarGraphProvider';
import TopSkillsProvider from '../CommonComp/DashboardComp/TopSkillsProvider';

export default class ProviderDashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	onClick = () => {
		this.props.history.push("/");
	};

	render() {
		const details = localStorage.getItem('emaildetails')
		return (
			<div>
				<LeftNavProvider></LeftNavProvider>
				<div className="maincontent">
					<HeaderAll></HeaderAll>
					<div className="container-fluid">
						<div className="row flex-xl-nowrap">
							<section className="content_section col py-md-3 pl-md-4 bd-content">
								<OverviewCardProvider />
								<TopSkillsProvider />
								<BarGraphProvider />
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
