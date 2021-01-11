import React from 'react';
import $ from 'jquery'
import { Link, NavLink, useLocation } from "react-router-dom";

const LeftNavProvider = () => {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $(".maincontent").toggleClass("toggled");
    });

    const userRole = JSON.parse(localStorage.getItem('userDetails')).userRole;
    //To move dot to active page
    const isActive = (path, match, location) => !!(match || path === location.pathname);
    let location = useLocation();
    const matchUrls = ['/activeJob', '/closeJobs', '/recruiter/jobDetails/active/', '/recruiter/jobDetails/closed/']
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
                    {/** 
                       If Provider toggle is active then provider Dashboard will open and 
                       if Recruiter toggle is active then Recruiter Dashboard will through Navbar 
                      **/}
                    {localStorage.getItem('status') === "recruiter" ?
                        (<li data-toggle="tooltip" data-placement="right" title="Dashboard">
                            <NavLink to={'/recruiterDashboard'}
                                activeClassName="active"
                                isActive={isActive.bind(this, '/recruiterDashboard')}>
                                <i><img src="/images/NavBar/dashboard_icon.png" aria-hidden="true" /></i>
                                <span className="menuText">Dashboard</span>
                            </NavLink>
                        </li>)
                        :
                        (<li data-toggle="tooltip" data-placement="right" title="Dashboard">
                            <NavLink to={'/providerDashboard'}
                                activeClassName="active"
                                isActive={isActive.bind(this, '/providerDashboard')}>
                                <i><img src="/images/NavBar/dashboard_icon.png" aria-hidden="true" /></i>
                                <span className="menuText">Dashboard</span>
                            </NavLink>
                        </li>)
                    }

                    {/** If provider toggle is active then upload profile is displayed in navbar and
                         if recruiter toggle is active then upload profile is replaced with Jobs dropdown
                         in left navigation bar
                    **/}

                    {localStorage.getItem('status') === "recruiter" ?
                        (
                            <li data-toggle="tooltip" data-placement="right" title="Jobs">
                                <Link className={`subMenu ${!isJobDropdownOpen ? 'collapsed' : ''}`} id="navbarDropdown" role="button"
                                    data-toggle="collapse" data-target="#submenu1sub1">
                                    <i><img src="/images/Candidate-Navbar-assets/job-offers.svg" aria-hidden="true" /></i>
                                    <span className="menuText">Jobs</span>
                                </Link>
                                <div className={`collapse ${isJobDropdownOpen ? 'show' : ''}`} id="submenu1sub1" aria-expanded={isJobDropdownOpen}>
                                    <ul className="flex-column nav submenuLink">
                                        <li className="dropdown-item" data-toggle="tooltip" data-placement="right" title="Active Jobs">
                                            <NavLink to="/activeJob"
                                                activeClassName="active"
                                                className={`${location.pathname.includes('/recruiter/jobDetails/active/') && 'active'}`}
                                                isActive={isActive.bind(this, '/activeJob')}
                                            >
                                                <i><img src="/images/Candidate-Navbar-assets/Recruiter-active-jobs-icon.svg" aria-hidden="true" /></i>
                                                <span className="menuText">Active Jobs</span>
                                            </NavLink>
                                        </li>
                                        <li class="dropdown-item" data-toggle="tooltip" data-placement="right" title="Closed Jobs">
                                            <NavLink to="/closeJobs"
                                                activeClassName="active"
                                                className={`${location.pathname.includes('/recruiter/jobDetails/closed/') && 'active'}`}
                                                isActive={isActive.bind(this, '/closeJobs')}
                                            >
                                                <i><img src="/images/Candidate-Navbar-assets/Recruiter-closed-job-icons.svg" aria-hidden="true" /></i>
                                                <span className="menuText">Closed Jobs</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>)
                        :
                        (<li data-toggle="tooltip" data-placement="right" title="Upload Profile">
                            <NavLink to={'/uploadProfile'}
                                activeClassName="active"
                                isActive={isActive.bind(this, '/uploadProfile')}>
                                <i><img src="images/NavBar/upload-profile-ico.svg" aria-hidden="true" /></i>
                                <span className="menuText">Upload Profile</span>
                            </NavLink>
                        </li>)
                    }
                    {(userRole === "User") ? null :
                        (<li data-toggle="tooltip" data-placement="right" title="Manage Users">
                            <NavLink to={'/manageUser'}
                                activeClassName="active"
                                isActive={isActive.bind(this, '/manageUser')}>
                                <i><img src="/images/NavBar/profile.png" aria-hidden="true" /></i>
                                <span className="menuText">Manage Users</span></NavLink>
                        </li>)
                    }
                </ul>
            </div>

        </div>
    )
}

export default LeftNavProvider
