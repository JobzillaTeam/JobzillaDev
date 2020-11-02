const orgRoles = ['owner', 'admin', 'user'];
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
const isLoggedIn = (userType, isAuthorizationCheck) => {
  let isLoggedIn = true;
  if (!localStorage.hasOwnProperty("authToken")) isLoggedIn = false;
  if (!localStorage.hasOwnProperty("acceptedTC")) isLoggedIn = false;
  if (userType === 'candidate' && isAuthorizationCheck) {
    if (localStorage.getItem('userRole') !== 'candidate_role') isLoggedIn = false;
  }
  if (userType === 'organization' && isAuthorizationCheck) {
    if (!isOrganizationRelatedUser()) isLoggedIn = false;
  }
  return isLoggedIn;
}

const isOrganizationRelatedUser = () => {
  return localStorage.hasOwnProperty('userRole') &&
  localStorage.getItem('userRole')[0] && (
    typeof localStorage.getItem('userRole') === 'string' ||
    localStorage.getItem('userRole') instanceof String
  ) &&
  orgRoles.includes(localStorage.getItem('userRole').toLocaleLowerCase());
}

export const AppHelper = {
  onLogout,
  isLoggedIn,
  isOrganizationRelatedUser
}