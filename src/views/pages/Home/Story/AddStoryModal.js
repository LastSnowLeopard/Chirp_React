// import React, { useEffect } from 'react'
// import { Button, ButtonGroup, Card, Input } from 'reactstrap'
// import Modal from  '../../../components/Modal'
// import Avatar from '@components/avatar'
// import { ModalCloseButton, ParagraphColor, baseURL, privacyOptions, privacyOptionsIcons } from '../../../../utility/snippets/snippets'
// import { useSkin } from '@hooks/useSkin'
// import { ChevronDown, ChevronLeft, Edit2, Film, Globe, MapPin, MoreHorizontal, MoreVertical, Music, Smile, Users, XCircle } from 'react-feather'
// import { useRef } from 'react'
// import { useState } from 'react'
// import toast from 'react-hot-toast'
// import Img1 from '../../../../assets/images/banner/banner-1.jpg'
// import Img2 from '../../../../assets/images/banner/banner-10.jpg'
// import Img3 from '../../../../assets/images/banner/banner-11.jpg'
// import Img4 from '../../../../assets/images/banner/banner-2.jpg'
// import Img5 from '../../../../assets/images/banner/banner-16.jpg'
// import Group from '../../../../assets/images/icons/Group.png'
// import GIFIcon from '../../../../assets/images/icons/GIF.png'
// import GIF from '../../../components/GIFRenderer'
// import { useSelector } from 'react-redux'
// import PrivacyModal from '../../../components/PrivacyModal'
// import SearchLocationModal from '../../../UserProfile/Post/SeachLocationModal'
// import ButtonLoader from '../../../components/button-loader'
// import TagFriendModal from '../../../UserProfile/Post/TagFriendModal'
// import FeelingsModal from '../../../UserProfile/Post/FeelingsModal'
// import EditMediaModal from '../../../UserProfile/Post/EditMediaModal'
// import { ProfilePhotoRender,UserAvatar, getPostBackgrounds, newPost, postStory } from '../../../../redux/Action/Profile'
// import { CreatePostInput, PostHeaderInput, PostInputFieldContainer } from '../../../Styled-Components'
// import PostElementModal from '../../../UserProfile/Post/PostElementsModal'
// import AudioModal from './AudioModal'
// import { current } from '@reduxjs/toolkit'





// const AddStoryModal=(props)=>{

//     const {view,setView,formData,userData} = props

//     const dataAvailable = formData!=undefined

//     const store = useSelector(state=>state.profileReducer)

//     const { skin, setSkin } = useSkin()

//     const videoInputRef = useRef(null)
//     const audioInputRef=useRef(null)


//     const [videoSrc,setVideoSrc] = useState([])
//     const [videoFile,setVideoFile] = useState([])

//     const [imageSrc,setImageSrc] = useState([])
//     const [imageURLs,setImageURLs] = useState([])

//     const [postText,setPostText] = useState('')
    
//     const [viewPrivacyModal,setViewPrivacyModal] = useState(false)
//     const [privacy,setPrivacy] = useState('public')

//     const [loading,setLoading]  = useState(false)
//     const [viewLocationModal,setViewLocationModal] = useState(false)
//     const [location,setLocation] = useState('')

//     const [feeling,setFeeling] = useState(-1)
//     const [viewFeelingModal,setViewFeelingModal] = useState(false)

//     const [viewTagFriendModal,setVewTagFriendModal] = useState(false)
//     const [tagged_user,setTaggedUser] = useState([])

//     const [viewBackgroundList,setViewBackgroundList] = useState(false)

//     const [viewElementModal,setViewElementModal] = useState(false)
//     const [gif,setGIF] = useState('')

//     const [viewGIFModal,setViewGIFModal] = useState(false)

//     const [viewEditMediaModal,setViewEditMediaModal] = useState(false)
//     const [selectedBackground,setSelectedBackground] = useState(-1)
    
//     const [mediaList,setMediaList] = useState([])
//     const [currentAudio,setCurrentAudio] = useState(-1)

//     const [viewAudioModal,setViewAudioModal] = useState(false)

//     const [acceptMedia,setAcceptMedia] =  useState('image/*, video/*,audio/*')

//     const handleVideoClick = event => {
//         // if(selectedBackground==-1 && gif.length==0){
//             videoInputRef.current.click();
//         // }
//     };

//     const handleVideoChange = (event) => {

        
//         const file = event.target.files[0];
       
//         if(file){

//             const url = URL.createObjectURL(file);
//             const type = file.type
//             const media_type = type.split('/')[0];
//             const mediaObject = { media_type, file, media_url: url };

//             if(type?.includes('audio')){

