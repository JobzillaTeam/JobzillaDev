import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Header from '../CommonComp/Header'
import Footer from '../CommonComp/Footer'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import { Toast } from 'primereact/toast';
import TermsOfUse from '../Auth/TermsOfUse'

//import TermsOfUse from '../Auth/TermsOfUse'
//import axios from 'axios'
// import Toast from 'light-toast';

export default class Signup extends Component {
    constructor() {
        super()
        this.signupService = new ApiServicesOrg()
        this.state = {
            fields: {},
            errors: {},
            touched: {},
            formSubmitted: false,
            userDialog: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
        this.onTermsConditionsModalRef= this.onTermsConditionsModalRef.bind(this);
    }
    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        })
    }

    handleTouch(e){
        let {touched} = this.state;
       if(e.target.name && touched[e.target.name] != true){
           touched[e.target.name] = true;
            this.setState({
             touched
           });
       }
     }
     onLogin = () => {
        this.props.history.push('/login')
      }

    onTermsConditionsModalRef = (obj) => { 
        this.showModal = obj&&obj.showModal 
     }
     
     onTermsConditionsClick = () => {
       this.showModal();
     }

    submituserRegistrationForm = (e) => {
        e.preventDefault();
        this.setState({
        formSubmitted: true
        });
        if (this.validateForm()) {
            let fields = {};
            fields["organizationName"] = "";
            fields["email"] = "";
            fields["phoneNumber"] = "";
            fields["contactPerson"] = "";
            fields["gstin"] = "";
            fields["password"] = "";
            fields["confirm_password"] = "";
            this.setState({ fields: fields });
            this.setState({
                formSubmitted: false
              });

              // Adding axios code
              const options = { 
                headers: { 
                'Content-Type': 'application/json', 
                } 
                };
    // Calling Signup Service from Service file:-
    
    this.signupService.postSignup(this.state.fields)
    .then(Response => {
        localStorage.setItem('jobzilla', JSON.stringify(this.state.fields));
        if (Response.status === 208) {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'User already exist' }, 80000);
        } else {
            this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'User Signup Successfully' }, 80000);
        setTimeout(() => {
            this.props.history.push('/')
        }, 1000)

        }
    })
    .catch(error => {
        // console.log(error)
        this.toast.show({ severity: 'error', summary: 'Error', detail: 'Internal server error' }, 80000);
    })
}
this.refs.check.checked = false;
}
validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["organizationName"]) {
            formIsValid = false;
            errors["organizationName"] = "*Please enter organisation name";
        }

        if (typeof fields["organizationName"] !== "undefined") {
            if (!fields["organizationName"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["organizationName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your official email";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["phoneNumber"]) {
            formIsValid = false;
            errors["phoneNumber"] = "*Please enter your mobile no.";
        }

        if (typeof fields["phoneNumber"] !== "undefined") {
            if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["phoneNumber"] = "*Please enter valid mobile/landline no.";
            }
        }

        if (!fields["contactPerson"]) {
            formIsValid = false;
            errors["contactPerson"] = "*Please enter contact person name";
        }

        if (typeof fields["contactPerson"] !== "undefined") {
            if (!fields["contactPerson"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["contactPerson"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }
        if (!fields["confirm_password"]) {
            formIsValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
          }
      
          if (typeof fields["password"] !== "undefined" && typeof fields["confirm_password"] !== "undefined") {
              
            if (fields["password"] !== fields["confirm_password"]) {
                formIsValid = false;
              errors["password"] = "Passwords don't match.";
            }
          } 
    
        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    
       
        
    render() {       
        const {organizationName,email,mobile,contactPerson,gstin,password,confirm_password} = this.state.fields
        return (
            <Fragment>
                <div className="content">
                    {/*  Header */}
                    <Header></Header>
                    {/* Main Content on the page */}
                    <Toast className="toast_padding" ref={(el) => this.toast = el} />
                    <div className="content_section main login">
                        <h2>Sign Up</h2>
                        <p className="small-title">Welcome to iSWITCH</p>
                        {/* Form */}
                        <form onSubmit={this.submituserRegistrationForm}>
                        <div className="row">
                            <div className="col-md-5">
                                {/* Organization Name */}
                                <div className="form-group">
                                    <label htmlFor="signup_OrgName">Organization Name</label>
                                    <input type="text" id="signup_OrgName" className="form-control" name="organizationName"
                                        value={this.state.fields.organizationName} onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                                        onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
                                        {
                                            this.state.formSubmitted || this.state.touched.organizationName?<div className="errorMsg">{this.state.errors.organizationName}</div>:''                   
                                        }
                                </div>
                                {/* Official Email */}
                                <div className="form-group">
                                    <label htmlFor="signup_email">Official Email</label>
                                    <input type="text" id="signup_email" className="form-control" name="email" 
                                        value={this.state.fields.email} onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                                        onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }  />
                                        {
                                            this.state.formSubmitted || this.state.touched.email?<div className="errorMsg">{this.state.errors.email}</div>:''                  
                                        }
                                </div>
                                {/* Mobile/Landline */}
                                <div className="form-group">
                                    <label htmlFor="signup_mobilenumber">Mobile/Landline</label>
                                    <input type="text" id="signup_mobilenumber" className="form-control" name="phoneNumber"  value={this.state.fields.phoneNumber}  onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                                        onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }   />
                                        {
                                            this.state.formSubmitted || this.state.touched.phoneNumber?<div className="errorMsg">{this.state.errors.phoneNumber}</div>:''                     
                                        }
                                </div>
                                {/* Contact Person's Name */}
                                <div className="form-group">
                                    <label htmlFor="signup_name">Contact Person's Name</label>
                                    <input type="text" id="signup_name" className="form-control" name="contactPerson" value={this.state.fields.contactPerson} onChange={ (e) => {this.handleChange(e);this.validateForm();} } 
                                    onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }/>
                                    {
                                       this.state.formSubmitted || this.state.touched.contactPerson?<div className="errorMsg">{this.state.errors.contactPerson}</div>:''                     
                                    }
                                </div>
                            </div>
                            <div className="col-md-5">
                                {/* GSTIN */}
                                <div className="form-group">
                                    <label htmlFor="signup_gstin">GSTIN (optional)</label>
                                    <input type="text" id="signup_gstin" className="form-control" name="gstin" value={this.state.fields.gstin} onChange={ (e) => {this.handleChange(e);this.validateForm();} } 
                                     />
                                </div>
                                {/* Password */}
                                <div className="form-group ">
                                    <label htmlFor="signup_pwd">Password</label>
                                    <div className="input-group">
                                    <input type="password" id="signup_pwd" className="form-control" name="password"  value={this.state.fields.password}  onChange={ (e) => {this.handleChange(e);this.validateForm();} } 
                                    onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }   />
                                    
                                    <span className="input-group-append">
                                       <img src="../images/login/tooltip.png" alt="tooltip" className="input-group-text" title="Password must contain atleast 8 characters 
                                       including Uppercase,lowercase and numbers."/></span></div>
                                    { 
                                        this.state.formSubmitted || this.state.touched.password?<div className="errorMsg">{this.state.errors.password}</div>:''                    
                                    }
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="signup_pwd">Password</label>
                                    <input type="password" id="signup_pwd" className="form-control" name="password"  value={this.state.fields.password}  onChange={ (e) => {this.handleChange(e);this.validateForm();} } 
                                    onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }   />
                                    {
                                       this.state.formSubmitted || this.state.touched.password?<div className="errorMsg">{this.state.errors.password}</div>:''                    
                                    }
                                </div> */}
                                {/* Confirm Password */}
                                <div className="form-group">
                                    <label htmlFor="signup_cnfpwd">Confirm Password</label>
                                    <input type="password" id="signup_cnfpwd" className="form-control" name="confirm_password"  value={this.state.fields.confirm_password} onChange={ (e) => {this.handleChange(e);this.validateForm();} } 
                                    onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }   />
                                    {
                                       this.state.formSubmitted || this.state.touched.password?
                                          <div className="errorMsg">{this.state.errors.password}</div>:''                    
                                    }
                                </div>
                            </div>
                        </div>  
                        {/* button and checkbox */}
                        <div className="row">
                            <div className="col-md-5">
                                {/* Terms checkbox */}
                                <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="agreeTerms" ref="check" required/>
                                            <TermsOfUse ref={this.onTermsConditionsModalRef} ></TermsOfUse>
                                            <label className="form-check-label" htmlFor="agreeTerms">
                                            {/* <Link to="/termsofUse">I agree to terms and conditions</Link> */}
                                            <a href="#" onClick={this.onTermsConditionsClick}>I agree to terms and conditions</a>
                                            </label>
                                        </div>  
                                    </div>
                                {/* Create Button */}
                                <div className="form-group">
                                        <div className="row">
                                            <div className="col-6">
                                                <button className="btn btn-blue mr-3 w-100" >Create</button>
                                            </div>
                                            {<div className="col-6">
                                                <button className="btn btn-border w-100" onClick={() => this.onLogin()}>Back To login</button>
                                            </div>}
                                        </div>
                                    </div>  
                                {/* <div className="terms" ><Link to="/termsofUse">Terms of use</Link></div>  */}
                            </div>
                            {/* image on sign up */}
                            <div className="col-md-7">
                                <div className="d-none d-md-block float-right signUpImg">
                                    <img src="../images/login/signup-img.png" alt="sign-up" className="img-fluid" />
                                </div> 
                                
                            </div>
                            
                        </div>                      
                        </form>
                    </div>
                    
                    {/* Footer */}
                    <Footer></Footer>
                </div>

            </Fragment>        
        )
    }
}



