import axios from 'axios'
import { ApiBaseUrl } from '../Config.jsx'

class ApiServicesOrgRecruiter {
  constructor() {
    axios.interceptors.response.use(response => {
      return response;
    }, err => {
      const originalReq = err.config;
      const isAuthTokenExpired = err && err.response && err.response.status === 401 && originalReq && originalReq.headers && originalReq.headers.hasOwnProperty('Authorization')
      if (isAuthTokenExpired) {
        return new Promise((resolve, reject) => {
            let userName = localStorage.getItem('emailId');
            if (!userName) userName = localStorage.getItem('userName');
            let res = fetch(`${ApiBaseUrl}/authenticate/${userName}`)
              .then(res => res.json()).then(res => {
                if (res && res.responseObject) {
                  const authToken = res.responseObject;
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
  addJobDetails(resourceInfo) {
    const authToken = localStorage.getItem('authToken')
    // console.log(resourceInfo);
    const organizationId = localStorage.getItem('organizationId')

    // new file
    return (
      axios
        .post(`${ApiBaseUrl}/recruiter/addJobDetails`, { ...resourceInfo, orgId: organizationId }, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          // console.log(error);
        })
    )
  }
  editJobDetails(resourceInfo,jobId) {
    const authToken = localStorage.getItem('authToken')
    console.log(resourceInfo);
    const organizationId = localStorage.getItem('organizationId')
    return (
      axios
        .put(`${ApiBaseUrl}/recruiter/jobDetails`,{ ...resourceInfo, orgId: organizationId, jobId },{
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          // console.log(error);
        })
    )
  }
 
  getListOfCategories() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/recruiter/listOfCategoris`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          // console.log(error);
        })
    )
  }

  getListOfClosedJobs() {
    const authToken = localStorage.getItem('authToken');
    const closedJobId = localStorage.getItem('organizationId');
    return (
      axios
        .get(`${ApiBaseUrl}/recruiter/listOfAllClosedJobs/${closedJobId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
        .then(Response => Response).catch(error => {
          // console.log(error);
        })
    );
  }
}
export default new ApiServicesOrgRecruiter;