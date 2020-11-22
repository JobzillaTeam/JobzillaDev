import React from 'react';
import Header from '../CommonComp/Header'
import Footer from '../CommonComp/Footer'
import { Link } from 'react-router-dom'

const TermsofUse =()=>{
    return(
        <div className="content">
        <Header></Header>
        <div className="main">
        <div><Link to="/signup"> <span> > </span> Back to signup </Link></div>
        
            <h3>Welcome to Terms of Use Page</h3>
            
            </div>
       
        <Footer></Footer>
        </div>
    )
}

export default TermsofUse