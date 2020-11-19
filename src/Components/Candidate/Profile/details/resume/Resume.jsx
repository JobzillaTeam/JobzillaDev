import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast'
import axios from 'axios'
import ApiServicesOrgCandidate from '../../../../../Services/ApiServicesOrgCandidate';


class Resume extends Component {

  constructor(props) {
    super(props);
    this.fileService1 = ApiServicesOrgCandidate
    this.hideDialog = this.hideDialog.bind(this);
    this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
    this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
  }

  //Download Resume

  downloadResume = () => {

    // Calling Download Resume File Service from Service file:-
    var blob;
    this.fileService1.fetchResumeFile()
      .then(Response => {
        var data1 = Response.data.responseObject
        blob = this.convertBase64toBlob(data1, 'application/msword');
        var blobURL = URL.createObjectURL(blob)
        var blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
      })
  }

  convertBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
  }

  //Delete Resume
  deleteResume = () => {

    // Calling Download Sample File Service from Service file:-
    this.fileService1.deleteSampleFile()
      .then(response => {
        localStorage.removeItem("SelectedFile")
        this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'User Deleted Successfully' }, 60000);

      })
      .catch(error => {
        console.log("Error Occured...", error)
      })




    this.setState({
      deleteProductDialog: false
    })

  }

  //Delete Resume  
  state = {
    select: false,
    drag: false,
    selectedFile: '',
    DraggedFile: '',
    productDialog: false,
    deleteProductDialog: false,
    submitted: false,
    showing: true,
    submitDisabled: true
  };

  onFileChange = event => {

    if (this.state.drag == true) {
      this.toast.show({ severity: 'error', summary: 'Error', detail: 'You have already dragged  a file' }, 50000);
    }
    else {
      this.setState({
        selectedFile: event.target.files[0],
        select: true
      });
    }

  };


  onFileChange1 = (fileAccept) => {
    if (this.state.select == true) {
      this.toast.show({ severity: 'error', summary: 'Error', detail: 'You have already selected  a file' }, 50000);
    }
    else {
      this.setState({
        DraggedFile: fileAccept[0],
        drag: true
      });
      this.fileValidation()
    };

  };


  fileValidation = () => {
    var filemode1 = this.state.DraggedFile
    var filemode2 = this.state.selectedFile
    if (filemode1 != '') { var fileInput = filemode1 }
    else { var fileInput = filemode2 }

    if (fileInput != '') {
      var allowedExtensions = /(\.doc|\.docx|\.pdf)$/i;
      // var allowedExtensions = /(\.doc)$/i;
      if (!allowedExtensions.exec(fileInput.name)) {
        this.toast.show({ severity: 'warn', summary: 'Error', detail: 'Please upload file having extensions .doc and .docx only.' }, 50000);
        console.log("Please upload file having extensions .doc and .docx only.")
        fileInput.value = '';
        return false;
      }
      return true
    }
  }

  //Dragging doc file to upload
  uploadFile = (e) => {
    e.preventDefault()

    if (this.fileValidation()) {
      const formData = new FormData();
      const token = JSON.parse(localStorage.getItem('userDetails')).authToken;
      console.log(token)
      const formheader = {

        headers: {
          //'Content-Type':'multipart/form-data',
          'Authorization': 'Bearer ' + token
        }
      };

      if (this.state.DraggedFile) {
        formData.append(
          "file",
          this.state.DraggedFile,
        );
      }
      else {
        formData.append(
          "file",
          this.state.selectedFile,
        );
      }

      // Calling Upload Sample File Service from Service file:-
      this.fileService1.postResumeFile(formData, formheader)

        .then(Response => {

          localStorage.setItem("SelectedFile", this.state.selectedFile.name || this.state.DraggedFile.name)
          this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'File uploaded Successfully' }, 60000);
          window.location.reload()

        },
        )

        .catch(error => {
          this.toast.show({ severity: 'error', summary: 'Error', detail: 'Server Error ' }, 50000);
        })
    }
    this.setState({

      showing: false
    })

    this.setState({
      select: false,
      drag: false
    })

  }

  hideDialog() {
    this.setState({
      submitted: false,
      productDialog: false
    });
  }
  hideDeleteProductDialog() {
    this.setState({ deleteProductDialog: false });
  }
  confirmDeleteProduct(product) {
    this.setState({
      product,
      deleteProductDialog: true
    });
  }
  confirmDeleteSelected() {
    this.setState({ deleteProductsDialog: true });
  }

  render() {
    const { showing } = this.state
    const deleteProductDialogFooter = (
      <>
        <Toast ref={(el) => this.toast = el} />
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteResume} />
      </>
    );

    return (

      <div class="bg-white px-4 py-4 section-divider align-items-center">
        <Toast ref={(el) => this.toast = el} />
        <div class="col">
          <div class="mb-4 align-items-center">
            <img src="/images/Dashboard-assets/resume-icon.svg" alt="Cinque Terre" class="mr-2" />
            <span class="subtitle-semi-bold">Upload Resume</span>
          </div>
        </div>
        <div class="col-12 mb-3">
          <img src="/images/Dashboard-assets/candidate/push-chevron-down-o.png" alt="Cinque Terre" class="ml-4 mr-2 left-sec-icon profile__editIcon" onClick={this.downloadResume} />
          <span class="mr-3" style={{ color: '#007EFF' }}>{localStorage.getItem("SelectedFile")}</span>
          <span class="mr-3" style={{ color: '#007EFF' }}>{localStorage.getItem("DraggedFile")}</span>
          {/* <span>Last updated on 10 sept 2020</span> */}

          <span class="float-right"> {localStorage.getItem("SelectedFile") || localStorage.getItem("DraggedFile")
            ? <a className="download_sample_link d-block" href="#" onClick={this.confirmDeleteProduct}>Delete Resume</a>
            : <a className="download_sample_link d-block disabledCursor " href="#" >Delete Resume</a>}</span>
        </div>
        <div class="col">
          <section className="content_section">
            <div className="ml-0 mr-1">
              <section className="white-middle-section mt-5">
                <div className="row">
                  {/*  file upload */}
                  <div className="col-md-6 offset-md-3 p-4">
                    <div className="text-center mt-5">
                      <Dropzone
                        onDrop={this.onFileChange1}
                      >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                          return (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <img src="/images/Dashboard-assets/cloud-upload.svg" alt="cloud upload" className="cloud_upload_logo pb-2" />
                              <input {...getInputProps()} />
                              {!isDragActive && 'Click here or drop a file to upload!'}
                              {showing ?
                                <div className="file-path-wrapper font-blue">
                                  <input className="file-path validate" type="text" value={this.state.DraggedFile.name} placeholder="" />
                                </div> : null}
                              {isDragActive && !isDragReject && "Drop it like it's hot!"}
                              {isDragReject && "File type not accepted, sorry!"}
                            </div>
                          )
                        }
                        }
                      </Dropzone>
                    </div>
                    <p className="text-center">or</p>
                    <form action="">
                      <div className="text-center d-flex justify-content-center">
                        <div className="file-field d-flex-inline">
                          <div className="btn btn-blue btn-sm float-left waves-effect waves-light">
                            <span>Choose file</span>
                            <input type="file" id="myFile" name="filename" accept="application/pdf,application/msword,  application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={this.onFileChange} />
                          </div>
                          <div>

                          </div>
                          {/* { showing ? */}

                          <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" value={this.state.selectedFile.name} placeholder="No file choosen" />
                            {console.log(showing)}

                          </div>
                          {/* /* : null */}
                        </div>
                      </div>
                    </form>
                    <p className="text-center mt-4"></p>
                  </div>
                </div>
              </section>
              <div className="ml-2 mt-4">
                <button type="button" className="btn btn-blue" onClick={this.uploadFile}>Upload</button>
              </div>
              <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                <div className="confirmation-content">
                  <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                  <span>Are you sure you want to delete</span>
                </div>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Resume;