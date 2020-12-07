import React from 'react';
import Header from '../CommonComp/Header'
import Footer from '../CommonComp/Footer'
import { Link } from 'react-router-dom'

const TermsofUse =()=>{
    return(

    <div className="content">
        <Header></Header>
        <div className="main px-5 py-4">
        <div class="pb-4"><Link to="/signup"> <span> {'<'} </span> Back to signup </Link></div>
      <p class="modal-body-title">
      Terms and Conditions:
      </p>
      <ul>

        <li class="modal-body-content">All data pertaining to the Client, such as, Company details, employee details and details of roles and vacancies will be kept confidential and will not be discussed with anyone ex-cept the Client or representatives of the Client.</li>

        <li class="pt-2 modal-body-content">Similarly, all the details related to the system, iSwitch, must be kept confidential by the Client. All candidate information shared to the client by Ecoss through their system, iSwitch, should remain confidential with the Client and should not be shared with anyone else within or outside Ecoss’ client list.</li>

        <li class="pt-2 modal-body-content">However, a detailed agreement will be signed between the Client and Ecoss before onboarding of a Client</li>
    
      </ul>
    
    <Footer></Footer>
    </div>  
    </div>
    )}

export default TermsofUse