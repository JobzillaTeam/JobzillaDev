import React, { Component, Fragment } from 'react'
import HeaderAll from '../CommonComp/HeaderAll'
import Footer from '../CommonComp/Footer'
import ApiServicesOrg from '../../Services/ApiServicesOrg'
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';

class EmailSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateId: localStorage.getItem('userId'),
            id: '',
            canAllowNotificationForProvider: false,
            canCandidateHasAcceptedTermsAndConditions: false,
            canOfferMadeToTheirCandidate: false,
            canAllowNotificationForRecruite: false,
            canSuccessfulJobPost: false,
            canNewApplicationOnPostedJobs: false,
            canInterviewInviteAcceptedDeclinedByCandidate: false
        };
        this.emailSetting = new ApiServicesOrg();
        this.onSaveSettings = this.onSaveSettings.bind(this)
        this.onProviderTogggleChange = this.onProviderTogggleChange.bind(this)
        this.onRecruiterTogggleChange = this.onRecruiterTogggleChange.bind(this)
        this.onCandidateTermsChange = this.onCandidateTermsChange.bind(this)
        this.onOffersMadeToCandidateChange = this.onOffersMadeToCandidateChange.bind(this)
        this.onSuccessfulJobPostChange = this.onSuccessfulJobPostChange.bind(this)
        this.onNewAppJobPostChange = this.onNewAppJobPostChange.bind(this)
        this.onInterviewAcceptedDeclinedChange = this.onInterviewAcceptedDeclinedChange.bind(this)
    }

    /*To handle Provider Allow Notification Toggle */
    onProviderTogggleChange = (e) => {
        this.setState({
            canAllowNotificationForProvider: true,
            canCandidateHasAcceptedTermsAndConditions: true,
            canOfferMadeToTheirCandidate: true
        })

        /*If Provider allow notifications toggler is disabled then all child togglers are disabled*/
        if (!this.state.canAllowNotificationForProvider === false) {
            this.setState({
                canAllowNotificationForProvider: false,
                canCandidateHasAcceptedTermsAndConditions: false,
                canOfferMadeToTheirCandidate: false,
            })
        }
    }

    /* To handle Recruiter Allow Notification Toggle */
    onRecruiterTogggleChange = (e) => {
        this.setState({
            canAllowNotificationForRecruite: true,
            canSuccessfulJobPost: true,
            canNewApplicationOnPostedJobs: true,
            canInterviewInviteAcceptedDeclinedByCandidate: true
        })
        /*If Provider allow notifications toggler is disabled then all child togglers are disabled*/
        if (!this.state.canAllowNotificationForRecruite === false) {
            this.setState({
                canAllowNotificationForRecruite: false,
                canSuccessfulJobPost: false,
                canNewApplicationOnPostedJobs: false,
                canInterviewInviteAcceptedDeclinedByCandidate: false,
            })
        }
    }
    // Get previous state of checkboxes
    componentDidMount() {
        this.emailSetting.getEmailSettings()
            .then(Response => {
                if (Response && Response.data) {
                    this.setState({
                        id: Response.data.responseObject.id,
                        candidateId: Response.data.responseObject.candidateId,
                        canAllowNotificationForProvider: Response.data.responseObject.canAllowNotificationForProvider,
                        canAllowNotificationForRecruite: Response.data.responseObject.canAllowNotificationForRecruite,
                        canCandidateHasAcceptedTermsAndConditions: Response.data.responseObject.canCandidateHasAcceptedTermsAndConditions,
                        canOfferMadeToTheirCandidate: Response.data.responseObject.canOfferMadeToTheirCandidate,
                        canSuccessfulJobPost: Response.data.responseObject.canSuccessfulJobPost,
                        canNewApplicationOnPostedJobs: Response.data.responseObject.canNewApplicationOnPostedJobs,
                        canInterviewInviteAcceptedDeclinedByCandidate: Response.data.responseObject.canInterviewInviteAcceptedDeclinedByCandidate,
                    })
                }
            });
    }

    onSaveSettings = () => {
        return (
            this.emailSetting.putEmailSettings(this.state)
                .then(Response => {
                    // console.log(Response)
                    this.toast.show({ severity: 'success',summary: 'Success Message', detail: 'Data Saved Successfully', life: 2000 })
                })
                .catch(error => {
                    console.log("Error Occured..", error)
                    this.toast.show({ severity: 'error',summary: 'Error', detail: 'Something Went Wrong', life: 2000 });
                })
        )
    }

    /* To handle Candidate Terms and Conditions Change */
    onCandidateTermsChange = () => {
        this.setState(initialState => ({
            canCandidateHasAcceptedTermsAndConditions: !initialState.canCandidateHasAcceptedTermsAndConditions,
        }), () => {
            if (this.state.canCandidateHasAcceptedTermsAndConditions && this.state.canOfferMadeToTheirCandidate) {
                this.setState({
                    canAllowNotificationForProvider: true
                })    
            } 
        }
        )
        /* If Candidate Terms and conditions checkbox is disabled then allow notification is also disabled */
        if (!this.state.canCandidateHasAcceptedTermsAndConditions === false) {
            this.setState({
                canAllowNotificationForProvider: false
            })
        }
    }

    /* To handle Candidate Terms and Conditions */
    onOffersMadeToCandidateChange = () => {
        this.setState(initialState => ({
            canOfferMadeToTheirCandidate: !initialState.canOfferMadeToTheirCandidate,
        }), () => {
            if (this.state.canCandidateHasAcceptedTermsAndConditions && this.state.canOfferMadeToTheirCandidate) {
                this.setState({
                    canAllowNotificationForProvider: true
                })    
            }
        }
        )
        /* If Candidate Terms and conditions checkbox is disabled then provider allow notification is also disabled */
        if (!this.state.canOfferMadeToTheirCandidate === false) {
            this.setState({
                canAllowNotificationForProvider: false
            })
        }
    }

    /* To handle Successful Job Post Change */
    onSuccessfulJobPostChange = () => {
        this.setState(initialState => ({
            canSuccessfulJobPost: !initialState.canSuccessfulJobPost,
        }), () => {
            if (this.state.canSuccessfulJobPost && this.state.canNewApplicationOnPostedJobs && this.state.canInterviewInviteAcceptedDeclinedByCandidate) {
                this.setState({
                  canAllowNotificationForRecruite: true
                })
            }
        }
        )
        /* If successful Job Post is disabled then recruiter allow notification is also disabled */
        if (!this.state.canSuccessfulJobPost === false) {
            this.setState({
                canAllowNotificationForRecruite: false
            })
        }
    }

    /* To handle new application Job Post */
    onNewAppJobPostChange = () => {
        this.setState(initialState => ({
            canNewApplicationOnPostedJobs: !initialState.canNewApplicationOnPostedJobs,
        }), () => {
            if (this.state.canSuccessfulJobPost && this.state.canNewApplicationOnPostedJobs && this.state.canInterviewInviteAcceptedDeclinedByCandidate) {
                this.setState({
                  canAllowNotificationForRecruite: true
                })
              }
        }
        )
        /* If new Application Job Post is disabled then allow notification is also disabled */
        if (!this.state.canNewApplicationOnPostedJobs === false) {
            this.setState({
                canAllowNotificationForRecruite: false
            })
        }
    }

    /* To hadle interview accepted/Declined by a candidate */
    onInterviewAcceptedDeclinedChange = () => {
        this.setState(initialState => ({
            canInterviewInviteAcceptedDeclinedByCandidate: !initialState.canInterviewInviteAcceptedDeclinedByCandidate,
        }), () => {
            if (this.state.canSuccessfulJobPost && this.state.canNewApplicationOnPostedJobs && this.state.canInterviewInviteAcceptedDeclinedByCandidate) {
                this.setState({
                  canAllowNotificationForRecruite: true
                })
              }
        }
        )
        /* If new interview accepted/declined is disabled then recruiter allow notification is also disabled */
        if (!this.state.canInterviewInviteAcceptedDeclinedByCandidate === false) {
            this.setState({
                canAllowNotificationForRecruite: false
            })
        }
    }

    render() {
        const status = localStorage.getItem('status')
        // console.log(status)
        return (
            <div>
                <div className="content">
                    <Toast ref={(el) => this.toast = el} />
                    <HeaderAll isSetting={true}></HeaderAll>
                    <div className="content_section main">

                        {/* Content on the page */}
                        <div className="mt-3 setting setting_text1">
                            <div className=" mb-3">
                                {/**  
                                 * If recruiter toggle is active then from email settings component recruiter dashboard will open else provider dashboard will open
                                 **/}
                                {
                                    (status === "recruiter") ?
                                        <Link to="/recruiterDashboard">
                                            <img className="setting_arrow marR5" src="/images/EmailSettings/backward-link-arrow.svg" alt="arrow" />
                                        </Link>
                                        :
                                        <Link to="/providerDashboard">
                                            <img className="setting_arrow marR5" src="images/EmailSettings/backward-link-arrow.svg" alt="arrow" />
                                        </Link>
                                }
                            Dashboard</div>
                            <div className="setting settingTitle_text mb-2">Email Notification Preferences</div>
                            <div className="setting setting_text">You can manage your preferences for email notifications from here</div>
                            <section className="white-middle-section mt-4">
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">

                                        {/* Allow Notication for Provider */}
                                        <div className="d-flex justify-content-between border-bottom-thick mb-4">
                                            <div className="settingSubtitle_text">Allow Notifications for Provider</div>
                                            <div>
                                                <label className="switch " >
                                                    <input type="checkbox" className="primary"
                                                        checked={this.state.canAllowNotificationForProvider}
                                                        onChange={this.onProviderTogggleChange}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            {/* Candidate has accepted terms and Conitions */}
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="setting_text">Candidate has accepted terms &amp; conditions for their profile to be visible in the portal</div>
                                                <div>
                                                    <label className="checkmark">
                                                        <input
                                                            type="checkbox"
                                                            checked={this.state.canCandidateHasAcceptedTermsAndConditions}
                                                            onChange={this.onCandidateTermsChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Offer made to their candidate*/}
                                            <div className="d-flex justify-content-between mb-4">
                                                <div className="setting_text">Offer made to their candidate</div>
                                                <div>
                                                    <label className="checkmark">
                                                        <input type="checkbox" className="primary"
                                                            checked={this.state.canOfferMadeToTheirCandidate}
                                                            onChange={this.onOffersMadeToCandidateChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Allow Notifications for Recruiter*/}
                                            <div className="d-flex justify-content-between border-bottom-thick mb-4">
                                                <div className="settingSubtitle_text">Allow Notifications for Recruiter</div>
                                                <div>
                                                    <label className="switch " >
                                                        <input type="checkbox" className="primary"
                                                            checked={this.state.canAllowNotificationForRecruite}
                                                            onChange={this.onRecruiterTogggleChange}
                                                        />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Successful job post */}
                                            <div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="setting_text">Successful job post</div>
                                                    <div>
                                                        <label className="checkmark">
                                                            <input type="checkbox" className="primary"
                                                                checked={this.state.canSuccessfulJobPost}
                                                                onChange={this.onSuccessfulJobPostChange}

                                                            />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* New Application on posted job */}
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="setting_text"> New application on posted job</div>
                                                <div>
                                                    <label className="checkmark">
                                                        <input type="checkbox" className="primary"
                                                            checked={this.state.canNewApplicationOnPostedJobs}
                                                            onChange={this.onNewAppJobPostChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Interview invite accepted/declined */}
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="setting_text">Interview invite accepted/declined by a candidate</div>
                                                <div>
                                                    <label className="checkmark">
                                                        <input type="checkbox" className="primary"
                                                            checked={this.state.canInterviewInviteAcceptedDeclinedByCandidate}
                                                            onChange={this.onInterviewAcceptedDeclinedChange}
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
            </div>
        )
    }
}
export default EmailSetting





