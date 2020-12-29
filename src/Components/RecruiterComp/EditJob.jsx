import React from "react";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import HeaderAll from "../CommonComp/HeaderAll";
import Footer from "../CommonComp/Footer";
import LeftNavProvider from "../CommonComp/LeftNavProvider";
import ApiServicesOrgRecruiter from "../../Services/ApiServicesOrgRecruiter";
import { MAX_LENGTH } from "../../Utils/AppConst";
import { CURRENCY_TYPE_ENUM } from '../../Utils/AppConst';
import { Link } from 'react-router-dom';
import ApiServicesOrgCandidate from "../../Services/ApiServicesOrgCandidate";
import ApiServicesOrg from "../../Services/ApiServicesOrg"
import RenderLoader from "../CommonComp/Loader";

export default class EditJob extends React.Component {
  constructor() {
    super();
    this.state = {
      values: { jobTitle: '', employmentType: '', category: '', primarySkills: '', secondarySkills: '', experienceReqFrom: '', experienceReqTo: '', annualSalaryFrom: '', annualSalaryTo: '', shift: '', jobCountry: '', jobState: '', jobCity: '', noOfPositionsAvailable: 1, currency: CURRENCY_TYPE_ENUM.INR, visa: '', mustHavePasport: '', jobDescription: '', responsibilities: '' },
      errors: {},
      remainingTextLength: {
        jobDescription: MAX_LENGTH,
        responsibilities: MAX_LENGTH
      },
      categories: [],
      primarySkillsList: [],
      states: [],
      cities: [],
      isFormValid: true,
      EditJobDetails: [],
      isLoading: true
    }
    this.ApiServicesOrg = new ApiServicesOrg();
  }

