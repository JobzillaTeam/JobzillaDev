import { Button,Modal } from 'react-bootstrap'
import React,{ Component } from 'react';
import axios from 'axios'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import { Toast } from 'primereact/toast';
class EditUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
      fields:{},
      errors: {},
      touched: {},
      show: false,
      formSubmitted: false,
      submitDisabled: true    
    }
    this.editUserService= new ApiServicesOrg()
    this.onEditUser = this.onEditUser.bind(this);
  }
  
  Model = (user) => {
    this.setState({ 
      fields:user,
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

  onEditUser = (e) => {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
    });
    if(this.validateForm()){
      let fields = {};
      fields["userName"] = "";
      fields["email"] = "";
      fields["contactNumber"] = "";
      fields["userRole"] = "";
      this.setState({ 
        fields: fields,
      });
      this.state.fields['orgnaizationId'] = localStorage.getItem('organizationId');
      
      const superID = JSON.parse(localStorage.getItem('userDetails')).supervisorId;
      this.state.fields['supervisorId']= superID

      //this.state.fields['password']= "Test@1234";
      
      this.hideModal()
      localStorage.setItem("Jobzilla",JSON.stringify([this.state.fields]))
      window.location.reload()

       // Calling Edit user Service from Service file:-  
            this.editUserService.putEditUser(this.state.fields)
             .then(Response=>{
             this.props.history.push('/')})
             .catch(error=>{
              this.toast.show({severity: 'error', summary: 'Error', detail: 'Server Error '},20000);
             })     
      this.toast.show({severity: 'success', summary: 'Success Message', detail: 'User is edited Successfully'},20000);
    }
  }
    
  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
   
    if (!fields["contactNumber"]) {
      formIsValid = false;
      errors["contactNumber"] = "*Please enter your mobile no.";
    }

    if (typeof fields["contactNumber"] !== "undefined") {
      if (!fields["contactNumber"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["contactNumber"] = "*Please enter valid mobile/landline no.";
      }
    }
    if (!fields["userRole"]) {
      formIsValid = false;
      errors["userRole"] = "*Please select user role";
    }

    this.setState({
      errors: errors,
      submitDisabled: !formIsValid
    });
    return formIsValid;
  }

  render(){
    return (
      <>
      {/* Below button is used to call the modal popup .please remove once you call this from manage user */}
      {/*<Button onClick={() =>this.showModal(true)}>Small modal</Button>*/}
      <Toast ref={(el) => this.toast = el} />
      <Modal
        show={this.state.show}
        onHide={() => this.hideModal(false)}
        aria-labelledby="contained-modal-title-vcenter"> 
          <Modal.Header closeButton>
            <Modal.Title className="sub-title" id="contained-modal-title-vcenter">
              Edit User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <fieldset disabled="disabled">
                  <div className="form-group">
                      <label htmlFor="userName">Name</label>
                      <input type="text" id="userName" name="userName" className="form-control"  value={this.state.fields.userName} />
                    
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="userEmail">Official Email</label>
                      <input type="email" id="userEmail" name="email"  className="form-control"  value={this.state.fields.email} />
                    
                  </div>
                  </fieldset> 
                  <div className="form-group">
                      <label htmlFor="userMobile">Mobile/Landline</label>
                      <input type="text" id="userMobile" name="contactNumber"  className="form-control" value={this.state.fields.contactNumber} onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                      onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
                      {
                          this.state.formSubmitted || this.state.touched.contactNumber?
                          <div className="errorMsg">{this.state.errors.contactNumber}</div>:''                   
                      }
                  </div>
                     
                  <div className="form-group">
                      <label htmlFor="userRole">Role</label>
                      <select id="userRole" name="userRole" className="form-control" value={this.state.fields.userRole} onChange={ (e) => {this.handleChange(e); this.validateForm()} }
                      onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } >
                      {
                          this.state.formSubmitted ?
                          <div className="errorMsg">{this.state.errors.userRole}</div>:''                   
                      }
                          <option value="select role" selected>Select Role </option> 
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                          {/* <option value="recruiter">Recruiter</option> */}
                      </select>
                  </div> 
                  
                  <button className="btn btn-blue float-right px-4" disabled={this.state.submitDisabled}  onClick={this.onEditUser}>Edit User</button> 

            
          </form>
          </Modal.Body>
      </Modal>
      </>
    );
  }
}

export default EditUser