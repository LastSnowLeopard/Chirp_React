import React, { useEffect, useState } from "react"
// import { Button } from "reactstrap"
import { getAllFriendsData, getProfileData, getUserHobbies, setViewBioModal, setViewHobbieModal } from "../../redux/Action/Profile"
import {useSelector} from 'react-redux'
import Profile from '../pages/profile/index'
import ProfileHeader from "./ProfileHeader"
import Dropdown from "../components/dropdowns/index"
import Button from '../components/buttons/index'
import { HobbieButton } from "../Styled-Components"
import HobbiesModal from "./HobbieModal"
import InputGroupBasic from '../forms/form-elements/input-groups/index'
import ProfileBody from "./PostSection"
import { useSkin } from '@hooks/useSkin'
import { store } from "../../redux/store"




const UserProfile=(props)=>{

    const storeData = useSelector(state=>state.profileReducer)
    
    const viewHobbieModal = storeData.viewHobbiesModal
    const viewBioModal = storeData.viewBioModal

    
    const { skin, setSkin } = useSkin()

    useEffect(()=>{

        getProfileData()
        getUserHobbies()
        getAllFriendsData()
        
    },[])

    const TopBackgorund={
        'light':'white',
        'dark' : '#242526'
    }

    return(
        <div className="position-relative">
            {/* <div style={{position:'absolute',width:'98.7vw',background:TopBackgorund[skin],top:0,height:'85.4vh',zIndex:-1}} ></div> */}
            <div id='user-profile'>
                { Object.keys(storeData.data.profileData).length?
                    <ProfileHeader 
                    data={storeData.data.profileData}
                    store={storeData}
                    viewHobbieModal={viewHobbieModal}
                    setViewHobbiesModal={setViewHobbieModal}
                    viewBioModal={viewBioModal}
                    setViewBioModal={setViewBioModal}
                    />:''
                }
                <div className="p-2">
                    {props.children}
                </div>
                <HobbiesModal
                view={viewHobbieModal}
                setView={setViewHobbieModal}
                store={storeData}
                />
            </div>
            
        </div>
    )
}
export default UserProfile