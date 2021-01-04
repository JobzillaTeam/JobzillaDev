import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../Assets/css/Style.css'
import { Bar as BarChart } from 'react-chartjs-2'
import '../../CommonComp/DashboardComp/RoundedBars'
import ApiServicesOrg from '../../../Services/ApiServicesOrg'

export default class BarGraphRecruiter extends Component {
  constructor() {
    super()
    this.state = {
      selectValue:"",
      chartData: {
      }
    }
    this.dashboardDetails = new ApiServicesOrg();
  }

  handleDropdownChange=(e)=>{
    this.setState({selectValue:e.target.value})
    this.dashboardDetails.getRecruiterDashboardDetails(e.target.value)
    .then(Response => {
      if (Response && Response.data.responseObject.monthlyReport) {
        const responseObj = Response.data.responseObject;
        const positions = [];
        const candidates = [];
        for (let i = 1; i <= 12; i++) {
          const keys = Object.keys(responseObj.monthlyReport);
          const integerKeys = keys.map(k => (parseInt(k)));
          if (integerKeys.includes(i)) {
            positions.push(parseInt(responseObj.monthlyReport[i].openPositionsForReport))
            candidates.push(parseInt(responseObj.monthlyReport[i].hiredPositionsForReport))
          } else {
            positions.push(0);
            candidates.push(0);
          }
        }
        this.setState({
          chartData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Number of open positions",
                backgroundColor: "#007EFF",
                data: positions
              }, {
                label: "Number of hired candidates",
                backgroundColor: "#2AC769",
                data: candidates
              },
            ]
          }
        })

      }
    })


}

  componentDidMount() {
    const today=new Date()
    const year= today.getFullYear() 
    this.dashboardDetails.getRecruiterDashboardDetails(year)
      .then(Response => {
        if (Response && Response.data.responseObject.monthlyReport) {
          const responseObj = Response.data.responseObject;
          const positions = [];
          const candidates = [];
          for (let i = 1; i <= 12; i++) {
            const keys = Object.keys(responseObj.monthlyReport);
            const integerKeys = keys.map(k => (parseInt(k)));
            if (integerKeys.includes(i)) {
              positions.push(parseInt(responseObj.monthlyReport[i].openPositionsForReport))
              candidates.push(parseInt(responseObj.monthlyReport[i].hiredPositionsForReport))
            } else {
              positions.push(0);
              candidates.push(0);
            }
          }
          this.setState({
            chartData: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                {
                  label: "Number of open positions",
                  backgroundColor: "#007EFF",
                  data: positions
                }, {
                  label: "Number of hired candidates",
                  backgroundColor: "#2AC769",
                  data: candidates
                },
              ]
            }
          })

        }
      })
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
                          </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">2020</a>
                </div> */}
                        <div class="dropdown font-blue">
                        <select className="form-control font-blue" id="dropdown" name="dropdown"
                          onChange={this.handleDropdownChange}
                          >
                          <option value="" disabled>select year</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
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
                          categoryPercentage: 0.3,
                          gridLines: {
                            drawBorder: false,
                            display: false,
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
                          padding: 40,
                          borderColor: '#3398FF',
                          borderWidth: 2,
                        },
                      },

                      tooltips: {
                        callbacks: {
                          title: function () { },
                          //     label: function(tooltipItems, data) {
                          //         return tooltipItems.yLabel + ' Job posted';
                          // },
                          labelTextColor: function (tooltipItem, chart) {
                            return '#543453';
                          }
                        },
                        yPadding: 12,
                        xPadding: 10,
                        displayColors: false,
                        bodyAlign: 'left',
                        enabled: true,
                        borderColor: '#DBDDE0',
                        borderWidth: 1,
                        backgroundColor: '#ffffff',
                        caretSize: 0,
                        cornerRadius: 0,
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