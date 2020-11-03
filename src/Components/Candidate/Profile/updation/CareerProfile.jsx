import React, { useState, useContext, useEffect } from 'react';
import ReactTags from 'react-tag-autocomplete'
import { useForm } from "react-hook-form";
import { Context } from '../../../../Context/ProfileContext';
import ApiServicesOrgCandidate from '../../../../Services/ApiServicesOrgCandidate';
import { careerProfileFormDefaultValues } from '../../../../Utils/ProfileFormHelper';
import { CANDIDATE_ID, PREFERRED_SHIFT_TYPE_ENUM } from '../../../../Utils/AppConst';
import swal from 'sweetalert';

const CareerProfileComponent = ({ showPopup }) => {
  const { state, getProfileInfo } = useContext(Context);
  const initialCustomInputValues = { preferredShift: '', preferredLocations: [] };
  const [customInputValues, setCustomInputValues] = React.useState(initialCustomInputValues);
  const { handleSubmit, register, errors, setValue, clearErrors, getValues } = useForm({
    mode: 'onSubmit',
    defaultValues: careerProfileFormDefaultValues
  });
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [addPreferredLocation, setAddPreferredLocation] = useState([]);
  const [cities, setCities] = useState([]);

  // const [isPreferredShift, setPreferredShift] = useState('day');
  // const [tags, setPreferredLocations] = useState([]);
  // const [employmentType, setEmploymentType] = useState('');
  // const [addPreferredLocation, setAddPreferredLocation] = useState([]);
  // const [candidateInfo, setCandidateInfo] = useState('');
  // const { register, errors, handleSubmit } = useForm({ mode: 'all' });
  useEffect(() => {
    setFormOnFetchCites([])
    ApiServicesOrgCandidate.getListOfCity('0').then((response) => {
      if (response) {
        var resultArray = response.data.responseObject.map((city) => {
          return { name: city['city_name'], city_code: city['city_code'] };
        });
        setFormOnFetchCites(resultArray)
        setCities(resultArray);
      } else {
        setCities('');
      }
    });
  }, []);
  const setFormOnFetchCites = (cities) => {
    state.then((response) => {
      if (response && response.candidateInfo) {
        const { candidateInfo } = response;
        const { preferredShift, employmentType } = candidateInfo;
        setCustomInputValues({ preferredShift: preferredShift });
        setValue('employmentType', employmentType);
        if (response.candidateInfo.preferredLocation !== null) {
          const preferredLocation = response.candidateInfo.preferredLocation?.split(',');
          if (cities) {
            let intersection = cities.filter(x => preferredLocation.includes(x.name));
            console.log(intersection)
            setPreferredLocations(intersection);
            intersection.map((val) => setAddPreferredLocation(oldArray => [...oldArray, val.name]))
          }
        }
        setCities(cities ? cities : [])
      }
    })
  }

  const onAddition = (preferredLocation) => {
    const preferredLocationCnt = [].concat(preferredLocations, preferredLocation);
    if (addPreferredLocation.length < 3) {
      setAddPreferredLocation(oldArray => [...oldArray, preferredLocation.name]);
      setPreferredLocations(preferredLocationCnt)
      setCities(cities.filter(city => city !== preferredLocation))
    } else {
      swal({
        title: "Maximum 3 cities",
        text: "You can select maximum 3 cities",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    }
  }

  const onDelete = (i) => {
    const preferredLocationCnt = preferredLocations.slice(0)
    preferredLocationCnt.splice(i, 1)
    setAddPreferredLocation(Array.prototype.map.call(preferredLocationCnt, s => s.name))
    setPreferredLocations(preferredLocationCnt)
  }

  const onValueChange = (e) => {
    const value = e.target.value;
    setCustomInputValues({...customInputValues, preferredShift: value});
  }


  const onSubmit = values => {
    let data = {
      "preferredShift": customInputValues.preferredShift,
      "employmentType": values.employmentType,
      "preferredLocation": addPreferredLocation.join(),
      "candidateId": CANDIDATE_ID
    }
    ApiServicesOrgCandidate.updateCareerInfo(data, getProfileInfo, showPopup);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-4">
        <div className="form-group">
          <label htmlFor="University">Employment Type<span>*</span></label>
          <select
            id="employmentType"
            class={`form-control ${errors.employmentType && 'is-invalid'}`}
            name="employmentType"
            ref={register({
              required: "Employment Type cannot be left blank",
            })}
          >
            <option value="" selected>Select Employment Type</option>
            <option>Permanent</option>
            <option>Contractual</option>
          </select>
          {errors.employmentType && <div class="error-message">{errors.employmentType.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="University">Preferred Locations</label>
          <ReactTags
            placeholderText={'Add Preferred Locations'}
            minQueryLength={1}
            tags={preferredLocations}
            suggestions={cities || []}
            onDelete={onDelete}
            onAddition={onAddition}
          />
        </div>
        <div className="form-group">
          <label htmlFor="University">Preferred Shift</label>
          <div class="form-row">
            <div className="col-2">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="Day"
                  value="Day"
                  checked={customInputValues.preferredShift === PREFERRED_SHIFT_TYPE_ENUM.DAY}
                  onChange={onValueChange}
                />
                <label class="custom-control-label" for="Day">Day</label>
              </div>
            </div>
            <div className="col-3.5">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="AfterNoon"
                  value="AfterNoon"
                  checked={customInputValues.preferredShift === PREFERRED_SHIFT_TYPE_ENUM.AFTER_NOON}
                  onChange={onValueChange}
                />
                <label class="custom-control-label" for="AfterNoon">AfterNoon</label>
              </div>
            </div>
            <div className="col-2.5">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="Night"
                  value="Night"
                  checked={customInputValues.preferredShift === PREFERRED_SHIFT_TYPE_ENUM.NIGHT}
                  onChange={onValueChange}
                />
                <label class="custom-control-label" for="Night">Night</label>
              </div>
            </div>
            <div className="col-3">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="Flexible"
                  value="Flexible"
                  checked={customInputValues.preferredShift === PREFERRED_SHIFT_TYPE_ENUM.FLEXIBLE}
                  onChange={onValueChange}
                />
                <label class="custom-control-label" for="Flexible">Flexible</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn lightBlue float-right px-5">Save</button>
    </form>
  );
}

export default React.memo(CareerProfileComponent)