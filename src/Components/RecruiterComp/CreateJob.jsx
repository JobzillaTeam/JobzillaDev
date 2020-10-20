import React, { Component } from "react";
import Select from "react-select";
import HeaderAll from "../CommonComp/HeaderAll";
import Footer from "../CommonComp/Footer";
import LeftNavProvider from "../CommonComp/LeftNavProvider";
import ApiServicesOrgRecruiter from "../../Services/ApiServicesOrgRecruiter";
import { MAX_LENGTH } from "../../Utils/AppConst";
import { CURRENCY_TYPE_ENUM } from '../../Utils/AppConst';
import { Link } from 'react-router-dom';

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
      isFormValid: false
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
    })
  }

  handleChange = e => {
    const { name, value } = e.target;
    const { values, remainingTextLength } = this.state;
    if (name === 'jobDescription' || name === 'responsibilities') {
      this.setState({
        remainingTextLength: { ...remainingTextLength, [name]: value ? MAX_LENGTH - value.length : MAX_LENGTH }
      })
    }
    this.setState({
      values: { ...values, [name]: value }
    });
  }

  handleSelect = obj => {
    const { name, value } = obj;
    const { values } = this.state;
    this.setState({
      values: { ...values, [name]: value }
    });
  }

  handleMultipleSelect = (obj) => {
    const { name } = obj;
    const value = obj && obj.value && obj.value.map(ob => ob.value).join(',');
    const { values } = this.state;
    this.setState({
      values: { ...values, [name]: value }
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
          values: {...values, expectedWorkinghrsFrom: getFromHour && getFromMin && getFromMode ? getExpectedWorkinghrsFrom : null
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
          values: {...values, expectedWorkinghrsTo: getToHour && getToMin && getToMode ? expectedWorkinghrsTo : null
        }});
      }
    }
  }

  handleValidate = _ => {
    const {values, errors} = this.state;
    const { jobTitle, employmentType, category, primarySkill } = values;
    !jobTitle ? errors.jobTitle = 'Job Title cannot be left blank' : delete errors.jobTitle;
    !employmentType ? errors.employmentType = 'Employment Type cannot be left blank' : delete errors.employmentType;
    !category ? errors.category = 'Category cannot be left blank' : delete errors.employmentType;
    !primarySkill ? errors.primarySkill = 'Primary SKill cannot be left blank' : delete errors.primarySkill;
    if ((Object.keys(errors).length === 0 && errors.constructor === Object)) {
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
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const {values} = this.state;
    const { errors } = this.state;
    this.handleValidate();
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
                            class={`form-control ${errors && errors.jobTitle ? 'is-invalid' : ''}`}
                            type="text"
                            name="jobTitle"
                            value={jobTitle}
                            onChange={this.handleChange}
                            placeholder='Enter Job Title'
                          />
                          <div class="invalid-feedback">{errors && errors.jobTitle}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Employment Type</label></div>
                          <Select
                            name="employmentType"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select Employment type"
                            onChange={obj => this.handleSelect({ name: 'employmentType', value: obj.value })}
                          />
                          <div class="invalid-feedback" >{errors && errors.employmentType}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Category</label></div>
                          <Select
                            name="category"
                            className="selectone"
                            options={categories}
                            placeholder="Select Category"
                            onChange={obj => this.handleSelect({ name: 'category', value: obj.value })}
                          />
                          <div class="invalid-feedback" >{errors && errors.category}</div>
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
                            name="primarySkills"
                            isMulti={true}
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select Primary Skill"
                            onChange={value => this.handleMultipleSelect({ name: 'primarySkills', value: value })}
                          />
                          <div class="invalid-feedback" >{errors && errors.employmentType}</div>
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
                                name="experienceReqFrom"
                                className="selectone"
                                options={expRequired}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'experienceReqFrom', value: obj.value })}
                              />
                              <div class="invalid-feedback" >{errors && errors.experienceReqFrom}</div>
                            </div>
                            <span>To</span>
                            <div class="col-md-6 pl-4">
                              <Select
                                name="experienceReqTo"
                                className="selectone"
                                options={expRequired}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'experienceReqTo', value: obj.value })}
                              />
                              <div class="invalid-feedback" >{errors && errors.experienceReqTo}</div>
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
                          <div><label>Number of Positions Available</label></div>
                          <input
                            class="form-control"
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
                                name="annualSalaryFrom"
                                className="selectone"
                                options={currency === CURRENCY_TYPE_ENUM.INR ? annualSalaryInLakh : annualSalaryInThousands}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'annualSalaryFrom', value: obj.value })}
                              />
                              <span class="pull-right pt-2">{currency === CURRENCY_TYPE_ENUM.INR ? 'Lakh' : 'Thousands'}</span>
                              <div class="invalid-feedback" >{errors && errors.annualSalaryFrom}</div>
                            </div>
                            <span>To</span>
                            <div class="col-md-6 pl-4">
                              <Select
                                name="annualSalaryTo"
                                className="selectone"
                                options={currency === CURRENCY_TYPE_ENUM.INR ? annualSalaryInLakh : annualSalaryInThousands}
                                placeholder="Select"
                                onChange={obj => this.handleSelect({ name: 'annualSalaryTo', value: obj.value })}
                              />
                              <span class="pull-right pt-2">{currency === CURRENCY_TYPE_ENUM.INR ? 'Lakh' : 'Thousands'}</span>
                              <div class="invalid-feedback" >{errors && errors.annualSalaryTo}</div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Visa</label></div>
                          <input
                            class="form-control"
                            type="text"
                            name="visa"
                            value={visa}
                            onChange={this.handleChange}
                            placeholder='Visa (Optional)'
                          />
                        </div>
                        <div className="col-md-12 pt-3 pl-0 recruiterForm__rightSpace">
                          <input
                            type="checkbox"
                            name="mustHavePasport"
                            onChange={this.handleCheckbox}
                            value={mustHavePasport}
                          />
                          <label>Must have passport</label>
                        </div> */}
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
                            name="country"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select Country"
                            onChange={obj => this.handleSelect({ name: 'country', value: obj.value })}
                          />
                          <div class="invalid-feedback" >{errors && errors.country}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>State</label></div>
                          <Select
                            name="state"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select State"
                            onChange={obj => this.handleSelect({ name: 'state', value: obj.value })}
                          />
                          <div class="invalid-feedback" >{errors && errors.country}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>City</label></div>
                          <Select
                            name="city"
                            className="selectone"
                            options={employmentTypes}
                            placeholder="Select City"
                            onChange={obj => this.handleSelect({ name: 'city', value: obj.value })}
                          />
                          <div class="invalid-feedback" >{errors && errors.city}</div>
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
                          class={`form-control ${errors && errors.jobDescription ? 'is-invalid' : ''} mb-1`}
                          rows="8"
                          name="jobDescription"
                          value={jobDescription}
                          maxLength={MAX_LENGTH}
                          onChange={this.handleChange}
                        >
                        </textarea>
           class="invalid-feedback"              <span className='float-right'>{remainingTextLength.jobDescription} Character(s) Left</span>
                      </div>
                    </div>
                    <div className="col-md-12 pt-4 pb-4 pl-3 recruiterForm__rightSpaceForTextArea">
                      <h5>Responsibilities</h5>
                      <textarea
                        class={`form-control ${errors && errors.responsibilities ? 'is-invalid' : ''} mb-1`}
                        rows="8"
                        name="responsibilities"
                        value={responsibilities}
                        maxLength={MAX_LENGTH}
                        onChange={this.handleChange}
                      >
                      </textarea>
         class="invalid-feedback"              <span className='float-right'>{remainingTextLength.responsibilities} Character(s) Left</span>
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