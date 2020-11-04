import React from "react";
import { useForm } from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Context } from "../../../../Context/ProfileContext";
import ApiServicesOrgCandidate from "../../../../Services/ApiServicesOrgCandidate";
import { skillFormDefaultValues, getExperienceInFormat, getExperienceInYear, getExperienceInMonth } from "../../../../Utils/ProfileFormHelper";

const SkillComponent = ({ dataAttributes, showPopup }) => {
  let skillNameInput = '';
  const { handleSubmit, register, errors, setValue, setError, clearErrors } = useForm({
    mode: 'onSubmit',
    defaultValues: skillFormDefaultValues
  });
  const { state, getProfileInfo } = React.useContext(Context);
  const resourceId = dataAttributes && dataAttributes.resourceId;
  const initialCustomInputValues = { skillName: [], isPrimarySkill: true };
  const [skills, setSkills] = React.useState([]);
  const [isTypeHeadInputReady, setIsTypeHeadInputReady] = React.useState(!resourceId);
  const [customInputValues, setCustomInputValues] = React.useState(initialCustomInputValues);
  React.useEffect(() => {
    ApiServicesOrgCandidate.getListOfSkills().then((response) => {
      if (response) {
        const result = Object.keys(response.data.responseObject).map((key, index) => response.data.responseObject[key].skills);
        setSkills(result);
      } else {
        setSkills('');
      }
    })
    state.then((response) => {
      if (response && response.skillList && resourceId) {
        const resourceObj = response.skillList.filter(resObj => {
          return resObj.skillId === resourceId
        })[0]
        if (resourceObj) {
          const { skillName, experience, proficiency, version, isPrimarySkill } = resourceObj;
          setValue("experienceInYear", getExperienceInYear(experience));
          setValue("experienceInMonth", getExperienceInMonth(experience));
          setValue("proficiency", proficiency);
          setValue("version", version);
          setCustomInputValues({ skillName: skillName ? [skillName] : [], isPrimarySkill: isPrimarySkill });
          setIsTypeHeadInputReady(true);
        }
      }
    })
  }, []);

  const handleTypeheadOnChange = (selected, name) => {
    let selectedValue = selected[0]
    if (selectedValue) {
      if (typeof (selectedValue) === "object" && selectedValue.customOption) {
        selectedValue = selectedValue.label
      }
      setCustomInputValues({ ...customInputValues, [name]: [selectedValue] })
      clearErrors(name);
    } else {
      setCustomInputValues({ ...customInputValues, [name]: [] })
    }
  }

  const handlePrimarySkill = e => {
    setCustomInputValues({ ...customInputValues, isPrimarySkill: e.target.checked })
  }

  const submitForm = (e) => {
    const skillName = customInputValues.skillName && customInputValues.skillName[0]
    if (!skillName) {
      let message = 'Skill Name cannot be left blank';
      if (skillNameInput && skillNameInput.inputNode && skillNameInput.inputNode.value && skillNameInput.inputNode.value[0]) {
        message = 'Please fill appropriate skill';
      }
      setError('skillName', {
        type: "manual",
        message: message
      });
    }
  }

  const onSubmit = values => {
    const skillName = customInputValues.skillName && customInputValues.skillName[0];
    if (skillName) clearErrors('skillName');
    const data = {
      skillName: skillName,
      experience: getExperienceInFormat(values.experienceInYear, values.experienceInMonth),
      proficiency: values.proficiency,
      version: values.version,
      isPrimarySkill: customInputValues.isPrimarySkill
    }
    if (resourceId) {
      ApiServicesOrgCandidate.updateSkill({ ...data, skillId: resourceId }, getProfileInfo, showPopup);
    } else {
      ApiServicesOrgCandidate.addSkill(data, getProfileInfo, showPopup);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-4">
        <div className="form-group">
          <label htmlFor="skillName">Skill Name<span >*</span></label>
          {isTypeHeadInputReady ? <Typeahead
            ref={input => skillNameInput = input}
            allowNew
            newSelectionPrefix="Add a new skill: "
            id="skillName"
            className={errors.skillName && 'is-invalid'}
            isInvalid={errors.skillName}
            onChange={selected => handleTypeheadOnChange(selected, 'skillName')}
            options={skills}
            placeholder="Choose a Skill Name..."
            defaultSelected={customInputValues.skillName}
          /> : null}
          {errors.skillName && <div class="error-message">{errors.skillName.message}</div>}
        </div>
        <div className="form-group">
          <div class="custom-control custom-checkbox mr-sm-2">
            <input type="checkbox" class="custom-control-input" name="isPrimarySkill" id="isPrimarySkill" checked={customInputValues.isPrimarySkill} onChange={(e) => handlePrimarySkill(e)} />
            <label class="custom-control-label" for="isPrimarySkill">Primary Skill</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="version">Version</label>
          <input
            class={`form-control ${errors.version && 'is-invalid'}`}
            id="version"
            name="version"
            ref={register({
              required: false,
              message: 'Version cannot be left blank'
            })}
            placeholder="Version"
          />
          {errors.version && <div class="error-message">{errors.version.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="experienceInYear" class="mt-2">Experience</label>
          <div class="form-row">
            <div className="col mr-3">
              <select
                id="experienceInYear"
                class={`form-control ${errors.experienceInYear && 'is-invalid'}`}
                name="experienceInYear"
                ref={register({
                  required: false,
                  message: "Year cannot be left blank"
                })}
              >
                <option value="" selected>Select Year</option>
                {Array(31).fill().map((_, i) => (
                  <option value={('0' + i).slice(-2)} key={`${i}_years`}>{i} {i===0 || i ===1 ? 'Year' : 'Years'} </option>
                ))}
              </select>
              {errors.experienceInYear && <div class="error-message">{errors.experienceInYear.message}</div>}
            </div>
            <div className="col ml-3">
              <select
                id="experienceInMonth"
                class={`form-control ${errors.experienceInMonth && 'is-invalid'}`}
                name="experienceInMonth"
                ref={register({
                  required: false,
                  message: "Month cannot be left blank"
                })}
              >
                <option value="" selected>Select Month</option>
                {Array(12).fill().map((_, i) => (
                  <option value={i < 10 ? `0${i}` : i} key={`${i}_months`}>{i} {i === 0 || i === 1 ? 'Month' : 'Months'} </option>
                ))}
              </select>
              {errors.experienceInMonth && <div class="error-message">{errors.experienceInMonth.message}</div>}
            </div>
            <div class="col-12">{errors.startDate && <div class="error-message">{errors.startDate.message}</div>}</div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="proficiency">Proficiency</label>
          <select
            id="proficiency"
            class={`form-control ${errors.proficiency && 'is-invalid'}`}
            name="proficiency"
            ref={register({
              required: false,
              message: 'Proficiency cannot be left blank'
            })}
          >
            <option value="" selected>Select Proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Proficient">Proficient</option>
            <option value="Expert">Expert</option>
          </select>
          {errors.proficiency && <div class="error-message">{errors.proficiency.message}</div>}
        </div>
        <button type="submit" onClick={submitForm} class="btn lightBlue float-right px-5">Save</button>
      </div>
    </form>
  );
};
export default React.memo(SkillComponent)