//                 setViewBackgroundList(true)
//                 setSelectedBackground(store?.postBgImages?.at(0))

//             }else{

//                 setSelectedBackground(-1)
//                 setViewBackgroundList(false)
//             }

            
//             setMediaList([mediaObject]);

//         }
        
//     };

//     const footerComponent=()=>{

//         const formData = new FormData()
//         const audioImage = currentAudio?.album?.images[0]?.url 

//         formData.append('user_id', userData?.user_id)
//         formData.append('privacy_level',privacy)
//         formData.append('thumb_nail_url', audioImage?? null)
//         formData.append('text_content',postText)
//         formData.append('music_url',currentAudio?.preview_url ?? null)
//         formData.append('background_id',selectedBackground?.id || '')
//         formData.append('background_image_url',selectedBackground.image_url || '')
//         formData.append('story_type',currentAudio!=-1? 'spotify_audio':mediaList?.at(0)?.media_type)
//         formData.append('story_media',mediaList?.at(0)?.file)
//         // mediaList.map(x=>{
//         //     formData.append('story_media',x.file)
//         // })

//         return(
//             <Button.Ripple
//             className='w-100'
//             color='primary'
//             onClick={()=>{
//                 !loading? postStory(formData,setView,setLoading,mediaList) :console.log('')
//             }}
//             >
//                 {
//                     loading?
//                     <ButtonLoader/>:
//                     'Post'
//                 }
//             </Button.Ripple>
//         )
//     }

//     const MediaRenderer=()=>{

//         return(
//             <div className={`position-relative border rounded overflow-auto p-1 ${mediaList.length ? 'd-block':'d-none'}`}>
//                 <div className={`media-header my-1 position-absolute top-0 ${mediaList.length? 'd-block':'d-none'}`} style={{width:'95%'}}>   
//                     <div className='d-flex justify-content-between'>
//                        <div>
                        
//                             <Button.Ripple
//                             color='primary'
//                             className='me-50'
//                             onClick={()=>setViewEditMediaModal(true)}>
//                                     <Edit2 size={15}/>
//                                     Edit
//                             </Button.Ripple>
                            
//                             <Button.Ripple
//                             color='primary'
//                             disabled={selectedBackground!=-1 || gif.length!=0}
//                             onClick={handleVideoClick}>
//                                     Add Photos & Videos
//                             </Button.Ripple>
                        
