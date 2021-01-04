import axios from "axios";
import { ApiBaseUrl, ApiHeader } from "../Config.jsx";

import React, { Component } from "react";
import { parseJSON } from "jquery";

class ApiServicesOrg extends Component {
  constructor() {
    super();
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const originalReq = err.config;
        const isAuthTokenExpired =
          err &&
          err.response &&
          err.response.status === 401 &&
          originalReq &&
          originalReq.headers &&
          originalReq.headers.hasOwnProperty("Authorization");
        if (isAuthTokenExpired) {
          return new Promise((resolve, reject) => {
            let userName = localStorage.getItem("emailId");
            if (!userName) userName = localStorage.getItem("userName");
            let res = fetch(`${ApiBaseUrl}/authenticate/${userName}`)
              .then((res) => res.json())
              .then((res) => {
                if (res && res.responseObject) {
                  const authToken = res.responseObject;
                  // console.log(res);
                  localStorage.setItem("authToken", authToken);
                  originalReq.headers["Authorization"] = `Bearer ${authToken}`;
                }
                return axios(originalReq);
              });
            resolve(res);
            return Promise.reject(err);
          });
        } else {
          return Promise.reject(err);
        }
      }
    );
  }

  getToken() {
    const token = localStorage.getItem("authToken");
    const tokenHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return tokenHeader;
  }
  //1. Sending Signup details to backend
  postSignup(signupDetails) {
    return axios
      .post(ApiBaseUrl + "/user/signup", signupDetails, ApiHeader)
      .then((Response) => Response);
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
    return axios
      .put(
        ApiBaseUrl + "/user/login",
        { password: fields.password, userName: fields.emailid },
        ApiHeader
      )
      .then((Response) => Response);
  }

  //3. Provider Functionalities

  //3.1 Downloading Sample CSV file
  fetchSampleFile() {
    return fetch(ApiBaseUrl + "/user/csvdownload", this.getToken()).then(
      (Response) => Response
    );
  }

  //3.2 Uploading CSV with Drag-Drop, File explore facilities
  postSampleFile(formdata, formheader, orgId, supervisorId) {
    return axios
      .post(
        ApiBaseUrl + "/user/uploadcsv/" + orgId + "/" + supervisorId + "/",
        formdata,
        formheader
      )
      .then((Response) => Response);
  }

  //3.3 Get Email Setting for Organization (Provider/Recruiter)
  getEmailSettings() {
    const userId = JSON.parse(localStorage.getItem("userDetails")).id;
    return axios
      .get(
        ApiBaseUrl +
          "/organization/notificationSettingForOrganization?userId=" +
          userId,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //3.4 Post Email Setting for Organization (Provider/Recruiter)
  putEmailSettings(data) {
    return axios
      .put(
        ApiBaseUrl + "/organization/notificationSettingForOrganization",
        data,
        this.getToken()
      )
      .then((Response) => Response);
  }

  // 4. Manage User Functionalities

  //4.1 View User list- Manage User Component
  getViewAllUser() {
    const userId = JSON.parse(localStorage.getItem("userDetails")).id;
    return axios
      .get(ApiBaseUrl + "/user/allUsersByRole/" + userId, this.getToken())
      .then((Response) => Response);
  }

  //4.2 Add User-  Admin/User

  postAddUser(fields) {
    // console.log(fields)
    return axios
      .post(ApiBaseUrl + "/user/user", fields, this.getToken())
      .then((Response) => Response);
  }

  //4.3 Edit User- Admin/User
  putEditUser(fields) {
    return axios
      .put(ApiBaseUrl + "/user/user", fields, this.getToken())
      .then((Response) => Response);
  }

  //4.4 Delete User - Single User- Admin/User
  deleteUser(userId) {
    return axios
      .delete(ApiBaseUrl + "/user/userById/" + userId, this.getToken())
      .then((Response) => Response);
  }

  getUserProfile() {
    const userId = JSON.parse(localStorage.getItem("userDetails")).id;
    return axios
      .get(ApiBaseUrl + "/user/user/" + userId, this.getToken())
      .then((Response) => Response);
  }

  putUserProfile(data) {
    return axios
      .put(ApiBaseUrl + "/user/user", data, this.getToken())
      .then((Response) => Response);
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
    // console.log(ApiBaseUrl + "/user/multipleUsersById/" + updatedUserId)
    return axios
      .delete(
        ApiBaseUrl + "/user/multipleUsersById/" + updatedUserId,
        this.getToken()
      )
      .then((Response) => Response);
  }

  // 5. Recruiter Functionalities

  //5.1 Active Job- All jobs to view on main "Active-Job" page
  getAllActiveJobs() {
    const orgId = JSON.parse(localStorage.getItem("userDetails"))
      .orgnaizationId;
    return axios
      .get(
        ApiBaseUrl + "/recruiter/listOfAllActiveJobs/" + orgId,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.2 post api for active job-- invite button
  putApplicationStatus(jobId, candidateId, applicationStatus) {
    // console.log(ApiBaseUrl + `/recruiter/updateApplicationStatus/${jobId}/${candidateId}/${applicationStatus}`, this.getToken())
    return axios
      .put(
        ApiBaseUrl +
          "/recruiter/updateApplicationStatus/" +
          jobId +
          "/" +
          candidateId +
          "/" +
          applicationStatus,
        null,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.3 Active Job- VeiwDetails- View Matching Candidate list- Job Details Component
  getViewAllMatchingCandidate(jobId) {
    // const jobId = localStorage.getItem('matchingId')
    return axios
      .get(
        ApiBaseUrl + "/recruiter/listOfMatchingCandidateApplications/" + jobId,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.5 View Candidate profile
  getCandidateInfo(userId) {
    return axios
      .get(ApiBaseUrl + "/candidate/profileview/" + userId, this.getToken())
      .then((Response) => Response);
  }

  updateAcceptedTC() {
    const userID = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    return axios
      .put(
        `${ApiBaseUrl}/user/acceptedTC/${userID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((Response) => Response);
  }

  //5.6 Uploading Profile Photo
  postProfilePhoto(formData, formheader, getProfileRefresh) {
    const userId = JSON.parse(localStorage.getItem("userDetails")).id;
    return axios
      .post(ApiBaseUrl + "/user/uploadImage/" + userId, formData, formheader)
      .then((Response) => {
        if (getProfileRefresh) getProfileRefresh();
        return Response;
      });
  }

  //5.7 view Profile Photo
  viewProfileImage() {
    const userId = JSON.parse(localStorage.getItem("userDetails")).id;
    return axios
      .get(ApiBaseUrl + "/user/viewImage/" + userId, this.getToken())
      .then((Response) => Response);
  }

  viewProfileImage1(userId) {
    const authToken = localStorage.getItem("authToken");
    return axios({
      url: `${ApiBaseUrl}/user/viewImage/${userId}`,
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((Response) => Response);
  }

  // For getting profile info
  getOrganizationProfile() {
    const orgId = localStorage.getItem("organizationId");
    return axios
      .get(`${ApiBaseUrl}/user/organizationProfile/${orgId}`, this.getToken())
      .then((Response) => Response)
      .catch((error) => {
        // console.log(error);
      });
  }

  // For edit and update of Organization Profile
  updateOrganizationProfile(employee) {
    const orgId = localStorage.getItem("organizationId");
    return axios
      .put(
        `${ApiBaseUrl}/user/updateOrganizationProfile`,
        employee,
        this.getToken()
      )
      .then((Response) => console.log(Response))
      .catch((error) => {
        // console.log(error);
      });
  }

  putForgotPassword(emailId) {
    return axios
      .put(ApiBaseUrl + `/user/forgotPassword/${emailId}`, {}, ApiHeader)
      .then((Response) => Response);
  }
  //Change Password
  putChangePassword(oldPassword, newPassword) {
    const emailID = JSON.parse(localStorage.getItem("userDetails")).email;
    return axios
      .put(
        ApiBaseUrl +
          "/user/changePassword/" +
          `${emailID}/${oldPassword}/${newPassword}`,
        null,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.2 Active Job- VeiwDetails- View candidate Application list- Job Details Component
  getViewAllCandidateApplication(jobID) {
    return axios
      .get(
        ApiBaseUrl + "/recruiter/listOfCandidateApplications/" + jobID,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.3 Active Job- VeiwDetails- View Matching Candidate list- Job Details Component
  getViewAllMatchingCandidate1(jobID) {
    return axios
      .get(
        ApiBaseUrl + "/recruiter/listOfMatchingCandidateApplications/" + jobID,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.4 View Shortlisted Candidate list- Job Details Component
  getViewAllShortlistedCandidate(jobID) {
    return axios
      .get(
        ApiBaseUrl + "/recruiter/listOfShortListedCandidate/" + jobID,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.5 View active job Details
  getAllJobDetails(jobID) {
    return axios
      .get(ApiBaseUrl + "/recruiter/jobDetailsById/" + jobID, this.getToken())
      .then((Response) => Response);
  }

  //5.6 update interview status in shortlisted candidate
  updateInterviewStatus(fields, jobID, candidateId) {
    return axios
      .put(
        ApiBaseUrl +
          "/recruiter/updateInterviewStatus/" +
          `${jobID}/${candidateId}`,
        { interviewStatus: fields.interviewStatus, comment: fields.comment },
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.7 Accept application in matching candidate
  updateApplicationStatus(jobID, candidateID, applicationStatus) {
    return axios
      .put(
        ApiBaseUrl +
          "/recruiter/updateApplicationStatus/" +
          `${jobID}/${candidateID}/${applicationStatus}`,
        null,
        this.getToken()
      )
      .then((Response) => Response);
  }
  //5.8 Download Resume For Candidate Profile

  downloadResumeFile() {
    // const candidateId = JSON.parse(localStorage.getItem('candidateId'));
    const authToken = localStorage.getItem("authToken");
    const candidateId = 1428;
    return axios({
      url: `${ApiBaseUrl}/user/viewResume/${candidateId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((Response) => Response);
  }

  //5.9 Download Resume In Shortlisted Candidate
  downloadResumeFile1() {
    const candidateId = localStorage.getItem("downloadCandidateId");
    const authToken = localStorage.getItem("authToken");

    return axios({
      url: `${ApiBaseUrl}/user/viewResume/${candidateId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((Response) => Response);
  }
  //Provider Dashboard api
  getProviderDashboardDetails(year) {
    // const today = new Date();
    // const year = today.getFullYear();
    const orgId = localStorage.getItem("organizationId");
    return axios
      .get(
        ApiBaseUrl + "/provider/providerDashboardDetails/" + orgId + "/" + year,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //Recruiter Dashboard api
  getRecruiterDashboardDetails() {
    const orgId = localStorage.getItem("organizationId");
    const today = new Date();
    const year = today.getFullYear();
    return axios
      .get(
        ApiBaseUrl +
          "/recruiter/recruiterDashboardDetails/" +
          orgId +
          "/" +
          year,
        this.getToken()
      )
      .then((Response) => Response);
  }

  //5.5 View closed job Details
  getClosedJobsAndJoinedCandidates(jobID) {
    return axios
      .get(
        ApiBaseUrl + "/recruiter/closedJobAndJoinedCandidates/" + jobID,
        this.getToken()
      )
      .then((Response) => Response);
  }
  deleteJobs(deleteJobId) {
    const authToken = localStorage.getItem("authToken");

    console.log(deleteJobId);
    return axios
      .delete(`${ApiBaseUrl}/recruiter/jobDetails/${deleteJobId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((Response) => Response)
      .catch((error) => {
        console.log(error);
      });
  }
}
export default ApiServicesOrg;
