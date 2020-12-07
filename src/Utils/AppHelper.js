import React from 'react';
import { Redirect } from "react-router-dom";

const orgRoles = ['owner', 'admin', 'user'];
const onLogout = isWindowAccess => {
  let pathName = '/login'
  const rememberme = localStorage.getItem('rememberme');
  const userRole = localStorage.getItem('userRole');
  if (
    localStorage.hasOwnProperty('userRole') && (
      typeof userRole === 'string' ||
      userRole instanceof String
    ) &&
    userRole.toLowerCase() === 'candidate_role') {
    pathName = '/login?role=candidate'
  }
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
  if (!(localStorage.hasOwnProperty('rememberme') && (typeof rememberme === 'string' || rememberme instanceof String) && rememberme.toLowerCase().includes('true'))) {
    localStorage.removeItem('emailId');
    localStorage.removeItem('rememberme');
  }
  if (isWindowAccess) {
    window.location.href = pathName
  } else {
    return <Redirect to={pathName} />
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

export const getApplicationStatus = (status) => {
  switch(status) {
    case "Invite_Sent_By_Recruiter": {
      return "Invite Sent" 
    }
    case "Invite_Removed_By_Recruiter": {
      return "Invite Removed"
    }
    case "Invite_Accepted_By_Candidate": {
      return "Invite Accepted"
    }
    case "Invite_Declined_By_Candidate": {
      return "Invite Declined"
    }
    case "Application_Sent_By_Candidate": {
      return "Application Sent"
    }
    case "Application_Accepted_By_Recruiter": {
      return "Application Accepted"
    }
    case "Application_Declined_By_Recruiter": {
      return "Application Declined"
    }
  }
}