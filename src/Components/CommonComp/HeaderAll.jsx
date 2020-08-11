import React,{Component} from 'react'

class HeaderAll extends Component{
  render(){
    return(
      <header className="Header">
            <div className="float-left logo_container col-xl-2">
                <img src="images/Dashboard-assets/logo-white.png" className="logo"/>
            </div>
                <div className="float-left mt-2 d-inline-flex">
                      <div className="mx-3 fontMiddle d-flex align-items-center fontBlue">JOB : </div>
                      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" class="btn darkBlue">PROVIDER</button>
                        <button type="button" class="btn lightBlue">RECRUITER</button>
                      </div>
                    </div>
                    <ul class="nav mt-2">
                      <li className="nav-item">
                        <a class="nav-link" href="#" data-toggle="dropdown">
                          <span class="fontMiddle fontLightBlue">Rosa Dodson </span>		
                        </a>
                        <ul class="dropdown-menu mt-2">
                          
                          <li class="dropdown-divider"></li>
                          <li>
                            <a class="dropdown-item" href="#" >
                              <i class="fa fa-user" aria-hidden="true"></i> My Profile</a>
                          </li>
                          <li class="dropdown-divider"></li>
                          <li>
                            <a class="dropdown-item" href="#">
                              <i class="fa fa-cog" aria-hidden="true"></i> My Settings</a>
                          </li>
                          <li class="dropdown-divider"></li>
                          <li>
                            <a class="dropdown-item" href="javascript:;">
                              <i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                          </li>
                        </ul>
                      </li>
                      <li>					
                        <img className="rounded-circle profile-icon mr-3" src="images/Dashboard-assets/user-f.jpg" width="35" height="35"/>
                      </li>
                    </ul>
                   </header>
    )
  }

}

export default HeaderAll