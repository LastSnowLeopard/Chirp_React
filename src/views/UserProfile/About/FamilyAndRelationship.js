import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ParagraphColor, baseURL } from '../../../utility/snippets/snippets'
import { useSkin } from '@hooks/useSkin'
import Avatar from '../../../@core/components/avatar/index'
import DummyAvatar from "../../../assets/images/avatars/2.png"
import { Edit2, MoreVertical, PlusCircle } from 'react-feather'
import AddFamilyMember from './AddFamilyMember'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'


const FamilyAndRelationship=(props)=>{

    const {skin,setSkin} = useSkin()

    const [viewRelationship,setViewRelationship] = useState(false)

    const storeData = useSelector(state=>state.profileReducer)
    const store = useSelector(state=>state.profileReducer)
    const aboutSectionData = store.aboutSectionData
    const data = aboutSectionData.RelationShip
    const [formData,setFormData] = useState(undefined)
    


    return(
        <div>
            <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>Relationships</p>
            <p 
            className={`${viewRelationship? 'd-none':'d-block'} text-${ParagraphColor[skin]} fw-bolder m-1 fs-4 cursor-pointer`}
            onClick={()=>{
                setViewRelationship(true)
            }}
            >
                <PlusCircle size={25}/>    
                <span className='mx-1'>Add Family Member</span>
            </p>
            <div className={`${viewRelationship && formData==undefined?'d-block':'d-none'}`}>
                <AddFamilyMember
                view={viewRelationship}
                setView={setViewRelationship}
                formData={formData}
                />
            </div>
            {
                data?.map((member,index)=>{
                    return(
                        <>
                            <div className='p-1 d-flex align-items-center'>
                                <div style={{width:'7%'}}>
                                    <Avatar 
                                    className='me-1' 
                                    content={member.full_name} 
                                    img={member.profile_image_url!=null?`${baseURL}/${member.profile_image_url}`:null} 
                                    imgHeight='50' 
                                    imgWidth='50'
                                    initials />
                                </div>
                                <div className='flex-grow-1'>
                                    <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                                        <strong>{member.full_name}</strong>
                                    </p>
                                    <span>{member.relationship}</span>
                                </div>
                                <div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag='div' className='btn btn-sm'>
                                            <MoreVertical size={22} color={ParagraphColor[skin]} className='cursor-pointer' />
                                        </DropdownToggle>
                                        <DropdownMenu className="p-0">
                                            <DropdownItem className="w-100" 
                                            // onClick={()=>{setFormData(member);setViewRelationship(true)}}
                                            >
                                                <Edit2/>Edit
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                {/* <div key={index} className={`mt-1`}>
                                    <div className={`d-flex align-items-center justify-content-between my-1`}>
                                        <div className='flex-grow-1'>
                                            <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                                                <strong>{member.city}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className={`${formData==undefined?'d-block':'d-none'}`}>
                                <AddFamilyMember
                                view={viewRelationship}
                                setView={setViewRelationship}
                                formData={formData}
                                />
                            </div> */}
                        </>
                    )
                })
            }

        </div>
    )
}
export default FamilyAndRelationship