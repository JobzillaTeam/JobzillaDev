import { Button, Modal } from 'react-bootstrap'
import React, { Component } from 'react';
import { Toast } from 'primereact/toast';
import ApiServicesOrg from '../../Services/ApiServicesOrg';

class ChangePasswordOrg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      touched: {},
      show: false,
      formSubmitted: false,
      submitDisabled: true,
      revealOldPassword: false,
      revealNewPassword: false

    }
    this.oldPasswordRef = React.createRef();
    this.newPasswordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = new ApiServicesOrg();
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  toggleOldPassword = event => {
    this.setState({ revealOldPassword: !this.state.revealOldPassword });
  }

  toggleNewPassword = event => {
    this.setState({ revealNewPassword: !this.state.revealNewPassword });
  }
  showModal = () => {
    this.setState({
      fields: {},
      show: true
    });

  }

  hideModal = () => {
    this.setState({ show: false });
  }

  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
      submitDisabled: false
    })
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
           // window.location.reload()
          })
          .catch(error => {
            console.log("Error Occured..", error)
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Old Password does not match', life: 4000 });
           // window.location.reload()
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
    const { oldPasswordValue, newPasswordValue, confirmPasswordValue, revealOldPassword, revealNewPassword } = this.state;
    return (

      <div>
        {/* Below button is used to call the modal popup .please remove once you call this from manage user */}
        {/*<Button onClick={() =>this.showModal(true)}>Small modal</Button>*/}
        <Toast ref={(el) => this.toast = el} />
        <Modal className="modal-dialog"
          show={this.state.show}
          onHide={() => this.hideModal(false)}
          aria-labelledby="contained-modal-title-vcenter">
          <Toast ref={(el) => this.toast = el} />
          <Modal.Header closeButton>
            <Modal.Title className="sub-title" id="contained-modal-title-vcenter">
              Change Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form>
              <div className="row password-card">

                <div className="col">
                  {/* Old Password */}
                  <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input ref={this.oldPasswordRef} onChange={this.onChange} type={revealOldPassword ? "text" : "password"} id="oldPassword" className="form-control" name="oldPassword"
                      value={this.state.fields.oldPassword} onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                      onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                    <span onClick={this.toggleOldPassword}>
                      <span>
                        {revealOldPassword ?
                          <i className="pi pi-eye showOldPasswordIcon" /> :
                          <i className="pi pi-eye-slash showOldPasswordIcon" />
                        }
                      </span>
                    </span>
                    {
                      this.state.formSubmitted || this.state.touched.oldPassword ? <div className="errorMsg">{this.state.errors.oldPassword}</div> : ''
                    }
                  </div>

                  {/* New Password */}
                  <div className="form-group">

                    <label htmlFor="newPassword">New Password</label>
                    <input ref={this.newPasswordRef} onChange={this.onChange} type={revealNewPassword ? "text" : "password"} id="newPassword" className="form-control" name="newPassword" value={this.state.fields.newPassword} onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                      onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                    <span className="input-group-append" onClick={this.toggleNewPassword}>
                      <span>
                        {revealNewPassword ?
                          <i className="pi pi-eye showNewPasswordIcon" /> :
                          <i className="pi pi-eye-slash showNewPasswordIcon" />
                        }
                      </span>
                    </span>
                    {
                      this.state.formSubmitted || this.state.touched.newPassword ? <div className="errorMsg">{this.state.errors.newPassword}</div> : ''
                    }

                  </div>
                  {/* Confirm Password */}
                  <div className="form-group">

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input ref={this.confirmPasswordRef} onChange={this.onChange} type="password" id="confirmPassword" className="form-control" name="confirmPassword" value={this.state.fields.confirmPassword}
                      onChange={(e) => { this.handleChange(e); this.validateForm(); }}
                      onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
                    {
                      this.state.formSubmitted || this.state.touched.newPassword ?
                        <div className="errorMsg">{this.state.errors.newPassword}</div> : ''
                    }

                  </div>

                  <button className="btn btn-blue float-right px-4" disabled={this.state.submitDisabled} onClick={this.onChangePassword}>Update Password</button>

                </div>

              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ChangePasswordOrg