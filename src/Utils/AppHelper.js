const onLogout = _ => {
  localStorage.removeItem('userDetails');
  localStorage.removeItem('userId');
  localStorage.removeItem('organizationId');
  localStorage.removeItem('authToken');
  localStorage.removeItem('acceptedTC');
  localStorage.removeItem('userRole');
  localStorage.removeItem('candidateId');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('status');
  localStorage.removeItem('userName');
  const rememberme = localStorage.getItem('rememberme');
  if (!(localStorage.hasOwnProperty('rememberme') && (typeof rememberme === 'string' || rememberme instanceof String) && rememberme.toLowerCase().includes('true'))) {
    localStorage.removeItem('emailId');
    localStorage.removeItem('rememberme');
  }
}
const isLoggedIn = (userType) => {
  let isLoggedIn = true;
  if (!localStorage.hasOwnProperty("authToken")) isLoggedIn = false;
  if (!localStorage.hasOwnProperty("acceptedTC")) isLoggedIn = false;
  if (userType === 'candidate') {
    if (localStorage.getItem('userRole') !== 'candidate_role') isLoggedIn = false;
  }
  if (userType === 'organization') {
    if (localStorage.getItem('userRole') !== 'Owner') isLoggedIn = false;
  }
  return isLoggedIn;
}

export const AppHelper = {
  onLogout,
  isLoggedIn
}