import React from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../../../../Context/ProfileContext';
import { aboutFormDefaultValues } from '../../../../Utils/ProfileFormHelper';
import { MAX_LENGTH } from '../../../../Utils/AppConst';
import ApiServicesOrgCandidate from '../../../../Services/ApiServicesOrgCandidate';

const AboutComponent = ({ showPopup }) => {
  const { state, getProfileInfo } = React.useContext(Context);
  const [aboutLength, setAboutLength] = React.useState(MAX_LENGTH);
  const { handleSubmit, register, errors, setValue } = useForm({
    mode: 'onSubmit',
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
    const candidateId = localStorage.getItem('candidateId');
    // Api call for updating profile information
    ApiServicesOrgCandidate.updateProfileInfo({ ...values, candidateId: candidateId }, getProfileInfo, showPopup);
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
            maxlength={MAX_LENGTH}
            ref={register({
              required: false,
            })}
          ></textarea>
          <div class="row m-0 p-0 mt-2">
            <div class="col-6 m-0 p-0">{errors.about && <span class="errorMsg">{errors.about.message}</span>}</div>
            <div class="col-6 text-right m-0 p-0"><span class="small-text-light ">{aboutLength} Characters Left</span></div>
          </div>
        </div>
      </div>
      <button class="btn lightBlue float-right px-5">Save</button>
    </form>
  );
}

export default React.memo(AboutComponent)