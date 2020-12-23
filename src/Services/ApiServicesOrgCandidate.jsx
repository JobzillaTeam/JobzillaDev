import axios from 'axios'
import { ApiBaseUrl } from '../Config.jsx'
import React, { Component, useContext } from 'react';
import { Context } from '../Context/ProfileContext';
import Resume from '../Components/Candidate/Profile/details/resume/Resume.jsx';
import { AppHelper } from '../Utils/AppHelper.js';
import swal from 'sweetalert';

class ApiServicesOrgCandidate {
  constructor() {
    axios.interceptors.response.use(response => {
      return response;
    }, err => {
      const originalReq = err.config;
      if (err && err.response && err.response.data.responseCode === "403" && originalReq && originalReq.headers && originalReq.headers.hasOwnProperty('Authorization')) {
        swal({
          title: 'Error',
          text: 'Your profile has been made inactive for 6 months as you have joined an organisation.',
          icon: "warning",
          button: "Ok",
          dangerMode: true,
        }).then(() => {
          return AppHelper.onLogout(true)
        });
        return Promise.reject(err);
      }
      if (err && err.response && err.response.data.responseCode === "403 FORBIDDEN") {
        swal({
          title: 'Error',
          text: 'Your profile has been made inactive for 6 months as you have joined an organisation.',
          icon: "warning",
          button: "Ok",
          dangerMode: true,
        })
      }
      const isAuthTokenExpired = err && err.response && err.response.status === 401 && originalReq && originalReq.headers && originalReq.headers.hasOwnProperty('Authorization')
      if (isAuthTokenExpired) {
        return new Promise((resolve, reject) => {
            let userName = localStorage.getItem('emailId');
            if (!userName) userName = localStorage.getItem('userName');
            let res = fetch(`${ApiBaseUrl}/authenticate/${userName}`)
              .then(res => res.json()).then(res => {
                if (res && res.responseObject) {
                  const authToken = res.responseObject;
                  // console.log(res);
                  localStorage.setItem('authToken', authToken);
                  originalReq.headers['Authorization'] = `Bearer ${authToken}`;
                }
                return axios(originalReq);
              });
            resolve(res);
          return Promise.reject(err);
        });
      } else {
        return Promise.reject(err);
      }
    });
  }

  fetchProfileInfo() {
    const userID = localStorage.getItem('userId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/profileview/${userID}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response.data.responseObject)
    )
  }

