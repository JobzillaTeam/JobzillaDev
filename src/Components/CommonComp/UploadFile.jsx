import axios from 'axios';

import React, { Component, Fragment } from 'react';
// import Toast from 'light-toast';
import { Toast } from 'primereact/toast';
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import Dropzone from 'react-dropzone';
import LeftNavProvider from '../CommonComp/LeftNavProvider'
import LeftNavCandidate from './LeftNavCandidate';
class UploadProfile extends Component {

    constructor(props) {
        super(props);

    }

    //Code to download sample csv template with API
    downloadEmployeeData = () => {
        fetch('https://techm-jobzilla.herokuapp.com/jobs/user/csvdownload')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'sample.csv';
                    a.click();
                });

            });
    }

    state = {

        selectedFile: '',
        DraggedFile: ''
    };


    onFileChange = event => {

        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileChange1 = (fileAccept) => {

        this.setState({ DraggedFile: fileAccept[0] });
        this.fileValidation()
    };


    // Csv extention validation check on upload button
    fileValidation = () => {
        //    var fileInput = document.getElementById('myFile1');
        //var filePath = fileInput.value;
        var filemode1 = this.state.DraggedFile
        var filemode2 = this.state.selectedFile

        if (filemode1 != '') { var fileInput = filemode1 }
        else { var fileInput = filemode2 }
        console.log(fileInput.name)
        if (fileInput != '') {
            var allowedExtensions = /(\.csv)$/i;
            if (!allowedExtensions.exec(fileInput.name)) {
                this.toast.show({ severity: 'warn', summary: 'Error', detail: 'Please upload file having extensions .csv only.' }, 50000);
                // Toast.info('Please upload file having extensions .csv only.',4000);
                fileInput.value = '';
                return false;
            }
        }

    }

    //Dragging csv file to upload
    uploadFile = () => {

        this.fileValidation()
        const formData = new FormData();

        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
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
        axios
            .post("https://techm-jobzilla.herokuapp.com/jobs/user/uploadcsv", formData, options)

            .then(Response => {
                console.log("Success", Response)
                this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'File uploaded Successfully' }, 50000);
                // this.selectedFile.name= ""
            })

            .catch(error => {
                console.log("Error", error)
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Server Error ' }, 50000);
            })
    }

    render() {
        const { isCandidate } = this.props;
        return (
            <Fragment>
                {(isCandidate) ? <LeftNavCandidate></LeftNavCandidate> :
                    <LeftNavProvider></LeftNavProvider>}
                <div className="maincontent">
                    {(!isCandidate) ? <HeaderAll></HeaderAll> : null}
                    <div className="container-fluid">
                        <Toast ref={(el) => this.toast = el} />
                        <div className="row  main">
                            {/* Content on the page */}
                            <section className="content_section">
                                <div className="ml-0 mr-1">
                                    {(!isCandidate) ? <h5 className="font-weight-400 mt-3">Bulk Profile Upload</h5> : null}
                                    {(!isCandidate) ? <h6 className="mt-3 font-weight-400">
                                        Bulk Upload provides the ability to add Candidate profiles who are getting released from their current organization to the digital workplace. Bulk uploading requires you to provide the Candidate information in a CSV formatted text file and also upload the resumes in zip file only.
                                </h6> : null}
                                    <section className="white-middle-section mt-5">
                                        <div className="row">
                                            {/* CSV file upload */}

                                            <div className="col-md-6 offset-md-3 p-4">

                                                <div className="text-center mt-5">
                                                    <Dropzone
                                                        onDrop={this.onFileChange1}
                                                        accept=".csv"
                                                    >
                                                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                            /* const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize; */
                                                            return (

                                                                <div {...getRootProps({ className: "dropzone" })}>
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
                                                {/* <p className="text-center pt-4 mb-0">Drag and drop a file here</p> */}
                                                <p className="text-center">or</p>
                                                <form action="">
                                                    <div className="text-center d-flex justify-content-center">
                                                        <div className="file-field d-flex-inline">
                                                            <div className="btn btn-primary btn-sm float-left waves-effect waves-light">
                                                                <span>Choose file</span>
                                                                <input type="file" id="myFile" name="filename" accept=".csv" files multiple onChange={this.onFileChange} />

                                                            </div>
                                                            <div className="file-path-wrapper">
                                                                <input className="file-path validate" type="text" value={this.state.selectedFile.name} placeholder="No file choosen" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex-inline">
                                                            <img src="/images/Dashboard-assets/csv.svg" className="pt-1" alt="csv icon" />
                                                            {(!isCandidate) ? <span className="pl-2 fontMiddle">CSV File</span> : null}
                                                        </div>

                                                    </div>
                                                </form>
                                                {(!isCandidate) ? <p className="text-center mt-4">Upload the CSV file with candidate details here. All fields in the CSV file are mandatory for successful creation of Candidate profile.</p> : null}
                                                {/* Download sample file with API input */}
                                                {(!isCandidate) ? <a className="download_sample_link d-block text-center" href="#" onClick={this.downloadEmployeeData}>Download CSV file template</a> : null}

                                                {/* Download sample file from applicatin level
                                            <a className="download_sample_link d-block text-center" href="Samples/JobZilla.csv">Download CSV file template</a> */}
                                            </div>
                                            {/* ZIp file upload section */}
                                            {/* <div className="col-md-6  p-4">
                                            <img src="/images/Dashboard-assets/cloud-upload.svg" alt="cloud upload icon" className="cloud_upload_logo"/>
                                            <p className="text-center pt-4 mb-0">Drag and Drop a file here</p>
                                            <p className="text-center">or</p>                                        
                                            <div className="text-center d-flex justify-content-center">
                                                <div class="file-field d-flex-inline">
                                                    <div class="btn btn-primary btn-sm float-left waves-effect waves-light">
                                                        <span>Choose file</span>
                                                        <input type="file" id="myFile" name="filename" accept=".csv" files multiple onChange={this.onFileChange} />
                                                    
                                                    </div>
                                                    <div class="file-path-wrapper">
                                                        <input class="file-path validate" type="text" value={this.state.selectedFile.name} placeholder="No file choosen"/> 
                                                    </div>
                                                </div>
                                                <div className="d-flex-inline">
                                                    <img src="/images/Dashboard-assets/csv.svg" className="pt-1" alt="csv icon" />
                                                    <span class="pl-2 fontMiddle">ZIP File</span>
                                                </div>
                                            
                                            </div>
                                            <p className="text-center mt-4">Upload the Zip file with candidate resumes here.</p>
                                            <a className="download_sample_link d-block text-center">Download sample file</a>
                                            
                                        </div> */}
                                        </div>
                                    </section>
                                    <div className="ml-2 mt-4">
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

