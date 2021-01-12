import React, { Component, Fragment } from 'react'
import ApiServicesOrgCandidate from '../../Services/ApiServicesOrgCandidate';

class ChangePasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.oldPasswordRef = React.createRef();
    this.newPasswordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = ApiServicesOrgCandidate;
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      formError: null,
      fields: {},
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
    this.setState({ revealOldPassword: !this.state.revealOldPassword });
  }

  toggleNewPassword = event => {
    this.setState({ revealNewPassword: !this.state.revealNewPassword });
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
            this.props.toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Password Updated Successfully' }, 50000);
            this.props.showPopup(false)
          })
          .catch(error => {
            const errorMessage = error && error.response && error.response.data && error.response.data.responseDescription

            this.setState({
              formError: errorMessage
            })
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
      <Fragment>
        <div className="errorMsg">{this.state.formError}</div>
        <div className="form-group old-password">
          <label htmlFor="oldPassword">Old Password</label>
          <input id="oldPassword" className="form-control" name="oldPassword"  type={revealOldPassword ? "text" : "password"} placeholder="Enter Old Password" ref={this.oldPasswordRef}
            value={this.state.fields.oldPassword ||""} onChange={(e) => { this.handleChange(e); this.validateForm(); }}
            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
          <span className="input-group-append" style={{ height: 0 }} onClick={this.toggleOldPassword}>
            {revealOldPassword ?
              <i className="pi pi-eye showNewPasswordIcon" /> :
              <i className="pi pi-eye-slash showNewPasswordIcon" />
            }
          </span>
          {
            this.state.formSubmitted || this.state.touched.oldPassword ? <div className="errorMsg">{this.state.errors.oldPassword}</div> : ''
          }
        </div>
        <div className="form-group new-password">
          <label htmlFor="newPassword">New Password</label>
          <input ref={this.newPasswordRef} onChange={this.onChange} type={revealNewPassword ? "text" : "password"} title="Password must contain atleast 8 characters 
                                       including Uppercase,lowercase and numbers." placeholder="Enter New Password" id="newPassword" className="form-control" name="newPassword" value={this.state.fields.newPassword ||""} onChange={(e) => { this.handleChange(e); this.validateForm(); }}
            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
          <span className="input-group-append" title="Password must contain atleast 8 characters 
                                       including Uppercase,lowercase and numbers." style={{ height: 0 }} onClick={this.toggleNewPassword}>
            {revealNewPassword ?
              <i className="pi pi-eye showNewPasswordIcon" /> :
              <i className="pi pi-eye-slash showNewPasswordIcon" />
            }
          </span>
          {
            this.state.formSubmitted || this.state.touched.newPassword ? <div className="errorMsg">{this.state.errors.newPassword}</div> : ''
          }
        </div>
        <div className="form-group confirm-password">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input ref={this.confirmPasswordRef} onChange={this.onChange} type="password" id="confirmPassword" placeholder="Enter Comfirm Password" className="form-control" name="confirmPassword" value={this.state.fields.confirmPassword ||""}
            onChange={(e) => { this.handleChange(e); this.validateForm(); }}
            onBlur={(e) => { this.handleTouch(e); this.validateForm(); }} />
          {
            this.state.formSubmitted || this.state.touched.newPassword ?
              <div className="errorMsg">{this.state.errors.newPassword}</div> : ''
          }
        </div>
        <div className="update_button">
          <button type="button" className="btn btn-primary" disabled={this.state.submitDisabled} onClick={this.onChangePassword}>Update Password</button>
        </div>
      </Fragment >
    );
  }
}
export default ChangePasswordPopup
