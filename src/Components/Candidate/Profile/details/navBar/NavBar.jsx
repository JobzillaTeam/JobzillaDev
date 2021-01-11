import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import RenderLoader from '../../../../CommonComp/Loader';
import { About, CTC, DesiredProfile } from '../about';
import { Certifications, Education } from '../education';
import { Employment } from '../employment';
import { LanguageKnown, PersonalDetails } from '../personalDetails';
import Resume from '../resume/Resume';
import { Skills } from '../skills';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTopWithCallback = this.scrollToTopWithCallback.bind(this);
    this.state = {
      offset: -90,
      currentTabIndex: 0
    }
  }

  componentDidMount() {
    window.onscroll = function () { myFunction() };

    var navbar = document.getElementById("profileNavbar");
    var sticky = navbar.offsetTop;

    const myFunction = () => {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        this.setState({
          offset: -45
        })
      } else {
        navbar.classList.remove("sticky");
        this.setState({
          offset: -90
        })
      }
    }
    scrollToComponent(this.refs.name, {
      offset: 500,
      align: 'top',
      duration: 500,
      ease: 'inCirc',
    });
  }

  scrollToTopWithCallback() {
    let scroller = scrollToComponent(this.Violet, {
      offset: 0,
      align: 'top',
      duration: 1500,
    });
    scroller.on('end', () => console.log('Scrolling end!'));
  }

  render() {
    return (
      <div className='main'>
        <div className='profile__button_group' id="profileNavbar">
          <div
            class={`profileTabs ${this.state.currentTabIndex === 0 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.AboutSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({ currentTabIndex: 0 })
            }}
          >
            About
          </div>
          <div
            class={`profileTabs ${this.state.currentTabIndex === 1 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.ResumeSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({ currentTabIndex: 1 })
            }}
          >
            Resume
          </div>
          <div
            class={`profileTabs ${this.state.currentTabIndex === 2 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.SkillsSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({ currentTabIndex: 2 })
            }}
          >
            Skills
          </div>
          <div
            class={`profileTabs ${this.state.currentTabIndex === 3 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.EducationSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({ currentTabIndex: 3 })
            }}
          >
            Education & Certifications
          </div>
          <div
            class={`profileTabs ${this.state.currentTabIndex === 4 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.EmploymentSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({ currentTabIndex: 4 })
            }}
          >
            Employment
          </div>
          <div
            class={`profileTabs ${this.state.currentTabIndex === 5 ? 'profileTabsSelected' : ''}`}
            onClick={() => {
              scrollToComponent(this.PersonalDetailsSection, {
                offset: this.state.offset,
                align: 'top',
                duration: 1500,
              });
              this.setState({ currentTabIndex: 5 })
            }}
          >
            Personal Details
          </div>
        </div >
        {(!this.props.candidateProfile) ? (
          <div class='mt-5'>
            <RenderLoader />
          </div>
        ) : (
            <div>
              <section class="mb-3"
                ref={(section) => {
                  this.AboutSection = section;
                }}
              >
                <About
                  showPopup={this.props.showPopup}
                  about={this.props.candidateProfile.candidateInfo.about}
                />
                <CTC
                  showPopup={this.props.showPopup}
                  ctc={this.props.candidateProfile.candidateInfo}
                />
                <DesiredProfile
                  showPopup={this.props.showPopup}
                  careerProfile={this.props.candidateProfile.careerProfile}
                />
              </section>
              <section class="mb-3"
                ref={(section) => {
                  this.ResumeSection = section;
                }}
              >
                <Resume showPopup={this.props.showPopup} />
              </section>
              <section class="mb-3"
                ref={(section) => {
                  this.SkillsSection = section;
                }}
              >
                <Skills showPopup={this.props.showPopup} />
              </section>
              <section class="mb-3"
                ref={(section) => {
                  this.EducationSection = section;
                }}
              >
                <Education showPopup={this.props.showPopup} />
                <Certifications showPopup={this.props.showPopup} />
              </section>
              <section class="mb-3"
                ref={(section) => {
                  this.EmploymentSection = section;
                }}
              >
                <Employment showPopup={this.props.showPopup} />
              </section>
              <section class="mb-3"
                ref={(section) => {
                  this.PersonalDetailsSection = section;
                }}
              >
                <PersonalDetails showPopup={this.props.showPopup} />
                <LanguageKnown showPopup={this.props.showPopup} />
              </section>
            </div>
          )
        }
      </div>
    );
  }
}
