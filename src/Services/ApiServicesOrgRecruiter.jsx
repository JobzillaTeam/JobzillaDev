import axios from 'axios'
import { ApiBaseUrl } from '../Config.jsx'

class ApiServicesOrgRecruiter {
  addJobDetails(resourceInfo) {
    const authToken = localStorage.getItem('authToken')
    console.log(resourceInfo);
    return (
      axios
        .post(`${ApiBaseUrl}/recruiter/addJobDetails`, resourceInfo, {
          headers: {'Authorization': `Bearer ${authToken}`}
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }
  getListOfCategories() {
    const authToken = localStorage.getItem('authToken')
    return (
      axios
        .get(`${ApiBaseUrl}/recruiter/listOfCategoris`, {
          headers: {'Authorization': `Bearer ${authToken}`}
        })
        .then(Response => Response).catch(error => {
          console.log(error);
        })
    )
  }
}


export default new ApiServicesOrgRecruiter;