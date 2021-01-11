import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar'
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

export default class CandidateApplication extends Component {
    constructor(props) {
        super(props);
        this.state = {
           pageDataLength: INITIAL_ITEM_LENGTH,
            candidate: [],
            candidateData: [],
            error: false,
            candidateLength: '',
            hasMore: true
        };
        this.CandidateApplication = new ApiServicesOrg();
        this.loadMore=this.loadMore.bind(this)
    }

    loadMore() {
        setTimeout(() => {
            this.setState({
                candidate: [...this.state.candidateData.slice(0, (this.state.pageDataLength + INITIAL_ITEM_LENGTH))],
                pageDataLength: this.state.pageDataLength + INITIAL_ITEM_LENGTH
            });
        }, 100);
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.CandidateApplication.getViewAllCandidateApplication(this.props.jobID)
            .then(Response => {
                if (Response.data.responseObject) {

                    this.setState({
                        candidateData: Response.data.responseObject,
                        candidateLength: Response.data.responseObject.length,
                        candidate: Response.data.responseObject.slice(0, INITIAL_ITEM_LENGTH),                       
                    },
                        () => {
                            },
                    )
                }
            }
            );
    }

    acceptInvite(candidateID) {
        return (
            new ApiServicesOrg().updateApplicationStatus(this.props.jobID, candidateID, 'Application_Accepted_By_Recruiter')
                .then(Response => {
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Application accepted successfully', life: 2000 })
                    window.location.reload()
                })
                .catch(error => {
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    declineInvite(candidateID) {
        return (
            new ApiServicesOrg().updateApplicationStatus(this.props.jobID, candidateID, 'Application_Declined_By_Recruiter')
                .then(Response => {
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Application Declined', life: 2000 })
                     window.location.reload()
                })
                .catch(error => {
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    render() {
        return (
            <div className="datatable-editing-demo">
                <Toast className="toast_padding" ref={(el) => this.toast = el} />
                <InfiniteScroll
                    dataLength={this.state.candidate.length}
                    next={this.loadMore}
                    hasMore={this.state.candidateData.length>=this.state.pageDataLength}
                    loader={<RenderLoader />}
                > 
                <div>
                    <div className="Show">Total Result {this.state.candidateData.length} </div>
                    {this.state.candidateData.constructor === Array && this.state.candidateData && this.state.candidateData[0]?
                        <table className="table table-borderless custom-table">
                            <thead className="candidateTableHeader">
                                <tr>
                                    {/* <th>#</th> */}
                                    <th>Candidates</th>
                                    <th>Skills</th>
                                    <th>Experience</th>
                                    <th>Match</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.candidate.map((data1, index) => {
                                    const data = data1.candidate;
                                    return (
                                        <tr className="candidateTable  wd-ba">
                                            <td>
                                                <Link to={`/candidateProfileToOpen/${data.user.id}`}><p className="tb-title-text">{data.firstName} {data.lastName}</p> </Link>
                                                <p>{data.currentRole} at {data.company}</p>
                                                <p><img src="/images/icons/location.svg" alt="location" className="pr-2" />{data.address}</p>
                                            </td>
                                            <td>
                                              {data1.candidateSkillsList && data1.candidateSkillsList[0] && data1.candidateSkillsList.map(skill => skill.skillName).join(', ')}
                                            </td>
                                            <td>
                                                {data.yearsofExp}
                                            </td>
                                            <td className='candidateProgress'>                                       
                                                <div style={{ width: 65, height: 65 }}>
                                                    <CircularProgressbarWithChildren styles={{
                                                        path: {
                                                            stroke: '#147AD6',
                                                        }
                                                        }} strokeWidth={4} value={data1.matchingPercentage} >
                                                        <strong><span style={{ fontSize: 12 }}>
                                                        {data1.matchingPercentage}%
                                                        </span></strong>
                                                        <span className="Circular_ProgressBar_text">
                                                            Match
                                                        </span>
                                                    </CircularProgressbarWithChildren>
                                                </div>
                                            </td>
                                            <td>
                                                <button className="btn btn-blue1 mr-2 marB10" onClick={() => this.acceptInvite(data.candidateId)}>Accept</button>
                                                <button className="btn btn-border1 marB10" onClick={() => this.declineInvite(data.candidateId)}>Decline</button>
                                            </td>
                                        </tr>
                                    );
                                }
                                )}
                            </tbody>
                          </table>
                          :<div className="viewdetails1">No Candidates Applications Found</div>}
                </div>
                
            </InfiniteScroll> 
            <ScrollUpButton/>  
            </div>
        );
    }
}