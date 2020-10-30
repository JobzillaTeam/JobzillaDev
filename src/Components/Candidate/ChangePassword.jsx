import React, { Component, Fragment } from 'react'
import HeaderAll from '../CommonComp/HeaderAll';
//import LeftNavCandidate from '../CommonComp/LeftNavCandidate'
import Footer from '../CommonComp/Footer'
import {Link} from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { event } from 'jquery';
import ApiServicesOrgCandidate from '../../Services/ApiServicesOrgCandidate';
import { Toast } from 'primereact/toast';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.oldPasswordRef = React.createRef();
        this.newPasswordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();

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
      this.handleChange = this.handleChange.bind(this);
      this.updatePassword = ApiServicesOrgCandidate;
      this.onChangePassword = this.onChangePassword.bind(this);
    }
    showModal = () => {
        this.setState({ 
          fields:{},
          show: true });
          
      }
    
      hideModal = () => {
        this.setState({ show: false });
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
        if(this.validateForm()){
                    
          this.hideModal()
          // change password API
            return(
              this.updatePassword.getChangePassword(this.state.fields.oldPassword, this.state.fields.password)
              .then(Response => {console.log(Response)
                alert("Done")
              })
              .catch(error => {
                  console.log("Error Occured..", error)
                  alert("Some Error Occured")
                   //this.toast.show({ severity: 'error',summary: 'Error', detail: 'Something Went Wrong', life: 4000 });
              })
              (this.toast.show({ severity: 'success',summary: 'Success Message', detail: 'Password Updated Successfully', life: 4000 })  )
           ) 
                     
          }}


    toggleOldPassword = event => {
        this.setState({revealOldPassword: !this.state.revealOldPassword});
    }

    toggleNewPassword = event => {
        this.setState({revealNewPassword: !this.state.revealNewPassword});
    }
    
    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["oldPassword"]) {
            formIsValid = false;
            errors["oldPassword"] = "*Please Enter old password";
          }
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please Enter new password";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        if (!fields["confirmPassword"]) {
            formIsValid = false;
            errors["confirmPassword"] = "*Please Enter confirm password";
          }

          if (typeof fields["password"] !== "undefined" && typeof fields["confirmPassword"] !== "undefined") {
              
            if (fields["password"] !== fields["confirmPassword"]) {
                formIsValid = false;
              errors["password"] = "Passwords don't match.";
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
                                    <label htmlFor="old_password">Old Password</label>
                                    <input id="old_password" className="form-control" name="oldPassword" value={oldPasswordValue} onChange={this.onChange} type={revealOldPassword ? "text":"password"} placeholder="Enter Old Password" ref={this.oldPasswordRef} />
                                    <span onClick={this.toggleOldPassword}>
                                        <span>
                                            {revealOldPassword ? 
                                            <i className="pi pi-eye showOldPasswordIcon"/>:
                                            <i className="pi pi-eye-slash showOldPasswordIcon"/>
                                            }
                                        </span>
                                    </span>
                                </div>
                                <div className="form-group new-password">
                                    <label htmlFor="new_password">New Password</label>
                                    <input id="new_password" className="form-control" name="newPassword" value={newPasswordValue} onChange={this.onChange} type={revealNewPassword ? "text":"password"} placeholder="Enter New Password" ref={this.newPasswordRef} />
                                    <span onClick={this.toggleNewPassword}>
                                        <span>
                                            {revealNewPassword ? 
                                            <i className="pi pi-eye showNewPasswordIcon"/>:
                                            <i className="pi pi-eye-slash showNewPasswordIcon"/>
                                            }
                                        </span>
                                    </span>
                                </div>    
                                <div className="form-group confirm-password">
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input id="confirm_password" className="form-control" name="confirmPassword" value={confirmPasswordValue} onChange={this.onChange} type="password" placeholder="Confirm New Password" ref={this.confirmPasswordRef} />
                                    
                                </div> 
                                <div className="update_button">
                                    <button type="button" className="btn btn-primary">Update Password</button>   
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
