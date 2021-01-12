import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InterviewStatusPopUp from './InterviewStatusPopUp.jsx';
import InfiniteScroll from "react-infinite-scroll-component";
import ApiServicesOrg from '../../../Services/ApiServicesOrg.jsx';
import RenderLoader from '../../CommonComp/Loader';
import { INITIAL_ITEM_LENGTH } from '../../../Utils/AppConst.jsx';
import ScrollUpButton from "react-scroll-up-button";
import { getApplicationStatus } from '../../../Utils/AppHelper.js';

class ShortlistedCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageDataLength: INITIAL_ITEM_LENGTH,
            candidate: [],
            candidate1: [],
            visible: 2,
            error: false,
            candidateLength: '',
            hasMore: true,
            candidateIdForUpdateStatus: null
        };
        this.ShortlistedCandidateService = new ApiServicesOrg()
        this.loadMore = this.loadMore.bind(this);
    }
    //Load more records after reaching end of page
    loadMore() {
        setTimeout(() => {
            this.setState({
                candidate: [...this.state.candidate1.slice(0, (this.state.pageDataLength + INITIAL_ITEM_LENGTH))],
                pageDataLength: this.state.pageDataLength + INITIAL_ITEM_LENGTH
            });
        }, 100);
    }


    componentDidMount() {
        //Api call for shorlisted candidate
        this.ShortlistedCandidateService.getViewAllShortlistedCandidate(this.props.jobID)
            .then(Response => {
                if (Response.data.responseObject) {
                    this.setState({
                        candidate1: Response.data.responseObject,
                        candidate: Response.data.responseObject.slice(0, INITIAL_ITEM_LENGTH),
                        candidateLength: Response.data.responseObject.length
                    },
                    )
                }
            }
            );
    }
    //show popup for Edit interview status add comment
    onEditStatusModalRef = (obj) => {
        this.showModal = obj && obj.showModal;
    }

    //Edit interviewstatus and add comment
    editStatus = (candidateId) => {
        this.setState({
            candidateIdForUpdateStatus: candidateId
        });
        this.showModal();
    }

    /**Download Resume */
    downloadResume = (candidateId) => {
        localStorage.setItem("downloadCandidateId", candidateId)
        // Calling Download Resume File Service from Service file:-
        var blob;
        this.ShortlistedCandidateService.downloadResumeFile1()
            .then(Response => {
                if (Response && Response.data && Response.data.responseObject) {
                    var data1 = Response.data.responseObject.cvInBytes
                    blob = this.convertBase64toBlob(data1, 'application/msword');
                    var blobURL = URL.createObjectURL(blob)
                    var blobURL = URL.createObjectURL(blob);
                    window.open(blobURL);
                }
            })
    }

    convertBase64toBlob(content, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        var byteCharacters = window.atob(content); //method which converts base64 to binary
        var byteArrays = [
        ];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, {
            type: contentType
        }); //statement which creates the blob
        return blob;
    }

    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.candidate.length}
                    next={this.loadMore}
                    hasMore={this.state.candidate1.length > this.state.pageDataLength}
                    loader={<RenderLoader />}
                >
                    <div className="Show">Total Result {this.state.candidate1.length} </div>
                    {this.state.candidate1.constructor === Array && this.state.candidate1 && this.state.candidate1[0] ?
                        <table className="table table-borderless custom-table ">

                            <thead className="candidateTableHeader">

                                <tr>
                                    {/* <th>#</th> */}
                                    <th>Candidates</th>
                                    <th>Status <img src="/images/icons/Group 615.svg" alt="down arrow" className="pr-2" /></th>
                                    <th>Comments</th>
                                    <th>Last updated <img src="/images/icons/Group 615.svg" alt="down arrow" className="pr-2" /></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.candidate.map((data, index) =>
                                    <tr className="candidateTable  wd-ba" key={data.candidate.user.id}>
                                        {/* <td>{data.candidate.candidateId}</td> */}
                                        <td>
                                            <Link to={`/candidateProfileToOpen/${data.candidate.user.id}`}><p className="tb-title-text">{data.candidate.firstName} {data.candidate.lastName}</p> </Link>
                                            <p>{data.candidate.currentRole} at {data.candidate.company}</p>
                                            <p><i className="pi pi-envelope mr-2"></i>{data.candidate.emailId}</p>
                                            <p><i className="pi pi-mobile mr-2"></i>{data.candidate.mobileNumber}</p>
                                            <p><img src="/images/icons/location.svg" alt="location" className="pr-2" />{data.candidate.address}</p>
                                        </td>
                                        <td>
                                            <InterviewStatusPopUp ref={this.onEditStatusModalRef} jobID={this.props.jobID} candidateId={this.state.candidateIdForUpdateStatus}></InterviewStatusPopUp>
                                            <span className="mr-2" style={{ cursor: 'pointer' }} onClick={() => this.editStatus(data.candidate.candidateId)}> {data.interviewStatus === "NULL" ? getApplicationStatus(data.applicationStatus) : data.interviewStatus}</span>
                                            <img src="/images/icons/iconfinder_Edit-01_1976055.svg" style={{ cursor: 'pointer' }} onClick={() => this.editStatus(data.candidate.candidateId)}></img>
                                        </td>
                                        <td>{data.comment}</td>
                                        <td>{data.lastModifiedDate.slice(0, -19)}</td>
                                        {data.isResumeAvailable ?
                                            <td>
                                                <div style={{ cursor: 'pointer' }} onClick={() => this.downloadResume(data.candidate.candidateId)}><img src="/images/icons/Group 555.svg"></img> Download Resume</div>
                                            </td> : <div></div>}
                                    </tr>)}
                            </tbody>
                        </table>
                        : <div className="viewdetails1">No Shortlisted Candidates Found</div>}
                </InfiniteScroll>
                <ScrollUpButton />
            </div>
        );
    }
}

export default React.memo(ShortlistedCandidate)