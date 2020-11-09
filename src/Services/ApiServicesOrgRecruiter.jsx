import axios from 'axios'
import { ApiBaseUrl } from '../Config.jsx'

class ApiServicesOrgRecruiter {
  addJobDetails(resourceInfo) {
    const authToken = localStorage.getItem('authToken')
    console.log(resourceInfo);
    const organizationId = localStorage.getItem('organizationId')

    // new file
    return (
      axios
        .post(`${ApiBaseUrl}/recruiter/addJobDetails`, {...resourceInfo, orgId: organizationId}, {
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

getListOfClosedJobs(){
  const authToken = localStorage.getItem('authToken');
  const closedJobId = localStorage.getItem('organizationId');
  return (
    axios
    .get(`${ApiBaseUrl}/recruiter/listOfAllClosedJobs/${closedJobId}`, {
      headers: {'Authorization': `Bearer ${authToken}`}
    })
    .then(Response => Response).catch(error => {
      console.log(error);
    })
  );
}
}
export default new ApiServicesOrgRecruiter;