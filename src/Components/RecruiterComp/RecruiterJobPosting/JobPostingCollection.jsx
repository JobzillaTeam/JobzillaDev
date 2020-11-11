import React, { Component } from 'react'
import HeaderAll from '../../CommonComp/HeaderAll'
import Footer from '../../CommonComp/Footer'
import LeftNavProvider from '../../CommonComp/LeftNavProvider'
import CandidateApplication from './CandidateApplication'
import MatchingCandidate from './MatchingCandidate';
import ShortlistedCandidate from './ShortlistedCandidate'
import { TabMenu } from 'primereact/tabmenu';
import { TabView, TabPanel } from 'primereact/tabview';
import { Accordion, AccordionTab } from 'primereact/accordion';
import {Link} from 'react-router-dom'
import ApiServicesOrg from '../../../Services/ApiServicesOrg'

export default class JobPostingCollection extends Component {
	constructor(props){
        super(props)
        const jobDetail={}
        this.state = {
            jobDetail,
            postDate:{},
            postDate1:'',
			activeIndex: 1,
            activeIndex1: null,
        }
        this.activeJob1 = new ApiServicesOrg();
  }

  componentDidMount() {
    //To get job Detail
        this.activeJob1.getAllJobDetails()
          .then(Response =>
           
            this.setState({
                jobDetail:Response.data.responseObject,
                postDate:Response.data.responseObject.createdDate
            },
               
            () =>{
                console.log(this.state.jobDetail) 
                console.log(this.state.postDate)},
        )
           
       );
      
   }
            

        
	onClick(itemIndex) {
        let activeIndex1 = this.state.activeIndex1 ? [...this.state.activeIndex1] : [];
        if (activeIndex1.length === 0) {
            activeIndex1.push(itemIndex);
        }
        else {
            const index = activeIndex1.indexOf(itemIndex);
            if (index === -1) {
                activeIndex1.push(itemIndex);
            }
            else {
                activeIndex1.splice(index, 1);
            }
        }

        this.setState({ activeIndex1 });
    }

  open(){
        alert(`hii`)
  }

