export const IMAGES = {
    uploadedProfile: 'uploadedProfile',
    more: 'more',
    offer: 'offer',
    mongoDB: 'mongoDB',
    python: 'python',
    php: 'php',
    swift: 'swift',
    java: 'java',
    angular: 'angular',
    nodeJS: 'nodeJS',
    android: 'android',
    dashboard: 'dashboard',
    suitcase: 'suitcase',
    jobSearch: 'jobSearch',
    interview: 'interview',
    dashboard_active: 'dashboard_active',
    logo: 'logo'
  }
  
  export function getImageFromURL(url) {
    let iconName;
    switch (url) {
      case IMAGES.uploadedProfile:
        iconName = '/images/Dashboard-assets/uploaded-profile.svg';
        break;
      case IMAGES.more:
        iconName = '/images/Dashboard-assets/more_ico.png';
        break;
      case IMAGES.offer:
        iconName = '/images/Dashboard-assets/offer-ico.svg';
        break;
      case IMAGES.mongoDB:
        iconName = '/images/Dashboard-assets/mongodb_logo.png';
        break;
      case IMAGES.python:
        iconName = '/images/Dashboard-assets/python_logo.png';
        break;
      case IMAGES.php:
        iconName = '/images/Dashboard-assets/php_logo.png';
        break;
      case IMAGES.swift:
        iconName = '/images/Dashboard-assets/swift_logo.png';
        break;
      case IMAGES.java:
        iconName = '/images/Dashboard-assets/java_logo.jpg';
        break;
      case IMAGES.angular:
        iconName = '/images/Dashboard-assets/angular_logo.png';
        break;
      case IMAGES.nodeJS:
        iconName = '/images/Dashboard-assets/nodejs_logo.png';
        break;
      case IMAGES.android:
        iconName = '/images/Dashboard-assets/android_logo.png';
        break;
      case IMAGES.dashboard:
        iconName = '/images/Dashboard-assets/menu/dashboard.png';
        break;
      case IMAGES.dashboard_active:
        iconName = '/images/Dashboard-assets/menu/dashboard_active.png';
        break;
      case IMAGES.jobSearch:
        iconName = '/images/Dashboard-assets/menu/job-search.png';
        break;
      case IMAGES.suitcase:
        iconName = '/images/Dashboard-assets/menu/suitcase.png';
        break;
      case IMAGES.interview:
        iconName = '/images/Dashboard-assets/menu/interview.png';
        break;
      case IMAGES.logo:
        iconName = '/images/Dashboard-assets/menu/logo.png';
        break;
      default:
        iconName = '/images/Dashboard-assets/more_ico.png';
        break;
    }
    return iconName;
  }
  