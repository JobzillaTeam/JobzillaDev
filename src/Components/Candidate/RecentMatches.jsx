import React, { Component, Fragment } from 'react'
import Footer from '../CommonComp/Footer';
import LeftNavCandidate from '../CommonComp/LeftNavCandidate'
import HeaderAll from '../CommonComp/HeaderAll';



class RecentMatches extends Component {    
    render(){       
        return(
            <Fragment>
                <LeftNavCandidate></LeftNavCandidate>
				<div className="maincontent toggled">                
                <HeaderAll isCandidate={true}></HeaderAll>
                <div className="container-fluid">
                <div className="row">
                <div className="col">
                <div aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Recent Matches</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Job Details</li>
                </ol>
                </div>
                    </div>
                    </div>
                </div>
                <div className="container-fluid">
                <div className="row">
                <div className="col job_details">
                        <div className="card">
                        <div className="card-body">
                            <h6>TCS - Sr. Software Engineer</h6>
                            <span>Posted 1 day ago</span>
                            <ul class="list-group list-group-horizontal details_list">
                            <li class="list-group-item"><span><img src="/images/Dashboard-assets/Path 479.svg"/></span>Development</li>
                            <li class="list-group-item"><span><img src="/images/Dashboard-assets/Group 631.svg"/></span>5-6 years</li>
                            <li class="list-group-item"><span><img src="/images/Dashboard-assets/Shape.svg"/></span>Permanent</li>
                            <li class="list-group-item"><span><img src="/images/Dashboard-assets/Group 632.svg"/></span>Mumbai, India</li>
                            <li class="list-group-item"><span><img src="/images/Dashboard-assets/Group 633.svg"/></span>Java, J2EE</li>
                            <li class="list-group-item"><span><img src="/images/Dashboard-assets/Group 634.svg"/></span>2</li>
                            </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                <div className="card content_card">
                            <div className="card-body">
                    <div className="row">
                        
                    <div className="col">
                            <div className="content_headings">  
                            <span><img src="/images/Dashboard-assets/iconfinder_m-14_4230554.svg"/></span>                              
                                <h6 >Nice to have</h6>
                                <span>Skill 1, Skill 2, Skill 3</span>
                            </div>
                        </div>
                        <div className="col">
                        <div className="content_headings">
                        <span><img src="/images/Dashboard-assets/miu-1.svg"/></span>
                                <h6 >Annual Salary</h6>
                                <span>8.00 - 10.00 Lakhs</span>
                            </div>
                        </div>
                        
                    </div>
                    <hr/>
                    <div className="row row-cols-2">
                    <div className="col">
                            <div className="content_headings">
                            <span><img src="/images/Dashboard-assets/Group 374.svg"/></span>
                                <h6 >Job Description</h6>
                                <p>We are looking for a Senior Python Developer to build functional and efficient server-side applications.</p>
                                <p>Senior Python Developer responsibilities include participating in all phases of the software development lifecycle and coaching junior developers. If you’re a seasoned developer with a love for back-end technologies, we’d like to meet you.</p>
                                <p>Your ultimate goal is to create high-quality products that meet customer needs.</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="content_headings">
                            <span><img src="/images/Dashboard-assets/iconfinder_checklist_job_seeker_employee_unemployee_work_2620529 (1).svg"/></span>
                                <h6 >Responsibilities</h6>
                                <ol>
                                    <li>Help design and implement functional requirements.</li>
                                    <li>Build efficient back-end features in Python.</li>
                                    <li>Integrate front-end components into applications.</li>
                                    <li>Manage testing and bug fixes Prepare technical documentation.</li>
                                    <li>Collaborate with UX/UI designers to implement design into the code.</li>
                                    <li>Coach junior team members.</li>
                                    <li>Implement software enhancements and suggest improvements.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="col">
                            <div  className="content_headings">
                            <span><img src="/images/Dashboard-assets/Path 4144.svg"/></span>
                                <h6>Others</h6>
                                <div className="row">
                                <div className="col others_section_firstcol">
                                    <div>Working Hours</div>
                                    <div>Visa</div>
                                    <div>Passport</div>
                                    </div>
                                    <div className="col others_section_secondcol">
                                    <div>10:00 AM-7:00 PM</div>
                                    <div>Nice to have H1B</div>
                                    <div>Must have Passport</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="apply_btn">
                        <button type="button" className="btn btn-primary">Apply</button>
                    </div>
                    </div>
                        </div>
                </div>
                
                <Footer></Footer>
                </div>
            </Fragment>
 
        )
    }
}
export default RecentMatches