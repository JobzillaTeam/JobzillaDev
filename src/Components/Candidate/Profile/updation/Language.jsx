import React from "react";
import { useForm } from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Context } from "../../../../Context/ProfileContext";
import ApiServicesOrgCandidate from "../../../../Services/ApiServicesOrgCandidate";
import { languageFormDefaultValues } from "../../../../Utils/ProfileFormHelper";

const Language = ({ dataAttributes, showPopup }) => {
  const { handleSubmit, register, errors, setValue,  setError, clearErrors } = useForm({
    mode: 'onSubmit',
    defaultValues: languageFormDefaultValues
  });
  const { state, getProfileInfo } = React.useContext(Context);
  const resourceId = dataAttributes && dataAttributes.resourceId;
  const initialCustomInputValues = {canRead: false, canWrite: false, canSpeak: false}
  const [languages, setLanguages] = React.useState([]);
  const [customInputValues, setCustomInputValues] = React.useState(initialCustomInputValues);
  React.useEffect(() => {
    ApiServicesOrgCandidate.getListOfLanguages().then((response) => {
      if (response) {
        const result = Object.keys(response.data.responseObject).map((key, index) => response.data.responseObject[key].languages);
        setLanguages(result);
      } else {
        setLanguages('');
      }
    })
    state.then((response) => {
      if (response && response.candidateLanguageList && resourceId) {
        const resourceObj = response.candidateLanguageList.filter(resObj => {
          return resObj.languageId === resourceId
        })[0]
        if (resourceObj) {
          const { language, proficiency, canWrite, canSpeak, canRead } = resourceObj;
          setValue("proficiency", proficiency);
          setCustomInputValues({ language: language, canWrite: canWrite, canSpeak: canSpeak, canRead: canRead });
        }
      }
    })
  }, []);

  const handleTypeheadErrorOnInputChange = (e, input, name, message) => {
    const {value} = e.target;
    if (value) {
      console.log(value)
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
        const messageText = name === 'language' ? 'Please enter a valid Language' : '';
        setError(name, {
          type: "manual",
          message: messageText
        });
      }
    }
  }

  const handleAbilityOnChange = e => {
    const { name } = e.target;
    setCustomInputValues({...customInputValues, [name]: e.target.checked ? true : false})
  }

  const submitForm = (e) => {
    if (!customInputValues.language) {
      setError('language', {
        type: "manual",
        message: 'Language cannot be left blank'
      });
    }
  }

  const onSubmit = values => {
    const data = {
      language: customInputValues.language,
      proficiency: values.proficiency,
      canRead: customInputValues.canRead,
      canWrite: customInputValues.canWrite,
      canSpeak: customInputValues.canSpeak
    }
    if (resourceId) {
      ApiServicesOrgCandidate.updateLanguage({ ...data, languageId: resourceId }, getProfileInfo, showPopup);
    } else {
      ApiServicesOrgCandidate.addLanguage(data, getProfileInfo, showPopup);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-4">
        <div className="form-group">
          <label htmlFor="language">Language<span >*</span></label>
          <Typeahead
            id="language"
            className={errors.language && 'is-invalid'}
            isInvalid={errors.language}
            onBlur={e => handleTypeheadErrorOnBlur(e, 'language', 'Language cannot be left blank')}
            onInputChange={(input, e) => handleTypeheadErrorOnInputChange(e, input, 'language', 'Language cannot be left blank')}
            onChange={selected => handleTypeheadErrorOnChange(selected, 'language')}
            options={languages}
            placeholder="Choose a Language..."
            selected={customInputValues.language ? [customInputValues.language] : null}
          />
          {errors.language && <div class="errorMsg mt-2">{errors.language.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="proficiency">Proficiency<span>*</span></label>
          <select
            id="proficiency"
            class={`form-control ${errors.proficiency && 'is-invalid'}`}
            name="proficiency"
            ref={register({
              required: 'Proficiency cannot be left blank'
            })}
          >
            <option value="" selected>Select Proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Proficient">Proficient</option>
            <option value="Expert">Expert</option>
          </select>
          {errors.proficiency && <div class="errorMsg mt-2">{errors.proficiency.message}</div>}
        </div>
        <div class="form-group">
          <div class="form-row">
            <div className="col-3">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox"
                  class="custom-control-input"
                  id="customControlAutosizing"
                  name="canRead"
                  checked={customInputValues.canRead}
                  value={customInputValues.canRead}
                  onChange={handleAbilityOnChange}
                />
                <label class="custom-control-label" for="customControlAutosizing">Read</label>
              </div>
            </div>
            <div className="col-3">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customControlAutosizing1"
                  name="canWrite"
                  checked={customInputValues.canWrite}
                  value={customInputValues.canWrite}
                  onChange={handleAbilityOnChange}
                />
                <label class="custom-control-label" for="customControlAutosizing1">Write</label>
              </div>
            </div>
            <div className="col-3">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customControlAutosizing2"
                  name="canSpeak"
                  checked={customInputValues.canSpeak}
                  value={customInputValues.canSpeak}
                  onChange={handleAbilityOnChange}
                />
                <label class="custom-control-label" for="customControlAutosizing2">Speak</label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn lightBlue float-right px-5" onClick={submitForm}>Save</button>
      </div>
    </form>
  );
};

export default Language;