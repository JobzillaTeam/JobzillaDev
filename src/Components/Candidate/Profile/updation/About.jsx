import React from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../../../../Context/ProfileContext';
import { aboutFormDefaultValues } from '../../../../Utils/ProfileFormHelper';
import { MAX_LENGTH, CANDIDATE_ID } from '../../../../Utils/AppConst';
import ApiServicesOrgCandidate from '../../../../Services/ApiServicesOrgCandidate';

const About = ({ showPopup }) => {
  const { state, getProfileInfo } = React.useContext(Context);
  const [aboutLength, setAboutLength] = React.useState(MAX_LENGTH);
  const { handleSubmit, register, errors, setValue } = useForm({
    mode: 'all',
    defaultValues: aboutFormDefaultValues
  });

  React.useEffect(() => {
    state.then((response) => {
      if (response && response.candidateInfo) {
        const { candidateInfo } = response;
        const { about } = candidateInfo;
        setValue('about', about);
      }
    })
  }, []);

  const onInputChange = e => {
    setAboutLength(MAX_LENGTH - e.target.value.length);
  }

  const onSubmit = values => {
    ApiServicesOrgCandidate.updateProfileInfo({ ...values, candidateId: CANDIDATE_ID }, getProfileInfo, showPopup);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-4">
        <div className="form-group">
          <label for="about">Profile Summary</label>
          <textarea class={`form-control ${errors.about && 'is-invalid'}`} rows="10"
            id="about"
            placeholder="Describe Here"
            name="about"
            onChange={onInputChange}
            ref={register({
              required: false,
              maxLength: {
                value: MAX_LENGTH,
                message: `Profile Summary must not exceed ${MAX_LENGTH} characters`
              }
            })}
          ></textarea>
          <div class="row m-0 p-0 mt-2">
            <div class="col-6 m-0 p-0">{errors.about && <span class="errorMsg">{errors.about.message}</span>}</div>
            <div class="col-6 text-right m-0 p-0"><span class="small-text-light ">{aboutLength > -1 ? `${aboutLength} Characters Left` : `Profile Summary exceed ${MAX_LENGTH} characters`} </span></div>
          </div>
        </div>
      </div>
      <button class="btn lightBlue float-right px-5">Save</button>
    </form>
  );
}

export default About