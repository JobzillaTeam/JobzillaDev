import React, { Component, Fragment } from "react";
import Header from '../CommonComp/Header'
import Footer from '../CommonComp/Footer'
import ApiServicesOrg from "../../Services/ApiServicesOrg";
import { Toast } from 'primereact/toast';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.loginService = new ApiServicesOrg()
    this.state = {
      fields: {},
      errors: {},
      touched: {},
      formSubmitted: false,
      submitDisabled: true,
      forgotPasswordSuccessPage: false
    }
  }

  handleInputChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  handleTouch(e) {
    let { touched } = this.state;
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({
        touched
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
      submitDisabled: false
    });
    if (this.validateForm()) {
      this.loginService.putForgotPassword(this.state.fields.emailId).then(Response=>{
        if(Response && Response.data){
          let fields = {};
          fields["emailId"] = "";
          this.toast.show({ severity: 'success', summary: 'Success Message', detail: Response.data.responseDescription }, 80000);
          this.setState({ fields: fields, forgotPasswordSuccessPage: true});
        }
      }).catch(error => {
        if (error && error.response && error.response.status && error.response.status === 404) {
          this.toast.show({ severity: 'error', summary: 'Error Message', detail: error.response.data && error.response.data.responseDescription ? error.response.data.responseDescription : 'Something went wrong' }, 80000);
        } else {
          this.toast.show({ severity: 'error', summary: 'Error Message', detail: 'Something went wrong' }, 80000);
        }
        console.log(error)
      });
    }
  }

  onLogin = () => {
    const isSignupButtonVisible = this.isSignupButtonVisible();
    const backToLoginPath = isSignupButtonVisible ? '/login' : '/login?role=candidate'
    this.props.history.push(backToLoginPath)
  }

  /*validate email and password */
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["emailId"]) {
      formIsValid = false
      errors["emailId"] = "*Please enter your email-ID.";
    }
    /* Email Id Validation */
    if (typeof fields["emailId"] !== "undefined") {
      var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (!pattern.test(fields["emailId"])) {
        formIsValid = false;
        errors["emailId"] = "*Please enter valid email-ID.";
      } else {
        formIsValid = true;
      }
    }
    this.setState({
      errors: errors,
      submitDisabled: !formIsValid
    });
    return formIsValid;
  }

  forgotPasswordForm = () => {
    return (
      <div className="col-md-5">
        <h2>Forgot Password</h2>
        <p className="small-title">Confirm your registered email id here</p>
        {/* User Name */}
        <div className="form-group">
          <label htmlFor="emailId">EmailId</label>
          <input type="text" id="emailId" value={this.state.fields.emailId} name="emailId" className="form-control"
            onChange={(e) => { this.handleInputChange(e); this.validateForm(); }}
            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
        </div>
        {this.state.formSubmitted || this.state.touched.emailId ? <div className="errorMsg mb-3">{this.state.errors.emailId}</div> : ''}
        {/* Buttons */}
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <button className="btn btn-blue mr-3 w-100" onClick={this.onSubmit} disabled={this.state.submitDisabled} value="Register">Submit</button>
            </div>
            {<div className="col-6">
              <button className="btn btn-border w-100" onClick={() => this.onLogin()}>Back To login</button>
            </div>}
          </div>
        </div>
      </div>
    );
  }

  forgotPasswordSuccessPage = () => {
    return (
      <div className="col-md-5">
        <h2>Check You Email</h2>
        <p className="small-title">We have sent you temporary password to your registered email id.</p>
        <p className="small-title">You are recommended to login to the portal and change your password.</p>
        <div className="form-group">
          <div className="row">
            <div className="col-12 text-center mt-4">
              <img src="/images/Dashboard-assets/email.svg" height="150" width="150" />
            </div>
            {<div className="col-12 text-center mt-4">
              <button className="btn btn-border" onClick={() => this.onLogin()}>Back To login</button>
            </div>}
          </div>
        </div>
      </div>
    );
  }

  isSignupButtonVisible = () => {
    const {location} = this.props;
    const {search} = location;
    return search && search.toLowerCase().includes('role=candidate') ? false : true;
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          {/*  Header */}
          <Header></Header>
          {/* Main Content on the page */}
          <Toast ref={(el) => this.toast = el} />
          <div className="content_section main login">
            <div className="row">
              {this.state.forgotPasswordSuccessPage ? this.forgotPasswordSuccessPage() : this.forgotPasswordForm() }
              <div className="col-md-7">
                <div className="text-right d-none d-md-block">
                  <img src="../images/login/login-img.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer></Footer>
      </Fragment>
    )
  }
}
export default ForgotPassword