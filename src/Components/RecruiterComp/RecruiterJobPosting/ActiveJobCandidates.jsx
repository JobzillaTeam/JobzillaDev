import React from 'react';
import { Card } from 'primereact/card';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ApiServicesOrg from '../../../Services/ApiServicesOrg';

class ActiveJobCandidates extends React.Component {
  onInviteButtonClick = (jobId, candidateId, applicationStatus) => {
    const {toast} = this.props;
    applicationStatus = 'Invite_Sent_By_Recruiter'
    return (
      new ApiServicesOrg().putApplicationStatus(jobId, candidateId, applicationStatus)
        .then(Response => {
          toast.show({ severity: 'success', summary: 'Success Message', detail: 'Invite send Successfully', life: 2000 })
          window.location.reload()
        })
        .catch(error => {
          // console.log("Error Occured..", error)
          toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
        })
    )
  }
  render() {
    const {matchingCandidates, jobId} = this.props;
    return (
      <React.Fragment>
        <div className="row px-4 mb-4">
          {(matchingCandidates) ? matchingCandidates.map((match, index) =>
            <div className="col-md-4 active-job" key={index} >
              {/* {console.log(jobDescription.jobId)} */}

              {(match.matchingCandidates === "undefined") ? <h6 className="noMatchingcandidateText">You have no matching candidates</h6> :
                (<Card className="custom h-100" style={{}} >
                  <div className="row">
                    <div className="location" className="col-md-8">
                      {/* {console.log(match)} */}
                      <div class="activeJobCardItems  wd-ba">
                        <h5 id="name">{match.candidate.firstName} {match.candidate.lastName}</h5>
                        <p id="body">{match.candidate.currentRole} at {match.candidate.company}</p>
                      </div>
                      <hr></hr>
                      <i className="pi pi-map-marker mr-2"></i>{match.candidate.city}, {match.candidate.country}
                    </div>
                    <div className="col-md-4">
                      <div style={{ width: 65, height: 65 }}>
                        <CircularProgressbarWithChildren styles={{
                          path: {
                            stroke: '#147AD6',
                          }
                        }} strokeWidth={4} value={match.matchingPercentage} >
                          <strong><span style={{ fontSize: 12 }}>
                            {match.matchingPercentage}%
                            </span></strong>
                          <span className="Circular_ProgressBar_text">
                            Match
                            </span>
                        </CircularProgressbarWithChildren>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-4" >
                    <div className="col-md-12 p-0">
                      <button type="button" id="footer" style={{ bottom: "0px", position: "relative" }} className="btn w-100 btn-blue" onClick={() => this.onInviteButtonClick(jobId, match.candidate.candidateId)}>Invite</button>
                    </div>
                  </div>
                </Card>)}
            </div>
          ) : <div className="noMatchingcandidateText">No matching Candidates Found</div>}
        </div>
        <div>
        </div>
      </React.Fragment>
    );
  }
}

export default React.memo(ActiveJobCandidates)