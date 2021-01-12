import React from 'react';
import $ from 'jquery'
import { Link, NavLink, useLocation } from "react-router-dom";

const LeftNavCandidate = () => {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $(".maincontent").toggleClass("toggled");
    });

    //To move dot to active page
    const isActive = (path, match, location) => !!(match || path === location.pathname);
    let location = useLocation();
    const matchUrls = ['/candidate/interviews/interviewInvites', '/candidate/Interviews/AcceptedInterviews', '/candidate/jobDetails/invites/', '/candidate/jobDetails/accepted/']
    let isJobDropdownOpen = false;
    for (let i = 0; i < matchUrls.length; i++) {
        if (location.pathname.includes(matchUrls[i])) {
            isJobDropdownOpen = true;
            break;
        }
    }
    return (
        <div id="wrapper" className="">
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav" >
                    <li className="sidebar-brand">
                        <div className="logoHeader">
                            <img src="/images/NavBar/logo.png" alt="Logo" />
                            <div className="float-right">
                                <a href="#" id="menu-toggle">
                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li data-toggle="tooltip" data-placement="right" title="Dashboard">
                        <NavLink to={'/Candidate/Dashboard'}
                            activeClassName="active"
                            isActive={isActive.bind(this, '/Candidate/Dashboard')}>
                            <i><img src="/images/Candidate-Navbar-assets/dashboard_icon.png" aria-hidden="true" /></i>
                            <span className="menuText">Dashboard</span>
                        </NavLink>
                    </li>
                    <li data-toggle="tooltip" data-placement="right" title="Interviews">
                        <Link to="#" className={`subMenu ${!isJobDropdownOpen ? 'collapsed' : ''}`} id="navbarDropdown" role="button"
                            data-toggle="collapse" data-target="#submenu1sub1">
                            <i><img src="/images/Candidate-Navbar-assets/interviews-icon.svg" aria-hidden="true" /></i>
                            <span className="menuText">Interviews</span>
                        </Link>
                        <div className={`collapse ${isJobDropdownOpen ? 'show' : ''}`} id="submenu1sub1" aria-expanded={isJobDropdownOpen}>
                            <ul className="flex-column nav submenuLink">
                                <li className="dropdown-item" data-toggle="tooltip" data-placement="right" title="Invites"
                                >
                                    <NavLink to={{ pathname: '/candidate/interviews/interviewInvites' }} className={`${location.pathname.includes('/candidate/jobDetails/invites/') && 'active'}`} >
                                        <span className="menuText">Invites</span>
                                    </NavLink>
                                </li>
                                <li className="dropdown-item" data-toggle="tooltip" data-placement="right" title="Accepted">
                                    <NavLink to="/candidate/Interviews/AcceptedInterviews"
                                        isActive={isActive.bind(this, '/Candidate/Interviews/Accepted')}
                                        className={`${location.pathname.includes('/candidate/jobDetails/accepted/') && 'active'}`}
                                    >
                                        <span className="menuText">Accepted</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li data-toggle="tooltip" data-placement="right" title="Job Offers">
                        <NavLink to={'/Candidate/JobOffers'}
                            activeClassName="active"
                            isActive={isActive.bind(this, '/Candidate/JobOffers')}>
                            <i><img src="/images/Candidate-Navbar-assets/job-offers.svg" aria-hidden="true" /></i>
                            <span className="menuText">Job Offers</span></NavLink>
                    </li>
                    <li data-toggle="tooltip" data-placement="right" title="Search Jobs">
                        <NavLink to={'/Candidate/SearchJobs'}
                            activeClassName="active"
                            isActive={isActive.bind(this, '/Candidate/SearchJobs')}>
                            <i><img src="/images/Candidate-Navbar-assets/job-search.svg" aria-hidden="true"></img></i>
                            <span className="menuText">Search Jobs</span></NavLink>
                    </li>
                    <li data-toggle="tooltip" data-placement="right" title="Profile">
                        <NavLink to={'/Candidate/Profile'}
                            activeClassName="active"
                            isActive={isActive.bind(this, '/Candidate/Profile')}>
                            <i><img src="/images/Candidate-Navbar-assets/profile.png" aria-hidden="true"></img></i>
                            <span className="menuText">Profile</span></NavLink>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default LeftNavCandidate
