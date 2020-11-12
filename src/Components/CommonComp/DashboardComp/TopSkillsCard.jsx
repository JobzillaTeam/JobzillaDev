import React, { Component } from 'react'

export default class TopSkillsCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            java: "85%",
            angular: 1500,
            mongoDb: 1850,
            python: 750,
        }
    }

    render() {
        const status= localStorage.getItem('status')
        return (
            <div>
                {/* <!--TOP Skills section--> */}
                <div className="row ml-0 mr-1">
                    {/* <!--TOP Skills published section--> */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 pr-0">
                        {status==="recruiter" ?
                        (<h4 className="w-100 ml-3 marT30 topSkillsRequired_Text">Top Skills Required</h4>)
                        :
                        (<h4 className="w-100 ml-3 marT30 topSkillsRequired_Text">Top Skills Required In The Market</h4>)
                         }
                        <section className="skillPosted_section">
                            <table className="table bottom_border ">
                                <thead>
                                    <tr>
                                        <td className=" skills-section skills-section-padding border-top-0 border-light ">Skills</td>
                                        <td className="skills-section skills-section-padding border-top-0 border-light "> Number of Positions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-top-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/java-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section marT30 ">Java</span>
                                        </td>
                                        <td className="border-top-0">
                                            <div className="progressbar-text" style={{ width: `${this.state.java}` }}>2000</div>
                                            <div class="progress2 progress-fashion2 marB20 " >
                                                <div class="progress-bar2 color-blue marT20" style={{ width: `${this.state.java}` }} role="progressbar" aria-valuenow={this.state.java} aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-top-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/angular-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section">Angular</span>
                                        </td>
                                        <td className="border-top-0">
                                            <div className="progressbar-text" style={{ width: '75%' }}>{this.state.angular}</div>
                                            <div class="progress2 progress-fashion2 marB20" >
                                                <div class="progress-bar2 color-pink marT20" style={{ width: '75%' }} role="progressbar" aria-valuenow={this.state.angular} aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                    {/* <!--TOP Skills published section-->  */}

                    {/* <!--TOP Skills Unfulfilled section-->    */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 pl-0">
                        <h4 className="wid100 ml-3 marT30 topSkillsRequired_Text">&nbsp;</h4>
                        <section className="skillsUnfulfilled_section">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td className="border-top-0 border-light skills-section-padding skills-section">Skills</td>
                                        <td className="border-top-0 border-light skills-section-padding skills-section">Number of Positions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-top-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/mongoDb-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section">MongoDB</span>
                                        </td>
                                        <td className="border-top-0">
                                        <div className="progressbar-text" style={{ width: '75%' }}>{this.state.mongoDb}</div>
                                            <div class="progress2 progress-fashion2 marB20 " >
                                                <div class="progress-bar2 color-green marT20"style={{ width: '75%' }} role="progressbar" aria-valuenow={this.state.mongoDb} aria-valuemin="0" aria-valuemax="3000">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-top-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/python-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section">Python</span>
                                        </td>
                                        <td className="border-top-0">
                                            <div className="progressbar-text" style={{ width: '39%' }}>{this.state.python}</div>
                                            <div class="progress2 progress-fashion2 marB20" >
                                                <div class="progress-bar2 color-yellow marT20" style={{ width: '39%' }}role="progressbar" aria-valuenow="80%" aria-valuemin="0" aria-valuemax="3000">
                                                </div>
                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                    {/* <!--TOP Skills Unfulfilled section--> */}
                </div>
                {/* <!--TOP Skills section--> */}
            </div>
        )
    }
}
