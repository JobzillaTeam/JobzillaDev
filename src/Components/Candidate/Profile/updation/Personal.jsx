import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import ReactTags from 'react-tag-autocomplete'
import { COUNTRY_LIST } from '../../../../Utils/AppConst';
import ApiServicesOrgCandidate from '../../../../Services/ApiServicesOrgCandidate';
import { Context } from '../../../../Context/ProfileContext';
import Moment from 'moment';
import swal from 'sweetalert';
import { useForm } from "react-hook-form";

const PersonalComponent = ({ showPopup }) => {

  const [inputData, setFormInputData] = React.useState({
    "dob": new Date(),
    "gender": "",
    "passportId": "",
    "address": "",
    "maritalStatus": "",
    "pincode": "",
    "city": "",
    "state": "",
    "country": "",
    "workPermit": ""
  });
  const [isGender, setGender] = useState('male');
  const [tags, setTags] = useState([]);
  const [workPermit, setWorkPermit] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const { state, getProfileInfo } = useContext(Context);
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const { register, errors, handleSubmit } = useForm({mode: 'all'});
  const onSubmit = (d) => {
    const candidateId = localStorage.getItem('candidateId');
    const DOB = Moment(startDate);
    let data = {
      "dob": DOB.format('YYYY-MM-DD'),
      "gender": isGender,
      "passportId": inputData.passportId,
      "address": inputData.address,
      "maritalStatus": inputData.maritalStatus,
      "pincode": inputData.pincode,
      "city": inputData.city,
      "state": inputData.state,
      "country": inputData.country,
      "workPermit": inputData.workPermit,
      "candidateId": candidateId
    }
    ApiServicesOrgCandidate.updateCareerInfo(data, getProfileInfo, showPopup);
  };
  const data = [];
  useEffect(() => {
    state.then((response) => {
      if (response && response.candidateInfo) {
        setStartDate(new Date(response.candidateInfo.dob))
        if (response.candidateInfo.workPermit !== null) {
          const workPermit = response.candidateInfo.workPermit.split(',');
          let intersection = COUNTRY_LIST.filter(x => workPermit.includes(x.name));
          setTags(intersection);
          setGender(response.candidateInfo.gender)
          intersection.map((val) => setWorkPermit(oldArray => [...oldArray, val.name]))
        }
        setFormInputData({
          "gender": response.candidateInfo.gender,
          "passportId": response.candidateInfo.passportId,
          "address": response.candidateInfo.address,
          "maritalStatus": response.candidateInfo.maritalStatus,
          "pincode": response.candidateInfo.pincode,
          "city": response.candidateInfo.city,
          "state": response.candidateInfo.state,
          "country": response.candidateInfo.country,
          "workPermit": response.candidateInfo.workPermit
        });
      }
    });
    //Api call for getting list of states
    ApiServicesOrgCandidate.getListOfStates().then((response) => {
      setStateName(response.data.responseObject);
    });
  }, []);

  //Select gender
  const onValueChange = (event) => {
    setGender(event.target.value);
  }

  const onAddition = (tag) => {
    const tagsCnt = [].concat(tags, tag);
    if (workPermit.length < 3) {
      setWorkPermit(oldArray => [...oldArray, tag.name]);
      setTags(tagsCnt);
    } else {
      swal('you can select maximum 3 countries')
    }
  }
  const onDelete = (i) => {
    const tagsCnt = tags.slice(0)
    tagsCnt.splice(i, 1);
    setWorkPermit(Array.prototype.map.call(tagsCnt, s => s.name));
    setTags(tagsCnt)
  }


  const handleFormInputData = (e) => {
    if (e.target.name === 'state') {
      //Api call for getting list of cities
      ApiServicesOrgCandidate.getListOfCity(e.target.value).then((response) => {
        if (response) {
          setCity(response.data.responseObject);
        } else {
          setCity('');
        }
      });
    }
    return (
      setFormInputData({
        ...inputData,
        [e.target.name]: e.target.value
      })
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="mb-4">
          <div className="form-group">
            <label className="modal-label" htmlFor="University">Date of Birth</label>
            <div>
              <DatePicker
                value={startDate}
                format='dd-MM-yy'
                onChange={date => { setStartDate(date); 
                }}
                calendarIcon={<img src="../images/profile/calendar.png" style={{ width: '16px' }} />}
                clearIcon={null}
                className={"wid100"}
              />
            </div>
            <label className="modal-label mt-3" htmlFor="University" >Gender</label>
            <div>
              <div class={isGender === 'male' ? "modal-label form-check form-check-inline" : "modal-label form-check form-check-inline modal-fade"}>
                <input
                  type="radio"
                  class="form-check-input mr-2"
                  id="male"
                  name="male"
                  value="male"
                  checked={isGender === 'male'}
                  onChange={onValueChange}
                />
                <label class="radio-inline form-check-label" for="materialChecked2">Male</label>
              </div>
              <div class={isGender === 'female' ? "modal-label form-check form-check-inline" : "modal-label form-check form-check-inline modal-fade"}>
                <input
                  type="radio"
                  class="form-check-input mr-2"
                  id="female"
                  name="female"
                  value="female"
                  checked={isGender === 'female'}
                  onChange={onValueChange}
                />
                <label class="modal-label radio-inline form-check-label" for="materialChecked2">Female</label>
              </div>
              <div class={isGender === 'transgender' ? "modal-label form-check form-check-inline" : "modal-label form-check form-check-inline modal-fade"}>
                <input
                  type="radio"
                  class="form-check-input"
                  id="transgender"
                  name="transgender"
                  value="transgender"
                  checked={isGender === 'transgender'}
                  onChange={onValueChange}
                />
                <label class="modal-label radio-inline form-check-label" for="materialChecked2">Transgender</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="modal-label" htmlFor="University">Passport ID</label>
            <input class="form-control"
              type="text"
              placeholder="LKJ1234"
              id="passportId"
              name="passportId"
              value={inputData.passportId}
              onChange={(e) => handleFormInputData(e)}
            />
          </div>
          <div className="form-group">
            <label className="modal-label" htmlFor="University">Address</label>
            <textarea rows="6" class="form-control" type="text"
              placeholder="85 Flat XYZ Building"
              id="address"
              name="address"
              value={inputData.address}
              onChange={(e) => handleFormInputData(e)}
            />
          </div>
          <div className="form-group">
            <label className="modal-label" htmlFor="maritalStatus">Marital Status</label>
            <select className="form-control"
              value={inputData.maritalStatus}
              id="maritalStatus"
              name="maritalStatus"
              onChange={(e) => handleFormInputData(e)}
            >
              <option value=''>Select Marital Status</option>
              <option value='Single/unmarried'>Single/unmarried</option>
              <option value='Married'>Married</option>
            </select>
          </div>
          <div className="form-group">
            <label className="modal-label" htmlFor="University">Work Permit for countries</label>
            
            <input class="form-control"
              type="text"
              placeholder="Enter Country"
              id="workPermit"
              name="workPermit"
              register
              value={inputData.workPermit}
              onChange={(e) => handleFormInputData(e)}
            />
          </div>
        </div>
        <button class="btn lightBlue float-right px-5"> Save</button>
      </form>
    </>
  );
}
export default React.memo(PersonalComponent)