import React from "react";
import { useForm } from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Context } from "../../../../Context/ProfileContext";
import ApiServicesOrgCandidate from "../../../../Services/ApiServicesOrgCandidate";
import { COURSE_TYPE_ENUM } from "../../../../Utils/AppConst";


const EducationComponent = ({ dataAttributes, showPopup }) => {
  const { handleSubmit, getValues, register, errors, setValue, reset, setError, clearErrors } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      educationType: '',
      passingOutYear: ''
    }
  });
  const { state, getProfileInfo } = React.useContext(Context);
  const [educationTypes, setEducationTypes] = React.useState([
    {
      value: '',
      label: 'Select Education Type'
    },
    {
      value: 'Doctorate/PhD',
      label: 'Doctorate/PhD'
    },
    {
      value: 'Masters/Post-Graduation',
      label: 'Masters/Post-Graduation'
    },
    {
      value: 'Graduation/Diploma',
      label: 'Graduation/Diploma'
    },
    {
      value: '12th',
      label: '12th'
    },
    {
      value: '10th',
      label: '10th'
    },
  ]);
  const resourceId = dataAttributes && dataAttributes.resourceId;
  const [boards, setBoards] = React.useState([]);
  const [institutes, setInstitutes] = React.useState([]);
  const [isSchoolForm, setIsSchoolForm] = React.useState(false);
  const initialCustomInputValues = { board: [], university: [], courseType: COURSE_TYPE_ENUM.FULL_TIME }
  const [customInputValues, setCustomInputValues] = React.useState(initialCustomInputValues);
  const [isTypeHeadInputReady, setIsTypeHeadInputReady] = React.useState(!resourceId);
  React.useEffect(() => {
    ApiServicesOrgCandidate.getListOfInstitutes().then((response) => {
      if (response) {
        const result = Object.keys(response.data.responseObject).map((key, index) => response.data.responseObject[key].institute);
        setInstitutes(result);
      } else {
        setInstitutes([]);
      }
    })
    ApiServicesOrgCandidate.getListOfBoards().then((response) => {
      if (response) {
        const result = Object.keys(response.data.responseObject).map((key, index) => response.data.responseObject[key].board_name);
        setBoards(result);
      } else {
        setBoards([]);
      }
    })
    state.then((response) => {
      if (response && response.educationDetailsList) {
        let existingEducationTypes = response.educationDetailsList.map(education => (
          education.educationType
        ));
        let defaultEducationTypes = educationTypes;
        let is10thExist = existingEducationTypes.includes('10th');
        let is12thExist = existingEducationTypes.includes('12th');
        if (resourceId) {
          const resourceObj = response.educationDetailsList.filter(resObj => {
            return resObj.educationId === resourceId
          })[0]
          if (resourceObj) {
            const {educationType, board, university, course, specialization, passingOutYear, marks} = resourceObj;
            setValue("educationType", educationType);
            setValue("course", course);
            setValue("specialization", specialization);
            setValue("passingOutYear", passingOutYear);
            setValue("marks", marks);
            changeIsSchoolForm(educationType);
            setCustomInputValues({ board: board ? [board] : [], university: university ? [university] : [], courseType: resourceObj.courseType });
            setIsTypeHeadInputReady(true);
          }
          if (resourceObj.educationType === '10th') is10thExist = false;
          if (resourceObj.educationType === '12th') is12thExist = false;
        }
        defaultEducationTypes = educationTypes.filter(eduType => !(is10thExist && eduType.value === '10th'))
        defaultEducationTypes = defaultEducationTypes.filter(eduType => !(is12thExist && eduType.value === '12th'))
        setEducationTypes(defaultEducationTypes);
      }
    })
  }, []);

  const changeIsSchoolForm = value => {
    if (value === '10th' || value === '12th') {
      setIsSchoolForm(true);
    } else {
      setIsSchoolForm(false);
    }
  }
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

  const onChangeEducationType = e => {
    const value = e.target.value;
    if (value) {
      reset({ educationType: value });
      setCustomInputValues(initialCustomInputValues)
    }
    changeIsSchoolForm(value)
  }
  const submitForm = (e) => {
    const board = customInputValues.board && customInputValues.board[0];
    const university = customInputValues.university && customInputValues.university[0];
    if (isSchoolForm && !board) {
      setError('board', {
        type: "manual",
        message: 'Board cannot be left blank'
      });
    }
    if (!isSchoolForm && !university) {
      setError('university', {
        type: "manual",
        message: 'University/Institute cannot be left blank'
      });
    }
    if (!isSchoolForm && !customInputValues.courseType) {
      setError('courseType', {
        type: "manual",
        message: 'Course Type cannot be left blank'
      });
    }
  }
  const onChangeCourseType = (e) => {
    const value = e.target.value;
    if (value === COURSE_TYPE_ENUM.FULL_TIME || value === COURSE_TYPE_ENUM.PART_TIME || value === COURSE_TYPE_ENUM.CORRESPONDENCE) {
      clearErrors('courseType');
    }
    setCustomInputValues({ ...customInputValues, courseType: e.target.value })
  }
  const values = getValues();
  const onSubmit = values => {
    const board = customInputValues.board && customInputValues.board[0];
    const university = customInputValues.university && customInputValues.university[0];
    if (board) clearErrors('board');
    if (university) clearErrors('university');
    if (resourceId) {
      ApiServicesOrgCandidate.updateEducation({ ...values, board: board, university: university, courseType: customInputValues.courseType, educationId: resourceId }, getProfileInfo, showPopup);
    } else {
      ApiServicesOrgCandidate.addEducation({ ...values, board: board, university: university, courseType: customInputValues.courseType }, getProfileInfo, showPopup);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-4">
        <div className="form-group">
          <label htmlFor="educationType">Education Type<span>*</span></label>
          <select
            id="educationType"
            class={`form-control ${errors.educationType && 'is-invalid'}`}
            name="educationType"
            onChange={onChangeEducationType}
            ref={register({
              required: "Education Type cannot be left blank"
            })}
          >
            {educationTypes && educationTypes.map(edu => (
              <option value={edu.value} selected>{edu.label}</option>
            ))}
          </select>
          {errors.educationType && <div class="error-message">{errors.educationType.message}</div>}
        </div>
        {isSchoolForm ? <div className="form-group">
          <label htmlFor="board">Board<span >*</span></label>
          {isTypeHeadInputReady ? <Typeahead
            allowNew
            newSelectionPrefix="Add a new Board: "
            id="board"
            className={errors.board && 'is-invalid'}
            isInvalid={errors.board}
            onChange={selected => handleTypeheadOnChange(selected, 'board')}
            options={boards}
            placeholder="Choose a Board..."
            defaultSelected={customInputValues.board}
          /> : null}
          {errors.board && <div class="error-message">{errors.board.message}</div>}
        </div> :
          <div>
            <div className="form-group">
              <label htmlFor="course">Course<span>*</span></label>
              <input
                class={`form-control ${errors.course && 'is-invalid'}`}
                id="course"
                name="course"
                ref={register({
                  required: "Course cannot be left blank",
                })}
                placeholder="Enter Course"
              />
              {errors.course && <div class="error-message">{errors.course.message}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="specialization">Specialization<span>*</span></label>
              <input
                class={`form-control ${errors.specialization && 'is-invalid'}`}
                id="specialization"
                name="specialization"
                ref={register({
                  required: "Specialization cannot be left blank",
                })}
                placeholder="Enter Specialization"
              />
              {errors.specialization && <div class="error-message">{errors.specialization.message}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="university">University/Institute<span >*</span></label>
              {isTypeHeadInputReady ? <Typeahead
                allowNew
                newSelectionPrefix="Add a new University/Institute: "
                id="university"
                className={errors.university && 'is-invalid'}
                isInvalid={errors.university}
                onChange={selected => handleTypeheadOnChange(selected, 'university')}
                options={institutes}
                placeholder="Choose a University/Institute..."
                defaultSelected={customInputValues.university}
              /> : null}
              {errors.university && <div class="error-message">{errors.university.message}</div>}
            </div>
            <div class="form-group">
              <label htmlFor="University">Course Type</label>
              <div>
                <div class={customInputValues.courseType === COURSE_TYPE_ENUM.FULL_TIME ? "modal-label form-check form-check-inline" : "modal-label form-check form-check-inline modal-fade"}>
                  <input
                    type="radio"
                    class="form-check-input mr-2"
                    id="courseType"
                    name="courseType"
                    defaultValue={COURSE_TYPE_ENUM.FULL_TIME}
                    checked={customInputValues.courseType === COURSE_TYPE_ENUM.FULL_TIME}
                    onChange={onChangeCourseType}
                  />
                  <label class="radio-inline form-check-label" for="materialChecked2">Full Time</label>
                </div>
                <div class={customInputValues.courseType === COURSE_TYPE_ENUM.PART_TIME ? "modal-label form-check form-check-inline" : "modal-label form-check form-check-inline modal-fade"}>
                  <input
                    type="radio"
                    class="form-check-input mr-2"
                    id="courseType"
                    name="courseType"
                    defaultValue={COURSE_TYPE_ENUM.PART_TIME}
                    checked={customInputValues.courseType === COURSE_TYPE_ENUM.PART_TIME}
                    onChange={onChangeCourseType}
                  />
                  <label class="modal-label radio-inline form-check-label" for="materialChecked2">Part Time</label>
                </div>
                <div class={customInputValues.courseType === COURSE_TYPE_ENUM.CORRESPONDENCE ? "modal-label form-check" : "modal-label form-check form-check-inline modal-fade"}>
                  <input
                    type="radio"
                    class="form-check-input"
                    id="courseType"
                    name="courseType"
                    defaultValue={COURSE_TYPE_ENUM.CORRESPONDENCE}
                    checked={customInputValues.courseType === COURSE_TYPE_ENUM.CORRESPONDENCE}
                    onChange={onChangeCourseType}
                  />
                  <label class="modal-label radio-inline form-check-label" for="materialChecked2">Correspondence/Distance Learning</label>
                </div>
              </div>
              {errors.courseType && <div class="error-message">{errors.courseType.message}</div>}
            </div>
          </div>}
        <div className="form-group">
          <label htmlFor="passingOutYear">Passing out year<span >*</span></label>
          <select id="passingOutYear"
            class={`form-control ${errors.passingOutYear && 'is-invalid'}`}
            name="passingOutYear"

            ref={register({
              required: "Passing out year cannot be left blank"
            })}
          >
            <option value="" selected>Select Passing Out Year</option>
            {Array(50).fill().map((_, i) => (
              <option key={`${i}_years`}>{parseInt(new Date().getFullYear()) - i}</option>
            ))}
          </select>
          {errors.passingOutYear && <div class="error-message">{errors.passingOutYear.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="marks">Passing % Or Grade<span>*</span></label>
          <input
            class={`form-control ${errors.marks && 'is-invalid'}`}
            id="marks"
            name="marks"
            ref={register({
              required: "Marks cannot be left blank",
            })}
            placeholder="Enter Marks"
          />
          {errors.marks && <div class="error-message">{errors.marks.message}</div>}
        </div>
        <button type="submit" class="btn lightBlue float-right px-5" onClick={submitForm}>Save</button>
      </div>
    </form>
  );
};

export default React.memo(EducationComponent)