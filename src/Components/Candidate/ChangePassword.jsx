import React, { Component, Fragment } from 'react'
import HeaderAll from '../CommonComp/HeaderAll';
import Footer from '../CommonComp/Footer'
import {Link} from 'react-router-dom'
import { Toast } from 'primereact/toast';
import ApiServicesOrgCandidate from '../../Services/ApiServicesOrgCandidate';


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.oldPasswordRef = React.createRef();
        this.newPasswordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.updatePassword = ApiServicesOrgCandidate;
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
        fields:{},
        errors: {},
        touched: {},
        show: false,
        formSubmitted: false,
        submitDisabled: true,
        revealOldPassword: false,
        revealNewPassword: false
           
        };
       
    }

    toggleOldPassword = event => {
        this.setState({revealOldPassword: !this.state.revealOldPassword});
    }

    toggleNewPassword = event => {
        this.setState({revealNewPassword: !this.state.revealNewPassword});
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields,
          submitDisabled:false
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

  //change password
  onChangePassword = (e) => {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
    });
    if (this.validateForm()) {

      // change password API
      return (
        this.updatePassword.putChangePassword(this.state.fields.oldPassword, this.state.fields.newPassword)
          .then(Response => {
                 console.log(Response)
            //     if(Response.status===417){

            //         this.toast.show({severity: 'error', summary: 'Error', detail: 'Old password does not match'},600000);
            //     }
            //     else {
            //     this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Password Updated Successfully', life: 4000 })
            //     //window.location.reload()
            // }
            //     window.location.reload();
            // })

            //console.log(Response)
            this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Password Updated Successfully', life: 4000 })
            window.location.reload()
          })
          .catch(error => {
            console.log("Error Occured..", error)
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Old Password does not match', life: 4000 });
            window.location.reload()
          })
      )

    }
  }

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["oldPassword"]) {
      formIsValid = false;
      errors["oldPassword"] = "*Please Enter old password";
    }
   
    if (!fields["newPassword"]) {
      formIsValid = false;
      errors["newPassword"] = "*Please Enter new password";
    }

    if (typeof fields["newPassword"] !== "undefined") {
      if (!fields["newPassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["newPassword"] = "*Please enter secure and strong password.";
      }
    }

    if (!fields["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please Enter confirm password";
    }

    if (typeof fields["newPassword"] !== "undefined" && typeof fields["confirmPassword"] !== "undefined") {

      if (fields["newPassword"] !== fields["confirmPassword"]) {
        formIsValid = false;
        errors["newPassword"] = "Passwords don't match.";
      }
    }


    this.setState({
      errors: errors,
      submitDisabled: !formIsValid
    });
    return formIsValid;
  }

    
    render() {
         const {oldPasswordValue, newPasswordValue,  confirmPasswordValue, revealOldPassword, revealNewPassword  } = this.state;
        return (
            <Fragment>
                 <Toast ref={(el) => this.toast = el} /> 
                {/* <LeftNavCandidate></LeftNavCandidate> */}
                <div className="content">
                {/* <div className="maincontent toggled"> */}
                <HeaderAll isCandidate={true}></HeaderAll>
                <section class="content_section main">
                        <div class="row">
                        <div class="col-md-12 pb-2 pt-2">
                                {/*<p className="backtodashboard">
                                     <a href="#"> </a> </p>*/}
                                    <Link className="backtodashboard" to="/candidate/dashboard">
                                    <i className="pi pi-angle-left" />Dashboard
                                    </Link>
                            </div>
                            <div class="col-md-12 pb-2 pt-2">
                                <p class="pass-header">Change Password</p>
                                <p class="pass-headerhelptext">You can change password from here</p>
                            </div></div>

                        <section class="white-middle-section ml-0 mr-1"> 
                            <section class="password-card">   
                            <div className="form-group old-password">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input id="oldPassword" className="form-control" name="oldPassword" value={this.state.fields.oldPassword} onChange={this.onChange} type={revealOldPassword ? "text":"password"} placeholder="Enter Old Password" ref={this.oldPasswordRef}
                                      value={this.state.fields.oldPassword} onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                                      onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
                                    <span onClick={this.toggleOldPassword}>
                                        <span>
                                            {revealOldPassword ? 
                                            <i className="pi pi-eye showOldPasswordIcon"/>:
                                            <i className="pi pi-eye-slash showOldPasswordIcon"/>
                                            }
                                        </span>
                                    </span>
                                    {
                                            this.state.formSubmitted || this.state.touched.oldPassword?<div className="errorMsg">{this.state.errors.oldPassword}</div>:''                   
                                        }
                                </div>
                                <div className="form-group new-password">
                                <label htmlFor="newPassword">New Password</label>
                                    <input ref={this.newPasswordRef} onChange={this.onChange} type={revealNewPassword ? "text":"password"} placeholder="Enter New Password" id="newPassword" className="form-control" name="newPassword"  value={this.state.fields.newPassword}  onChange={ (e) => {this.handleChange(e);this.validateForm();} } 
                                    onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }   />
                                    <span className= "input-group-append" onClick={this.toggleNewPassword}>
                                    <span>
                                    {revealNewPassword ? 
                                    <i className="pi pi-eye showNewPasswordIcon"/>:
                                    <i className="pi pi-eye-slash showNewPasswordIcon"/>
                                    }
                                    </span>
                                    </span>
                                    {
                                       this.state.formSubmitted || this.state.touched.newPassword?<div className="errorMsg">{this.state.errors.newPassword}</div>:''                    
                                    }
                                </div>    
                                <div className="form-group confirm-password">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input ref={this.confirmPasswordRef} onChange={this.onChange} type="password" id="confirmPassword"  placeholder="Enter Comfirm Password"className="form-control" name="confirmPassword"  value={this.state.fields.confirmPassword} 
                                    onChange={ (e) => {this.handleChange(e);this.validateForm();} } 
                                    onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }   />
                                    {
                                       this.state.formSubmitted || this.state.touched.newPassword?
                                          <div className="errorMsg">{this.state.errors.newPassword}</div>:''                    
                                    }
                                    
                           
                                    
                                </div> 
                                <div className="update_button">
                                    <button type="button" className="btn btn-primary" disabled={this.state.submitDisabled}  onClick={this.onChangePassword}>Update Password</button>   
                                </div>                      
                                </section>
                        </section>
                    </section>
                    <Footer></Footer>
                </div>
            </Fragment >
        );
    }
}
export default ChangePassword
