import axios from 'axios'
import { ApiBaseUrl, ApiHeader } from '../Config.jsx'

import React, { Component } from 'react';
import { parseJSON } from 'jquery';



class ApiServicesOrg extends Component {

    getToken() {
        const token = JSON.parse(localStorage.getItem('userDetails')).authToken;
        const tokenHeader = { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } }
        return tokenHeader;
    }
    //1. Sending Signup details to backend
    postSignup(signupDetails) {
        return (
            axios
                .post(ApiBaseUrl + "/user/signup", signupDetails, ApiHeader)
                .then(Response => Response)
        )
    }


    // //2. Sending Login details to backend and get Role
    // putLogin (emailid, password) {
    //     return (
    //         axios
    //           .put(`${ApiBaseUrl}/user/login`, {userName: emailid, password: password})
    //           .then(resp => {
    //               console.log(resp);
    //               return resp;
    //           } ).catch(error => {
    //             console.log(error);
    //           })
    //       )
    // }



    //2. Sending Login details to backend and get Role
    putLogin(fields) {
        return (
            axios
                .put(ApiBaseUrl + "/user/login", { 'password': fields.password, 'userName': fields.emailid }, ApiHeader)
                .then(Response => Response)
        )

    }

    //3. Provider Functionalities

    //3.1 Downloading Sample CSV file
    fetchSampleFile() {
        return (
            fetch(ApiBaseUrl + "/user/csvdownload", this.getToken())
                .then(Response => Response)
        )
    }


    //3.2 Uploading CSV with Drag-Drop, File explore facilities
    postSampleFile(formdata, formheader) {
        return (
            axios
                .post(ApiBaseUrl + "/user/uploadcsv", formdata, formheader)
                .then(Response => Response)
        )
    }

    //3.3 Get Email Setting for Organization (Provider/Recruiter)
    getEmailSettings() {
        const candidateId = JSON.parse(localStorage.getItem('userDetails')).id;
        return (
            axios
                .get(ApiBaseUrl + '/organization/notificationSettingForOrganization?candidateId=' + candidateId, this.getToken())
                .then(Response => Response)
        )
    }

    //3.4 Post Email Setting for Organization (Provider/Recruiter)
    putEmailSettings(data) {
        return (
            axios
                .put(ApiBaseUrl + "/organization/notificationSettingForOrganization", data, this.getToken())
                .then(Response => Response)
        )
    }

    // 4. Manage User Functionalities

    //4.1 View User list- Manage User Component
    getViewAllUser() {
        const userId = JSON.parse(localStorage.getItem('userDetails')).id;
        return (
            axios
                .get(ApiBaseUrl + '/user/allUsersByRole/' + userId, this.getToken())
                .then(Response => Response)
        )
    }

    //4.2 Add User-  Admin/User

    postAddUser(fields) {

        console.log(fields)
        return (
            axios
                .post(ApiBaseUrl + "/user/user", fields, this.getToken())
                .then(Response => Response)
        )
    }

    //4.3 Edit User- Admin/User
    putEditUser(fields) {
        return (
            axios
                .put(ApiBaseUrl + "/user/user", fields, this.getToken())
                .then(Response => Response)
        )
    }

    //4.4 Delete User - Single User- Admin/User
    deleteUser(userId) {
        return (
            axios
                .delete(ApiBaseUrl + "/user/userById/" + userId, this.getToken())
                .then(Response => Response)
        )
    }

    //4.5 Delete User - Multiple Users- Admin/User
    //     deleteMultiUser(updatedUserId){
    //         console.log(ApiBaseUrl+ "/user/multipleUsersById/", {data:updatedUserId}, this.getToken())
    //         return(
    //             axios
    //             .delete(ApiBaseUrl+ "/user/multipleUsersById/", {data:updatedUserId}, this.getToken())
    //             .then(Response => Response)
    //         )    
    // }
    deleteMultiUser(updatedUserId) {
        console.log(ApiBaseUrl + "/user/multipleUsersById/" + updatedUserId)
        return (
            axios
                .delete(ApiBaseUrl + "/user/multipleUsersById/" + updatedUserId, this.getToken())
                .then(Response => Response)
        )
    }


    // 5. Recruiter Functionalities

    //5.1 Active Job- All jobs to view on main "Active-Job" page
    getAllActiveJobs() {
        const orgId = JSON.parse(localStorage.getItem('userDetails')).orgnaizationId;
        return (
            axios
                .get(ApiBaseUrl + '/recruiter/listOfAllActiveJobs/' + orgId, this.getToken())
                .then(Response => Response,
            )
        )
    }

    //5.2 post api for active job-- invite button
    putApplicationStatus(jobId, candidateId, applicationStatus) {
        console.log(ApiBaseUrl + `/recruiter/updateApplicationStatus/${jobId}/${candidateId}/${applicationStatus}`, this.getToken())
        return (
            axios
                .put(ApiBaseUrl + '/recruiter/updateApplicationStatus/' + jobId + '/' + candidateId + '/' + applicationStatus, null, this.getToken())
                .then(Response => Response)
        )
    }

    //5.3 Active Job- VeiwDetails- View Matching Candidate list- Job Details Component
    getViewAllMatchingCandidate(jobId) {
        // const jobId = localStorage.getItem('matchingId')
        return (
            axios
                .get(ApiBaseUrl + '/recruiter/listOfMatchingCandidateApplications/' + jobId, this.getToken())
                .then(Response => Response)
        )
    }

    //5.5 View Candidate profile 
    getCandidateInfo() {
        // const userId = JSON.parse(localStorage.getItem('candidateId'));
        const userId = 126
        return (
            axios
                .get(ApiBaseUrl + '/candidate/profileview/' + userId, this.getToken())
                .then(Response => Response)
        )
    }

    updateAcceptedTC() {
        const userID = localStorage.getItem('userId')
        const authToken = localStorage.getItem('authToken')

        return (
            axios
                .put(`${ApiBaseUrl}/user/acceptedTC/${userID}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                })
                .then(Response => Response)
        )
    }


    //5.6 Uploading Profile Photo
    postProfilePhoto(formData, formheader) {
        const userId = JSON.parse(localStorage.getItem('userDetails')).id
        return (
            axios
                .post(ApiBaseUrl + "/user/uploadImage/" + userId, formData, formheader)
                .then(Response => Response)
        )
    }

    //5.7 view Profile Photo
    viewProfileImage() {
        const userId = JSON.parse(localStorage.getItem('userDetails')).id
        return (
            axios
                .get(ApiBaseUrl + "/user/viewImage/" + userId, this.getToken())
                .then(Response => Response)
        )
    }

    // For getting profile info
    getOrganizationProfile() {
        const orgId = localStorage.getItem("organizationId");
        return axios
            .get(`${ApiBaseUrl}/user/organizationProfile/${orgId}`, this.getToken())
            .then((Response) => Response)
            .catch((error) => {
                console.log(error);
            });
    }


    // For edit and update of Organization Profile
    updateOrganizationProfile(employee) {
        const orgId = localStorage.getItem("organizationId");
        return axios
            .put(`${ApiBaseUrl}/user/updateOrganizationProfile`, employee, this.getToken())
            .then((Response) => console.log(Response))
            .catch((error) => {
                console.log(error);
            });

    }

    putForgotPassword(emailId) {
        return (
            axios
                .put(ApiBaseUrl + `/user/forgotPassword/${emailId}`, {}, ApiHeader)
                .then(Response => Response)
        )

    }
    //Change Password  
    putChangePassword(oldPassword, newPassword) {
        const emailID = JSON.parse(localStorage.getItem('userDetails')).email;
        return (
            axios
                .put(ApiBaseUrl + "/user/changePassword/" + `${emailID}/${oldPassword}/${newPassword}`, null, this.getToken())
                .then(Response => Response)
        )
    }

    //5.2 Active Job- VeiwDetails- View candidate Application list- Job Details Component
    getViewAllCandidateApplication() {
        const jobId = JSON.parse(localStorage.getItem('JobId'));
        return (
            axios
                .get(ApiBaseUrl + '/recruiter/listOfCandidateApplications/' + jobId, this.getToken())
                .then(Response => Response)
        )
    }

    //5.3 Active Job- VeiwDetails- View Matching Candidate list- Job Details Component
    getViewAllMatchingCandidate1() {
        const jobId = JSON.parse(localStorage.getItem('JobId'));
        return (
            axios
                .get(ApiBaseUrl + '/recruiter/listOfMatchingCandidateApplications/' + jobId, this.getToken())
                .then(Response => Response)
        )
    }

    //5.4 View Shortlisted Candidate list- Job Details Component
    getViewAllShortlistedCandidate() {
        const jobId = JSON.parse(localStorage.getItem('JobId'));
        return (
            axios
                .get(ApiBaseUrl + '/recruiter/listOfShortListedCandidate/' + jobId, this.getToken())
                .then(Response => Response)
        )
    }

    //5.5 View active job Details 
    getAllJobDetails() {
        const jobId = JSON.parse(localStorage.getItem('JobId'));
        return (
            axios
                .get(ApiBaseUrl + '/recruiter/jobDetailsById/' + jobId, this.getToken())
                .then(Response => Response)
        )
    }

    //5.6 update interview status in shortlisted candidate
    updateInterviewStatus(fields) {
        const jobId = JSON.parse(localStorage.getItem('JobId'));
        const candidateId = localStorage.getItem("CandidateId")
        return (
            axios
                .put(ApiBaseUrl + "/recruiter/updateInterviewStatus/" + `${jobId}/${candidateId}`, { 'interviewStatus': fields.interviewStatus, 'comment': fields.comment }, this.getToken())
                .then(Response => Response)
        )
    }

    //5.7 Accept application in matching candidate
    updateApplicationStatus() {
        const jobId = JSON.parse(localStorage.getItem('JobId'));
        const candidateId = localStorage.getItem("InviteCandidateId")
        const applocationStatus = "Invite_Sent_By_Recruiter"
        return (
            axios
                .put(ApiBaseUrl + "/recruiter/updateApplicationStatus/" + `${jobId}/${candidateId}/${applocationStatus}`, null, this.getToken())
                .then(Response => Response)
        )

    }

    //5.8 For Remove candidate from  Matching Candidate
    updateApplicationStatus1() {
        const jobId = JSON.parse(localStorage.getItem('JobId'));
        const candidateId = localStorage.getItem("InviteCandidateId")
        const applocationStatus = "Invite_Removed_By_Recruiter"
        return (
            axios
                .put(ApiBaseUrl + "/recruiter/updateApplicationStatus/" + `${jobId}/${candidateId}/${applocationStatus}`, null, this.getToken())
                .then(Response => Response)
        )

    }

    //5.9 Download Resume In Shortlisted Candidate
    downloadResumeFile1() {
        const candidateId = localStorage.getItem("downloadCandidateId")

        return (
            axios
                .get(ApiBaseUrl + "/user/viewResume/" + candidateId, null, this.getToken())
                .then(Response => console.log(Response))
        )
    }


}
export default ApiServicesOrg