  updateCareerInfo(careerInfo, getProfileRefresh, showPopup) {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .put(`${ApiBaseUrl}/candidate/candidateinfo/`, careerInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  updateProfileInfo(profileInfo, getProfileRefresh, showPopup) {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .put(`${ApiBaseUrl}/candidate/candidateinfo/`, profileInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  updateSkill(skillInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .put(`${ApiBaseUrl}/candidate/skill?candidateId=${candidateId}`, skillInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  addSkill(skillInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId');
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .post(`${ApiBaseUrl}/candidate/skill/${candidateId}`, skillInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  deleteSkill(id, getProfileInfo) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .delete(`${ApiBaseUrl}/candidate/skill?candidateId=${candidateId}&skillId=${id}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileInfo()).catch(error => {
          console.log(error);
        })
    )
  }

  updateCertification(certificationInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    // console.log(certificationInfo);
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .put(`${ApiBaseUrl}/candidate/certificate?candidateId=${candidateId}`, certificationInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  addLanguage(languageInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .post(`${ApiBaseUrl}/candidate/languages/${candidateId}`, languageInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  addCertification(certificationInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    // console.log(certificationInfo);
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .post(`${ApiBaseUrl}/candidate/certificate/${candidateId}`, certificationInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  updateLanguage(updateLanguage, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .put(`${ApiBaseUrl}/candidate/languages?candidateId=${candidateId}`, updateLanguage, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }


  deleteLanguage(id, getProfileInfo) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .delete(`${ApiBaseUrl}/candidate/languages?langaugeId=${id}&candidateId=${candidateId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileInfo()).catch(error => {
          console.log(error);
        })
    )
  }

  addEmployment(employmentInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .post(`${ApiBaseUrl}/candidate/employment/${candidateId}`, employmentInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  updateEmployment(employmentInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .put(`${ApiBaseUrl}/candidate/employment?candidateId=${candidateId}`, employmentInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  updateEducation(educationInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    // console.log(educationInfo);
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .put(`${ApiBaseUrl}/candidate/education?candidateId=${candidateId}`, educationInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  addEducation(educationInfo, getProfileRefresh, showPopup) {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .post(`${ApiBaseUrl}/candidate/education/${candidateId}`, educationInfo, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(resp => getProfileRefresh(), showPopup(false)).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfStates() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfStates`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfCity(stateCode) {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/ListOfCities?stateCode=${stateCode}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfInstitutes() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfInstitutes`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfOrganizations() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfOrganizations`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfCertificates() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfCertificates`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfBoards() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfBoards`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfLanguages() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfLanguages`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfEducationType() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfEducationType`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  getListOfSkills() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/listOfSkills`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }

  // Post Email notifications Settings of Candidate with Token
  getToken() {
    const token = localStorage.getItem('authToken');
    const tokenHeader = { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } }
    return tokenHeader;
  }

  putCandidateEmailSettings(data) {
    return (
      axios
        .put(ApiBaseUrl + "/candidate/notificationSettingForCandidate", data, this.getToken())
        .then(Response => Response)
    )
  }

  //Get candidate Email notifications Settings
  getCandidateSettings() {
    const candidateId = localStorage.getItem('candidateId');
    return (
      axios
        .get(ApiBaseUrl + '/candidate/notificationSettingForCandidate?candidateId=' + candidateId, this.getToken())
        .then(Response => Response)
    )
  }

  //Candidate ResumeUpload Service
  postResumeFile(formdata, formheader) {
    const candidateId = JSON.parse(localStorage.getItem('candidateId'));
    return (
      axios
        .post(ApiBaseUrl + "/user/uplaodResume/" + candidateId, formdata, formheader)
        .then(Response => Response)

    )
  }

  //Candidate ResumeDelete Service
  deleteSampleFile() {
    const candidateId = JSON.parse(localStorage.getItem('candidateId'));
    return (
      axios
        .delete(ApiBaseUrl + "/user/deleteResume/" + candidateId, this.getToken())
        .then(Response => Response)
    )
  }

  //dowload candidate Resume
  fetchResumeFile() {
    const candidateId = JSON.parse(localStorage.getItem('candidateId'));
    return (
      axios
        .get(ApiBaseUrl + "/user/viewResume/" + candidateId, this.getToken())
        .then(Response => Response)
    )
  }

  // Candidate Profile Progressbar
  candidateGetProfileInfo() {
    //const authToken = localStorage.getItem("authToken");
    const userId = JSON.parse(localStorage.getItem('userDetails')).id
    return axios
      .get(ApiBaseUrl + "/candidate/profileview/" + userId, this.getToken())
      .then((Response) => Response)
  }

  //Change Password  
  getChangePassword(oldPassword, password) {
    const emailID = JSON.parse(localStorage.getItem('userDetails')).email;
    return (
      axios
        .get(ApiBaseUrl + `/user/changePassword/${emailID}/${oldPassword}/${password}`, this.getToken())
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

  fetchInterviewInvitesForCandidate() {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/interviewInvitesForCandidate/${candidateId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response.data.responseObject)
    )
  }

  fetchInterviewAcceptedByCandidate() {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candidate/acceptedInterviews/${candidateId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response.data.responseObject)
    )
  }

  fetchJobListForCandidate() {
    const candidateId = localStorage.getItem('candidateId')
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/candiadate/jobList/${candidateId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response.data.responseObject)
    )
  }

  // fetchJobOffersForCandidate() {
  //   const candidateId = localStorage.getItem('candidateId')
  //   const authToken = localStorage.getItem('authToken')
  //   return (
  //     axios
  //       .get(`${ApiBaseUrl}/candiadate/jobOffersForCandidate/${candidateId}`, {
  //         headers: {'Authorization': `Bearer ${authToken}`}
  //       })
  //       .then(Response => Response.data.responseObject)
  //   )
  // }

  //candidate Dashboard
  getcandidateDashboardDetails() {
    const candidateId = localStorage.getItem('candidateId')
    return axios
      .get(ApiBaseUrl + "/candiadate/candidateDashboard/" + candidateId, this.getToken())
      .then((Response) => Response)
  }

  getJobAndCandidateDetailsByIds = (jobID, isFreshJob) => {
    const authToken = localStorage.getItem('authToken');
    const candidateId = localStorage.getItem('candidateId')
    const path = isFreshJob ? '/candidate/jobAndCandidateDetailsByIdsForCandidate/' : '/recruiter/jobAndCandidateDetailsByIdsForRecruiter/'
    return (
      axios(
        {
          url: `${ApiBaseUrl}${path}${jobID}/${candidateId}`,
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      ).then(Response => Response.data.responseObject)
        .catch(error => {
          console.log(error);
        })
    )
  }

  getJobOffersForCandidate = () => {
    const authToken = localStorage.getItem('authToken');
    const candidateId = localStorage.getItem('candidateId')
    return (
      axios(
        {
          url: `${ApiBaseUrl}/candidate/jobOffersForCandidate/${candidateId}`,
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      ).then(Response => Response.data.responseObject)
        .catch(error => {
          console.log(error);
        })
    )
  }

}

export default new ApiServicesOrgCandidate();
