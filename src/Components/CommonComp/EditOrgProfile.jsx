import React, { Component } from "react";
import HeaderAll from "./HeaderAll";
import Footer from "./Footer";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import ChangePasswordOrg from "../Auth/ChangePasswordOrg";
import ApiServicesOrg from "../../Services/ApiServicesOrg";
import RenderLoader from '../CommonComp/Loader';
class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
      Loading: false,
      orgName: "",
      officialEmail: "",
      contactPersonName: "",
      gstin: "",
      mobile: "",
      isLoading: false,
      userRole: localStorage.getItem("userRole")
    };
    this.viewImage = new ApiServicesOrg();
    this.fileService = new ApiServicesOrg();
    this.uploadHandler = this.uploadHandler.bind(this);

    this.changeOrgNameHandler = this.changeOrgNameHandler.bind(this);
    this.changeOfficialEmailHandler = this.changeOfficialEmailHandler.bind(
      this
    );
    this.changeContactPersonNameHandler = this.changeContactPersonNameHandler.bind(
      this
    );
    this.changeGstInHandler = this.changeGstInHandler.bind(this);
    this.changeMobileHandler = this.changeMobileHandler.bind(this);
    this.UpdateProfile = this.UpdateProfile.bind(this);
  }

  //To update profile
  UpdateProfile(e) {
    e.preventDefault();
    let employee = {
      organizationName: this.state.orgName,
      email: this.state.officialEmail,
      contactPerson: this.state.contactPersonName,
      gstin: this.state.gstin,
      phoneNumber: this.state.mobile,
      id: localStorage.getItem("organizationId"),
    };
    let data = {
      userName: this.state.contactPersonName,
      contactNumber: this.state.mobile,
      id: JSON.parse(localStorage.getItem('userDetails')).id,
    };

    const userRole = this.state.userRole
    //If user role is owner
    if (userRole === "Owner") {
      this.viewImage.updateOrganizationProfile(employee).then((res) => {
        this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Profile Updated Successfully' }, 20000);
        setTimeout(() => {
          this.props.history.push("/orgProfile");
        }, 1000)

      }).catch(error => {
        if (error) {
          this.toast.show({ severity: 'success', summary: 'Error Message', detail: 'Something Went Wrong' }, 20000);
        }
      })
    } else {
      this.viewImage.putUserProfile(data).then((res) => {
        this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Profile Updated Successfully' }, 20000);
        setTimeout(() => {
          this.props.history.push("/orgProfile");
        }, 1000)

      }).catch(error => {
        if (error) {
          this.toast.show({ severity: 'success', summary: 'Error Message', detail: 'Something Went Wrong' }, 20000);
        }
      })

    }
  }

  changeOrgNameHandler = (event) => {
    this.setState({ orgName: event.target.value });
  };

  changeContactPersonNameHandler = (event) => {
    this.setState({ contactPersonName: event.target.value });
  };

  changeOfficialEmailHandler = (event) => {
    this.setState({ officialEmail: event.target.value });
  };

  changeGstInHandler = (event) => {
    this.setState({ gstin: event.target.value });
  };

  changeMobileHandler = (event) => {
    this.setState({ mobile: event.target.value });
  };
  onChangePassModalRef = (obj) => {
    this.showModal = obj && obj.showModal;
  };

  changePass = () => {
    this.showModal();
  };

  componentDidMount() {
    //To view image
    this.viewImage.viewProfileImage().then((Response) => {
      this.setState({
        imageUrl: Response.data.responseObject,
      });
    });

    //To get user profile details
    this.viewImage.getUserProfile().then((Response) => {
      let getOrgName = "";
      let getOfficialEmail = "";
      let getContactPersonName = "";
      let getGstin = "";
      let getMobile = "";
      let getRole = "";
      if (Response) {
        getOrgName = JSON.stringify(
          Response.data.responseObject.organizationName
        );
        getOfficialEmail = JSON.stringify(Response.data.responseObject.email);
        getContactPersonName = JSON.stringify(Response.data.responseObject.userName);
        getGstin = JSON.stringify(Response.data.responseObject.gstin);
        getGstin = Response.data.responseObject.gstin
          ? JSON.stringify(Response.data.responseObject.gstin)
          : "";
        getMobile = JSON.stringify(Response.data.responseObject.contactNumber);
        getRole = JSON.stringify(Response.data.responseObject.userRole);
      }

      this.setState({
        orgName: getOrgName.slice(1, -1),
        officialEmail: getOfficialEmail.slice(1, -1),
        contactPersonName: getContactPersonName.slice(1, -1),
        gstin: getGstin.slice(1, -1),
        mobile: getMobile.slice(1, -1),
        userRole: getRole.slice(1, -1)
      });
    });
  }

  //To upload profile photo
  uploadHandler = (e) => {
    const files = e.target.files;
    var fileInput = files[0]
    var filePath = fileInput.name;
    var allowedExtensions = (/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/);
    if (!allowedExtensions.exec(filePath)) {
      this.toast.show({ severity: 'warn', summary: 'Error', detail: 'Please upload file having extensions .jpg, jpeg or .png' }, 50000);
      fileInput = ""
      return false;
    } else {
      const token = JSON.parse(localStorage.getItem("userDetails")).authToken;
      const formData = new FormData();
      formData.append("imageFile", files[0]);
      const formheader = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };
      this.setState({
        isLoading: true
      });
      // Calling Upload profile photo File Service from Service file:-
      this.fileService
        .postProfilePhoto(formData, formheader)
        .then((Response) => {
          this.setState({
            isLoading: false
          })
          window.location.reload();
        })

        .catch((error) => {
          this.toast.show(
            { severity: "error", summary: "Error", detail: "Server Error " },
            50000
          );
        });

    }
  };

  render() {
    const userRole = this.state.userRole
    return (
      <div className="content">
        {/*  Header */}
        <HeaderAll isProfile={true}></HeaderAll>
        {/* Main Content on the page */}
        <div className="content_section marT60 main top-padding">
          <Toast className="toast_padding" ref={(el) => (this.toast = el)} />
          <div className="mt-3 mb-3 setting_text1">
            <Link className="backtodashboard" to="/providerDashboard">
              <img className="setting_arrow marR5"
                src="images/EmailSettings/backward-link-arrow.svg"></img>
                                     Dashboard
                                    </Link>
          </div>

          <h4>Edit Profile</h4>
          <div className="d-flex justify-content-between">
            <div>
              You can manage your profile details and change password from here
            </div>
            <ChangePasswordOrg ref={this.onChangePassModalRef}>
              {" "}
            </ChangePasswordOrg>
            <button className="btn btn-blue" onClick={this.changePass}>
              Change Password
            </button>
          </div>
          <section className="top-padding white-middle-section mt-4">
            <div className="profile text-center">
              <div className="img-wrapper">
                <label htmlFor="picture">
                  <img
                    src="images/Dashboard-assets/ar_camera.svg"
                    style={{ cursor: "pointer" }}
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Upload profile Photo"
                    className="rounded-circle"
                    width="20px"
                    height="20px"
                  />
                </label>
                <form style={{ display: "none" }}>
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/*;capture=camera"
                    accept=".gif,.jpg,.png,.tif|image/*"
                    id="picture"
                    onChange={this.uploadHandler}
                  />
                </form>
                {this.state.imageUrl ? (
                  <img
                    className="mr-3 rounded-circle"
                    src={`data:image/png;base64,${this.state.imageUrl}`}
                    alt="User profile"
                    width="133px"
                    height="134.59px"
                  />
                ) : (
                    <img
                      className="mr-3 rounded-circle"
                      src="images/Dashboard-assets/user-f.png"
                      alt="User profile"
                      width="133px"
                      height="134.59px"
                    />
                  )}
              </div>
              {this.state.isLoading ? <div class="pt-4"><RenderLoader /></div> : null}
              <div className="pt-3">
                <div className="orgProfileFont">{this.state.contactPersonName}</div>
                <p className="orgProfileFont">{JSON.parse(localStorage.getItem("userDetails")).userRole}</p>
              </div>
            </div>
            <h5 className="top-margin my-4 pt-3 border-top">Profile Details</h5>
            <form>
              <div className="row">
                <div className="col-md-6">
                  {(userRole === "Admin" || userRole === "User") ?
                    <div className="form-group">
                      <label htmlFor="orgName">Organisation Name</label>
                      <input
                        type="text"
                        id="orgName"
                        name="orgName"
                        placeholder="ABC Agency"
                        className="form-control"
                        disabled
                        defaultValue={this.state.orgName}
                        onChange={this.changeOrgNameHandler}
                      />
                    </div> : <div className="form-group">
                      <label htmlFor="orgName">Organisation Name</label>
                      <input
                        type="text"
                        id="orgName"
                        name="orgName"
                        placeholder="ABC Agency"
                        className="form-control"
                        defaultValue={this.state.orgName}
                        onChange={this.changeOrgNameHandler}
                      />
                    </div>}
                  <div className="form-group">
                    <label htmlFor="officialEmail">Official Email</label>
                    <input
                      type="email"
                      id="officialEmail"
                      name="officialEmail"
                      placeholder="joedoe@example.com"
                      className="form-control"
                      disabled
                      defaultValue={this.state.officialEmail}
                      onChange={this.changeOfficialEmailHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile/Landline</label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="98500 00000"
                      className="form-control"
                      defaultValue={this.state.mobile}
                      onChange={this.changeMobileHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contactPersonName">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      id="contactPersonName"
                      name="contactPersonName"
                      placeholder="joe doe"
                      className="form-control"
                      defaultValue={this.state.contactPersonName}
                      onChange={this.changeContactPersonNameHandler}
                    />
                  </div>
                  {(userRole === "Admin" || userRole === "User") ?
                    <div className="form-group">
                      <label htmlFor="gstin">GSTIN</label>
                      <input
                        type="text"
                        id="gstin"
                        name="gstin"
                        placeholder="GSTIN (optional)"
                        className="form-control"
                        disabled
                        defaultValue={this.state.gstin}
                        onChange={this.changeGstInHandler}
                      />
                    </div> : <div className="form-group">
                      <label htmlFor="gstin">GSTIN</label>
                      <input
                        type="text"
                        id="gstin"
                        name="gstin"
                        placeholder="GSTIN (optional)"
                        className="form-control"
                        defaultValue={this.state.gstin}
                        onChange={this.changeGstInHandler}
                      />
                    </div>}
                </div>
              </div>
              <div className="top-margin mt-3 text-right">
                <button
                  className="top-margin btn btn-blue mt-2rem marB-50"
                  onClick={this.UpdateProfile}
                >
                  Update
                </button>
              </div>
            </form>
          </section>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default EditProfile;
