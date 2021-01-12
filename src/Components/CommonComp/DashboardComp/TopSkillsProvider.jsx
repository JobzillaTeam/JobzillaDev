import React, { Component } from 'react'
import ApiServicesOrg from '../../../Services/ApiServicesOrg'

export default class TopSkillsProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            skill1: '',
            skill2: '',
            skill3: '',
            skill4: '',
            skill1Count: '',
            skill2Count: '',
            skill3Count: '',
            skill4Count: '',
            totalOpenPositions: ''
        }
        this.dashboardDetails = new ApiServicesOrg();
    }

    componentDidMount() {
        const today = new Date()
        const year = today.getFullYear()
        //Calling provider's dashboard api to get current year data
        this.dashboardDetails.getProviderDashboardDetails(year)
            .then(Response => {
                if (Response && Response.data && Response.data.responseObject) {
                    this.setState({
                        skill1: Response.data.responseObject.topSkills[0] && Response.data.responseObject.topSkills[0].skill,
                        skill2: Response.data.responseObject.topSkills[1] && Response.data.responseObject.topSkills[1].skill,
                        skill3: Response.data.responseObject.topSkills[2] && Response.data.responseObject.topSkills[2].skill,
                        skill4: Response.data.responseObject.topSkills[3] && Response.data.responseObject.topSkills[3].skill,
                        skill1Count: Response.data.responseObject.topSkills[0] && Response.data.responseObject.topSkills[0].count,
                        skill2Count: Response.data.responseObject.topSkills[1] && Response.data.responseObject.topSkills[1].count,
                        skill3Count: Response.data.responseObject.topSkills[2] && Response.data.responseObject.topSkills[2].count,
                        skill4Count: Response.data.responseObject.topSkills[3] && Response.data.responseObject.topSkills[3].count,
                        totalOpenPositions: Response.data.responseObject.totalOpenPositions
                    })
                }
            });
    }

    render() {
        return (
            <div>
                {/* <!--TOP Skills section--> */}
                <div className="row ml-0 mr-1">
                    {/* <!--TOP Skills published section--> */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 pr-0">
                        <h4 className="w-100 ml-3 marT30 topSkillsRequired_Text">Top Skills Required In The Market</h4>
                        <section className="skillPosted_section">
                            <table className="table bottom_border ">
                                <thead>
                                    <tr>
                                        <td className=" skills-section skills-section-padding border-top-0 border-light ">Skills</td>
                                        <td className="skills-section skills-section-padding border-top-0 border-light "> Number of Positions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state.skill1 && this.state.skill1Count) ?
                                        <tr>
                                            <td className="border-top-0">
                                                <div className="skills-section">{this.state.skill1}</div>
                                            </td>
                                            <td className="border-top-0">
                                                <div className="progressbar-text" style={{ width: `${(this.state.skill1Count / this.state.totalOpenPositions) * 100}%` }}>{this.state.skill1Count}</div>
                                                <div className="progress2 progress-fashion2 marB20" >
                                                    <div className="progress-bar2 color-blue marT20" style={{ width: `${(this.state.skill1Count / this.state.totalOpenPositions) * 100}%` }} role="progressbar"  aria-valuemin="0" aria-valuemax="5">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        : <div className="skills-section mt-4 skills-section-padding">No Skills Found</div>
                                    }
                                    {(this.state.skill2 && this.state.skill2Count) ?
                                        <tr>
                                            <td className="border-top-0">
                                                <span className="skills-section">{this.state.skill2}</span>
                                            </td>
                                            <td className="border-top-0">
                                                <div className="progressbar-text" style={{ width: `${(this.state.skill2Count / this.state.totalOpenPositions) * 100}%` }}>{this.state.skill2Count}</div>
                                                <div className="progress2 progress-fashion2 marB20" >
                                                    <div className="progress-bar2 color-pink marT20" style={{ width: `${(this.state.skill2Count / this.state.totalOpenPositions) * 100}%` }} role="progressbar"  aria-valuemin="0" aria-valuemax="100">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        : null
                                    }
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
                                    {(this.state.skill3 && this.state.skill3Count) ?
                                        <tr>
                                            <td className="border-top-0">
                                                <span className="skills-section">{this.state.skill3}</span>
                                            </td>
                                            <td className="border-top-0">
                                                <div className="progressbar-text" style={{ width: `${(this.state.skill3Count / this.state.totalOpenPositions) * 100}%` }}>{this.state.skill3Count}</div>
                                                <div className="progress2 progress-fashion2 marB20 " >
                                                    <div className="progress-bar2 color-green marT20" style={{ width: `${(this.state.skill3Count / this.state.totalOpenPositions) * 100}%` }} role="progressbar"  aria-valuemin="0" aria-valuemax="3000">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        : null
                                    }
                                    {(this.state.skill4 && this.state.skill4Count) ?
                                        <tr>
                                            <td className="border-top-0">
                                                <span className="skills-section">{this.state.skill4}</span>
                                            </td>
                                            <td className="border-top-0">
                                                <div className="progressbar-text" style={{ width: `${(this.state.skill4Count / this.state.totalOpenPositions) * 100}%` }}>{this.state.skill4Count}</div>
                                                <div className="progress2 progress-fashion2 marB20" >
                                                    <div className="progress-bar2 color-yellow marT20" style={{ width: `${(this.state.skill4Count / this.state.totalOpenPositions) * 100}%` }} role="progressbar"  aria-valuemin="0" aria-valuemax="3000">
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                        : null
                                    }
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
