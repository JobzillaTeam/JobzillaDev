import React from "react";
import { useForm } from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Context } from "../../../../Context/ProfileContext";
import ApiServicesOrgCandidate from "../../../../Services/ApiServicesOrgCandidate";
import { HTTP_REGX, MONTH_NAMES } from "../../../../Utils/AppConst";
import { certificationFormDefaultValues } from "../../../../Utils/ProfileFormHelper";
import moment from 'moment';

const CertificationComponent = ({ dataAttributes, showPopup }) => {
  const { handleSubmit, getValues, register, errors, setValue, reset, setError, clearErrors } = useForm({
    mode: 'onSubmit',
    defaultValues: certificationFormDefaultValues
  });
  const values = getValues();
  const { state, getProfileInfo } = React.useContext(Context);
  const resourceId = dataAttributes && dataAttributes.resourceId;
  const [certificates, setCertificates] = React.useState([]);
  const initialCustomInputValues = {}
  const [customInputValues, setCustomInputValues] = React.useState(initialCustomInputValues);
  const [hasNoExpirationDate, setHasNoExpirationDate] = React.useState(false);
  React.useEffect(() => {
    ApiServicesOrgCandidate.getListOfCertificates().then((response) => {
      if (response) {
        const result = Object.keys(response.data.responseObject).map((key, index) => response.data.responseObject[key].certificates);
        setCertificates(result);
      } else {
        setCertificates([]);
      }
    })

    state.then((response) => {
      if (response && response.candidateCertificatesList && resourceId) {
        const resourceObj = response.candidateCertificatesList.filter(resObj => {
          return resObj.certificationId === resourceId
        })[0]
        if (resourceObj) {
          setValue("issueMonth", resourceObj.issueMonth);
          setValue("issueYear", resourceObj.issueYear);
          setValue("expirationMonth", resourceObj.expirationMonth);
          setValue("expirationYear", resourceObj.expirationYear);
          setValue("credentialId", resourceObj.credentialId);
          setValue("credentialURL", resourceObj.credentialURL);
          setCustomInputValues({ certificationName: resourceObj.certificationName });
        }
      }
    })
  }, []);

  const handleTypeheadErrorOnInputChange = (input, name, message) => {
    const value = input;
    if (value) {
      setCustomInputValues({ ...customInputValues, [name]: value });
    } else {
      handleTypeheadError(value, name, message, false);
    }
  }

  const handlecustomInputValues = (value, name) => {
    setCustomInputValues({ ...customInputValues, [name]: value });
  }

  const handleTypeheadErrorOnBlur = (e, name, message) => {
    const value = e.target.value;
    handleTypeheadError(value, name, message, true)
  }

  const handleTypeheadErrorOnChange = (selected, name) => {
    handlecustomInputValues(selected[0], name);
    clearErrors(name)
  }

  const handleTypeheadError = (value, name, message, isBlur) => {
    if (!value) {
      setError(name, {
        type: "manual",
        message: message
      });
    } else {
      if (!isBlur) {
        const messageText = name === 'certificationName' ? 'Please enter a valid Certification Name' : '';
        setError(name, {
          type: "manual",
          message: messageText
        });
      }
    }
  }

  const submitForm = (e) => {
    if (!customInputValues.certificationName) {
      setError('certificationName', {
        type: "manual",
        message: 'Certification Name cannot be left blank'
      });
    }
    const startMonth = values.issueMonth;
    const startYear = values.issueYear;
    const endMonth = values.expirationMonth;
    const endYear = values.expirationYear;
    const isEndDateChange = false
    starDateEndDateValidation(startMonth, startYear, endMonth, endYear, isEndDateChange);
  }
  const handleHasNoExpirationDate = e => {
    setHasNoExpirationDate(!hasNoExpirationDate);
    clearErrors('endDate');
    clearErrors('startDate');
  }

  const starDateEndDateValidation = (startMonth, startYear, endMonth, endYear, isEndDateChange) => {
    if (startMonth && startYear && endMonth && endYear) {
      const startMonthValue = parseInt(moment().month(startMonth).format("M")) - 1;
      const endMonthValue = parseInt(moment().month(endMonth).format("M")) - 1;
      const startDate = new Date(parseInt(startYear), startMonthValue).getTime();
      const endDate = new Date(parseInt(endYear), endMonthValue).getTime();
      let message = isEndDateChange ? 'End Date cannot be smaller than Start Date' : 'Start Date cannot be greater than End Date';
      clearErrors('endDate');
      clearErrors('startDate');
      if (startDate > endDate) {
        setError(isEndDateChange ? 'endDate' : 'startDate', {
          type: "manual",
          message: message
        });
      }
    }
  }

  const monthAndDateOnChange = e => {
    const { name, value } = e.target;
    const startMonth = name === 'issueMonth' ? value : values.issueMonth;
    const startYear = name === 'issueYear' ? value : values.issueYear;
    const endMonth = name === 'expirationMonth' ? value : values.expirationMonth;
    const endYear = name === 'expirationYear' ? value : values.expirationYear;
    const isEndDateChange = name === 'expirationMonth' || name === 'expirationYear'
    starDateEndDateValidation(startMonth, startYear, endMonth, endYear, isEndDateChange);
  }

  const onSubmit = values => {
    if (resourceId) {
      ApiServicesOrgCandidate.updateCertification({ ...values, certificationName: customInputValues.certificationName, certificationId: resourceId }, getProfileInfo, showPopup);
    } else {
      ApiServicesOrgCandidate.addCertification({ ...values, certificationName: customInputValues.certificationName }, getProfileInfo, showPopup);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-4">
        <div className="form-group">
          <label htmlFor="certificationName">Certification Name<span >*</span></label>
          <Typeahead
            id="certificationName"
            className={errors.certificationName && 'is-invalid'}
            isInvalid={errors.certificationName}
            onBlur={e => handleTypeheadErrorOnBlur(e, 'certificationName', 'Certification Name cannot be left blank')}
            onInputChange={(input, e) => handleTypeheadErrorOnInputChange(input, 'certificationName', 'Certification Name cannot be left blank')}
            onChange={selected => handleTypeheadErrorOnChange(selected, 'certificationName')}
            options={certificates}
            placeholder="Choose a Certification Name..."
            selected={customInputValues.certificationName ? [customInputValues.certificationName] : null}
          />
          {errors.certificationName && <div class="errorMsg mt-2">{errors.certificationName.message}</div>}
        </div>
        <div class="custom-control custom-checkbox mr-sm-2">
          <input type="checkbox" class="custom-control-input" name="hasNoExpirationDate" id="hasNoExpirationDate" checked={hasNoExpirationDate} onChange={(e) => handleHasNoExpirationDate(e)} />
          <label class="custom-control-label" for="hasNoExpirationDate">This credentials does not expire</label>
        </div>
        <div className="form-group">
          <label htmlFor="issueYear" class="mt-2">Issue Date</label>
          <div class="form-row">
            <div className="col mr-3">
              <select
                id="issueYear"
                class={`form-control ${(errors.issueYear || errors.startDate) && 'is-invalid'}`}
                name="issueYear"
                ref={register}
                onChange={monthAndDateOnChange}
              >
                <option value="" selected>Select Year</option>
                {Array(50).fill().map((_, i) => (
                  <option key={`${i}_years`}>{parseInt(new Date().getFullYear()) - i}</option>
                ))}
              </select>
              {errors.issueYear && <div class="errorMsg mt-2">{errors.issueYear.message}</div>}
            </div>
            <div className="col ml-3">
              <select
                id="issueMonth"
                class={`form-control ${(errors.issueMonth || errors.startDate) && 'is-invalid'}`}
                name="issueMonth"
                ref={register}
                onChange={e => monthAndDateOnChange(e)}
              >
                <option value="" selected>Select Month</option>
                {MONTH_NAMES.map((monthName, i) => (
                  <option key={`monthName`}>{monthName}</option>
                ))}
              </select>
              {errors.issueMonth && <div class="errorMsg mt-2">{errors.issueMonth.message}</div>}
            </div>
            <div class="col-12">{errors.startDate && <div class="errorMsg mt-2">{errors.startDate.message}</div>}</div>
          </div>
        </div>
        {!hasNoExpirationDate ? <div> <label htmlFor="expirationYear">Expiration Date</label>
          <div className="form-group">
            <div class="form-row">
              <div className="col mr-3">
                <select
                  id="expirationYear"
                  class={`form-control ${(errors.expirationYear || errors.endDate) && 'is-invalid'}`}
                  name="expirationYear"
                  ref={register}
                  onChange={monthAndDateOnChange}
                >
                  <option value="" selected>Select Year</option>
                  {Array(100).fill().map((_, i) => (
                    <option key={`${i}_years`}>{(parseInt(new Date().getFullYear()) + 50) - i
                    }  </option>
                  ))}
                </select>
                {errors.expirationYear && <div class="errorMsg mt-2">{errors.expirationYear.message}</div>}
              </div>
              <div className="col ml-3">
                <select
                  id="expirationMonth"
                  class={`form-control ${(errors.expirationMonth || errors.endDate) && 'is-invalid'}`}
                  name="expirationMonth"
                  ref={register}
                  onChange={monthAndDateOnChange}
                >
                  <option value="" selected>Select Month</option>
                  {MONTH_NAMES.map((monthName, i) => (
                    <option key={`monthName`}>{monthName}</option>
                  ))}
                </select>
                {errors.expirationMonth && <div class="errorMsg mt-2">{errors.expirationMonth.message}</div>}
              </div>
              <div class="col-12">{errors.endDate && <div class="errorMsg mt-2">{errors.endDate.message}</div>}</div>
            </div>
          </div></div> : <div class="col text-right mt-2 px-0">
            <span class="small-text-light ">This certification does not expire</span>
          </div>}
        <div className="form-group">
          <label htmlFor="credentialId">Credential ID</label>
          <input
            class={`form-control ${errors.credentialId && 'is-invalid'}`}
            id="credentialId"
            name="credentialId"
            ref={register}
            placeholder="Credential ID"
          />
          {errors.credentialId && <div class="errorMsg mt-2">{errors.credentialId.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="credentialURL">Credential URL</label>
          <input
            class={`form-control ${errors.credentialURL && 'is-invalid'}`}
            id="credentialURL"
            name="credentialURL"
            ref={register({
              pattern: {
                value: HTTP_REGX,
                message: "Please enter a valid Credential URL"
              }
            })}
            placeholder="Enter Credential URL"
          />
          {errors.credentialURL && <div class="errorMsg mt-2">{errors.credentialURL.message}</div>}
        </div>
        <button type="submit" class="btn lightBlue float-right px-5" onClick={submitForm}>Save</button>
      </div>
    </form>
  );
};

export default React.memo(CertificationComponent)