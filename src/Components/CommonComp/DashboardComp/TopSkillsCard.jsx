import React, { Component } from 'react'

export default class TopSkillsCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            java: 2000,
            angular: 1500,
            nodeJs: 1000,
            android: 859,
            mongoDb: 1850,
            python: 750,
            php: 745,
            swift: 421
        }
    }
    // componentDidMount() {
    //     this.interval = setTimeout(() => {
    //         let val1 = 2000;
    //         let val2 =40
    //         if(this.interval){
    //             this.setState({
    //                 java:val1,
    //                 angular: val2
    //             })
    //         }
    //     }, 1000);
    // }

    // componentWillUnmount() {
    //     if (this.interval) {
    //         clearInterval(this.interval);
    //         this.interval = null;
    //     }
    // }

    render() {
        return (
            <div>
                {/* <!--TOP Skills section--> */}
                <div className="row ml-0 mr-1">
                    {/* <!--TOP Skills published section--> */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 pr-0">
                        <h4 className="wid100 ml-3 marT30 topSkillsRequired_Text">Top Skills Required</h4>
                        <section className="skillPosted_section">
                            <table className="table bottom_border ">
                                <thead>
                                    <tr>
                                        <th className=" skills-section border-top-0 border-light ">Skills</th>
                                        <th className="skills-section border-top-0 border-light "> Number of jobs posted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-top-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/java-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section marT30">Java</span>
                                        </td>
                                        <td className="border-top-0">
                                            <div className="progressbar-text" style={{ width: '80%' }}>{this.state.java}</div>
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
                                                <div class="progress-bar2 color-blue marT20" style={{ width: '80%' }} role="progressbar" aria-valuenow={this.state.java} aria-valuemin="0" aria-valuemax="3000">
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
                                        {/* <div className="progressbar-text font-blue" style={{ width: '80%' }}>80%</div>
                                            <div class="progress1 progress-fashion1 marB20 ml-2 " >
                                                <div class="progress-bar1 bg-success marT20" role="progressbar" aria-valuenow="80%" aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div> */}
                                            {/* <div className="meter-value-text">{this.state.angular}</div>
                                            <meter value={this.state.angular} min="0" max="3000">6 out of 10</meter> */}
                                            <div className="progressbar-text" style={{ width: '75%' }}>{this.state.angular}</div>
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
                                                <div class="progress-bar2 color-red marT20" style={{ width: '75%' }} role="progressbar" aria-valuenow={this.state.angular} aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>

                                        
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-top-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/nodeJs.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section">Node JS</span>
                                        </td>
                                        <td className="border-top-0">
                                        <div className="progressbar-text" style={{ width: '69%' }}>{this.state.nodeJs}</div>
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
                                                <div class="progress-bar2 color-blue marT20" style={{ width: '69%' }} role="progressbar" aria-valuenow="80%" aria-valuemin="0" aria-valuemax="3000">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-top-0 border-bottom-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/android-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section">Android</span>
                                        </td>
                                        <td className="border-top-0 border-bottom-0">
                                        <div className="progressbar-text" style={{ width: '60%' }}>{this.state.android}</div>
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
                                                <div class="progress-bar2 color-green marT20" style={{ width: '60%' }} role="progressbar" aria-valuenow={this.state.android} aria-valuemin="0" aria-valuemax="3000">
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
                                        <th className="border-top-0 border-light skills-section">Skills</th>
                                        <th className="border-top-0 border-light skills-section"> Number of jobs posted</th>
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
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
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
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
                                                <div class="progress-bar2 color-blue marT20" style={{ width: '39%' }}role="progressbar" aria-valuenow="80%" aria-valuemin="0" aria-valuemax="3000">
                                                </div>
                                            </div>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-top-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/php-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section">PHP</span>
                                        </td>
                                        <td className="border-top-0">
                                        <div className="progressbar-text" style={{ width: '37%' }}>{this.state.php}</div>
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
                                                <div class="progress-bar2 color-blue marT20" style={{ width: '37%' }} role="progressbar" aria-valuenow={this.state.php} aria-valuemin="0" aria-valuemax="3000">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-top-0 border-bottom-0">
                                            <img src="/images/Dashboard-assets/Top-Skills/swift-icon.svg" width="30" height="30" className="rounded-circle" />
                                            <span className="skills-section">Swift</span>
                                        </td>
                                        <td className="border-top-0 border-bottom-0">
                                        <div className="progressbar-text" style={{ width: '20%' }}>{this.state.swift}</div>
                                            <div class="progress2 progress-fashion2 marB20 ml-2 " >
                                                <div class="progress-bar2 color-red marT20" style={{ width: '20%' }} role="progressbar" aria-valuenow={this.state.swift} aria-valuemin="0" aria-valuemax="3000">
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
