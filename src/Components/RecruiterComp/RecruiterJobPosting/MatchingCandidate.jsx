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

export default class MatchingCandidate extends Component {

   

    constructor(props) {
        super(props);
        this.state = {
            matchingCandidateData: [],
            match: [],
            matchPer: [],
            candidate: {},
            candidate1: [],
            hasMore: true,
            visible:2

        };

        this.MatchingCandidate = new ApiServicesOrg();
        this.loadMore=this.loadMore.bind(this)
    }

    loadMore() {
        setTimeout(()=>{
        if(this.state.matchingCandidateData.length>=1000){
            this.setState({hasMore:false});
            return
        }
        this.setState((prev) => {
          return {visible: prev.visible + 4};
        });
    },
        500
        )
        
      }

    componentDidMount() {
        this.setState({ loading: true });
        this.MatchingCandidate.getViewAllMatchingCandidate1(this.props.jobID)
            .then(Response => {
                if (Response.data.responseObject) {
                    this.setState({
                        matchingCandidateData: Response.data.responseObject,
                        matcingCandidateLength: Response.data.responseObject.length,
                        match: (Response.data.responseObject).map((data2) => { this.state.matchPer.push(data2.matchingPercentage) }),
                        candidate: (Response.data.responseObject).map((data1) => { this.state.candidate1.push(data1.candidate) }),
                        loading: false
                    },
                        () => {
                            console.log(this.state.matchPer)
                            console.log(this.state.  matchingCandidateData)
                            console.log(this.state.candidate1)

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
                    console.log("Error Occured..", error)
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    declinInvite(candidateID) {
        return (
            this.MatchingCandidate.updateApplicationStatus(this.props.jobID, candidateID, 'Invite_Removed_By_Recruiter')
                .then(Response => {
                    console.log(Response)
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite Declined', life: 2000 })
                    window.location.reload()
                })
                .catch(error => {
                    console.log("Error Occured..", error)
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    showProfile(candidateID) {
        localStorage.setItem("candidateId", candidateID)
    }



    render() {
        return (
            <div className="datatable-editing-demo">
                
              
                <Toast ref={(el) => this.toast = el} />
                <InfiniteScroll
                    dataLength={this.state.matchingCandidateData.length}
                    next={this.loadMore}
                    hasMore={this.state.matchingCandidateData.length>=this.state.visible}
                    loader={<RenderLoader />}
                    height={450}
         
        > 

                <div>
                    <div className="Show">Total Result {this.state.matcingCandidateLength} </div>
                
                        <table className="table table-borderless custom-table">
                            <thead>
                                <tr>
                                    {/* <th>#</th> */}
                                    <th>Candidates</th>
                                    <th>Skills</th>
                                    <th>Experiance</th>
                                    <th>AvailableFrom</th>
                                    <th>Match</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.matchingCandidateData.map((  matchingCandidateData, index) => {
                                    const data =   matchingCandidateData.candidate;
                                    return (
                                        <tr>
                                            {/* <td>{data.candidateId}</td> */}
                                            {/* onClick={localStorage.setItem('candidateID', data.candidateId)} */}
                                            <td>
                                    <Link to={`/candidateProfileToOpen/${data.candidateId}`} onClick={() => this.showProfile(data.candidateId)}><p className="tb-title-text">{data.firstName} {data.lastName}</p> </Link>
                                                <p>{data.currentRole} at {data.company}</p>
                                                <p><img src="/images/icons/location.svg" alt="location" className="pr-2" />{data.address},{data.city}</p>
                                            </td>

                                            <td>
                                                {  matchingCandidateData.candidateSkillsList &&   matchingCandidateData.candidateSkillsList[0] &&   matchingCandidateData.candidateSkillsList.map(skill => skill.skillName).join(', ')}
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
                                                        </div>)}
                                                </ProgressBar>

                                            </td>


                                            <td>
                                                <button className="btn btn-blue1 mr-2" onClick={() => this.acceptInvite(data.candidateId)}>Invite</button>

                                                <button className="btn btn-border1" onClick={() => this.declinInvite(data.candidateId)}>Remove</button>
                                            </td>

                                        </tr>
                                    );
                                }

                                )}

                            </tbody>

                        </table>
                   
                    
                </div>
                </InfiniteScroll>


            </div>
        );
    }
}