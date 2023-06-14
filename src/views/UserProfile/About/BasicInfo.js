import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useSkin } from '@hooks/useSkin'
import { useSelector } from 'react-redux'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import { Coffee, Mail, Phone, PlusCircle, User } from 'react-feather'
import AddUpdateBasicInfo from './AddUpdateBasicInfo'




const BasicInfo=(props)=>{

    const {skin,setSkin} = useSkin()

    const storeData = useSelector(state=>state.profileReducer)
    const aboutsectionData = storeData.aboutSectionData
    const contactInfo = aboutsectionData?.BasicInfo1
    const basicInfo = aboutsectionData?.BasicInfo

    const [viewForm,setViewForm] = useState(false)

    // useEffect(()=>{

    //     if(Object.keys(aboutsectionData).length){
    //         setContactInfo([...aboutsectionData.BasicInfo,...aboutsectionData.BasicInfo1])
    //     }

    // },[aboutsectionData])

    console.log(' % contact Info:',contactInfo)

    return(
        <div>

            <Row className='m-0'>
                <Col sm='12'>
                    <div className='mb-1'>
                        <p className={`text-${ParagraphColor[skin]} fs-3 fw-bolder`}>Contact Info</p>
                        {
                            contactInfo?.map((x,index)=>{
                                return(
                                    <div key={index}>
                                        <div className='mb-1 d-flex gap-1 flex-wrap align-items-center'>
                                            <div><Phone size={20}/></div>
                                            <div>
                                                <p className={`text-${ParagraphColor[skin]} m-0`}>{x.contact_number}</p>
                                                <span className={`text-${ParagraphColor[skin]}`}>Mobile</span>
                                            </div>          
                                        </div>
                                        <div className='mb-1 d-flex gap-1 flex-wrap align-items-center'>
                                            <div><Mail size={20}/></div>
                                            <div>
                                                <p className={`text-${ParagraphColor[skin]} m-0`}>{x.primary_email}</p>
                                                <span className={`text-${ParagraphColor[skin]}`}>Primary email</span>
                                            </div>          
                                        </div>
                                        <div className='mb-1 d-flex gap-1 flex-wrap align-items-center'>
                                            <div><Mail size={20}/></div>
                                            <div>
                                                <p className={`text-${ParagraphColor[skin]} m-0`}>{x.secondary_email}</p>
                                                <span className={`text-${ParagraphColor[skin]}`}>Secondary email</span>
                                            </div>          
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <p className={`text-${ParagraphColor[skin]} fs-3 fw-bolder`}>Basic Info</p>
                        <p 
                        className={`${viewForm? 'd-none':'d-block'} text-${ParagraphColor[skin]} fw-bolder my-2 fs-4 cursor-pointer`}
                        onClick={()=>{
                            setViewForm(true)
                        }}
                        >
                            <PlusCircle size={25} className='me-1'/>    
                            <span>Add Language</span>
                        </p>
                        <div className={`${viewForm?'d-block':'d-none'}`}>
                            <AddUpdateBasicInfo 
                            view={viewForm}
                            setView={setViewForm}/>
                        </div>
                        
                        {
                            basicInfo?.map((x,index)=>{
                                return(
                                    <div key={index}>
                                        <div className='mb-1 d-flex gap-1 flex-wrap align-items-center'>
                                            <div><User size={20}/></div>
                                            <div>
                                                <p className='m-0'>{x.gender}</p>
                                                <span>Gender</span>
                                            </div>          
                                        </div>
                                        <div className='mb-1 d-flex gap-1 flex-wrap align-items-center'>
                                            <div><Coffee size={20}/></div>
                                            <div>
                                                <p className='m-0'>{x.date_of_birth}</p>
                                                <span>Birth Date</span>
                                            </div>          
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>            

        </div>
    )
}

export default BasicInfo