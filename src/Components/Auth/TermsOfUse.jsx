import { Modal } from 'react-bootstrap'
import React, { Component } from 'react';
import Header from '../CommonComp/Header'
import Footer from '../CommonComp/Footer'
import { Link } from 'react-router-dom'

class TermsOfUse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        }
    }
    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }


    render() {
        return (
            <>
                <Modal
                    show={this.state.show}
                    onHide={() => this.hideModal(false)}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title className="sub-title" id="contained-modal-title-vcenter">
                            Terms and Conditions
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body class="padding">
                        <div className="content1">
                            {/* <Header></Header> */}
                            <div className="main ">
                                {/* <div class="pb-4"><Link to="/signup"> <span> {'<'} </span> Back to signup </Link></div> */}
                                {/* <p class="modal-body-title">
                                    Terms and Conditions:
                                </p> */}
                                <ul>

                                    <li class="modal-body-content">All data pertaining to the Client, such as, Company details, employee details and details of roles and vacancies will be kept confidential and will not be discussed with anyone ex-cept the Client or representatives of the Client.</li>

                                    <li class="pt-4 modal-body-content">Similarly, all the details related to the system, iSwitch, must be kept confidential by the Client. All candidate information shared to the client by Ecoss through their system, iSwitch, should remain confidential with the Client and should not be shared with anyone else within or outside Ecoss’ client list.</li>

                                    <li class="pt-4 modal-body-content">However, a detailed agreement will be signed between the Client and Ecoss before onboarding of a Client</li>

                                </ul>
                                {/* <Footer></Footer> */}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default TermsOfUse