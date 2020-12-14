import React from 'react'

const Header = ()=>{

    return(

        /*Login and Signup Header */
        <div className="Header bg-white login_header_bottom">
            <div className="float-left col-xs-2">
                <img src="../../images/login/logo.png" className="logo"/>
            </div>
            <ul>
                <li><img src="../images/login/iconfinder_phone.svg"/><span className="header_telephone pl-2">+91-8459687651</span></li>
                <li className="mx-0">|</li>
                <li><img src="../images/login/iconfinder_icon-email_211660.svg"/><span className="header_email pl-2"></span>admin@ecoss.co.in</li>
            </ul>
        </div>

        /*Login and Signup Header */       

    )

}  

export default Header

