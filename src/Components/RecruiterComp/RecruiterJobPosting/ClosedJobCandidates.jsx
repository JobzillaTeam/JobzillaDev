import React from 'react';


export default class ClosedJobCandidates extends React.Component {
  render() {
    const { joinedCandidates } = this.props;
    return (
      <div>
        <table className="table table-borderless custom-table">
          <thead>
            <tr>
              <th>Candidates</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {
              joinedCandidates && joinedCandidates.map(joinedCandidate => {
                return (
                  <tr className="candidateTable  wd-ba">
                    <td>
                      <p className="tb-title-text">{`${joinedCandidate.candidate.firstName} ${joinedCandidate.candidate.lastName}`}</p>
                      <p>{`${joinedCandidate.candidate.currentRole} at ${joinedCandidate.candidate.company}`}</p>
                      <p>
                      <i className="pi pi-envelope mr-2"></i>
                        {joinedCandidate.candidate.emailId}
                      </p>
                      <p>
                      <i className="pi pi-mobile mr-2"></i>
                        {joinedCandidate.candidate.mobileNumber}
                      </p>
                      <p>
                        <img
                          src="/images/icons/location.svg"
                          alt="location"
                          className="pr-2"
                        />
                        {joinedCandidate.candidate.address}
                      </p>
                    </td>
                    <td>{joinedCandidate.interviewStatus}</td>
                    <td>{joinedCandidate.comment}</td>
                    <td>{joinedCandidate.lastModifiedDate.slice(0, -19)}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </ div>
    );
  }
}