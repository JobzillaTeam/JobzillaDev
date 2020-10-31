import moment from 'moment';

export const profileNameFormDefaultValues = () => ({
  company: '',
  currentRole: '',
  emailId: '',
  firstName: '',
  lastName: '',
  mobileNumber: '',
});

export const certificationFormDefaultValues = () => ({
  issueMonth: '',
  issueYear: '',
  expirationMonth: '',
  expirationYear: '',
  credentialId: '',
  credentialURL: ''
});

export const skillFormDefaultValues = () => ({
  experienceInYear: '',
  experienceInMonth: '',
  proficiency: '',
  version: ''
});

export const languageFormDefaultValues = () => ({
  proficiency: '',
});

export const aboutFormDefaultValues = () => ({
  about: ''
});

export const cTCFormDefaultValues = () => ({
  currencyType: '',
  currentCtcInLakh: '',
  currentCtcInThousand: '',
  expectedCtcInLakh: '',
  expectedCtcInThousand: ''
});


export const careerProfileFormDefaultValues = () => ({
  employmentType: '',
});

export const employmentFormDefaultValue = () => ({
  currentCompany: false,
  description: '',
  designation: '',
  employmentType: '',
  organization: '',
  startedWorkingFromMonth: '',
  startedWorkingFromYear: '',
  workedTillMonth: '',
  workedTillYear: ''
})


export const getCTCInLakh = value => getValueInSplitForm(value, 0)
export const getCTCInThousand = value => getValueInSplitForm(value, 1)
export const getExperienceInYear = value => getValueInSplitForm(value, 0)
export const getExperienceInMonth = value => getValueInSplitForm(value, 1)
export const getCTCInFormat =  (string1, string2) => getValueInFormat(string1, string2)
export const getExperienceInFormat =  (string1, string2) => getValueInFormat(string1, string2)
const getValueInSplitForm = (value, i) => {
  return value && parseFloat(value).toFixed(2).split('.')[i]
}
const getValueInFormat = (string1, string2) => {
  let value = '';
  if (string1) value = value.concat(string1);
  if (string1 && string2) value = value.concat('.');
  if (string2) value = value.concat(string2);
  return parseFloat(value);
}
export const getCTCInLakhAndThousand = value => {
  let getCTCInLakhAndThousandFormat = '0'
  let val = value.toString();
  if (val.includes('.') && val.split('.')[1] && val.split('.')[1].length === 1 ) {
    val = `${val.split('.')[0]}.${val.split('.')[1]}0`
  }
  if (val === '0') {
    getCTCInLakhAndThousandFormat = '0'
  } else if (!val.includes('.')) {
    getCTCInLakhAndThousandFormat = `${val} Lakh 00 Thousand`
  } else if (val.includes('.') && val.split('.')[0] === '0') {
    getCTCInLakhAndThousandFormat = `00 Lakh ${val.split('.')[1]} Thousand`
  } else if (val.includes('.')) {
    getCTCInLakhAndThousandFormat = `${val.split('.')[0]} Lakh ${val.split('.')[1]} Thousand`
  }
  return getCTCInLakhAndThousandFormat;
}