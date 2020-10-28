import React, { useState, useEffect, useContext } from 'react'
import LeftNavCandidate from '../../CommonComp/LeftNavCandidate'
import HeaderAll from '../../CommonComp/HeaderAll'
import { Information, NavBar, LanguageKnown } from './details';
import { Breadcrumbs } from '../../CommonComp/breadcrumbs/index';
import { PopupContent } from './PopupContent';
import ScrollUpButton from "react-scroll-up-button";
import './profile.css';
import '../../../Assets/css/Candidate.css'
import ApiServicesOrgCandidate from '../../../Services/ApiServicesOrgCandidate'
import { Context } from '../../../Context/ProfileContext';
export const Profile = () => {
    console.log('profileComponent')
    const [isPopupVisible, setPopupVisible] = React.useState(false);
    const [popupTitle, setPopupTitle] = React.useState('');
    const [id, setId] = useState('');
    const [dataAttributes, setDataAttributes] = React.useState('');
    const [candidateProfile, setCandidateProfile] = React.useState('');
    const { getProfileInfo } = useContext(Context);
    useEffect(() => {
        getProfileInfo();
        ApiServicesOrgCandidate.fetchProfileInfo().then(response => {
            setCandidateProfile(response)
        }).catch(error => { });
    }, [])
    const showPopup = (title, isVisible, data, id) => {
        setId(id);
        setPopupTitle(title);
        setPopupVisible(isVisible);
        setDataAttributes(data);
    }
    return (
        <div>
            <LeftNavCandidate />
            <div className="maincontent">
                <HeaderAll isCandidate={true} />
                <div className='container-fluid px-5 py-4 right-panel'>
                    {isPopupVisible ? <PopupContent
                        title={popupTitle}
                        showPopup={setPopupVisible}
                        id={id}
                        dataAttributes={dataAttributes}
                    /> : null}
                    <div className="pb-2 mt-5">
                        <Breadcrumbs />
                    </div>
                    <Information
                        showPopup={showPopup}
                        candidateProfile={candidateProfile}
                    />
                    <NavBar
                        showPopup={showPopup}
                        candidateProfile={candidateProfile}
                    />
                    <ScrollUpButton />
                </div>
            </div>
        </div>
    )
}