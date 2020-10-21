import React, { Component } from "react";
import Select from "react-select";
import HeaderAll from "../CommonComp/HeaderAll";
import Footer from "../CommonComp/Footer";
import LeftNavProvider from "../CommonComp/LeftNavProvider";
import ApiServicesOrgRecruiter from "../../Services/ApiServicesOrgRecruiter";
import { MAX_LENGTH } from "../../Utils/AppConst";
import { CURRENCY_TYPE_ENUM } from '../../Utils/AppConst';
import { Link } from 'react-router-dom';
import ApiServicesOrgCandidate from "../../Services/ApiServicesOrgCandidate";

export default class CreateJob extends React.Component {
  constructor() {
    super();
    this.state = {
      values: { jobTitle: '', secondarySkills: '', noOfPositionsAvailable: '', currency: CURRENCY_TYPE_ENUM.INR, visa: '', mustHavePasport: '', jobDescription: '', responsibilities: '' },
      errors: {},
      remainingTextLength: {
        jobDescription: MAX_LENGTH,
        responsibilities: MAX_LENGTH
      },
      categories: [],
      primarySkills: [],
      isFormValid: true
    }
  }

  componentDidMount() {
    ApiServicesOrgRecruiter.getListOfCategories().then((response) => {
      let categoriesList = [];
      if (response) {
        const result = Object.keys(response.data.responseObject).map((key, index) => response.data.responseObject[key].categories);
        categoriesList = result.map(category => ({ value: category, label: category }));
      } else {
      }
      this.setState({
        categories: categoriesList
      })
    });
    ApiServicesOrgCandidate.getListOfSkills().then((response) => {
      if (response) {
        const result = Object.keys(response.data.responseObject).map((key, index) => response.data.responseObject[key].skills);
        this.setState({primarySkills: result});
      } else {
        this.setState({primarySkills: []});
      }
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    const { values, errors, remainingTextLength, isFormValid } = this.state;
    if (name === 'jobDescription' || name === 'responsibilities') {
      this.setState({
        remainingTextLength: { ...remainingTextLength, [name]: value ? MAX_LENGTH - value.length : MAX_LENGTH }
      })
    }
    if (value) {
      delete errors[name];
    } else {
      if (!isFormValid) errors[name] = `${name} cannot be left blank`
    }
    this.setState({
      values: { ...values, [name]: value },
      errors: errors
    });
  }

  handleSelect = obj => {
    const { name, value } = obj;
    const { values, errors, isFormValid } = this.state;
    if (value || value === 0) {
      delete errors[name];
    } else {
      if (!isFormValid) errors[name] = `${name} cannot be left blank`
    }
    this.setState({
      values: { ...values, [name]: value },
      errors: errors
    });
  }

  handleMultipleSelect = (obj) => {
    const { name } = obj;
    const value = obj && obj.value && obj.value.map(ob => ob.value).join(',');
    const { values, errors, isFormValid } = this.state;
    if (value) {
      delete errors[name];
    } else {
      if (!isFormValid) errors[name] = `${name} cannot be left blank`
    }
    this.setState({
      values: { ...values, [name]: value },
      errors: errors
    });
  }

  handleCheckbox = e => {
    const { name, checked } = e.target;
    const { values } = this.state;
    this.setState({
      values: { ...values, [name]: checked }
    })
  }

  handleExpectedHoursChange = obj => {
    const { name, value } = obj;
    const { fromHour, fromMin, fromMode, toHour, toMin, toMode, values } = this.state;
    if (value) {
      if (name === 'fromHour' || name === 'fromMin' || name === 'fromMode') {
        const getFromHour = name === 'fromHour' ? value : fromHour;
        const getFromMin = name === 'fromMin' ? value : fromMin;
        const getFromMode = name === 'fromMode' ? value : fromMode;
        const getExpectedWorkinghrsFrom = `${getFromHour}:${getFromMin} ${getFromMode}`
        this.setState({
          [name]: value,
          values: {
            ...values, expectedWorkinghrsFrom: getFromHour && getFromMin && getFromMode ? getExpectedWorkinghrsFrom : null
          }
        });
      }
      else if (name === 'toHour' || name === 'toMin' || name === 'toMode') {
        const getToHour = name === 'toHour' ? value : toHour;
        const getToMin = name === 'toMin' ? value : toMin;
        const getToMode = name === 'toMode' ? value : toMode;
        const expectedWorkinghrsTo = `${getToHour}:${getToMin} ${getToMode}`
        this.setState({
          [name]: value,
          values: {
            ...values, expectedWorkinghrsTo: getToHour && getToMin && getToMode ? expectedWorkinghrsTo : null
          }
        });
      }
    }
  }

  handleValidate = _ => {
    const { values, errors } = this.state;
    const { jobTitle, employmentType, category, primarySkill, experienceReqFrom, experienceReqTo, annualSalaryFrom, annualSalaryTo, noOfPositionsAvailable, country, state, city } = values;
    if (!jobTitle) {
      errors.jobTitle = 'Job Title cannot be left blank'
    } else {
      errors && delete errors.jobTitle;
    }
    if (!employmentType) {
      errors.employmentType = 'Employment Type cannot be left blank'
    } else {
      errors && delete errors.employmentType;
    }
    if (!category) {
      errors.category = 'Category cannot be left blank'
    } else {
      errors && delete errors.category;
    }
    if (!primarySkill) {
      errors.primarySkill = 'Primary SKill cannot be left blank'
    } else {
      errors && delete errors.primarySkill;
    }
    if (experienceReqFrom !== 0 && !experienceReqFrom) {
      errors.experienceReqFrom = 'Experience cannot be left blank'
    } else {
      errors && delete errors.experienceReqFrom;
    }
    if (experienceReqTo !== 0 && !experienceReqTo) {
      errors.experienceReqTo = 'Experience cannot be left blank'
    } else {
      errors && delete errors.experienceReqTo;
    }
    if (!noOfPositionsAvailable) {
      errors.noOfPositionsAvailable = 'No Of Positions cannot be left blank'
    } else {
      errors && delete errors.noOfPositionsAvailable;
    }
    if (annualSalaryFrom !== 0 && !annualSalaryFrom) {
      errors.annualSalaryFrom = 'Salary cannot be left blank'
    } else {
      errors && delete errors.annualSalaryFrom;
    }
    if (annualSalaryTo !== 0 && !annualSalaryTo) {
      errors.annualSalaryTo = 'Salary cannot be left blank'
    } else {
      errors && delete errors.annualSalaryTo;
    }
    if (!country) {
      errors.country = 'Country cannot be left blank'
    } else {
      errors && delete errors.country;
    }
    if (!state) {
      errors.state = 'State cannot be left blank'
    } else {
      errors && delete errors.state;
    }
    if (!city) {
      errors.city = 'City cannot be left blank'
    } else {
      errors && delete errors.city;
    }
    if (annualSalaryFrom > annualSalaryTo) {
      errors.annualSalaryFrom = 'Min salary always be less than to max salary'
    }
    if (experienceReqFrom > experienceReqTo) {
      errors.annualSalaryFrom = 'Min experience always be less than to max experience'
    }
    const isEmploymentTypeFocus = !errors.jobTitle;
    const isCategoryFocus = !errors.jobTitle && !errors.employmentType;
    const isPrimarySkillFocus = !errors.jobTitle && !errors.employmentType && !errors.category;
    const isExperienceReqFromFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill;
    const isExperienceReqToFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill && !errors.experienceReqFrom;
    const isNoOfPositionsAvailableFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill && !errors.experienceReqFrom && !errors.experienceReqTo;
    const isAnnualSalaryFromFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable;
    const isAnnualSalaryToFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom;
    const isCountryFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom && !errors.annualSalaryTo;
    const isStateFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom && !errors.annualSalaryTo && !errors.country;
    const isCityFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkill && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom && !errors.annualSalaryTo && !errors.country && !errors.state;
    if (!jobTitle) this.jobTitle.focus();
    if (!employmentType && isEmploymentTypeFocus) this.employmentType.focus();
    if (!category && isCategoryFocus) this.category.focus();
    if (!primarySkill && isPrimarySkillFocus) this.primarySkill.focus();
    if (experienceReqFrom !== 0 && !experienceReqFrom && isExperienceReqFromFocus) this.experienceReqFrom.focus();
    if (experienceReqTo !== 0 && !experienceReqTo && isExperienceReqToFocus) this.experienceReqTo.focus();
    if (!noOfPositionsAvailable && isNoOfPositionsAvailableFocus) this.noOfPositionsAvailable.focus();
    if (annualSalaryFrom !== 0 && !annualSalaryFrom && isAnnualSalaryFromFocus) this.annualSalaryFrom.focus();
    if (annualSalaryTo !== 0 && !annualSalaryTo && isAnnualSalaryToFocus) this.annualSalaryTo.focus();
    if (!country && isCountryFocus) this.country.focus();
    if (!state && isStateFocus) this.stateElement.focus();
    this.setState({
      errors: errors
    }, () => {
      if ((Object.keys(this.state.errors).length === 0 && this.state.constructor === Object)) {
        this.setState({
          isFormValid: true
        }, () => {
          ApiServicesOrgRecruiter.addJobDetails(values).then(res => {
            console.log(res);
            this.props.history.push('/activeJob');
          });
        });
      } else {
        this.setState({
          isFormValid: false
        });
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { values } = this.state;
    const { errors } = this.state;
    this.handleValidate();
  }

  customStyles = (error) => {
    return !error
      ? {
        control: (provided, state) => ({
          ...provided,
          borderRadius: "0.25rem",
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: "8px 8px",
        }),
      }
      : {
        control: (provided, state) => ({
          ...provided,
          borderColor: "#dc3545",
          borderRadius: "0.25rem",
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: "8px 8px",
        }),
      };
  }


  render() {
    console.log(this.state)
    const { values, errors, categories, remainingTextLength } = this.state;
    const { jobTitle, secondarySkills, noOfPositionsAvailable, currency, visa, mustHavePasport, jobDescription, responsibilities } = values;
    const employmentTypes = Array.from(Array('PART TIME', 'FULL TIME', 'INTERNSHIP')).map(el => ({ value: el, label: el }));
    const expRequired = Array.from(Array(31).keys()).map(el => ({ value: el, label: el }))
    const annualSalaryInLakh = Array.from(Array(501).keys()).map(el => ({ value: el, label: el }));
    const annualSalaryInThousands = Array.from(Array(101).keys()).map(el => ({ value: el, label: el }));
    const hours = Array.from(Array(12).keys()).map(el => ({ value: ('0' + el).slice(-2), label: ('0' + el).slice(-2) }));
    const mins = Array.from(Array(60).keys()).map(el => ({ value: ('0' + el).slice(-2), label: ('0' + el).slice(-2) }));
    const modes = Array.from(Array('AM', 'PM')).map(el => ({ value: el, label: el }));

    return (
      <div>
        <LeftNavProvider></LeftNavProvider>
        <div className="maincontent">
          <HeaderAll></HeaderAll>
          <div className="container-fluid">
            <div className=" main">
              {/* top title */}
              <div className="row">
                <div className="col-md-12 ml-10 mt-4 mb-4">
                  <div class="active_job_heading active_padding">Active Jobs > Create Job</div>
                </div>
              </div>
            </div>
            <form>
              <div className="active_padding">
                <div id="main" className="col mb-4 mt-4" >
                  <div className="row border-bottom-thin mb-4 mt-4">
                    <div className="col-md-12 pt-4 pb-4 pl-3 pr-3">
                      <h5>Basic Information</h5>
                      <div class="row col">
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Job Title</label></div>
                          <input
                            ref={inputEl => (this.jobTitle = inputEl)}
                            class={`form-control ${errors && errors.jobTitle ? 'is-invalid' : ''}`}
                            type="text"
                            name="jobTitle"
                            value={jobTitle}
                            onChange={this.handleChange}
                            placeholder='Enter Job Title'
                          />
                          <div class="error-message">{errors && errors.jobTitle}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Employment Type</label></div>
                          <Select
                            ref={inputEl => (this.employmentType = inputEl)}
                            styles={this.customStyles(errors && errors.employmentType)}
                            name="employmentType"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select Employment type"
                            onChange={obj => this.handleSelect({ name: 'employmentType', value: obj.value })}
                          />
                          <div class="error-message">{errors && errors.employmentType}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Category</label></div>
                          <Select
                            ref={inputEl => (this.category = inputEl)}
                            styles={this.customStyles(errors && errors.category)}
                            name="category"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select Category"
                            onChange={obj => this.handleSelect({ name: 'category', value: obj.value })}
                          />
                          <div class="error-message">{errors && errors.category}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="active_padding">
                <div id="main" className="col mb-4 mt-4" >
                  <div className="row border-bottom-thin mb-4 mt-4">
                    <div className="col-md-12 pt-4 pb-4 pl-3 pr-3">
                      <h5>Skills and Experience</h5>
                      <div class="row col">
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Primary Skill</label></div>
                          <Select
                            ref={inputEl => (this.primarySkill = inputEl)}
                            styles={this.customStyles(errors && errors.primarySkill)}
                            name="primarySkill"
                            isMulti={true}
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select Primary Skill"
                            onChange={value => this.handleMultipleSelect({ name: 'primarySkill', value: value })}
                          />
                          <div class="error-message" >{errors && errors.primarySkill}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Secondary Skill</label></div>
                          <input
                            class="form-control"
                            type="text"
                            name="secondarySkills"
                            value={secondarySkills}
                            onChange={this.handleChange}
                            placeholder='Enter Secondary Skill'
                          />
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Experience Required (In Years)</label></div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div class="col-md-6 p-0 pr-4">
                              <Select
                                ref={inputEl => (this.experienceReqFrom = inputEl)}
                                styles={this.customStyles(errors && errors.experienceReqFrom)}
                                name="experienceReqFrom"
                                className="selectone"
                                options={expRequired}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'experienceReqFrom', value: obj.value })}
                              />
                            </div>
                            <span>To</span>
                            <div class="col-md-6 pl-4">
                              <Select
                                ref={inputEl => (this.experienceReqTo = inputEl)}
                                styles={this.customStyles(errors && errors.experienceReqTo)}
                                name="experienceReqTo"
                                className="selectone"
                                options={expRequired}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'experienceReqTo', value: obj.value })}
                              />
                            </div>
                          </div>
                          <div class="error-message" >{errors && (errors.experienceReqFrom || errors.experienceReqTo)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="active_padding">
                <div id="main" className="col mb-4 mt-4" >
                  <div className="row border-bottom-thin mb-4 mt-4">
                    <div className="col-md-12 pt-4 pb-4 pl-3 pr-3">
                      <h5>Others</h5>
                      <div class="row col">
                        <div className="col-md-12 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Expected Working Hours</label></div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div class="col-md-5 pt-3 pl-0 pr-0">
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Select
                                  name="fromHour"
                                  className="selectone w-100"
                                  options={hours}
                                  placeholder="Select"
                                  onChange={obj => this.handleExpectedHoursChange({ name: 'fromHour', value: obj.value })}
                                />
                                <Select
                                  name="fromMin"
                                  className="selectone w-100 ml-5 mr-5"
                                  options={mins}
                                  placeholder="Select"
                                  onChange={obj => this.handleExpectedHoursChange({ name: 'fromMin', value: obj.value })}
                                />
                                <Select
                                  name="fromMode"
                                  className="selectone w-100"
                                  options={modes}
                                  placeholder="Select"
                                  onChange={obj => this.handleExpectedHoursChange({ name: 'fromMode', value: obj.value })}
                                />
                              </div>
                            </div>
                            <div class="col-md-2 text-center"><span>To</span></div>
                            <div class="col-md-5 pt-3 pl-0 pr-0">
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Select
                                  name="toHour"
                                  className="selectone w-100"
                                  options={hours}
                                  placeholder="Select"
                                  onChange={obj => this.handleExpectedHoursChange({ name: 'toHour', value: obj.value })}
                                />
                                <Select
                                  name="toMin"
                                  className="selectone w-100 ml-5 mr-5"
                                  options={mins}
                                  placeholder="Select"
                                  onChange={obj => this.handleExpectedHoursChange({ name: 'toMin', value: obj.value })}
                                />
                                <Select
                                  name="toMode"
                                  className="selectone w-100"
                                  options={modes}
                                  placeholder="Select"
                                  onChange={obj => this.handleExpectedHoursChange({ name: 'toMode', value: obj.value })}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div class="recruiterForm__noOfPositionsAvailable"><label>Number of Positions Available</label></div>
                          <input
                            ref={inputEl => (this.noOfPositionsAvailable = inputEl)}
                            class={`form-control ${errors && errors.noOfPositionsAvailable ? 'is-invalid' : ''}`}
                            type="number"
                            min={0}
                            name="noOfPositionsAvailable"
                            value={noOfPositionsAvailable}
                            onChange={this.handleChange}
                            placeholder='Number of Positions Available'
                          />
                          <div class="invalid-feedback" >{errors && errors.noOfPositionsAvailable}</div>
                          <div class="pt-3"><label>Visa</label></div>
                          <input
                            class="form-control"
                            type="text"
                            name="visa"
                            value={visa}
                            onChange={this.handleChange}
                            placeholder='Visa (Optional)'
                          />
                          <div class="pt-3">
                            <input
                              type="checkbox"
                              name="mustHavePasport"
                              onChange={this.handleCheckbox}
                              value={mustHavePasport}
                            />
                            <label>Must have passport</label>
                          </div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Annual Salary</label></div>
                          <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="currency" id="exampleRadios1" value={CURRENCY_TYPE_ENUM.INR} checked={currency === CURRENCY_TYPE_ENUM.INR} onChange={this.handleChange} />
                            <label class="form-check-label ml-2" for="exampleRadios1">INR</label>
                          </div>
                          <div class="form-check form-check-inline ml-4">
                            <input class="form-check-input" type="radio" name="currency" id="exampleRadios2" value={CURRENCY_TYPE_ENUM.USD} checked={currency === CURRENCY_TYPE_ENUM.USD} onChange={this.handleChange} />
                            <label class="form-check-label ml-2" for="exampleRadios2">USD</label>
                          </div>
                          <div class="pt-2" style={{ display: 'flex', alignItems: 'center' }}>
                            <div class="col-md-6 p-0 pr-4">
                              <Select
                                ref={inputEl => (this.annualSalaryFrom = inputEl)}
                                styles={this.customStyles(errors && errors.annualSalaryFrom)}
                                name="annualSalaryFrom"
                                className="selectone"
                                options={currency === CURRENCY_TYPE_ENUM.INR ? annualSalaryInLakh : annualSalaryInThousands}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'annualSalaryFrom', value: obj.value })}
                              />
                            </div>
                            <span>To</span>
                            <div class="col-md-6 pl-4">
                              <Select
                                ref={inputEl => (this.annualSalaryTo = inputEl)}
                                styles={this.customStyles(errors && errors.annualSalaryTo)}
                                name="annualSalaryTo"
                                className="selectone"
                                options={currency === CURRENCY_TYPE_ENUM.INR ? annualSalaryInLakh : annualSalaryInThousands}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'annualSalaryTo', value: obj.value })}
                              />
                            </div>
                          </div>
                          <div class="pt-0" style={{ display: 'flex', alignItems: 'center' }}>
                            <div class="col-md-6 p-0 pr-4">
                              <div style={{ display: 'flex' }}>
                                <div class="error-message" >{errors && (errors.annualSalaryFrom || errors.annualSalaryTo)}</div>
                                <span class="pull-right pt-2">{currency === CURRENCY_TYPE_ENUM.INR ? 'Lakh' : 'Thousands'}</span>
                              </div>
                            </div>
                            <div class="col-md-6 p-0 pl-4">
                              <span class="pull-right pt-2">{currency === CURRENCY_TYPE_ENUM.INR ? 'Lakh' : 'Thousands'}</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="active_padding">
                <div id="main" className="col mb-4 mt-4" >
                  <div className="row border-bottom-thin mb-4 mt-4">
                    <div className="col-md-12 pt-4 pb-4 pl-3 pr-3">
                      <h5>Hiring Location</h5>
                      <div class="row col">
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Country</label></div>
                          <Select
                            ref={inputEl => (this.country = inputEl)}
                            styles={this.customStyles(errors && errors.country)}
                            name="country"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select Country"
                            onChange={obj => this.handleSelect({ name: 'country', value: obj.value })}
                          />
                          <div class="error-message" >{errors && errors.country}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>State</label></div>
                          <Select
                            ref={inputEl => (this.stateElement = inputEl)}
                            styles={this.customStyles(errors && errors.state)}
                            name="state"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select State"
                            onChange={obj => this.handleSelect({ name: 'state', value: obj.value })}
                          />
                          <div class="error-message" >{errors && errors.state}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>City</label></div>
                          <Select
                            ref={inputEl => (this.city = inputEl)}
                            styles={this.customStyles(errors && errors.city)}
                            name="city"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select City"
                            onChange={obj => this.handleSelect({ name: 'city', value: obj.value })}
                          />
                          <div class="error-message" >{errors && errors.city}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="active_padding">
                <div id="main" className="col mb-4 mt-4" >
                  <div className="row border-bottom-thin mb-4 mt-4">
                    <div className="col-md-12 pt-4 pb-4 pl-3 pr-3">
                      <h5>Job Description</h5>
                      <div className="col-md-12 pt-3 pl-0 recruiterForm__rightSpaceForTextArea">
                        <textarea
                          class="form-control mb-1"
                          rows="8"
                          name="jobDescription"
                          value={jobDescription}
                          maxLength={MAX_LENGTH}
                          onChange={this.handleChange}
                        >
                        </textarea>
                        <span className='float-right'>{remainingTextLength.jobDescription} Character(s) Left</span>
                      </div>
                    </div>
                    <div className="col-md-12 pt-4 pb-4 pl-3 recruiterForm__rightSpaceForTextArea">
                      <h5>Responsibilities</h5>
                      <textarea
                        class="form-control mb-1"
                        rows="8"
                        name="responsibilities"
                        value={responsibilities}
                        maxLength={MAX_LENGTH}
                        onChange={this.handleChange}
                      >
                      </textarea>
                      <span className='float-right'>{remainingTextLength.responsibilities} Character(s) Left</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right2">
                <Link to="/activeJob" class="btn btn-light float-right   border border-primary">
                  Cancel
                </Link>
                <button
                  className="btn btn-primary float-right right3 "
                  onClick={this.handleSubmit}
                >
                  Post
                </button>
              </div>
            </form>
            <Footer></Footer>
          </div>
        </div>
      </div>
    );
  }
}