  dateDiffInDays(date1, date2) {
    // round to the nearest whole number
    return Math.round((date2-date1)/(1000*60*60*24));
}

 
	render() {
        const d=new Date(this.state.postDate)
        
        const day=d.getDate()
        const month=d.getMonth()+1
        const year=d.getFullYear()
        const FullDate=year+'-'+month+'-'+day
         console.log("fullDate",FullDate)
        const currentDate=new Date()
      
        const currentDate1=currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+ (currentDate.getDay()+1)

        console.log("current",currentDate1)
        const currentDate12=currentDate1
        const daysDiff=this.dateDiffInDays(new Date(FullDate),new Date(currentDate))

		return (
			<div>
				<LeftNavProvider></LeftNavProvider>
				<div className="maincontent">
        <HeaderAll></HeaderAll>
        <div className="content_section main">
            <div className="container-fluid">          
                <div aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <Link to ="/activeJob">Active Jobs</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Job Details</li>
                    </ol>
                </div>
            </div>
           
            <section className="white-middle-section1 mt-4">                               
                  <div>  
                    <img src= "../images/icons/Group 594.svg" onClick={this.open} style={{float : 'right'}}/>
                        <div className="job-title-header">                         
                            <span className="mr-3 job-title-text" id="designation1">{this.state.jobDetail.jobTitle}</span>                         
                            <span className="job-posted-time-text">Posted {daysDiff} days ago</span>                       
                        </div>                  
                    
                        <div className="job-content d-flex-left justify-content">                         
                            <span className="mr-4 job-content-attributes"><i className="pi pi-list mr-2" aria-hidden="true"></i>{this.state.jobDetail.category}</span>                         
                            <span className="mr-4 job-content-attributes"><i className="pi pi-fw pi-calendar mr-2" aria-hidden="true"></i>{this.state.jobDetail.experienceReqFrom}-{this.state.jobDetail.experienceReqTo}years</span>                         
                            <span className="mr-4 job-content-attributes"><i className="pi pi-fw pi-clock mr-2" aria-hidden="true"></i>{this.state.jobDetail.employmentType}</span>                         
                            <span className="mr-4 job-content-attributes"><i className="pi pi-fw pi-map-marker mr-2" aria-hidden="true"></i>{this.state.jobDetail.jobCity},{this.state.jobDetail.jobCountry}</span>                          
                            <span className="mr-4 job-content-attributes"><i className="pi pi-fw pi-cog mr-2" aria-hidden="true"></i>{this.state.jobDetail.primarySkills},{this.state.jobDetail.secondarySkills}</span>                          
                            <span className="mr-4 job-content-attributes"><i className="pi pi-fw pi-users mr-2" aria-hidden="true"></i>{this.state.jobDetail.noOfPositionsAvailable}</span>                        </div>
                        </div>
            </section>
    
        </div>
       
        <div className="content_section main">
            <section className="white-middle-section1 mt-4 "> 
                <div className="viewdetails"><p>View More Details</p></div>  
                    <Accordion activeIndex1={0}  >
                        <div className="card content_card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="content_headings">  
                                        <span><img src="/images/icons/skills.svg"/></span>                              
                                        <h6 >Nice to have</h6>
                                        <span>{this.state.jobDetail.primarySkills}, {this.state.jobDetail.secondarySkills}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="content_headings">
                                       <span><img src="/images/icons/salary.svg"/></span>
                                        <h6 >Annual Salary</h6>
                                        <span>{this.state.jobDetail.annualSalaryFrom}-{this.state.jobDetail.annualSalaryTo}</span>
                                    </div>
                                </div>                    
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="content_headings">
                                        <span><img src="/images/icons/job_desc.svg"/></span>
                                        <h6 >Job Description</h6>
                                        <p>{this.state.jobDetail.jobDescription}</p>
                                       
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="content_headings">
                                        <span><img src="/images/icons/responsibilities.svg"/></span>
                                        <h6>Responsibilities</h6>
                                        <ol>
                                            <li>{this.state.jobDetail.responsibilities}</li>
                                           
                                        </ol>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div  className="content_headings">
                                        <span><img src="/images/icons/others.svg"/></span>
                                        <h6>Others</h6>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-5 others_section_firstcol">
                                                <div>Working Hours</div>
                                            </div>
                                            <div className="col-xs-12 col-md-6 others_section_secondcol">
                                            <div>{this.state.jobDetail.expectedWorkinghrsFrom}-{this.state.jobDetail.expectedWorkinghrsTo}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-5 others_section_firstcol">
                                                <div>Visa</div>
                                            </div>
                                            <div className="col-xs-12 col-md-6 others_section_secondcol">
                                                <div>{this.state.jobDetail.visa}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-5 others_section_firstcol">
                                                <div>Passport</div>
                                            </div>
                                            <div className="col-xs-12 col-md-6 others_section_secondcol">
                                                <div>{this.state.jobDetail.mustHavePassport}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </div>
                          </div>
                    </div>
                </Accordion>
			      </section>
        </div>
    

			  <div className="content_section main">
            <section className="white-middle-section2  mt-4">
                <TabView  className="marB60">
                    <TabPanel header="Shortlisted Candidate">
						            <ShortlistedCandidate></ShortlistedCandidate>
                    </TabPanel>
					          <TabPanel header="Matching Candidate">
						            <MatchingCandidate></MatchingCandidate>
                    </TabPanel>
                    <TabPanel header="CandidateApplication">
						            <CandidateApplication></CandidateApplication>
                    </TabPanel>
                </TabView>
                   
            </section>
				</div>
        <Footer></Footer>
        </div>
      </div>
    )
  }
}
