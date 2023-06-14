import React, { useEffect, useState } from "react"
import { Button, Col, Input, Row } from "reactstrap"
import { getDetailsForEditProfile, getUserHobbies } from "../../redux/Action/Profile"
import { baseURL, HobbiesRenderer } from "../../utility/snippets/snippets"
import Modal from "../components/Modal"
import CreateUpdateBio from "./CreateUpdateBio"
import { useSkin } from '@hooks/useSkin'
import ButtonLoader from "../components/button-loader"
import OverviewTab from './About/OverviewTab'
import { useNavigate } from "react-router-dom"




const EditProfileModal=(props)=>{

    const {addUpdateBio,setAddUpdateBio,view,setView,viewImageModal,setViewImageModal,setViewHobbieModal,data,store} = props

    
    const hobbiesData = store.data?.user_hobbies
    const hobbieLoading =store.hobbiesLoading

    const { skin, setSkin } = useSkin()
    const navigate = useNavigate()

    const imageButtonHandler=()=>{
        
        setViewImageModal(true)
        
    }

    useEffect(()=>{

        getDetailsForEditProfile()

    },[])
    

    return(
        <div>
            <Modal
            view={view}
            setView={setView}
            headerText='Edit Profile'
            bodyClassName='px-0'
            modalSize='modal-lg'
            >
                <Row className="m-0">
                    <Col sm='12'>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0 fw-bolder fs-4">Profile Photo</p>
                            <Button.Ripple 
                            color='primary'
                            onClick={imageButtonHandler}>
                                Edit
                            </Button.Ripple>
                        </div>
                        <div className="p-3 d-flex justify-content-center align-items-center">
                            <div className="border border-5 rounded-circle" style={{width:'200px',height:'200px'}}>
                                <img 
                                src={`${baseURL}/${data.profile_image_url}`} 
                                className='rounded-circle' 
                                width='100%' 
                                height='100%' 
                                style={{objectFit:'fill'}}/>
                            </div>
                        </div>
                    </Col>
                    <Col sm='12'>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0 fw-bolder fs-4">Cover Photo</p>
                            <Button.Ripple 
                            color='primary'
                            onClick={imageButtonHandler}>
                                Edit
                            </Button.Ripple>
                        </div>
                        <div className="p-3 px-5 d-flex justify-content-center align-items-center">
                            <div style={{height:'300px'}}>
                                <img 
                                className="rounded"
                                src={`${baseURL}/${data.cover_photo_url}`} 
                                width='100%' 
                                height='100%' 
                                style={{objectFit:'fill'}}/>
                            </div>
                        </div>
                    </Col>
                    <Col sm='12'>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0 fw-bolder fs-4">Bio</p>
                            <Button.Ripple 
                            color='primary'
                            onClick={()=>setAddUpdateBio(!addUpdateBio)}>
                                {
                                    addUpdateBio?
                                    'Cancel':
                                    'Add'
                                }
                            </Button.Ripple>
                        </div>
                        <div className={`p-3 ${data.overview_text_privacy==1?'d-block':'d-none'}`}>
                            <span className={`${addUpdateBio? 'd-none':'d-block'} text-center fs-4`}>
                                {
                                    data.bio!=='' && data.bio!=null?
                                        data.bio:
                                        'Describe yourself...'
                                }
                            </span>
                            <div
                            className={`${addUpdateBio? 'd-flex':'d-none'} justify-content-center`}
                            >
                                <CreateUpdateBio
                                view={addUpdateBio}
                                setView={setAddUpdateBio}/>
                            </div>
                        </div>
                    </Col>
                    <Col sm='12'>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0 fw-bolder fs-4">Customize Your Intro</p>
                            <Button.Ripple 
                            color='primary'
                            onClick={()=>{
                                setView(false)
                                navigate('/profile/about')
                            }}
                            >
                                Edit
                            </Button.Ripple>
                        </div>
                        <div>
                           <OverviewTab postSectionCall={true}/>
                        </div>
                    </Col>
                    <Col sm='12'>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0 fw-bolder fs-4">Hobbies</p>
                            <Button.Ripple 
                            color='primary'
                            onClick={()=>{
                                    setViewHobbieModal(true);
                                }}>
                                Add
                            </Button.Ripple>
                        </div>
                        <div className="p-2">
                            {
                               hobbieLoading?
                               <ButtonLoader/>:
                               HobbiesRenderer({hobbiesData,skin})
                            }
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}
export default EditProfileModal