//                        </div>
//                         <div>
//                             {ModalCloseButton(setView,'relative')}
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     {
//                         mediaList.map((media,index)=>{
//                             return(
//                                 <div>
//                                     {
//                                         media.media_type.includes('image') || media.media_type.includes('gif') ?
//                                         <img 
//                                         key={index} 
//                                         className='m-1' 
//                                         src={media.media_type.includes('gif') ?media.media_url:ProfilePhotoRender(media.media_url)} 
//                                         height='200' 
//                                         width='200'
//                                         />:
//                                         media.media_type.includes('video')?
//                                         <video
//                                         key={index}
//                                         className="VideoInput_video mt-4"
//                                         width="100%"
//                                         height={150}
//                                         controls
//                                         src={media.media_url}
//                                         />:
//                                         <audio src={media.media_url} controls className='mt-5'/>
//                                     }
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
              
//             </div>
//         )
//     }

//     const dataToRenderBGs=()=>{
        
//         // if(store.postBgImages.length>8){
        
//         //     return store.postBgImages.slice(0,8)
        
//         // }else{

//             return store.postBgImages
//         // }
//     }
//     const RenderBGs=()=>{
        
//         return dataToRenderBGs()?.map((x,index)=>{
//             return(
//                 <div key={index} style={{height:'40px',width:'40px'}} className={`border rounded flex-shrink-0`}>
//                     <img 
//                     src={`${baseURL}/${x.image_url}`} 
//                     width='100%' 
//                     height='100%' 
//                     className={`rounded cursor-pointer ${selectedBackground.id==x.id && 'border-white'}`} 
//                     onClick={()=>setSelectedBackground(x)}/>
//                 </div>
//             )
//         })
//     }
    

//     // use Effect for Edit 
//     // useEffect(()=>{

//     //     if(dataAvailable){
            
//     //         const feelingObj={
//     //             feelings_name:formData.feelings_name,
//     //             feelings_id:formData.feeling_id
//     //         }
            
//     //         const bgImageObj={
            
//     //             id:formData.post_backgroundid,
//     //             image_url:formData.background_image_url,
//     //             background_type:formData.background_type
            
//     //         }
            
            
//     //         setPostText(formData.content)
//     //         setFeeling(formData.feeling_id!=''?feelingObj:-1)
//     //         setTaggedUser(formData.tagged_user!=''? formData.tagged_user : [])
//     //         setLocation(formData.location)
//     //         setGIF(formData.gif_image_url)
//     //         setPrivacy(formData.privacy)
//     //         setMediaList(formData.media)

//     //         setSelectedBackground(formData.post_backgroundid!=null? bgImageObj:-1)

//     //     }
//     // },[dataAvailable])

//     useEffect(()=>{

//         if(view){
//             getPostBackgrounds()   
//         }

//     },[view])

//     useEffect(()=>{
        
//         if(!view){
//             setMediaList([])
//             setTaggedUser([])
//             setSelectedBackground(-1)
//             setCurrentAudio(-1)
//         }
       
//     },[view])

//     useEffect(()=>{

//         if(currentAudio!=-1){

//             setAcceptMedia('image/*')

//         }else{
//             setAcceptMedia('image/* , video/* , audio/*')
//         }
//     },[currentAudio])

//     useEffect(()=>{

//         if(store?.postBgImages?.length){
//             setViewBackgroundList(true)
//             setSelectedBackground(store?.postBgImages?.at(0))
//         }
//     },[store?.postBgImages])

//     return(
//         <div>
//             <Modal
//             view={view}
//             setView={setView}
//             modalSize='modal-md'
//             headerText='Add Story'
//             bodyClassName='p-0'
//             footerComponent={
//                 footerComponent()
//             }
//             >
//                 <div className='p-1'>
//                     <div className='add-post-header d-flex align-items-center my-1'>
//                         <div>
//                             {UserAvatar(1,userData?.profile_image_url,50,50)}
//                         </div>
//                         <div>
//                             <div>
//                                 <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
//                                     <strong>
                                        
//                                         {userData?.full_name} 
                                        
//                                         {feeling!=-1? ` is feeling ${feeling.feelings_name}`:''}
                                        
//                                         {tagged_user.length? (` 
                                           
//                                            ${feeling!=-1? '':' is'} with 
                                           
//                                            ${tagged_user[0].full_name} ${tagged_user.length>1? (`
                                           
//                                                 and ${tagged_user.slice(0,tagged_user.length-1).length} others`):
                                                
//                                                 ''}`)
//                                         :'' }

//                                         {location.length? ` ${feeling!=-1 || tagged_user.length==0?'':' is'} in ${location}`:''}
//                                     </strong>
//                                 </p>
//                             </div>
//                             <div>
//                                 <Button.Ripple 
//                                 color='gray'
//                                 size='sm' 
//                                 className='px-1 p-0'
//                                 onClick={()=>setViewPrivacyModal(true)}>
//                                     {privacyOptionsIcons[privacy]}
//                                     {privacyOptions[privacy]}
//                                     <ChevronDown size={20}/>
//                                 </Button.Ripple>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`${currentAudio!=-1?'d-block':'d-none'}`}>
//                         <CreatePostInput
//                         value={postText}
//                         defaultValue={dataAvailable? formData?.content:''}
//                         background={false}
//                         autocorrect='off'
//                         className='form-control' 
//                         skin={skin}
//                         placeholder={`What's on your mind?`}
//                         onChange={(e)=>setPostText(e.target.value)}
//                         />
//                     </div>
//                     <div className='overflow-auto' style={{maxHeight:'300px'}}>
                        
//                         <PostInputFieldContainer background={selectedBackground!=-1} url={selectedBackground?.image_url}>
//                             {
//                                 currentAudio==-1?
//                                 <CreatePostInput
//                                 defaultValue={dataAvailable? formData?.content:''}
//                                 background={selectedBackground!=-1}
//                                 autocorrect='off'
//                                 className='form-control' 
//                                 skin={skin}
//                                 placeholder={`What's on your mind?`}
//                                 onChange={(e)=>setPostText(e.target.value)}
//                                 />:
//                                 <div className={`w-1 d-flex flex-column align-items-center justify-content-column cursor-pointer`}>
//                                     <div className="p-75 border rounded">
//                                         <img src={currentAudio.album.images[0].url} width='100'/>
//                                     </div>
//                                     <audio src={currentAudio.preview_url} controls/>
//                                 </div>
//                             }
//                         </PostInputFieldContainer>
//                         {MediaRenderer()}
//                     </div>
//                     {
//                         gif.length==0 && !mediaList.find(x=>x.media_type.startsWith('image') || x.media_type.startsWith('video')) &&
//                         <div className='d-flex gap-1 align-items-center'>
//                             <Card
//                             className='cursor-pointer rounded border d-flex m-0 justify-content-center align-items-center' 
//                             style={{height:'40px',width:'40px'}}
//                             onClick={()=>setViewBackgroundList(!viewBackgroundList)}>
//                                 {
//                                     viewBackgroundList? <ChevronLeft/>:<span>Aa</span>
//                                 }
//                             </Card>
                            
//                             <div className={`${viewBackgroundList? 'd-flex':'d-none'} gap-50 overflow-auto`}>
//                                 {RenderBGs()}
//                             </div>
//                         </div>
//                     }
                    
//                     <div className='border-primary mt-1 rounded d-flex align-items-center justify-content-between p-1'>
//                         <div>
//                             <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
//                                 <strong>Add to your Story</strong>
//                             </p>
//                         </div>
//                         <div className='d-flex gap-1 align-items-center'>
//                             <div className={`${mediaList.length?'d-none':'d-block'}`}>
//                                 <Music size={1} className='cursor-pointer' onClick={()=>setViewAudioModal(true)}/>
//                             </div>
                            
//                             <div>
//                                 <img src={Group} className='cursor-pointer' onClick={handleVideoClick}/>
//                                 <input 
//                                 type="file"
//                                 accept={acceptMedia}
//                                 ref={videoInputRef}
//                                 onChange={handleVideoChange}
//                                 className='d-none'
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Modal>   
//             <PrivacyModal
//             view={viewPrivacyModal}
//             setView={setViewPrivacyModal}
//             setValue={setPrivacy}
//             value={privacy}
//             initialValue='public'
//             />         
            
//             <EditMediaModal
//             view={viewEditMediaModal}
//             setView={setViewEditMediaModal}
//             mediaArray={mediaList}
//             setMedia={setMediaList}
//             setGIF={setGIF}
//             />

//             <AudioModal
//             view={viewAudioModal}
//             setView={setViewAudioModal}
//             audio={currentAudio}
//             setAudio={setCurrentAudio}
//             />
//         </div>
//     )
// }
// export default AddStoryModal



import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../components/Modal'
import { Col, Row } from 'reactstrap'
import { AddStoryBox, AddStoryBoxIcon } from '../../../Styled-Components'
import Group from '../../../../assets/images/icons/Group.png'
import AddStory from './AddStory'
import { getPostBackgrounds } from '../../../../redux/Action/Profile'
import { GetFontListsForText } from '../../../../redux/Action/NewsFeed'


const AddStoryModal=(props)=>{


    const {view,setView,userData} = props

    
    const mediaRef = useRef(null)

    const [addStory,setAddStory] = useState(false)
    const [storyType,setStoryType] = useState(-1)

    const [image,setImage] = useState('')
    const [imageFile,setImageFile] = useState()


    const btnHandler=(type)=>{

        if(type=='text'){

            setStoryType(type)
            setAddStory(true)    
            setView(false)

        }else{

            mediaRef.current.click()

        }

    }

    
    const handleMediaChange=(event)=>{

        const file = event.target.files[0];
        const type = file.type 
        
        if(file){

            const url = URL.createObjectURL(file);
            
            if(type.includes('image')){

                setStoryType('image')
                
            }else{

                setStoryType('video')

            }   
            
            setImage(url)
            setImageFile(file)

            setAddStory(true)    
            setView(false)

        }
    }
    useEffect(()=>{

        if(view){
            getPostBackgrounds()
            GetFontListsForText()
        }
    },[view])

    return(
        <div>

            <Modal
            view={view}
            setView={setView}
            modalSize='modal-lg'
            headerText='Your Story'
            bodyClassName='p-0'
            >
                <Row className='m-0 px-3 py-2'>
                    <Col md='6' className='px-1'>
                        <AddStoryBox color='blue' onClick={()=>btnHandler('text')}>
                            <AddStoryBoxIcon>
                                <p className='text-black fs-2 fw-bold m-0'>Aa</p>
                            </AddStoryBoxIcon>
                            <p className='text-black fs-2 fw-bold m-0'>Add Text Story</p>
                        </AddStoryBox>
                    </Col>
                    <Col md='6' className='px-1'>
                        <AddStoryBox color='red' onClick={()=>btnHandler('image')}>
                            <AddStoryBoxIcon>
                                <img src={Group} width='40px' />
                            </AddStoryBoxIcon>
                            <p className='text-black fs-2 fw-bold m-0'>Add Media Story</p>
                        </AddStoryBox>
                        <input 
                        className='d-none'
                        ref={mediaRef}
                        type='file'
                        accept='video/* , image/*'
                        onChange={handleMediaChange}
                        />
                    </Col>
                </Row>
            </Modal>
            <AddStory
            view={addStory}
            setView={setAddStory}
            type={storyType}
            imageFile={imageFile}
            setImageFile={setImageFile}
            image={image}
            setImage={setImage}
            />
        </div>
    )
}
export default AddStoryModal