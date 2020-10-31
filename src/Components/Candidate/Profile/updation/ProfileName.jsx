import React from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../../../../Context/ProfileContext';
import { profileNameFormDefaultValues } from '../../../../Utils/ProfileFormHelper';
import ApiServicesOrgCandidate from '../../../../Services/ApiServicesOrgCandidate';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CANDIDATE_ID } from '../../../../Utils/AppConst';

const ProfileNameComponent = ({ showPopup }) => {
  const initialCustomInputValues = {mobileNumber: ''}
  const [customInputValues, setCustomInputValues] = React.useState(initialCustomInputValues);
  const { state, getProfileInfo } = React.useContext(Context);
  const { handleSubmit, register, errors, setValue, clearErrors, getValues, setError } = useForm({
    mode: 'onSubmit',
    defaultValues: profileNameFormDefaultValues
  });
  React.useEffect(() => {
    state.then((response) => {
      if (response && response.candidateInfo) {
        const { candidateInfo } = response;
        const { address, company, currentRole, emailId, firstName, lastName, mobileNumber } = candidateInfo;
        setValue('address', address);
        setValue('company', company);
        setValue('currentRole', currentRole);
        setValue('emailId', emailId);
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setCustomInputValues({ mobileNumber: mobileNumber });
      }
    })
  }, []);

  const submitForm = (e) => {
    if (!customInputValues.mobileNumber) {
      setError('mobileNumber', {
        type: "manual",
        message: 'Mobile Number cannot be left blank'
      });
    }
  }

  const onSubmit = values => {
    delete values.emailId;
    ApiServicesOrgCandidate.updateProfileInfo({...values, candidateId: CANDIDATE_ID, mobileNumber: customInputValues.mobileNumber }, getProfileInfo, showPopup);
  }

  const handleMobileNumberChange = value => {
    if (value) {
      clearErrors('mobileNumber')
    } else {
      setError('mobileNumber', {
        type: "manual",
        message: 'Mobile Number cannot be left blank'
      })
    }
    setCustomInputValues({mobileNumber: value})

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="firstName">First Name<span>*</span></label>
        <input
          class={`form-control ${errors.firstName && 'is-invalid'}`}
          id="firstName"
          name="firstName"
          ref={register({
            required: "First Name cannot be left blank",
          })}
          placeholder="Enter First Name"
        />
        {errors.firstName && <div class="error-message">{errors.firstName.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name<span>*</span></label>
        <input
          class={`form-control ${errors.lastName && 'is-invalid'}`}
          id="lastName"
          name="lastName"
          ref={register({
            required: "Last Name cannot be left blank",
          })}
          placeholder="Enter Last Name"
        />
        {errors.lastName && <div class="error-message">{errors.lastName.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="company">Company Name<span>*</span></label>
        <input
          class={`form-control ${errors.company && 'is-invalid'}`}
          id="company"
          name="company"
          ref={register({
            required: "Company Name cannot be left blank",
          })}
          placeholder="Enter Company Name"
        />
        {errors.company && <div class="error-message">{errors.company.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="currentRole">Current Location<span>*</span></label>
        <input
          class={`form-control ${errors.address && 'is-invalid'}`}
          id="address"
          name="address"
          ref={register({
            required: "Current Location cannot be left blank",
          })}
          placeholder="Enter Current Location"
        />
        {errors.address && <div class="error-message">{errors.address.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="currentRole">Mobile Number<span>*</span></label>
        <PhoneInput
          class={`form-control ${errors.mobileNumber && 'is-invalid'}`}
          style={{ width: '100%' }}
          country={'in'}
          inputProps={{
            name: 'phone',
            required: true,
          }}
          ref={register({
            required: "Mobile cannot be left blank",
          })}
          value={customInputValues.mobileNumber}
          onChange={handleMobileNumberChange}
        />
        {errors.mobileNumber && <div class="error-message">{errors.mobileNumber.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="currentRole">Current Role<span>*</span></label>
        <input
          class={`form-control ${errors.currentRole && 'is-invalid'}`}
          id="currentRole"
          name="currentRole"
          ref={register({
            required: "Current Role cannot be left blank",
          })}
          placeholder="Enter Current Role"
        />
        {errors.currentRole && <div class="error-message">{errors.currentRole.message}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email<span>*</span></label>
        <input
          class={`form-control ${errors.emailId && 'is-invalid'}`}
          id="emailId"
          name="emailId"
          ref={register({
            required: "Email cannot be left blank",
          })}
          placeholder="Enter Email"
          disabled
        />
        {errors.emailId && <div class="error-message">{errors.emailId.message}</div>}
      </div>
      <button type="submit" class="btn lightBlue float-right px-5" onClick={submitForm}>Save</button>
    </form>
  );
}

export default React.memo(ProfileNameComponent)