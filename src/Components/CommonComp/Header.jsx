import React from 'react'

const Header = ()=>{

    return(

        /*Login and Signup Header */
        <div className="Header login_header_bottom">
            <div className="float-left col-xs-2">
                <img src="../../images/login/logo.png" className="logo"/>
            </div>
            <ul>
                <li><img src="../images/login/iconfinder_phone.svg"/><span className="header_telephone pl-2">58000 45000</span></li>
                <li className="mx-0">|</li>
                <li><img src="../images/login/iconfinder_icon-email_211660.svg"/><span className="header_email pl-2"></span>info@jobzilla.com</li>
            </ul>
        </div>

        /*Login and Signup Header */       

    )

}  

export default Header

