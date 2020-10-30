import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import Header from '../CommonComp/Header'
import Footer from '../CommonComp/Footer' 
import ApiServicesOrg from '../../Services/ApiServicesOrg'

//import TermsOfUse from '../Auth/TermsOfUse'
//import PrivacyPolicy from '../Auth/PrivacyPolicy'
//import axios from 'axios'

class LoginComp extends Component {
  constructor(props) {
    super(props);
    this.loginService = new ApiServicesOrg()
    this.state={
        fields: {},
        errors: {},
        touched: {},
        isChecked:false,
        formSubmitted: false,
        errorMsg:'',
        submitDisabled: true    
      }
      this.onLogin = this.onLogin.bind(this);
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

  onChangeCheckbox = event => {
    this.setState({
      isChecked: event.target.checked
    })
  }

  onLogin(e) {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
      submitDisabled: false
    });
    if (this.validateForm()) {
      let fields = {};
      fields["emailid"] = "";
      fields["password"] = "";
      this.setState({ fields: fields});    
      // console.log(this.state.fields.emailid)            
      
     // Calling Login Service from Service file:-

      // this.loginService.putLogin(this.state.fields.emailid, this.state.fields.password)
      // let loginDetails={};
      // loginDetails["password"] = this.state.fields.password;
      // loginDetails["userName"] = this.state.fields.emailid;
      // console.log(loginDetails)
      this.loginService.putLogin(this.state.fields)
          .then(Response=>{
            if(Response){
              localStorage.setItem('userDetails',JSON.stringify(Response.data.responseObject)); 
              localStorage.setItem('userName',Response.data.responseObject['userName'])
              //fieldwise response
              localStorage.setItem('userId',Response.data.responseObject['id'])
              localStorage.setItem('organizationId',Response.data.responseObject['orgnaizationId'] )
              localStorage.setItem('rememberme',this.state.isChecked)
              localStorage.setItem('emailId',this.state.isChecked ? Response.data.responseObject['email'] :'')
              localStorage.setItem('authToken', Response.data.responseObject['authToken'])
              localStorage.setItem('acceptedTC', Response.data.responseObject['acceptedTC'])
              localStorage.setItem('userRole', Response.data.responseObject['userRole'])
              let _redirectTo;
              if (Response && Response.data && Response.data.responseObject && Response.data.responseObject.userRole === "candidate_role") {
                _redirectTo = '/candidate/dashboard';
              } else {
                _redirectTo = '/providerDashboard';
                localStorage.setItem('status','provider');
              }
              this.props.history.push(_redirectTo);
            }
          })
          .catch(error => {
            if(error){
              this.setState({errorMsg: 'Invalid Email Or Password'})
            }
            setTimeout(() => {
              //window.location.reload(false)
            }, 3000);
          })   
    }
  }

  onSignUp() {
    this.props.history.push('/signup')
  }

  /* Retrive Data from localstorage*/
  componentDidMount() {
    if (localStorage.rememberme == 'true') {
      const email = localStorage.getItem('emailId')
      this.setState({
        isChecked: true,
      })
      this.state.fields.emailid = email
    }
  }

  /*validate email and password */
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["emailid"]) {
      formIsValid = false
      errors["emailid"] = "*Please enter your email-ID.";
    }
    /* Email Id Validation */
    if (typeof fields["emailid"] !== "undefined" || localStorage.rememberme == 'true') {
      var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = true;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }
    /* Password Validation */
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    // if (typeof fields["password"] !== "undefined") {
    //   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter secure and strong password.";
    //   }
    //}
    this.setState({
      errors: errors,
      submitDisabled: !formIsValid
    });
    return formIsValid;
  }
  /* Render functionation  */
  isSignupButtonVisible = () => {
    const {location} = this.props;
    const {search} = location;
    return search && search.toLowerCase().includes('role=candidate') ? false : true;
  }

  render() {
    const isSignupButtonVisible = this.isSignupButtonVisible();
    return (
      <Fragment>
        <div className="content">
          {/*  Header */}
          <Header></Header>
          {/* Main Content on the page */}
          <div className="content_section main login">
            <div className="row">
              <div className="col-md-5">
                <h2>Login</h2>
                <p className="small-title">Welcome!! Please login to your account.</p>
                {/* User Name */}
                <div className="form-group">
                  <label htmlFor="emailid">EmailId</label>
                  <input type="text" id="emailid" value={this.state.fields.emailid} name="emailid" className="form-control"
                    onChange={(e) => { this.handleInputChange(e); this.validateForm(); }}
                    onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                </div>
                {this.state.formSubmitted || this.state.touched.emailid ? <div className="errorMsg">{this.state.errors.emailid}</div> : ''}
                {/* Password */}
                <div className="form-group">
                  <label htmlFor="loginPwd">Password</label>
                  <input type="password" id="loginPwd" value={this.state.fields.password} className="form-control" name="password"
                    onChange={(e) => { this.handleInputChange(e); this.validateForm(); }}
                    onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                </div>
                {this.state.formSubmitted || this.state.touched.password ? <div className="errorMsg">{this.state.errors.password}</div> : ''}
                <div className="errorMsg">{this.state.errorMsg ? <div>{this.state.errorMsg}</div> : null}</div>
                {/* Remember and forget password link */}
                <div className="form-group clearfix">
                  <div className="float-left">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" checked={this.state.isChecked} onChange={this.onChangeCheckbox} name="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="float-right">
                    <a className="forgot_link" href="#">Forgot Password</a>
                  </div>
                </div>
                {/* Buttons */}
                <div className="form-group">
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-blue mr-3 w-100" onClick={this.onLogin} disabled={this.state.submitDisabled} value="Register">Login</button>
                    </div>
                    {isSignupButtonVisible ? <div className="col-6">
                      <button className="btn btn-border w-100" onClick={() => this.onSignUp()}>Sign Up</button>
                    </div> : null }
                    
                  </div>
                </div>
                {/* Terms and policy */}
                <div className="terms"><Link to="/termsofUse">Terms of use</Link>
                </div>
                {/*  */}
              </div>
              <div className="col-md-7">
                <div className="text-right d-none d-md-block">
				              <img src= "../images/login/login-img.png" className="img-fluid"/>
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
export default LoginComp



