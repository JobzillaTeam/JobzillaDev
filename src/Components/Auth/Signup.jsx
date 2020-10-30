import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Header from '../CommonComp/Header'
import Footer from '../CommonComp/Footer'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import { Toast } from 'primereact/toast';

//import TermsOfUse from '../Auth/TermsOfUse'
//import PrivacyPolicy from '../Auth/PrivacyPolicy'
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

        }
        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
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

    submituserRegistrationForm = (e) => {
        e.preventDefault();
        this.setState({
        formSubmitted: true
        });
        if (this.validateForm()) {
            let fields = {};
            fields["org_name"] = "";
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
            .then(Response=> {this.props.history.push('/')
                localStorage.setItem('jobzilla',JSON.stringify(this.state.fields));
            })
          .catch(error=>{this.toast.show({severity: 'error', summary: 'Error', detail: 'Server Error'},50000);
            })
            this.toast.show({severity: 'success', summary: 'Success Message', detail: 'User is Signed up Successfully'},50000); 
        }
            this.refs.check.checked= false ;
        }
    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["org_name"]) {
            formIsValid = false;
            errors["org_name"] = "*Please enter organisation name";
        }

        if (typeof fields["org_name"] !== "undefined") {
            if (!fields["org_name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["org_name"] = "*Please enter alphabet characters only.";
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
                errors["org_name"] = "*Please enter alphabet characters only.";
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
        const {org_name,email,mobile,contactPerson,gstin,password,confirm_password} = this.state.fields
        return (
            <Fragment>
                <div className="content">
                    {/*  Header */}
                    <Header></Header>
                    {/* Main Content on the page */}
                    <Toast ref={(el) => this.toast = el} />
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
                                    <input type="text" id="signup_OrgName" className="form-control" name="org_name"
                                        value={this.state.fields.org_name} onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                                        onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
                                        {
                                            this.state.formSubmitted || this.state.touched.org_name?<div className="errorMsg">{this.state.errors.org_name}</div>:''                   
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
                                            <label className="form-check-label" htmlFor="agreeTerms">
                                                I agree to terms and conditions
                                            </label>
                                        </div>  
                                    </div>
                                {/* Create Button */}
                                <div className="form-group mt-5">
                                    <button className="btn btn-blue w-50"  >Create</button>
                                </div>  
                                <div className="terms" ><Link to="/termsofUse">Terms of use</Link></div> 
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


