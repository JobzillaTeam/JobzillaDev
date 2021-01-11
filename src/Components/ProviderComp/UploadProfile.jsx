import React, { Component, Fragment } from 'react';
import { Toast } from 'primereact/toast';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import Dropzone from 'react-dropzone';
import LeftNavProvider from '../CommonComp/LeftNavProvider'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import RenderLoader from '../CommonComp/Loader';
import { Modal } from 'react-bootstrap'

class UploadProfile extends Component {
    constructor(props) {
        super(props);
        this.fileService = new ApiServicesOrg()
    }

    downloadEmployeeData = () => {
        // Calling Download Sample File Service from Service file:-
        this.fileService.fetchSampleFile()
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'CandidateInfo.csv';
                    a.click();
                })
            })
    }

    state = {
        selectedFile: '',
        DraggedFile: '',
        select: false,
        drag: false,
        isLoading: false,
        show: false,
        duplicateId: [],
        successfullEmail: [],
        rowNosWithAbsenceOfMandatoryFields: []
    };

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    onUploadClick = () => {
        this.showModal();
        return this.state.duplicateId

    }

    onFileChange = event => {
        if (this.state.drag == true) {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'You have already Selected  a file' }, 50000);
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
    }
    // Csv extention validation check on upload button
    fileValidation = () => {
        var filemode1 = this.state.DraggedFile
        var filemode2 = this.state.selectedFile

        if (filemode1 != '') { var fileInput = filemode1 }
        else { var fileInput = filemode2 }

        if (fileInput != '') {
            var allowedExtensions = /(\.csv)$/i;
            if (!allowedExtensions.exec(fileInput.name)) {
                this.toast.show({ severity: 'warn', summary: 'Error', detail: 'Please upload file having extensions .csv only.' }, 50000);
                fileInput.value = '';
                return false;
            }
            return true
        }
    }

    //Dragging csv file to upload
    uploadFile = () => {
        if (this.fileValidation()) {

            const formData = new FormData();
            const token = localStorage.getItem('authToken');
            const formheader = {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            var supervisorId = ''
            // Calling Upload Sample File Service from Service file:-
            if (JSON.parse(localStorage.getItem('userDetails')).userRole === "Owner") {
                supervisorId = JSON.parse(localStorage.getItem('userDetails')).id
            }
            else {
                supervisorId = JSON.parse(localStorage.getItem('userDetails')).supervisorId;
            }
            const orgId = JSON.parse(localStorage.getItem('userDetails')).orgnaizationId;
            this.setState({
                isLoading: true
            });
            this.fileService.postSampleFile(formData, formheader, orgId, supervisorId)
                .then(Response => {
                    if (Response.data.responseObject.duplicateEmailList) {
                        this.setState({
                            duplicateId: Response.data.responseObject.duplicateEmailList,
                        })
                        if (Response.data.responseObject.successfullyAddedEmailList) {
                            this.setState({
                                successfullEmail: Response.data.responseObject.successfullyAddedEmailList,
                            })
                        }
                        if (Response.data.responseObject.rowNosWithAbsenceOfMandatoryFields) {
                            this.setState({
                                rowNosWithAbsenceOfMandatoryFields: Response.data.responseObject.rowNosWithAbsenceOfMandatoryFields,
                            })
                        }
                        this.onUploadClick()

                    }

                    this.setState({
                        isLoading: false
                    })
                })
                .catch(error => {
                })
        }
        this.setState({
            select: false,
            drag: false
        })
    }

    render() {
        return (
            <Fragment>
                <Modal className=" modal1 modal-dialog modal-lg"
                    show={this.state.show}
                    onHide={() => this.hideModal(false)}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Toast className="toast_padding" ref={(el) => this.toast = el} />
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title-csv" id="contained-modal-title-vcenter">
                            File Upload Report
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="duplicateID ">
                        {this.state.duplicateId.length > 0 ?
                            <>
                                <p className=" marL38 modal-body-title">Candidate profile(s) that could not be created as the email id(s) already exists in system:</p>
                                <ol className="marL50 modal-body-content">
                                    {this.state.duplicateId.map(duplicateId => {
                                        return <li className="modal-body-content">{duplicateId}</li>
                                    })}</ol>
                            </> : <div></div>}

                        {this.state.successfullEmail.length > 0 ?
                            <>
                                <p className=" marL38 modal-body-title">Candidate profile(s) that were successfully created:</p>
                                <ol className=" marL50 modal-body-title">
                                    {this.state.successfullEmail.map(successfullEmail => {
                                        return <li className="modal-body-content">{successfullEmail}</li>
                                    })}
                                </ol>
                            </> : <div></div>}

                        {this.state.rowNosWithAbsenceOfMandatoryFields.length > 0 ?
                            <>
                                <p className=" marL38 modal-body-title">Candidate profile(s) that could not be created for the following record(s) in CSV as mandatory fields were missed out:</p>
                                <ol className="marL50 modal-body-title">
                                    {this.state.rowNosWithAbsenceOfMandatoryFields.map(rowNosWithAbsenceOfMandatoryFields => {
                                        return <li className="modal-body-content"> Row:{rowNosWithAbsenceOfMandatoryFields}</li>
                                    })}
                                </ol>
                            </> : <div></div>}
                    </Modal.Body>
                </Modal>

                <LeftNavProvider></LeftNavProvider>
                <div className="maincontent">
                    <HeaderAll></HeaderAll>
                    <div className="container-fluid">
                        <Toast className="toast_padding" ref={(el) => this.toast = el} />
                        <div className="row  main">
                            {/* Content on the page */}
                            <section className="content_section upload_profile_padding">
                                <div className="ml-0 mr-1">
                                    <div className="bulkUploadText">
                                        <h5 className="font-weight-400 mt-3">Bulk Profile Upload</h5>
                                        <h6 className="mt-3 font-weight-400">
                                            Bulk Upload provides the ability to add Candidate profiles who are getting released from their current organization to the digital workplace. Bulk uploading requires you to provide the Candidate information in a CSV formatted text file only.
                                    </h6>
                                    </div>
                                    <section className="white-middle-section3 mt-5">
                                        <div className="row">
                                            {/* CSV file upload */}
                                            <div className="col-md-6 offset-md-3 p-4">

                                                <div className="text-center mt-5">
                                                    <Dropzone
                                                        onDrop={this.onFileChange1}
                                                    >
                                                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                            return (
                                                                <div {...getRootProps({ className: "dropzone1" })}>
                                                                    <img src="/images/Dashboard-assets/cloud-upload.svg" alt="cloud upload" className="cloud_upload_logo pb-2" />
                                                                    <input {...getInputProps()} />

                                                                    {!isDragActive && 'Click here or drop a file to upload!'}
                                                                    <div className="file-path-wrapper font-blue">
                                                                        <input className="file-path validate" type="text" value={this.state.DraggedFile.name} placeholder="" />

                                                                    </div>

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
                                                                <input type="file" id="myFile" name="filename" accept=".csv" files multiple onChange={this.onFileChange} />

                                                            </div>
                                                            <div className="file-path-wrapper">
                                                                <input className="file-path validate" type="text" value={this.state.selectedFile.name} placeholder="No file choosen" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <p className="text-center mt-4">Upload the CSV file with candidate details here. All * marked fields in the CSV file are mandatory for successful creation of Candidate profile.</p>
                                                {/* Download sample file with API input */}
                                                <a className="download_sample_link d-block text-center" href="#" onClick={this.downloadEmployeeData}>Download CSV file template</a>
                                                {this.state.isLoading ? <div class="pt-4"><RenderLoader /></div> : null}
                                            </div>
                                        </div>
                                    </section>
                                    <div className="ml-2 mt-4 marB-40">
                                        <button type="button" className="btn btn-blue" onClick={this.uploadFile}>Upload</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </Fragment>

        );
    }
}

export default UploadProfile; 
