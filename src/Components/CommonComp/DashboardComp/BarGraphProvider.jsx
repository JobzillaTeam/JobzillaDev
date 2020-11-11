import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar as BarChart } from 'react-chartjs-2'
import '../../CommonComp/DashboardComp/RoundedBars'

const state = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
    datasets: [
        
        {
            label: "Number of profiles uploaded",
            backgroundColor: "#FFBE0B",
            data: [133, 133, 133, 133, 450, 133, 205, 278, 133, 221,150, 125]
        }, {
            label: "Number of active profiles",
            backgroundColor: "#007EFF",
            data: [208, 201, 105, 34, 133, 47, 55, 234, 208, 147, 235, 360]
        }, 
        {
            label: "Number of Hired Candidates",
            backgroundColor: "#2AC769",
            data: [100, 305, 360, 200, 256, 155, 180, 120, 205, 305, 100, 200]
        }
    ]
}
//Static data Displayed in bars

export default class BarGraphProvider extends Component {
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
                                <button className="btn chart_section_btn dropdown-toggle font-blue" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Select Year
                          </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">2020</a>
                                </div>
                            </div>
                            {/* Select Year DropDown */}


                            {/* Bar Graph Section */}
                            <div id='chartjsLegend' className="chart-container chartjsLegend" width="100" height="100">
                            <div id="js-legend" className="chartjsLegend">
                               
                            <BarChart
                                    type='Bar'
                                    data={state}
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
