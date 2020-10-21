import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginComp from '../Components/Auth/LoginComp'
import Signup from '../Components/Auth/Signup'
import ChangePasswordOrg from '../Components/Auth/ChangePasswordOrg'
import ProviderDashboard from '../Components/ProviderComp/ProviderDashboard'
import UploadProfile from '../Components/ProviderComp/UploadProfile'
import TermsOfUse from '../Components/Auth/TermsOfUse'
import PrivacyPolicy from '../Components/Auth/PrivacyPolicy'
import AddUser from '../Components/ProviderComp/AddUser'
import EmailSetting from '../Components/ProviderComp/EmailSetting'
import ManageUser from "../Components/ProviderComp/ManageUser";
import EditUser from "../Components/ProviderComp/EditUser";
import OrgProfile from "../Components/CommonComp/OrgProfile"
import EditOrgProfile from "../Components/CommonComp/EditOrgProfile"
import Logout from "../Components/Auth/Logout";
import LeftNavCandidate from "../Components/CommonComp/LeftNavCandidate";
import Dashboard from "../Components/Candidate/Dashboard";
import Profile1 from "../Components/Candidate/Profile/Profile1";
import {Profile as CandidateProfile} from "../Components/Candidate/Profile";
// import Invites from "../Components/Candidate/Interviews/Invites";
// import Accepted from "../Components/Candidate/Interviews/Accepted";
import JobOffers from "../Components/Candidate/JobOffers";
import SearchJobs from "../Components/Candidate/SearchJobs";
//import RecentMatches from '../Components/Candidate/RecentMatches';
import InterviewInvites from "../Components/Candidate/Interviews/InterviewInvites";
import InterviewInvitesJobdetails from "../Components/Candidate/Interviews/InterviewInvitesJobDetails"
//import JobListing from '../Components/Candidate/JobListing';
import AcceptedInterviews from "../Components/Candidate/Interviews/AcceptedInterviews";
//import JobsPipeline from "../Components/Candidate/JobsPipeline";
import ChangePassword from "../Components/Candidate/ChangePassword"
import RecruiterDashboard from '../Components/RecruiterComp/RecruiterDashboard'
import ActiveJob from "../Components/RecruiterComp/ActiveJob";
import CreateJob from "../Components/RecruiterComp/CreateJob"
import JobPostingCollection from "../Components/RecruiterComp/RecruiterJobPosting/JobPostingCollection"
import CandidateEmailsetting from "../Components/Candidate/CandidateEmailsetting"
import RecentMatchesJobDetails from "../Components/Candidate/RecentMatchesJobDetails"
import JobOfferDetails from "../Components/Candidate/JobOfferDetails"
import AcceptedInviteJobDetails from "../Components/Candidate/Interviews/AcceptedInviteJobDetails"
import SearchJobsDetails from "../Components/Candidate/SearchJobsDetails"
import CloseJobs from "../Components/RecruiterComp/CloseJobs"
import CandidateProfileToOpen from "../Components/RecruiterComp/CandidateProfileToOpen"

class RouterSettings extends Component {

  render() {
    return (
      <Router>
        <div>

          <Switch>
            <Route path="/termsOfUse" component={TermsOfUse} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={LoginComp} />
            <Route path="/login" component={LoginComp} />
            <Route path="/providerDashboard" component={ProviderDashboard} />
            <Route path="/uploadProfile" component={UploadProfile} />
            <Route path="/addUser" component={AddUser} />
            <Route path="/editUser" component={EditUser} />
            <Route path="/emailSetting" component={EmailSetting} />
            <Route path="/ManageUser" component={ManageUser} />
            <Route path="/orgProfile" component={OrgProfile} />
            <Route path="/editOrgProfile" component={EditOrgProfile} />
            <Route path="/leftnavcandidate" component={LeftNavCandidate} />
            <Route path="/logout" component={Logout} />
            <Route path="/changePasswordOrg" component={ChangePasswordOrg}/>



            <Route path="/candidate/dashboard" component={Dashboard} />
            {/* <Route path="/candidate/interviews/invites" component={Invites} />
            <Route path="/candidate/interviews/accepted" component={Accepted} /> */}
            <Route path="/candidate/jobOffers" component={JobOffers} />
            <Route path="/candidate/searchJobs" component={SearchJobs} />
            <Route path="/candidate/searchJobsDetails" component={SearchJobsDetails} />
            <Route path="/candidate/profile" component={CandidateProfile} />
            <Route path="/candidate/profile1" component={Profile1} />
            {/* <Route path="/candidate/recentMatches" component={RecentMatches}/> */}
            <Route path="/candidate/interviews/interviewInvites" component={InterviewInvites}/>
            <Route path="/candidate/interviews/InterviewInvitesJobdetails" component={InterviewInvitesJobdetails}/> 
            <Route path="/candidate/interviews/acceptedInterviews" component={AcceptedInterviews}/>
            <Route path="/candidate/interviews/AcceptedInviteJobDetails" component={AcceptedInviteJobDetails}/>
            <Route path="/candidate/changePassword" component={ChangePassword}/>
            <Route path="/candidate/candidateEmailsetting" component={CandidateEmailsetting}/>
            <Route path="/candidate/recentMatchesJobDetails" component={RecentMatchesJobDetails}/>
            <Route path="/candidate/jobOfferDetails" component={JobOfferDetails}/>
            

            <Route path="/recruiterDashboard" component={RecruiterDashboard} />
            <Route path="/activeJob" component={ActiveJob} />
            <Route path="/createJob" component={CreateJob} />
            <Route path="/jobPostingCollection" component={JobPostingCollection} />
            <Route path="/closeJobs" component={CloseJobs}/>
            <Route path="/candidateProfileToOpen" component={CandidateProfileToOpen}/>

          </Switch>
        </div>
      </Router>
    );
  }
}
export default RouterSettings