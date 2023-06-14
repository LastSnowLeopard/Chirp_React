import React from 'react'
import Avatar from '@components/avatar'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { useState } from 'react'
import AddPostModal from './AddPostModal'
import PrivacyModal from '../../components/PrivacyModal'
import { UserAvatar } from '../../../redux/Action/Profile'
import Edit from '../../../assets/images/icons/Edit.png'
import Group from '../../../assets/images/icons/Group.png'
import VideoCam from '../../../assets/images/icons/VideoCam.png'
import Camera from '../../../assets/images/icons/Group1.png'
import { useSkin } from '@hooks/useSkin'
import { ParagraphColor } from '../../../utility/snippets/snippets'



const AddPost=(props)=>{

    const {store,profileData} = props
    
    const userData = JSON.parse(localStorage.getItem('userData'))

    const [viewModal,setViewModal] = useState(false)

    const { skin, setSkin } = useSkin()

    const ProfilePhotoRender=()=>{
        if(profileData.profile_image_url?.includes('blob')){
          return profileData.profile_image_url
        }else{
          return `${localStorage.getItem('baseURL')}/${profileData.profile_image_url}`
        }
    }

    const PostSectionColor={
        'light':'#fff',
        'dark':'#3A3B3C'
    }



    return(
        <div className='px-2 p-1'>
            <div className='py-1 d-flex justify-content-between'>
                <span className='cursor-pointer' onClick={()=>setViewModal(true)}>
                    <img src={Edit} className='me-50'/>
                    Create Post
                </span>
                {/* <div>
                    <img src={VideoCam} className='mx-1 cursor-pointer'/>
                    <img src={Group} className='mx-1 cursor-pointer'/>
                    <img src={Camera} className='ms-1 cursor-pointer'/>
                </div> */}
            </div>
            <div className='d-flex gap-1'>
                {/* <div>
                    {UserAvatar(profileData?.profile_image_url_privacy,profileData.profile_image_url,'40','40',{alignText:'center'})}
                </div> */}
                <div className='flex-grow-1'>
                    <InputGroup 
                    className='align-items-start' 
                    style={{border:'1px solid rgba(0, 0, 0, 0.2)',background:PostSectionColor[skin] ,borderRadius:'10px',height:'109px',padding:'0.4rem'}}
                    >
                        <InputGroupText className='border-0 p-0' style={{background:PostSectionColor[skin]}}>
                            {UserAvatar(1,userData?.profile_image_url,'40','40',{alignText:'center'})}
                        </InputGroupText>
                        <Input
                        className={`border-0 p-0 my-1 bg-${skin=='light'?'white':'theme-dark-input-bg'} `}
                        // style={{ background:`${PostSectionColor[skin]} !important`}}
                        placeholder={`What's on Your Mind?`}
                        onClick={()=>setViewModal(true)}/>
                    </InputGroup>
                </div>
            </div>
            <div className='mt-1 d-flex gap-2 flex-wrap cursor-pointer'>
                <span className={`cursor-pointer d-flex align-items-center fw-bolder text-${ParagraphColor[skin]}`} onClick={()=>setViewModal(true)}>
                    <img src={VideoCam} className='px-1' />   
                    Live Video
                </span>
                <span className={`cursor-pointer d-flex align-items-center fw-bolder text-${ParagraphColor[skin]}`} onClick={()=>setViewModal(true)}>
                    <img src={Group} className='px-1'/>
                    Photos/Videos
                </span>
                <span className={`cursor-pointer d-flex align-items-center fw-bolder text-${ParagraphColor[skin]}`} onClick={()=>setViewModal(true)}>
                    <img src={Camera} className='px-1'/>
                    Feeling/Activity
                </span>
                
            </div>
            <AddPostModal
            view={viewModal}
            setView={setViewModal}
            store={store}
            profileData={profileData}
            userData={userData}
            />
        </div>
    )
}
export default AddPost