  componentDidMount() {
    ApiServicesOrgRecruiter.getListOfCategories().then((response) => {
      let categoriesList = [];
      if (response) {
        categoriesList = response.data.responseObject.map(category => ({ value: category && category.category, label: category && category.category }));
      }
      this.setState({
        categories: categoriesList
      })
    });
    ApiServicesOrgCandidate.getListOfSkills().then((response) => {
      let skillsList = [];
      if (response) {
        skillsList = response.data.responseObject.map(skill => ({ value: skill.skills, label: skill.skills }));
      }
      this.setState({ primarySkillsList: skillsList });
    });
    ApiServicesOrgCandidate.getListOfStates().then((response) => {
      let statesList = [];
      if (response) {
        statesList = response.data.responseObject.map(state => ({ value: state.stateName, label: state.stateName, stateCode: state.stateCode }));
      }
      this.setState({ states: statesList });
    });
    const jobID = this.props.match.params.jobID;
    this.ApiServicesOrg.getAllJobDetails(jobID)
      .then(Response => {
        if (Response && Response.data && Response.data.responseObject) {
          const responseObjectData = Response.data.responseObject;
          this.setState({
            values: {
              jobTitle: responseObjectData.jobTitle,
              employmentType: responseObjectData.employmentType,
              category: responseObjectData.category,
              primarySkills: responseObjectData.primarySkills,
              secondarySkills: responseObjectData.secondarySkills,
              experienceReqFrom: responseObjectData.experienceReqFrom,
              experienceReqTo: responseObjectData.experienceReqTo,
              annualSalaryFrom: responseObjectData.annualSalaryFrom,
              annualSalaryTo: responseObjectData.annualSalaryTo,
              jobCountry: responseObjectData.jobCountry,
              jobState: responseObjectData.jobState,
              jobCity: responseObjectData.jobCity,
              noOfPositionsAvailable: responseObjectData.noOfPositionsAvailable,
              currency: responseObjectData.currency, visa: responseObjectData.visa, mustHavePasport: responseObjectData.mustHavePasport, jobDescription: responseObjectData.jobDescription, responsibilities: responseObjectData.responsibilities,
              shift: responseObjectData.shift
            }
          }, () => {
            let selectedState = this.state.states && this.state.states.filter(st => st.value === this.state.values.jobState)
            selectedState = selectedState ? selectedState[0] : null;
            let stateCodeValue = selectedState && selectedState.stateCode;
            if (stateCodeValue) {

              ApiServicesOrgCandidate.getListOfCity(stateCodeValue).then((response) => {
                let citiesList = [];
                if (response) {
                  citiesList = response.data.responseObject.map(city => ({ value: city.city_name, label: city.city_name }));
                }
                this.setState({ cities: citiesList });
                this.setState({
                  isLoading: false
                })
              }).catch(err => {
                this.setState({
                  isLoading: false
                })
              });
            } else {
              this.setState({
                isLoading: false
              })
            }

            
          })
        }
        console.log(Response)
        this.setState({
          EditJobDetails: Response.data.responseObject
        });
        console.log(this.state.EditJobDetails)
      })
    console.log(jobID)

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
      if (name === 'noOfPositionsAvailable' && parseInt(value) === 0) {
        errors[name] = this.getErrorMsg(name)
      } else {
        delete errors[name];
      }
    } else {
      if (!isFormValid) errors[name] = this.getErrorMsg(name)
    }
    this.setState({
      values: { ...values, [name]: value },
      errors: errors
    });
  }

  getErrorMsg = (name) => {
    switch (name) {
      case 'jobTitle': {
        return 'Job Title cannot be left blank'
      }
      case 'employmentType': {
        return 'Employment Type cannot be left blank'
      }
      case 'category': {
        return 'Category cannot be left blank'
      }
      case 'primarySkills': {
        return 'Primary SKill cannot be left blank'
      }
      case 'experienceReqFrom': {
        return 'Experience cannot be left blank'
      }
      case 'experienceReqTo': {
        return 'Experience cannot be left blank'
      }
      case 'annualSalaryFrom': {
        return 'Salary cannot be left blank'
      }
      case 'annualSalaryTo': {
        return 'Salary cannot be left blank'
      }
      case 'noOfPositionsAvailable': {
        return 'No Of Positions cannot be left blank and always be greater than zero'
      }
      case 'jobCountry': {
        return 'Country cannot be left blank'
      }
      case 'jobState': {
        return 'State cannot be left blank'
      }
      case 'jobCity': {
        return 'City cannot be left blank'
      }
      default:
    }
  }

  handleSelect = obj => {
    const { name, value, stateCode } = obj;
    const { values, errors, isFormValid } = this.state;
    if (value || value === 0) {
      if (!isFormValid) {
        if (['annualSalaryFrom', 'annualSalaryTo', 'experienceReqFrom', 'experienceReqTo'].includes(name)) {
          if (['annualSalaryFrom', 'annualSalaryTo'].includes(name)) {
            const annualSalaryFrom = name === 'annualSalaryFrom' ? value : this.annualSalaryFrom;
            const annualSalaryTo = name === 'annualSalaryTo' ? value : values.annualSalaryTo;
            if (annualSalaryFrom > annualSalaryTo) {
              errors[name] = 'Min salary always be less than to max salary'
            } else {
              delete errors.annualSalaryFrom;
              delete errors.annualSalaryTo;
            }
          } else {
            const experienceReqFrom = name === 'experienceReqFrom' ? value : values.experienceReqFrom;
            const experienceReqTo = name === 'experienceReqTo' ? value : values.experienceReqTo;
            if (experienceReqFrom > experienceReqTo) {
              errors[name] = 'Min experience always be less than to max experience'
            } else {
              delete errors.experienceReqFrom;
              delete errors.experienceReqTo;
            }
          }
        }
        else {
          delete errors[name];
        }
      }
    } else {
      if (!isFormValid) errors[name] = this.getErrorMsg(name)
    }
    this.setState({
      values: { ...values, [name]: value },
      errors: errors
    }, () => {
      if (name === 'jobState') {
        ApiServicesOrgCandidate.getListOfCity(stateCode).then((response) => {
          let citiesList = [];
          if (response) {
            citiesList = response.data.responseObject.map(city => ({ value: city.city_name, label: city.city_name }));
          }
          this.setState({ cities: citiesList });
        });
      }
    });
  }

  handleMultipleSelect = (obj) => {
    const { name } = obj;
    const value = obj && obj.value && obj.value.map(ob => ob.value).join(',');
    const { values, errors, isFormValid } = this.state;
    if (value) {
      delete errors[name];
    } else {
      if (!isFormValid) errors[name] = this.getErrorMsg(name)
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

  handleValidate = _ => {
    const { values, errors } = this.state;
    const { jobTitle, employmentType, category, primarySkills, experienceReqFrom, experienceReqTo, annualSalaryFrom, annualSalaryTo, noOfPositionsAvailable, jobCountry, jobState, jobCity } = values;
    if (!jobTitle) {
      errors.jobTitle = this.getErrorMsg('jobTitle')
    } else {
      errors && delete errors.jobTitle;
    }
    if (!employmentType) {
      errors.employmentType = this.getErrorMsg('employmentType')
    } else {
      errors && delete errors.employmentType;
    }
    if (!category) {
      errors.category = this.getErrorMsg('category')
    } else {
      errors && delete errors.category;
    }
    if (!primarySkills) {
      errors.primarySkills = this.getErrorMsg('primarySkills')
    } else {
      errors && delete errors.primarySkills;
    }
    if (experienceReqFrom !== 0 && !experienceReqFrom) {
      errors.experienceReqFrom = this.getErrorMsg('experienceReqFrom')
    } else {
      errors && delete errors.experienceReqFrom;
    }
    if (experienceReqTo !== 0 && !experienceReqTo) {
      errors.experienceReqTo = this.getErrorMsg('experienceReqTo')
    } else {
      errors && delete errors.experienceReqTo;
    }
    if (!noOfPositionsAvailable || parseInt(noOfPositionsAvailable) === 0) {
      errors.noOfPositionsAvailable = this.getErrorMsg('noOfPositionsAvailable')
    } else {
      errors && delete errors.noOfPositionsAvailable;
    }
    if (annualSalaryFrom !== 0 && !annualSalaryFrom) {
      errors.annualSalaryFrom = this.getErrorMsg('annualSalaryFrom')
    } else {
      errors && delete errors.annualSalaryFrom;
    }
    if (annualSalaryTo !== 0 && !annualSalaryTo) {
      errors.annualSalaryTo = this.getErrorMsg('annualSalaryTo')
    } else {
      errors && delete errors.annualSalaryTo;
    }
    if (!jobCountry) {
      errors.jobCountry = this.getErrorMsg('jobCountry')
    } else {
      errors && delete errors.jobCountry;
    }
    if (!jobState) {
      errors.jobState = this.getErrorMsg('jobState')
    } else {
      errors && delete errors.jobState;
    }
    if (!jobCity) {
      errors.jobCity = this.getErrorMsg('jobCity')
    } else {
      errors && delete errors.jobCity;
    }
    if (annualSalaryFrom > annualSalaryTo) {
      errors.annualSalaryFrom = 'Min salary always be less than to max salary'
    }
    if (experienceReqFrom > experienceReqTo) {
      errors.experienceReqFrom = 'Min experience always be less than to max experience'
    }
    const isEmploymentTypeFocus = !errors.jobTitle;
    const isCategoryFocus = !errors.jobTitle && !errors.employmentType;
    const isPrimarySkillFocus = !errors.jobTitle && !errors.employmentType && !errors.category;
    const isExperienceReqFromFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills;
    const isExperienceReqToFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills && !errors.experienceReqFrom;
    const isNoOfPositionsAvailableFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills && !errors.experienceReqFrom && !errors.experienceReqTo;
    const isAnnualSalaryFromFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable;
    const isAnnualSalaryToFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom;
    const isCountryFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom && !errors.annualSalaryTo;
    const isStateFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom && !errors.annualSalaryTo && !errors.jobCountry;
    const isCityFocus = !errors.jobTitle && !errors.employmentType && !errors.category && !errors.primarySkills && !errors.experienceReqFrom && !errors.experienceReqTo && !errors.noOfPositionsAvailable && !errors.annualSalaryFrom && !errors.annualSalaryTo && !errors.jobCountry && !errors.jobState;
    if (!jobTitle) this.jobTitle.focus();
    if (!employmentType && isEmploymentTypeFocus) this.employmentType.focus();
    if (!category && isCategoryFocus) this.category.focus();
    if (!primarySkills && isPrimarySkillFocus) this.primarySkills.focus();
    if (experienceReqFrom !== 0 && !experienceReqFrom && isExperienceReqFromFocus) this.experienceReqFrom.focus();
    if (experienceReqTo !== 0 && !experienceReqTo && isExperienceReqToFocus) this.experienceReqTo.focus();
    if ((!noOfPositionsAvailable || parseInt(noOfPositionsAvailable) === 0) && isNoOfPositionsAvailableFocus) this.noOfPositionsAvailable.focus();
    if (annualSalaryFrom !== 0 && !annualSalaryFrom && isAnnualSalaryFromFocus) this.annualSalaryFrom.focus();
    if (annualSalaryTo !== 0 && !annualSalaryTo && isAnnualSalaryToFocus) this.annualSalaryTo.focus();
    if (!jobCountry && isCountryFocus) this.jobCountry.focus();
    if (!jobState && isStateFocus) this.jobState.focus();
    if (!jobCity && isCityFocus) this.jobCity.focus();
    this.setState({
      errors: errors
    }, () => {
      if ((Object.keys(this.state.errors).length === 0 && this.state.constructor === Object)) {
        this.setState({
          isFormValid: true
        }, () => {
          const jobId = this.props.match.params.jobID;
          ApiServicesOrgRecruiter.editJobDetails(values, jobId).then(res => {
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

  getDefaultValueForSelect = (options, name) => {
    const defaultSelected = options.filter(opt => opt.value === this.state.values[name])
    return defaultSelected ? defaultSelected[0] : undefined;
  }
  getDefaultValueForMultiSelect = (options, name) => {
    let defaultSelectedValues = this.state.values[name] ? this.state.values[name].split(',') : []
    const defaultSelected = options.filter(opt => defaultSelectedValues.includes(opt.value))
    return defaultSelected ? defaultSelected : [];
  }


  render() {
    const { values, errors, categories, remainingTextLength, primarySkillsList, states, cities } = this.state;
    const { jobTitle, secondarySkills, noOfPositionsAvailable, currency, visa, mustHavePasport, jobDescription, responsibilities } = values;
    const employmentTypes = Array.from(Array('PART TIME', 'FULL TIME', 'INTERNSHIP', 'CONTRACTUAL')).map(el => ({ value: el, label: el }));
    const shiftTypes = Array.from(Array('Morning Shift', 'Afternoon Shift', 'Night Shift', 'General Shift')).map(el => ({ value: el, label: el }));
    const expRequired = Array.from(Array(31).keys()).map(el => ({ value: el, label: el }))
    const annualSalaryInLakh = Array.from(Array(501).keys()).map(el => ({ value: el, label: el }));
    const annualSalaryInThousands = Array.from(Array(101).keys()).map(el => ({ value: el, label: el }));
    console.log(values)
    const { jobDetails } = this.state;
    const perviousLink = '/activeJob';
    const perviousLinkText = 'Active Jobs';
    const nextLink = '/activeJob';
    const nextLinkText = 'Active Job Details';

    return (
      <div>
        <LeftNavProvider></LeftNavProvider>
        <div className="maincontent">
          <HeaderAll></HeaderAll>
          <div className="container-fluid">
            <div className=" main">
              {/* top title */}
              <div className="row">
                {/* <div className="col-md-12 ml-10 mt-4 mb-4">
                  <div class="active_job_heading active_padding">Active Jobs > Create Job</div>
                  <div class="active_job_heading active_padding">Edit Job</div>
                </div> */}
                <div class="col-md-12 py-4">
                  <div class=" active_job_heading active_padding"><Link className="link" to={perviousLink}>{perviousLinkText}</Link> > <Link className="link" to={nextLink}>{nextLinkText}</Link> > Edit Job</div>
                </div>
              </div>
            </div>
            {!this.state.isLoading ? <form>
              <div className="active_padding">
                <div id="main" className="col mb-4 mt-4" >
                  <div className="row border-bottom-thin mb-4 mt-4">
                    <div className="col-md-12 pt-4 pb-4 pl-4 pr-3">
                      <h5 class="recruiterForm__sectionHeading"> Basic Information *</h5>
                      <div class="row col">
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Job Title</label></div>
                          <input
                            ref={inputEl => (this.jobTitle = inputEl)}
                            class={`form-control ${errors && errors.jobTitle ? 'is-invalid' : ''}`}
                            type="text"
                            name="jobTitle"
                            value={this.state.values.jobTitle}
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
                            defaultValue={this.getDefaultValueForSelect(employmentTypes, 'employmentType')}
                            // defaultValue={this.state.EditJobDetails.employmentType}
                            // value={this.state.EditJobDetails.employmentType}
                            onChange={obj => this.handleSelect({ name: 'employmentType', value: obj.value })}
                          />
                          <div class="error-message">{errors && errors.employmentType}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Category</label></div>
                          <CreatableSelect
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            ref={inputEl => (this.category = inputEl)}
                            styles={this.customStyles(errors && errors.category)}
                            name="category"
                            className="selectone"
                            options={categories}
                            placeholder="Select Category"
                            defaultValue={this.getDefaultValueForSelect(categories, 'category')}

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
                    <div className="col-md-12 pt-4 pb-4 pl-4 pr-3">
                      <h5 class="recruiterForm__sectionHeading">Skills and Experience</h5>
                      <div class="row col">
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Primary Skill *</label></div>
                          <CreatableSelect
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            ref={inputEl => (this.primarySkills = inputEl)}
                            styles={this.customStyles(errors && errors.primarySkills)}
                            name="primarySkills"
                            isMulti={true}
                            className="selectone"
                            options={primarySkillsList}
                            placeholder="Select Primary Skill"
                            defaultValue={this.getDefaultValueForMultiSelect(primarySkillsList, 'primarySkills')}
                            // value={ this.state.EditJobDetails.primarySkills}
                            onChange={value => this.handleMultipleSelect({ name: 'primarySkills', value: value })}
                          />
                          <div class="error-message" >{errors && errors.primarySkills}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Secondary Skill</label></div>
                          <input
                            class="form-control"
                            type="text"
                            name="secondarySkills"
                            value={this.state.values.secondarySkills}
                            onChange={this.handleChange}
                            placeholder='Enter Secondary Skill'
                          />
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Experience Required (In Years) *</label></div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div class="col-md-6 p-0 pr-4">
                              <Select
                                ref={inputEl => (this.experienceReqFrom = inputEl)}
                                styles={this.customStyles(errors && errors.experienceReqFrom)}
                                name="experienceReqFrom"
                                className="selectone"
                                options={expRequired}
                                placeholder="Select"
                                defaultValue={this.getDefaultValueForSelect(expRequired, 'experienceReqFrom')}

                                // value={this.state.EditJobDetails.experienceReqFrom}
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
                                defaultValue={this.getDefaultValueForSelect(expRequired, 'experienceReqTo')}
                                // value={this.state.EditJobDetails.experienceReqFrom}
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
                    <div className="col-md-12 pt-4 pb-4 pl-4 pr-3">
                      <h5 class="recruiterForm__sectionHeading">Others</h5>
                      <div class="row col">
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Shifts *</label></div>
                          <Select
                            ref={inputEl => (this.shift = inputEl)}
                            styles={this.customStyles(errors && errors.shift)}
                            name="shift"
                            className="selectone"
                            options={shiftTypes}
                            placeholder="Select Shift type"
                            defaultValue={this.getDefaultValueForSelect(shiftTypes, 'shift')}
                            // value={this.state.EditJobDetails.shift}
                            onChange={obj => this.handleSelect({ name: 'shift', value: obj.value })}
                          />
                          <div class="error-message">{errors && errors.employmentType}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div class="recruiterForm__noOfPositionsAvailable"><label>Number of Positions Available *</label></div>
                          <input
                            ref={inputEl => (this.noOfPositionsAvailable = inputEl)}
                            class={`form-control ${errors && errors.noOfPositionsAvailable ? 'is-invalid' : ''}`}
                            type="number"
                            min={1}
                            name="noOfPositionsAvailable"
                            value={this.state.values.noOfPositionsAvailable}
                            onChange={this.handleChange}
                            placeholder='Number of Positions Available'
                          />
                          <div class="invalid-feedback" >{errors && errors.noOfPositionsAvailable}</div>

                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Visa</label></div>
                          <input
                            class="form-control"
                            type="text"
                            name="visa"
                            value={this.state.values.visa}
                            onChange={this.handleChange}
                            placeholder='Visa (Optional)'
                          />
                          <div class="pt-3">
                            <input
                              type="checkbox"
                              name="mustHavePasport"
                              onChange={this.handleCheckbox}
                              checked={this.state.values.mustHavePasport}
                            // defaultChecked={this.state.EditJobDetails.mustHavePasport}
                            />
                            <label class="mb-0">Must have passport</label>
                          </div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Annual Salary *</label></div>
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
                                id="annualSalaryFrom"
                                className="selectone"
                                options={currency === CURRENCY_TYPE_ENUM.INR ? annualSalaryInLakh : annualSalaryInThousands}
                                placeholder="Select"
                                defaultValue={this.getDefaultValueForSelect(currency === CURRENCY_TYPE_ENUM.INR ? annualSalaryInLakh : annualSalaryInThousands, 'annualSalaryFrom')}

                                // value={this.state.EditJobDetails.annualSalaryFrom} 
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
                                defaultValue={this.getDefaultValueForSelect(currency === CURRENCY_TYPE_ENUM.INR ? annualSalaryInLakh : annualSalaryInThousands, 'annualSalaryTo')}
                                // value={this.state.EditJobDetails.annualSalaryTo} 
                                onChange={obj => this.handleSelect({ name: 'annualSalaryTo', value: obj.value })}
                              />
                            </div>
                          </div>
                          <div class="pt-0" style={{ display: 'flex' }}>
                            <div class="col-md-6 p-0 pr-4">
                              <div style={{ display: 'flex' }}>
                                <div class="error-message pr-4" >{errors && (errors.annualSalaryFrom || errors.annualSalaryTo)}</div>
                                <small class="pull-right pt-1">{currency === CURRENCY_TYPE_ENUM.INR ? 'Lakh' : 'Thousands'}</small>
                              </div>
                            </div>
                            <div class="col-md-6 p-0 pl-4">
                              <small class="pull-right pt-1">{currency === CURRENCY_TYPE_ENUM.INR ? 'Lakh' : 'Thousands'}</small>
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
                    <div className="col-md-12 pt-4 pb-4 pl-4 pr-3">
                      <h5 class="recruiterForm__sectionHeading">Hiring Location *</h5>
                      <div class="row col">
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>Country</label></div>
                          <Select
                            ref={inputEl => (this.jobCountry = inputEl)}
                            styles={this.customStyles(errors && errors.jobCountry)}
                            name="jobCountry"
                            className="selectone"
                            id="jobCountry"
                            options={[{ value: 'India', label: 'India' }]}
                            placeholder="Select"
                            defaultValue={this.getDefaultValueForSelect([{ value: 'India', label: 'India' }], 'jobCountry')}
                            // value={ this.state.EditJobDetails.jobCountry}
                            onChange={obj => this.handleSelect({ name: 'jobCountry', value: obj.value })}
                          />
                          <div class="error-message" >{errors && errors.jobCountry}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>State</label></div>
                          <Select
                            ref={inputEl => (this.jobState = inputEl)}
                            styles={this.customStyles(errors && errors.jobState)}
                            name="jobState"
                            className="selectone"
                            options={states}
                            placeholder="Select"
                            defaultValue={this.getDefaultValueForSelect(states, 'jobState')}
                            // value={ this.state.EditJobDetails.jobState}
                            onChange={obj => this.handleSelect({ name: 'jobState', value: obj.value, stateCode: obj.stateCode })}
                          />
                          <div class="error-message" >{errors && errors.jobState}</div>
                        </div>
                        <div className="col-md-6 pt-3 pl-0 recruiterForm__rightSpace">
                          <div><label>City</label></div>
                          <Select
                            ref={inputEl => (this.jobCity = inputEl)}
                            styles={this.customStyles(errors && errors.jobCity)}
                            name="jobCity"
                            className="selectone"
                            options={cities}
                            placeholder="Select"
                            defaultValue={this.getDefaultValueForSelect(cities, 'jobCity')}
                            
                            // value={ this.state.EditJobDetails.jobCity}
                            onChange={obj => this.handleSelect({ name: 'jobCity', value: obj.value })}
                          />
                          <div class="error-message" >{errors && errors.jobCity}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="active_padding">
                <div id="main" className="col mb-4 mt-4" >
                  <div className="row border-bottom-thin mb-4 mt-4">
                    <div className="col-md-12 pt-4 pb-3 pl-4 pr-3">
                      <h5 class="recruiterForm__sectionHeading">Job Description</h5>
                      <div className="col-md-12 pt-3 pl-0 recruiterForm__rightSpaceForTextArea">
                        <textarea
                          placeholder='Describe your job profile...'
                          class="form-control mb-1"
                          rows="8"
                          name="jobDescription"
                          value={this.state.values.jobDescription}
                          maxLength={MAX_LENGTH}
                          onChange={this.handleChange}
                        >
                        </textarea>
                        <small className='float-right'>{remainingTextLength.jobDescription} Character(s) Left</small>
                      </div>
                    </div>
                    <div className="col-md-12 pt-3 pb-4 pl-4">
                      <h5 class="recruiterForm__sectionHeading">Responsibilities</h5>
                      <div className="d-12 pt-3 pl-0 recruiterForm__rightSpaceForTextArea">
                        <textarea
                          placeholder='Describe your job responsibilities...'
                          class="form-control mb-1"
                          rows="8"
                          name="responsibilities"
                          value={this.state.values.responsibilities}
                          maxLength={MAX_LENGTH}
                          onChange={this.handleChange}
                        >
                        </textarea>
                        <small className='float-right'>{remainingTextLength.responsibilities} Character(s) Left</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pull-right">
                <Link to="/activeJob" class="ml-4 btn btn-light float-right border border-primary marB-50">
                  Cancel
                </Link>
                <button
                  className="btn btn-primary float-right right3 marB-50"
                  onClick={this.handleSubmit}
                >
                  Update
                </button>
              </div>
            </form> : <RenderLoader />}

            <div class="pt-5" />
            <div class="pt-3" />
            <Footer></Footer>
          </div>
        </div>
      </div>
    );
  }
}