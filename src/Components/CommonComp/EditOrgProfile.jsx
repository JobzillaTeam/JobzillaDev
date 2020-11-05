import React, { Component } from 'react'
import HeaderAll from './HeaderAll'
import Footer from './Footer'
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom'
import ChangePasswordOrg from '../Auth/ChangePasswordOrg'
import ApiServicesOrg from '../../Services/ApiServicesOrg'

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            imageUrl: '',
            Loading: false,
        }
        this.viewImage = new ApiServicesOrg()
        this.fileService = new ApiServicesOrg()
        this.uploadHandler = this.uploadHandler.bind(this)
    }

    onChangePassModalRef = (obj) => {
        this.showModal = obj && obj.showModal
    }

    changePass = () => {
        this.showModal();
    }

    componentDidMount() {
        this.viewImage.viewProfileImage()
            .then(Response => {
                //console.log(Response.data.responseObject)
                this.setState({
                    imageUrl: Response.data.responseObject
                })
            })
    }
    uploadHandler = (e) => {
        console.log(e.target.files)
        const files = e.target.files
        const token = JSON.parse(localStorage.getItem('userDetails')).authToken;
        const formData = new FormData()
        formData.append(
            'imageFile',
            files[0]
        )
        const formheader = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        }
        // Calling Upload profile photo File Service from Service file:-
        this.fileService.postProfilePhoto(formData, formheader)
            .then(Response => {
                console.log(Response)
                this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Profile Photo uploaded Successfully' }, 60000);
                window.location.reload();
            })

            .catch(error => {
                console.log(error)
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Server Error ' }, 50000)
            })

    }

    render() {
        return (
            <div className="content">
                {/*  Header */}
                <HeaderAll isProfile={true}></HeaderAll>
                {/* Main Content on the page */}
                <div className="content_section main">
                    <Toast ref={(el) => this.toast = el} />
                    <div className="mt-3 mb-3 setting_text1">
                        <Link to="/providerDashboard">
                            <img className="setting_arrow marR5" src="images/EmailSettings/backward-link-arrow.svg" alt="arrow" />
                        </Link>
                            Dashboard</div>

                    <h4>Edit Profile</h4>
                    <div className="d-flex justify-content-between">
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</div>
                        <ChangePasswordOrg ref={this.onChangePassModalRef}> </ChangePasswordOrg>
                        <button className="btn btn-blue" onClick={this.changePass}>Change Password</button>
                        {/* <div> <button className="btn btn-blue">Change Password</button>
                    </div> */}
                    </div>
                    <section className="white-middle-section mt-4">

                        <div className="profile text-center">
                                    <div className="img-wrapper">
                                        <label htmlFor='picture'>
                                            <img src="/images/Dashboard-assets/ar_camera.svg" style={{ cursor: "pointer" }}
                                                data-toggle="tooltip" data-placement="right" title="Upload profile Photo"
                                                className="rounded-circle" width="20px" height="20px" />
                                        </label>
                                        <form style={{ display: "none" }}>
                                            <input type="file" name="imageFile"
                                                accept="image/*;capture=camera" accept=".gif,.jpg,.png,.tif|image/*"
                                                id='picture'
                                                onChange={this.uploadHandler}
                                            />
                                        </form>
                                        {this.state.imageUrl ? <img className="mr-3 rounded-circle" src={`data:image/png;base64,${this.state.imageUrl}`} alt="User profile" width="133px" height="134.59px"/>
                                        : <img className="mr-3 rounded-circle" src="images/Dashboard-assets/user-f.png" alt="User profile"/>}
                                    </div>
                            <div className="pt-3">
                                        <div>Rosa Dodson</div>
                                        <p>Admin</p>
                                    </div>
                        </div>
                                    <h5 className="my-4 pt-3 border-top">Profile Details</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="orgName">Organisation Name</label>
                                                <input type="text" id="orgName" name="orgName" placeholder="ABC Agency" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="userEmail">Official Email</label>
                                                <input type="email" id="userEmail" name="userEmail" placeholder="joedoe@example.com" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="userMobile">Mobile/Landline</label>
                                                <input type="text" id="userMobile" name="userEmail" placeholder="98500 00000" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="userName">Contact Person Name</label>
                                                <input type="text" id="userName" name="userName" placeholder="joe doe" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="gstin">GSTIN</label>
                                                <input type="text" id="gstin" name="gstin" placeholder="GSTIN (optional)" className="form-control" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-3 text-right">
                                        <button className="btn btn-blue mt-2rem">Update</button>
                                    </div>
                    </section>
                </div>
                    <Footer></Footer>
                </div>
        )
    }
}

export default EditProfile
