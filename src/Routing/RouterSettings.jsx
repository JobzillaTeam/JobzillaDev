import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import LoginComp from '../Components/Auth/LoginComp'
import Signup from '../Components/Auth/Signup'
import ChangePasswordOrg from '../Components/Auth/ChangePasswordOrg'
import ProviderDashboard from '../Components/ProviderComp/ProviderDashboard'
import UploadProfile from '../Components/ProviderComp/UploadProfile'
import TermsOfUse from '../Components/Auth/TermsOfUse'
import AddUser from '../Components/ProviderComp/AddUser'
import EmailSetting from '../Components/ProviderComp/EmailSetting'
import ManageUser from "../Components/ProviderComp/ManageUser";
import EditUser from "../Components/ProviderComp/EditUser";
import OrgProfile from "../Components/CommonComp/OrgProfile"
import EditOrgProfile from "../Components/CommonComp/EditOrgProfile"
import Logout from "../Components/Auth/Logout";
import LeftNavCandidate from "../Components/CommonComp/LeftNavCandidate";
import Dashboard from "../Components/Candidate/Dashboard";
import {Profile as CandidateProfile} from "../Components/Candidate/Profile";
// import Invites from "../Components/Candidate/Interviews/Invites";
// import Accepted from "../Components/Candidate/Interviews/Accepted";
import JobOffers from "../Components/Candidate/JobOffers";
import SearchJobs from "../Components/Candidate/SearchJobs";
import InterviewInvites from "../Components/Candidate/Interviews/InterviewInvites";
//import JobListing from '../Components/Candidate/JobListing';
import AcceptedInterviews from "../Components/Candidate/Interviews/AcceptedInterviews";
//import JobsPipeline from "../Components/Candidate/JobsPipeline";
import ChangePassword from "../Components/Candidate/ChangePassword"
import RecruiterDashboard from '../Components/RecruiterComp/RecruiterDashboard'
import ActiveJob from "../Components/RecruiterComp/ActiveJob";
import CreateJob from "../Components/RecruiterComp/CreateJob"
import CandidateEmailsetting from "../Components/Candidate/CandidateEmailsetting"
import CloseJobs from "../Components/RecruiterComp/CloseJobs"
import CandidateProfileToOpen from "../Components/RecruiterComp/CandidateProfileToOpen"
//import Resume from '../Components/Candidate/Resume'
import CandidateLayout from '../Layouts/CandidateLayout'
import OrganizationLayout from "../Layouts/OrganizationLayout";
import AuthLayout from "../Layouts/AuthLayout";
import { AppHelper } from "../Utils/AppHelper";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import CandidateJobDetails from "../Components/Candidate/CandidateJobDetails";
import RecruiterActiveJobDetails from "../Components/RecruiterComp/RecruiterActiveJobDetails";
import RecruiterClosedJobDetails from "../Components/RecruiterComp/RecruiterClosedJobDetails";
import EditJob from '../Components/RecruiterComp/EditJob'

class RouterSettings extends Component {

  render() {
    return (
      <Router>
        <div>

          <Switch>
            <Route path="/termsOfUse" component={TermsOfUse} />
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
            <CandidateLayout path="/candidate/profile" component={CandidateProfile} />
            <CandidateLayout path="/candidate/interviews/interviewInvites" component={InterviewInvites}/>
            <CandidateLayout path="/candidate/jobDetails/:jobStatus/:jobID" component={CandidateJobDetails}/>
            <CandidateLayout path="/candidate/interviews/acceptedInterviews" component={AcceptedInterviews}/>
            <CandidateLayout path="/candidate/changePassword" component={ChangePassword}/>
            <CandidateLayout path="/candidate/candidateEmailsetting" component={CandidateEmailsetting}/>



            <OrganizationLayout path="/recruiterDashboard" component={RecruiterDashboard} />
            <OrganizationLayout path="/activeJob" component={ActiveJob} />
            <OrganizationLayout path="/createJob" component={CreateJob} />
            <OrganizationLayout path="/closeJobs" component={CloseJobs}/>
            <OrganizationLayout path="/recruiter/jobDetails/active/:jobID" component={RecruiterActiveJobDetails}/>
            <OrganizationLayout path="/recruiter/jobDetails/closed/:jobID" component={RecruiterClosedJobDetails}/>
            <OrganizationLayout path="/candidateProfileToOpen/:userId" component={CandidateProfileToOpen}/>
            <OrganizationLayout path="/recruiter/jobDetails/editJob/:jobID" component={EditJob}/>

          </Switch>
        </div>
      </Router>
    );
  }
}
export default RouterSettings