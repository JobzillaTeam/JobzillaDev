import React, { Component } from "react";
import HeaderAll from "./HeaderAll";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import ApiServicesOrg from "../../Services/ApiServicesOrg";
import ChangePasswordOrg from "../Auth/ChangePasswordOrg";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
      orgName: "",
      officialEmail: "",
      contactPersonName: "",
      gstin: "",
      mobile: "",
    };
    this.viewImage = new ApiServicesOrg();
  }
  editProfileCall = () => {
    this.props.history.push("/editOrgProfile");
  };

  componentDidMount() {
    //To show image
    this.viewImage.viewProfileImage().then((Response) => {
      this.setState({
        imageUrl: Response.data.responseObject,
      });
    });

    this.viewImage.getUserProfile().then((Response) => {
      let getOrgName = "";
      let getOfficialEmail = "";
      let getContactPersonName = "";
      let getGstin = "";
      let getMobile = "";
      if (Response && Response.data && Response.data.responseObject) {
        getOrgName = JSON.stringify(
          Response.data.responseObject.organizationName
        );
        getOfficialEmail = JSON.stringify(Response.data.responseObject.email);
        getContactPersonName = JSON.stringify(Response.data.responseObject.userName);
        getGstin = Response.data.responseObject.gstin
          ? JSON.stringify(Response.data.responseObject.gstin)
          : "";
        getMobile = JSON.stringify(Response.data.responseObject.contactNumber);
      }

      this.setState({
        orgName: getOrgName.slice(1, -1),
        officialEmail: getOfficialEmail.slice(1, -1),
        contactPersonName: getContactPersonName.slice(1, -1),
        gstin: getGstin.slice(1, -1),
        mobile: getMobile.slice(1, -1),
      });
    });
  }
  onChangePassModalRef = (obj) => {
    this.showModal = obj && obj.showModal;
  };
  changePass = () => {
    this.showModal();
  };

  render() {
    return (
      <div className="content">
        {/*  Header */}
        <HeaderAll isProfile={true}></HeaderAll>
        {/* Main Content on the page */}
        <div className="content_section main marT60 top-padding">
          <div className="mt-3 mb-3 setting_text1">
            <Link className="backtodashboard" to="/providerDashboard">
              <img className="setting_arrow marR5"
                src="images/EmailSettings/backward-link-arrow.svg"></img>
                                      Dashboard
                                    </Link>
          </div>

          <h4>My Profile</h4>
          <div className="d-flex justify-content-between">
            <div className="editHeading">
              You can manage your profile details and change password from here
            </div>
            <ChangePasswordOrg ref={this.onChangePassModalRef}>
              {" "}
            </ChangePasswordOrg>
            <button className="btn btn-blue" onClick={this.changePass}>
              Change Password
            </button>
          </div>
          <section className="top-padding top-margin white-middle-section mt-4">
            <div className="profile text-center">
              <div className="text-center">
                {this.state.imageUrl ? (
                  <img
                    className="mr-3 rounded-circle"
                    src={`data:image/png;base64,${this.state.imageUrl}`}
                    alt="User profile"
                    width="133px"
                    height="133px"
                  />
                ) : (
                    <img
                      className="mr-3 rounded-circle"
                      src="images/Dashboard-assets/user-f.png"
                      alt="User profile"
                      width="133px"
                      height="133px"
                      alt="User profile"
                      width="133px"
                      height="133px"
                    />
                  )}
              </div>

              <div className="pt-3 orgProfileFont">
                {this.state.contactPersonName}
              </div>
              <p className="orgProfileFont">{JSON.parse(localStorage.getItem("userDetails")).userRole}</p>
            </div>

            <h6 className="top-padding mt-4 pt-3 border-top profileDetailFont">
              Profile Details
            </h6>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-sm-4 orgProfileFont">
                    Organisation Name :{" "}
                  </div>
                  <div className="col-sm-8">{this.state.orgName}</div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4 orgProfileFont">
                    Official Email :{" "}
                  </div>
                  <div className="col-sm-8">{this.state.officialEmail}</div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4 orgProfileFont">
                    Mobile/Landline :{" "}
                  </div>
                  <div className="col-sm-8">{this.state.mobile}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-sm-4 orgProfileFont">
                    Contact Person Name:{" "}
                  </div>
                  <div className="col-sm-8">{this.state.contactPersonName}</div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-4 orgProfileFont">GSTIN : </div>
                  <div className="col-sm-8">{this.state.gstin}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="btn btn-blue marB-50" onClick={this.editProfileCall}>
                Edit Profile
              </button>
            </div>
          </section>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Profile;