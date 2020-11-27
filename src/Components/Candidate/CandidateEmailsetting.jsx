import React, { Component } from 'react'
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import ApiServicesOrgCandidate from '../../Services/ApiServicesOrgCandidate';

class CandidateEmailSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateId: JSON.parse(localStorage.getItem('userDetails')).id,
            id: '',
            allowNotification: false,
            newInvite: false,
            inviteAcceptedDeclinedByRecruiter: false,
            changeInApplicationStatus: false,
            newOffer: false
        };
        this.emailNotificationSetting = ApiServicesOrgCandidate;
        this.onSaveSettings = this.onSaveSettings.bind(this)
        this.onAllowNotificationTogggleChange = this.onAllowNotificationTogggleChange.bind(this)
        this.onNewInviteChange = this.onNewInviteChange.bind(this)
        this.onNewOfferChange = this.onNewOfferChange.bind(this)
        this.onInviteAcceptedDeclineChange = this.onInviteAcceptedDeclineChange.bind(this)
        this.onChangeInApplicationStatusChange = this.onChangeInApplicationStatusChange.bind(this)
    }

    /*To handle Allow Notification Toggle */
    onAllowNotificationTogggleChange = (e) => {
        this.setState({
            allowNotification: true,
            newInvite: true,
            inviteAcceptedDeclinedByRecruiter: true,
            changeInApplicationStatus: true,
            newOffer: true
        })

        /*If allow notifications toggler is disabled then all child togglers are disabled*/
        if (!this.state.allowNotification === false) {
            this.setState({
                allowNotification: false,
                newInvite: false,
                inviteAcceptedDeclinedByRecruiter: false,
                changeInApplicationStatus: false,
                newOffer: false
            })
        }
    }

    /* To save Data */
    onSaveSettings = () => {
        return (
            this.emailNotificationSetting.putCandidateEmailSettings(this.state)
                .then(Response => {
                    //console.log(Response)
                    this.toast.show({ severity: 'success', summary: 'Success Message', detail: 'Data Saved Successfully', life: 2000 })
                })
                .catch(error => {
                    // console.log("Error Occured..", error)
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    // Get previous state of checkboxes
    componentDidMount() {
        this.emailNotificationSetting.getCandidateSettings(this.state.candidateId)
            .then(Response => {
                if (Response && Response.data) {
                    this.setState({
                        allowNotification: Response.data.responseObject.allowNotification,
                        candidateId: Response.data.responseObject.candidateId,
                        id: Response.data.responseObject.id,
                        newInvite: Response.data.responseObject.newInvite,
                        inviteAcceptedDeclinedByRecruiter: Response.data.responseObject.inviteAcceptedDeclinedByRecruiter,
                        changeInApplicationStatus: Response.data.responseObject.changeInApplicationStatus,
                        newOffer: Response.data.responseObject.newOffer,
                    })
                }
            });
    }


    /* To handle New Invite Change */
    onNewInviteChange = () => {
        this.setState(initialState => ({
            newInvite: !initialState.newInvite,
        }), () => {
            if (this.state.newInvite && this.state.inviteAcceptedDeclinedByRecruiter && this.state.changeInApplicationStatus && this.state.newOffer) {
                this.setState({
                  allowNotification: true
                })
              }
        }
        )
        /* If new invite checkbox is disabled then allow notification is also disabled */
        if (!this.state.newInvite === false) {
            this.setState({
                allowNotification: false
            })
        }
    }

    /* To handle invite accepted/Declined by recruiter */
    onInviteAcceptedDeclineChange = () => {
        this.setState(initialState => ({
            inviteAcceptedDeclinedByRecruiter: !initialState.inviteAcceptedDeclinedByRecruiter,
        }), () => {
            if (this.state.newInvite && this.state.inviteAcceptedDeclinedByRecruiter && this.state.changeInApplicationStatus && this.state.newOffer) {
                this.setState({
                  allowNotification: true
                })
              }
        }
        )
        /* If Invite Accepted/Declined by recruiter checkbox is disabled then allow notification is also disabled */
        if (!this.state.inviteAcceptedDeclinedByRecruiter === false) {
            this.setState({
                allowNotification: false
            })
        }
    }

    /* To handle change in application status */
    onChangeInApplicationStatusChange = () => {
        this.setState(initialState => ({
            changeInApplicationStatus: !initialState.changeInApplicationStatus,
        }), () => {
            if (this.state.newInvite && this.state.inviteAcceptedDeclinedByRecruiter && this.state.changeInApplicationStatus && this.state.newOffer) {
                this.setState({
                  allowNotification: true
                })
              }
        }
        )
        /* If change in application status is disabled then allow notification is also disabled */
        if (!this.state.changeInApplicationStatus === false) {
            this.setState({
                allowNotification: false
            })
        }
    }

    /* To handle new offer */
    onNewOfferChange = () => {
        this.setState(initialState => ({
            newOffer: !initialState.newOffer,
        }), () => {
            if (this.state.newInvite && this.state.inviteAcceptedDeclinedByRecruiter && this.state.changeInApplicationStatus && this.state.newOffer) {
                this.setState({
                  allowNotification: true
                })
              }
        }
        )
        /* If new Offer is disabled then allow notification is also disabled */
        if (!this.state.newOffer === false) {
            this.setState({
                allowNotification: false
            })
        }
    }

    render() {
        const status = localStorage.getItem('status')
        //console.log(status)
        return (
            <div className="content">
                <Toast ref={(el) => this.toast = el} />
                <HeaderAll isSetting={true} isCandidate={true}></HeaderAll>
                <div className="content_section main">

                    {/* Content on the page */}
                    <div className="mt-3 setting setting_text1">
                        <div className=" mb-3">
                            {/**  
                                 * If recruiter toggle is active then from email settings component recruiter dashboard will open else provider dashboard will open
                                 **/}
                            <Link to="/candidate/dashboard">
                                <img className="setting_arrow marR5" src="/images/EmailSettings/backward-link-arrow.svg" alt="arrow" />
                            </Link>
                            Dashboard</div>
                        <div className="setting settingTitle_text mb-2">Email Notification Preferences</div>
                        <div className="setting setting_text">You can manage your preferences for email notifications from here</div>
                        <section className="white-middle-section mt-4">
                            <div className="row">
                                <div className="col-md-8 offset-md-2">

                                    {/* Allow Notication */}
                                    <div className="d-flex justify-content-between border-bottom-thick mb-4">
                                        <div className="settingSubtitle_text">Allow Notifications</div>
                                        <div>
                                            <label className="switch " >
                                                <input type="checkbox" className="primary"
                                                    checked={this.state.allowNotification}
                                                    onChange={this.onAllowNotificationTogggleChange}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        {/* New Invite */}
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="setting_text">New Invite</div>
                                            <div>
                                                <label className="checkmark">
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.newInvite}
                                                        onChange={this.onNewInviteChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Invite accepted/declined by recruiter*/}
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="setting_text">Invite accepted/declined by recruiter</div>
                                            <div>
                                                <label className="checkmark">
                                                    <input type="checkbox" className="primary"
                                                        checked={this.state.inviteAcceptedDeclinedByRecruiter}
                                                        onChange={this.onInviteAcceptedDeclineChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                        {/* Change in application status*/}
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="setting_text">Change in application status</div>
                                            <div>
                                                <label className="checkmark">
                                                    <input type="checkbox" className="primary"
                                                        checked={this.state.changeInApplicationStatus}
                                                        onChange={this.onChangeInApplicationStatusChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                        {/* New Offer*/}
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="setting_text">New Offer</div>
                                            <div>
                                                <label className="checkmark">
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.newOffer}
                                                        onChange={this.onNewOfferChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Save button */}
                                    <div className="text-right pt-3">
                                        <button className="btn btn-blue" onClick={this.onSaveSettings}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default CandidateEmailSetting
