import React, { Component } from "react";
import HeaderAll from "./HeaderAll";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import ApiServicesOrg from "../../Services/ApiServicesOrg";

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
    this.viewImage.viewProfileImage().then((Response) => {
      //console.log(Response.data.responseObject)
      this.setState({
        imageUrl: Response.data.responseObject,
      });
    });

    this.viewImage.getOrganizationProfile().then((Response) => {
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
        getContactPersonName = JSON.stringify(
          Response.data.responseObject.contactPerson
        );
        getGstin = Response.data.responseObject.gstin ? JSON.stringify(Response.data.responseObject.gstin) : '';
        getMobile = JSON.stringify(Response.data.responseObject.phoneNumber);
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

  render() {
    return (
      <div className="content">
        {/*  Header */}
        <HeaderAll isProfile={true}></HeaderAll>
        {/* Main Content on the page */}
        <div className="content_section main">
          <div className="mt-3 mb-3 setting_text1">
            <Link to="/providerDashboard">
              <img
                className="setting_arrow marR5"
                src="images/EmailSettings/backward-link-arrow.svg"
                alt="arrow"
              />
            </Link>
            Dashboard
          </div>

          <h4>My Profile</h4>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p> */}
          <section className="white-middle-section mt-4">
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
                    src="images/Dashboard-assets/user-f.png" alt="User profile" width="133px" height="133px"
                    alt="User profile"
                    width="133px"
                    height="133px"
                  />
                )}
              </div>

              <div className="pt-3">{this.state.contactPersonName}</div>
              <p>Admin</p>
              {/* <div>rosadodson@techmahindra.com</div> */}
            </div>

            <h6 className="mt-4 pt-3 border-top">Profile Details</h6>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-sm-4">Organisation Name : </div>
                  <div className="col-sm-8">{this.state.orgName}</div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4">Official Email : </div>
                  <div className="col-sm-8">{this.state.officialEmail}</div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4">Mobile/Landline : </div>
                  <div className="col-sm-8">{this.state.mobile}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-sm-4">Contact Person Name : </div>
                  <div className="col-sm-8">{this.state.contactPersonName}</div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-4">GSTIN : </div>
                  <div className="col-sm-8">{this.state.gstin}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="btn btn-blue" onClick={this.editProfileCall}>
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
