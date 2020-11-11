import { Button,Modal } from 'react-bootstrap'
import React,{ Component } from 'react';
import  {Toast} from 'primereact/toast'
import ApiServicesOrg from '../../../Services/ApiServicesOrg'
import { MAX_LENGTH } from "../../../Utils/AppConst";
//import axios from 'axios'
//import { Toast } from 'primereact/toast';
class InterviewStatusPopUp extends Component{
    constructor(props) {
      super(props);
      this.state = {
        
        fields:{},
        errors: {},
        touched: {},
        remainingTextLength: {
          comment: MAX_LENGTH
         
        },
        show: false,
        formSubmitted: false,
        submitDisabled: true    
      }
      this.interViewStatus=new ApiServicesOrg();
      this.onEditStatus = this.onEditStatus.bind(this);
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
        const { name, value } = e.target;
        const { values, errors, remainingTextLength, isFormValid } = this.state;
        if (name === 'comment') {
        this.setState({
          fields,
          submitDisabled:false,
          remainingTextLength: { ...remainingTextLength, [name]: value ? MAX_LENGTH - value.length : MAX_LENGTH }
        })
      }
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
      onEditStatus = (e) => {
        e.preventDefault();
        this.setState({
          formSubmitted: true,
        });
        if(this.validateForm()){
          let fields = {};
          fields["interviewStatus"] = "";
          fields["comment"] = "";
          
          this.setState({ 
            fields: fields,
          });
          // this.state.fields['candidateId'] = localStorage.getItem('candidateId');
          // this.state.fields['jobId'] = localStorage.getItem('JobId');
              this.interViewStatus.updateInterviewStatus(this.state.fields)
                .then(Response=>{
                  console.log(Response)
                  this.hideModal()
                  window.location.reload()
                
                })
                .catch(error=>{
                this.toast.show({severity: 'error', summary: 'Error', detail: 'Server Error '},20000);})
                this.toast.show({severity: 'success', summary: 'Success Message', detail: 'User is added Successfully'},20000);
                
              
                    
             localStorage.setItem("Interview Status",JSON.stringify(this.state.fields))
        }
      }    

    
      validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["interviewStatus"]) {
            formIsValid = false;
            errors["interviewStatus"] = "*Please select Interview Status";
          }
        if (!fields["comment"]) {
          formIsValid = false;
          errors["comment"] = "*Please enter comments";
        }
    
        this.setState({
          errors: errors,
          submitDisabled: !formIsValid
        });
        return formIsValid;
      }
      render(){
        const {remainingTextLength}=this.state
        return (
          <>
          {/* Below button is used to call the modal popup .please remove once you call this from manage user */}
          {/*<Button onClick={() =>this.showModal(true)}>Small modal</Button>*/}
          {/* <Toast ref={(el) => this.toast = el} /> */}
          <Modal
        show={this.state.show}
        onHide={() => this.hideModal(false)}
        aria-labelledby="contained-modal-title-vcenter"> 
          <Modal.Header closeButton>
            <Modal.Title className="sub-title" id="contained-modal-title-vcenter">
              Edit 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <Toast ref={(el) => this.toast = el} />
          
                  <div className="form-group">
                      <label htmlFor="interviewStatus">Interview Status</label>
                      <select id="interviewStatus" name="interviewStatus" className="form-control" value={this.state.fields.interViewStatus} onChange={ (e) => {this.handleChange(e); this.validateForm()} }
                      onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } >
                      {
                          this.state.formSubmitted ?
                          <div className="errorMsg">{this.state.errors.interViewStatus}</div>:''                   
                      } 
                        <option>Select Status</option>
                        <option value="interviewed">Interviewed</option>
                          <option value="selected">Selected</option>
                          <option value="rejected">Rejected</option>
                          <option value="offered">Offered</option>
                          <option value="joined">Joined</option>
                          
                      </select>
                  </div> 
                  
                  <div className="form-group">
                      <label htmlFor="comment">comments</label>
                      <textarea id="comment" name="comment"   maxLength={MAX_LENGTH} className="form-control" value={this.state.fields.comment} onChange={ (e) => {this.handleChange(e);this.validateForm();} }
                      onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
                      {
                          this.state.formSubmitted || this.state.touched.comment?
                          <div className="errorMsg">{this.state.errors.comment}</div>:''                   
                      }
                        <small className='float-right'>{remainingTextLength.comment} Character(s) Left</small>
                  </div>
                  <button className="btn btn-blue float-right px-4" disabled={this.state.submitDisabled}  onClick={this.onEditStatus}>Save</button> 

            
                  </form>
          </Modal.Body>
      </Modal>
      </>
    );
  }
}



export default InterviewStatusPopUp