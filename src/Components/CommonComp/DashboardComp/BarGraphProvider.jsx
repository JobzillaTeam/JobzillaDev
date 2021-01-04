import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar as BarChart } from 'react-chartjs-2'
import '../../CommonComp/DashboardComp/RoundedBars'
import ApiServicesOrg from '../../../Services/ApiServicesOrg'

export default class BarGraphProvider extends Component {
    constructor(){
        super()
        this.state={
            chartData: {},
            selectValue:""
        }
        this.dashboardDetails = new ApiServicesOrg();

    }
    handleDropdownChange=(e)=>{
        this.setState({selectValue:e.target.value})
    }
    componentDidMount(){
        const today=new Date()
        const year= today.getFullYear() 
        this.dashboardDetails.getProviderDashboardDetails()
        .then(Response => {
            if (Response && Response.data && Response.data.responseObject && Response.data.responseObject.monthlyReport) {
                //console.log(Response.data.responseObject)
                const activeProfiles = [];
                const hiredPositions = [];
                const profileUploads = [];
                const { monthlyReport } = Response.data.responseObject;
                const { reportForActiveProfiles, reportForHiredProfiles, reportForProfileUpload } = monthlyReport;
                for (let i = 1; i<=12; i++) {
                    let ele1, objKeys1, ele2, objKeys2, ele3, objKeys3;
                    objKeys1 = Object.keys(reportForActiveProfiles);
                    objKeys1 = objKeys1.map(k => (parseInt(k)));
                    if (objKeys1.includes(i)) {
                        ele1 = reportForActiveProfiles[i].activeProfiles
                    } else {
                        ele1 = 0;
                    }
                    objKeys2 = Object.keys(reportForHiredProfiles);
                    objKeys2 = objKeys2.map(k => (parseInt(k)));
                    if (objKeys2.includes(i)) {
                        ele2 = reportForHiredProfiles[i].hiredPositions
                    } else {
                        ele2 = 0;
                    }
                    objKeys3 = Object.keys(reportForProfileUpload);
                    objKeys3 = objKeys3.map(k => (parseInt(k)));
                    if (objKeys3.includes(i)) {
                        ele3 = reportForProfileUpload[i].profilesUploaded
                    } else {
                        ele3 = 0;
                    }
                    activeProfiles.push(ele1);
                    hiredPositions.push(ele2);
                    profileUploads.push(ele3);
                }
                // console.log(activeProfiles, hiredPositions, profileUploads)
                this.setState(
                    {
                        chartData: {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
                            datasets: [
                                
                                {
                                    label: "Number of profiles uploaded",
                                    backgroundColor: "#FFBE0B",
                                    data: profileUploads
                                }, {
                                    label: "Number of active profiles",
                                    backgroundColor: "#007EFF",
                                    data: activeProfiles
                                }, 
                                {
                                    label: "Number of Hired Candidates",
                                    backgroundColor: "#2AC769",
                                    data: hiredPositions
                                }
                            ]
                        }
                    }
                )
            }
        });
    }

    render() {
        return (
            <div>
                {/* Monthly Reports percentage section */}
                <div className="row ml-0 mr-1">
                    <div className="col col-sm-12 col-md-12 col-lg-12">
                        <h4 className="yearly_report_text wid100 ml-3 marT30">Yearly Report</h4>
                        <section className="chart_section">
                            {/* Select Year DropDown */}
                            <div className="dropdown float-right mr-2">
                                {/* <button className="btn chart_section_btn dropdown-toggle font-blue" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Select Year
                                </button> */}
                                {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">2020</a>
                                </div> */}
                        <div class="dropdown font-blue">
                        <select className="form-control font-blue" id="dropdown" name="dropdown"
                          onChange={this.handleDropdownChange}
                          >
                          <option value="" disabled>select year</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                        </select>
                      </div>

                            </div>
                            {/* Select Year DropDown */}


                            {/* Bar Graph Section */}
                            <div id='chartjsLegend' className="chart-container chartjsLegend" width="100" height="100">
                            <div id="js-legend" className="chartjsLegend">
                               
                            <BarChart
                                    type='Bar'
                                    data={this.state.chartData}
                                    options={{
                                        cornerRadius: 6,
                                        height: "50",
                                        scales: {
                                            xAxes: [{
                                              barPercentage: 0.6,
                                              categoryPercentage: 0.5,
                                              gridLines: {
                                                drawBorder: false,
                                                display:false, 
                                              },
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    //suggestedMin: 0,
                                                    //stepSize: 30
                                                },
                                                gridLines: {
                                                    //display: false,
                                                    drawBorder: false,
                                                    zeroLineColor: '#fff'
                                                  },
                                              }]
                                            },
                                        title: {
                                            //position: 'bottom',
                                            //display: true,
                                            // text: 'Population growth (millions)'
                                        },
                                        legend: {
                                            position: 'bottom',
                                            align: 'start',
                                            labels: {
                                                usePointStyle: true,
                                                padding:40,
                                                borderColor: '#3398FF',
                                                borderWidth: 2,
                                            },
                                        },
                                        
                                        tooltips:{
                                            callbacks: {
                                                title: function() {},
                                            //     label: function(tooltipItems, data) {
                                            //         return tooltipItems.yLabel + ' Job posted';
                                            // },
                                                labelTextColor: function(tooltipItem, chart) {
                                                    return '#543453';
                                                }
                                            },
                                            yPadding:12,
                                            xPadding:10,
                                            displayColors: false,
                                            bodyAlign:'left',
                                            enabled:true,
                                            borderColor:'#DBDDE0',
                                            borderWidth: 1,
                                            backgroundColor: '#ffffff',   
                                            caretSize:0,   
                                            cornerRadius:0, 
                                            },
                                        layout: {
                                            padding: {
                                                top: 50,
                                                left: 20,
                                                right: 20
                                            }
                                        }
                                    }

                                    }
                                />
                                </div> 
                                {/* Bar Graph Section */}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
