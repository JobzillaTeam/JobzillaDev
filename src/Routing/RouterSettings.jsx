import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
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
//import Resume from '../Components/Candidate/Resume'
import CandidateLayout from '../Layouts/CandidateLayout'
import OrganizationLayout from "../Layouts/OrganizationLayout";
import AuthLayout from "../Layouts/AuthLayout";
import { AppHelper } from "../Utils/AppHelper";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import CandidateJobDetails from "../Components/Candidate/CandidateJobDetails";
import RecruiterJobDetails from "../Components/RecruiterComp/RecruiterActiveJobDetails";
import RecruiterActiveJobDetails from "../Components/RecruiterComp/RecruiterActiveJobDetails";
import RecruiterClosedJobDetails from "../Components/RecruiterComp/RecruiterClosedJobDetails";

class RouterSettings extends Component {

  render() {
    return (
      <Router>
        <div>

          <Switch>
            <Route path="/termsOfUse" component={TermsOfUse} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
            <AuthLayout path="/signup" component={Signup} />
            <AuthLayout exact path="/" component={LoginComp} />
            <AuthLayout path="/login" component={LoginComp} />
            <AuthLayout path="/forgotPassword" component={ForgotPassword} />
            <OrganizationLayout path="/providerDashboard" component={ProviderDashboard} />
            <OrganizationLayout path="/uploadProfile" component={UploadProfile} />
            <OrganizationLayout path="/addUser" component={AddUser} />
            <OrganizationLayout path="/editUser" component={EditUser} />
            <OrganizationLayout path="/emailSetting" component={EmailSetting} />
            <OrganizationLayout path="/ManageUser" component={ManageUser} />
            <OrganizationLayout path="/orgProfile" component={OrgProfile} />
            <OrganizationLayout path="/editOrgProfile" component={EditOrgProfile} />
            <Route path="/leftnavcandidate" component={LeftNavCandidate} />
            <Route path="/logout">
              {() => {
                return AppHelper.onLogout();
              }}
            </Route>
            <OrganizationLayout path="/changePasswordOrg" component={ChangePasswordOrg}/>

            <CandidateLayout path="/candidate/dashboard" component={Dashboard} />
            <CandidateLayout path="/candidate/jobOffers" component={JobOffers} />
            <CandidateLayout path="/candidate/searchJobs" component={SearchJobs} />
            <CandidateLayout path="/candidate/searchJobsDetails/:jobID/" component={SearchJobsDetails} />
            <CandidateLayout path="/candidate/profile" component={CandidateProfile} />
            <CandidateLayout path="/candidate/profile1" component={Profile1} />
            <CandidateLayout path="/candidate/interviews/interviewInvites" component={InterviewInvites}/>
            <CandidateLayout path="/candidate/jobDetails/:jobID/:jobStatus" component={CandidateJobDetails}/>
            <CandidateLayout path="/candidate/interviews/acceptedInterviews" component={AcceptedInterviews}/>
            <CandidateLayout path="/candidate/interviews/AcceptedInviteJobDetails/:jobID" component={AcceptedInviteJobDetails}/>
            <CandidateLayout path="/candidate/changePassword" component={ChangePassword}/>
            <CandidateLayout path="/candidate/candidateEmailsetting" component={CandidateEmailsetting}/>
            <CandidateLayout path="/candidate/recentMatchesJobDetails" component={RecentMatchesJobDetails}/>
            <CandidateLayout path="/candidate/jobOfferDetails" component={JobOfferDetails}/>

            <OrganizationLayout path="/recruiterDashboard" component={RecruiterDashboard} />
            <OrganizationLayout path="/activeJob" component={ActiveJob} />
            <OrganizationLayout path="/createJob" component={CreateJob} />
            <OrganizationLayout path="/jobPostingCollection/:jobID" component={JobPostingCollection} />
            <OrganizationLayout path="/closeJobs" component={CloseJobs}/>
            <OrganizationLayout path="/recruiter/jobDetails/:jobID/active" component={RecruiterActiveJobDetails}/>
            <OrganizationLayout path="/recruiter/jobDetails/:jobID/closed" component={RecruiterClosedJobDetails}/>
            <OrganizationLayout path="/candidateProfileToOpen/:userId" component={CandidateProfileToOpen}/>

          </Switch>
        </div>
      </Router>
    );
  }
}
export default RouterSettings