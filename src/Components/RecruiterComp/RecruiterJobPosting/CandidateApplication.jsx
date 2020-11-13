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

export default class CandidateApplication extends Component {

    emptyProduct = {
        candidateId: '',
        firstName: '',
        skills: '',
        yearsofExp: '',
        availableFrom: 0,
        matchingPercentage: '',

    };

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            match: [],
            matchPer: [],
            candidate: {},
            candidate1: [],
            candidateLength: '',

            loading: false,

        };

        this.CandidateApplication = new ApiServicesOrg();
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.CandidateApplication.getViewAllCandidateApplication(this.props.jobID)
            .then(Response => {
                if (Response.data.responseObject) {

                    this.setState({
                        products: Response.data.responseObject,
                        candidateLength: Response.data.responseObject.length,
                        match: (Response.data.responseObject).map((data2) => { this.state.matchPer.push(data2.matchingPercentage) }),
                        candidate: (Response.data.responseObject).map((data1) => { this.state.candidate1.push(data1.candidate) }),
                        loading: false
                    },
                        () => {
                            console.log(this.state.matchPer)
                            console.log(this.state.products)
                            console.log(this.state.candidate1)

                        },


                    )
                }
            }
            );


    }



    acceptInvite(candidateID) {
        return (
            this.MatchingCandidate.updateApplicationStatus(this.props.jobID, candidateID, 'Application_Accepted_By_Recruiter')
                .then(Response => {
                    console.log(Response)
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite send Successfully', life: 2000 })
                    // window.location.reload()
                })
                .catch(error => {
                    console.log("Error Occured..", error)
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    declinInvite(candidateID) {
        return (
            this.MatchingCandidate.updateApplicationStatus(this.props.jobID, candidateID, 'Application_Declined_By_Recruiter')
                .then(Response => {
                    console.log(Response)
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite Declined', life: 2000 })
                    //  window.location.reload()
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


                <div>

                    <div className="Show">Total Result {this.state.candidateLength} </div>

                    {this.state.products ?
                        <table className="table table-borderless custom-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Candidates</th>
                                    <th>Skills</th>
                                    <th>Experiance</th>
                                    <th>AvailableFrom</th>
                                    <th>Match</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map((product, index) => {
                                    const data = product.candidate;
                                    return (
                                        <tr>
                                            <td>{data.candidateId}</td>
                                            {/* onClick={localStorage.setItem('candidateID', data.candidateId)} */}
                                            <td>
                                                <Link to="/candidateProfileToOpen" onClick={() => this.showProfile(data.candidateId)}><p className="tb-title-text">{data.firstName}</p> </Link>
                                                <p>{data.currentRole} at {data.company}</p>
                                                <p><img src="/images/icons/location.svg" alt="location" className="pr-2" />{data.address},{data.city}</p>
                                            </td>

                                            <td>
                                                {product.candidateSkillsList && product.candidateSkillsList[0] && product.candidateSkillsList.map(skill => skill.skillName).join(', ')}
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
                                                <button className="btn btn-blue1 mr-2" onClick={() => this.acceptInvite(data.candidateId)}>Accept</button>

                                                <button className="btn btn-border1" onClick={() => this.declinInvite(data.candidateId)}>Declain</button>
                                            </td>

                                        </tr>
                                    );
                                }

                                )}

                            </tbody>

                        </table>
                        :
                        <p>No Contect</p>}
                </div>




            </div>
        );
    }
}
