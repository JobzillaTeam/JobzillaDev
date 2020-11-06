import React,{Component} from 'react'
import HeaderAll from './HeaderAll'
import Footer from './Footer'
import {Link} from 'react-router-dom'
import ApiServicesOrg from '../../Services/ApiServicesOrg'

class Profile extends Component{
constructor(){
    super()
    this.state={
        imageUrl:''
    }
    this.viewImage = new ApiServicesOrg()
}
    editProfileCall= ()=> {
        this.props.history.push("/editOrgProfile")
    }


    componentDidMount(){
        this.viewImage.viewProfileImage()
        .then(Response => {
            //console.log(Response.data.responseObject)
            this.setState({
                imageUrl: Response.data.responseObject
            })
             })
    }

    render(){
        return(
            <div className="content">
                {/*  Header */}
                <HeaderAll isProfile={true}></HeaderAll>
                {/* Main Content on the page */}
                <div className="content_section main">

                <div className="mt-3 mb-3 setting_text1"> 
                            <Link to="/providerDashboard">
                            <img className="setting_arrow marR5" src="images/EmailSettings/backward-link-arrow.svg" alt="arrow"/>
                            </Link>
                            Dashboard</div>

                    <h4>My Profile</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                    <section className="white-middle-section mt-4">
                    <div className="profile text-center">
                        <div className="text-center">
                        {this.state.imageUrl ? <img className="mr-3 rounded-circle" src={`data:image/png;base64,${this.state.imageUrl}`} alt="User profile" width="133px" height="133px"/>
                        : <img className="mr-3 rounded-circle" src="images/Dashboard-assets/user-f.png" alt="User profile" width="133px" height="133px"/>}
                        </div>
                        
                        <div className= "pt-3">Rosa Dodson</div>
                        <p>Admin</p>
                        {/* <div>rosadodson@techmahindra.com</div> */}
                        </div>
                        
                            
                        <h6 className="mt-4 pt-3 border-top">Profile Details</h6>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <div className="col-sm-4">Organisation Name : </div>
                                    <div className="col-sm-8">Tech Mahindra</div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-4">Official Email : </div>
                                    <div className="col-sm-8">rosadodson@techmahindra.com</div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-4">Mobile/Landline : </div>
                                    <div className="col-sm-8">9854450000</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <div className="col-sm-4">Contact Person Name : </div>
                                    <div className="col-sm-8">John Doe</div>
                                </div>
                                
                                <div className="form-group row">
                                    <div className="col-sm-4">GSTIN : </div>
                                    <div className="col-sm-8">22 AAAA07564 1Z5</div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                        
                        <button className="btn btn-blue" onClick= {this.editProfileCall}>Edit Profile</button> 
                        </div>
                    </section>
                </div>
                <Footer></Footer>
            </div>
        )
    }

}

export default Profile
