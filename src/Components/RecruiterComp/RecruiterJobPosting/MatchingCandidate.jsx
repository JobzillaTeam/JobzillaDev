import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import ProgressBar from 'react-customizable-progressbar'
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ApiServicesOrg from '../../../Services/ApiServicesOrg.jsx';
import { data } from 'jquery';
import InfiniteScroll from "react-infinite-scroll-component";
import RenderLoader from '../../CommonComp/Loader';
import { INITIAL_ITEM_LENGTH } from '../../../Utils/AppConst.jsx';
import ScrollUpButton from "react-scroll-up-button";

export default class MatchingCandidate extends Component {

   

    constructor(props) {
        super(props);
        this.state = {
           
            pageDataLength: INITIAL_ITEM_LENGTH,
            candidate: [],
            matchingCandidateData: [],
            match: [],
            matchPer: [],
            error: false,
            candidateLength: '',
            hasMore: true,
            matchingCandidateLength:''

        };

        this.MatchingCandidate = new ApiServicesOrg();
        this.loadMore=this.loadMore.bind(this)
    }
    loadMore() {
        setTimeout(() => {
            this.setState({
                candidate: [...this.state.matchingCandidateData.slice(0, (this.state.pageDataLength + INITIAL_ITEM_LENGTH))],
                pageDataLength: this.state.pageDataLength + INITIAL_ITEM_LENGTH
            });
        }, 100);
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.MatchingCandidate.getViewAllMatchingCandidate1(this.props.jobID)
            .then(Response => {
                if (Response.data.responseObject) {
                    this.setState({
                        matchingCandidateData: Response.data.responseObject,
                        candidate: Response.data.responseObject.slice(0, INITIAL_ITEM_LENGTH),
                        matchingCandidateLength: Response.data.responseObject.length,
                         match: (Response.data.responseObject).map((data2) => { this.state.matchPer.push(data2.matchingPercentage) }),
                      
                    },
                        () => {
                            console.log(this.state.  matchingCandidateData)
                        },


                    )
                }
            }
            );
    }

    acceptInvite(candidateID) {
        return (
            this.MatchingCandidate.updateApplicationStatus(this.props.jobID, candidateID, 'Invite_Sent_By_Recruiter')
                .then(Response => {
                    console.log(Response)
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite send Successfully', life: 2000 })
                    window.location.reload()
                })
                .catch(error => {
                    console.log("Error Ocurred..", error)
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    declineInvite(candidateID) {
        return (
            this.MatchingCandidate.updateApplicationStatus(this.props.jobID, candidateID, 'Invite_Removed_By_Recruiter')
                .then(Response => {
                    console.log(Response)
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite Removed', life: 2000 })
                    window.location.reload()
                })
                .catch(error => {
                    console.log("Error Ocurred..", error)
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    render() {
        return (
            <div className="datatable-editing-demo">
                
              
                <Toast ref={(el) => this.toast = el} />
                <InfiniteScroll
                    dataLength={this.state.candidate.length}
                    next={this.loadMore}
                    hasMore={this.state.matchingCandidateData.length>this.state.pageDataLength}
                    loader={<RenderLoader />}
                 
         
        > 

                <div>
                    <div className="Show">Total Result {this.state.matchingCandidateData.length} </div>
                
                        <table className="table table-borderless custom-table">
                            <thead>
                                <tr>
                                    {/* <th>#</th> */}
                                    <th>Candidates</th>
                                    <th>Skills</th>
                                    <th>Experience</th>
                                    <th>AvailableFrom</th>
                                    <th>Match</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.candidate.map((  data1, index) => {
                                    const data = data1.candidate;
                                    return (
                                        <tr className="candidateTable">
                                            {/* <td>{data.candidateId}</td> */}
                                            {/* onClick={localStorage.setItem('candidateID', data.candidateId)} */}
                                            <td>
                                    <Link to={`/candidateProfileToOpen/${data.user.id}`}><p className="tb-title-text">{data.firstName} {data.lastName}</p> </Link>
                                                <p>{data.currentRole} at {data.company}</p>
                                                <p><img src="/images/icons/location.svg" alt="location" className="pr-2" />{data.address},{data.city}</p>
                                            </td>

                                            <td>
                                                {  data1.candidateSkillsList &&   data1.candidateSkillsList[0] &&   data1.candidateSkillsList.map(skill => skill.skillName).join(', ')}
                                            </td>

                                            <td>
                                                {data.yearsofExp}
                                            </td>
                                            <td>
                                                {data.availableFrom}
                                            </td>



                                            <td>

                                                <span className="p-column-title"></span>
                                                <ProgressBar className="circle"
                                                    progress={this.state.matchPer}
                                                    radius={32}
                                                    strokeWidth={3}
                                                    strokeColor="#147AD6"
                                                    steps={100}
                                                    cut={20}
                                                    trackStrokeWidth={2}
                                                    progress={this.state.matchPer}>
                                                     {this.state.matchPer.map((data2) => 
                                                        <div className="indicator">
                                                            <div>{data2}%
                                                            Match</div>
                                                        </div>
                                                         )} 
                                                </ProgressBar>

                                            </td>


                                            <td>
                                                <button className="btn btn-blue1 mr-2" onClick={() => this.acceptInvite(data.candidateId)}>Invite</button>

                                                <button className="btn btn-border1" onClick={() => this.declineInvite(data.candidateId)}>Remove</button>
                                            </td>

                                        </tr>
                                    );
                                }

                                )}

                            </tbody>

                        </table>
                   
                    
                </div>
                </InfiniteScroll>
                <ScrollUpButton/>


            </div>
        );
    }
}