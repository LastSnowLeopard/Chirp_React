import React, { useEffect } from 'react'
import { Button, ButtonGroup, Card, Input } from 'reactstrap'
import Modal from  '../../components/Modal'
import Avatar from '@components/avatar'
import { ModalCloseButton, ParagraphColor, baseURL, privacyOptions, privacyOptionsIcons } from '../../../utility/snippets/snippets'
import { useSkin } from '@hooks/useSkin'
import { CreatePostInput, PostHeaderInput, PostInputFieldContainer } from '../../Styled-Components'
import { ChevronDown, ChevronLeft, Edit2, Film, Globe, MapPin, MoreHorizontal, MoreVertical, Smile, Users, XCircle } from 'react-feather'
import { useRef } from 'react'
import { useState } from 'react'
import { ProfilePhotoRender, UserAvatar, getPostBackgrounds, newPost } from '../../../redux/Action/Profile'
import toast from 'react-hot-toast'
import PrivacyModal from '../../components/PrivacyModal'
import ButtonLoader from '../../components/button-loader'
import SearchLocationModal from './SeachLocationModal'
import FeelingsModal from './FeelingsModal'
import TagFriendModal from "./TagFriendModal"
import Img1 from '../../../assets/images/banner/banner-1.jpg'
import Img2 from '../../../assets/images/banner/banner-10.jpg'
import Img3 from '../../../assets/images/banner/banner-11.jpg'
import Img4 from '../../../assets/images/banner/banner-2.jpg'
import Img5 from '../../../assets/images/banner/banner-16.jpg'
import Group from '../../../assets/images/icons/Group.png'
import PostElementModal from './PostElementsModal'
import GIFIcon from '../../../assets/images/icons/GIF.png'
import GIF from '../../components/GIFRenderer'
import EditMediaModal from './EditMediaModal'
import { useSelector } from 'react-redux'




const AddPostModal=(props)=>{

    const {view,setView,formData,userData} = props

    const dataAvailable = formData!=undefined

    const store = useSelector(state=>state.profileReducer)

    const { skin, setSkin } = useSkin()

    const videoInputRef = useRef(null)
    const [videoSrc,setVideoSrc] = useState([])
    const [videoFile,setVideoFile] = useState([])

    const [imageSrc,setImageSrc] = useState([])
    const [imageURLs,setImageURLs] = useState([])

    const [postText,setPostText] = useState('')
    
    const [viewPrivacyModal,setViewPrivacyModal] = useState(false)
    const [privacy,setPrivacy] = useState('public')

    const [loading,setLoading]  = useState(false)
    const [viewLocationModal,setViewLocationModal] = useState(false)
    const [location,setLocation] = useState('')

    const [feeling,setFeeling] = useState(-1)
    const [viewFeelingModal,setViewFeelingModal] = useState(false)

    const [viewTagFriendModal,setVewTagFriendModal] = useState(false)
    const [tagged_user,setTaggedUser] = useState([])

    const [viewBackgroundList,setViewBackgroundList] = useState(false)

    const [viewElementModal,setViewElementModal] = useState(false)
    const [gif,setGIF] = useState('')

    const [viewGIFModal,setViewGIFModal] = useState(false)

    const [viewEditMediaModal,setViewEditMediaModal] = useState(false)
    const [selectedBackground,setSelectedBackground] = useState(-1)
    
    const [mediaList,setMediaList] = useState([])
    
    const handleVideoClick = event => {
        if(selectedBackground==-1 && gif.length==0){
            videoInputRef.current.click();
        }
      };

    const handleVideoChange = (event) => {

        
        const file = event.target.files[0];
       
        if(file){
            const url = URL.createObjectURL(file);
        
            const media_type = file.type.startsWith('image/') ? 'image' : 'video';
            const mediaObject = { media_type, file, media_url: URL.createObjectURL(file) };
            setMediaList((prevMediaList) => [...prevMediaList, mediaObject]);
        }
        
        // if(file?.type?.includes('video')){
            
        //     const urlArr=JSON.parse(JSON.stringify(videoSrc))
        //     const filesArr=JSON.parse(JSON.stringify(videoFile))

        //     const formData = new FormData()
        //     formData.append('file',file)

        //     filesArr.push(file)
        //     urlArr.push({media_type:'video',media_url:url,file:formData})


        //     setVideoSrc([...urlArr]);
        //     setVideoFile([...videoFile,file])

        // }else if(file?.type?.includes('image')){

        //     const srcArr=JSON.parse(JSON.stringify(imageSrc))
        //     const urlArr=JSON.parse(JSON.stringify(imageURLs))

        //     const formData = new FormData()
        //     formData.append('file',file)

        //     srcArr.push(file)
        //     urlArr.push({media_type:'image',media_url:url,file:formData})

        //     setImageSrc([...imageSrc,file])
        //     setImageURLs(urlArr)

        // }
    };
    
    // const ProfilePhotoRender=()=>{
    //     if(profileData.profile_image_url?.includes('blob')){
    //       return profileData.profile_image_url
    //     }else{
    //       return `${localStorage.getItem('baseURL')}/${profileData.profile_image_url}`
    //     }
    // }

    const footerComponent=()=>{

        // const allMediaArray=[...imageSrc,...videoFile]

        const formData = new FormData()


        formData.append('userid', userData?.user_id)
        formData.append('tagged_user',tagged_user?.map(x=>x.friend_id || x.user_id).join(','))
        formData.append('privacy',privacy)
        formData.append('content',postText)
        formData.append('location',location)
        formData.append('location_lat_lng','244,3435')
        formData.append('post_type','normal')
        formData.append('feeling_id',feeling.feelings_id || '')
        formData.append('feelings_name',feeling.feelings_name || '')
        formData.append('life_event_id','')
        formData.append('event_date','')
        formData.append('gif_image_url',gif)
        formData.append('background_id',selectedBackground?.id || '')
        formData.append('background_image_url',selectedBackground.image_url || '')

        mediaList.filter(x=>!x.media_type.includes('gif')).map(x=>{
            formData.append('media',x.file)
        })

        return(
            <Button.Ripple
            className='w-100'
            color='primary'
            onClick={()=>{
                !loading? newPost(formData,setView,setLoading,mediaList) :console.log('')
            }}
            >
                {
                    loading?
                    <ButtonLoader/>:
                    'Post'
                }
            </Button.Ripple>
        )
    }

    const MediaRenderer=()=>{

        return(
            <div className={`position-relative border rounded overflow-auto p-50 ${mediaList.length ? 'd-block':'d-none'}`}>
                <div className={`media-header my-1 position-absolute top-0 ${mediaList.length? 'd-block':'d-none'}`} style={{width:'95%'}}>   
                    <div className='d-flex justify-content-between'>
                       <div>
                        
                            <Button.Ripple
                            color='primary'
                            className='me-50'
                            onClick={()=>setViewEditMediaModal(true)}>
                                    <Edit2 size={15}/>
                                    Edit
                            </Button.Ripple>
                            
                            <Button.Ripple
                            color='primary'
                            disabled={selectedBackground!=-1 || gif.length!=0}
                            onClick={handleVideoClick}>
                                    Add Photos & Videos
                            </Button.Ripple>
                        
                       </div>
                        <div>
                            {ModalCloseButton(setView,'relative')}
                        </div>
                    </div>
                </div>
                <div>
                    {
                        mediaList.map((media,index)=>{
                            return(
                                <div>
                                    {
                                        media.media_type.includes('image') || media.media_type.includes('gif') ?
                                        <img 
                                        key={index} 
                                        // className='m-1' 
                                        src={media.media_type.includes('gif') ?media.media_url:ProfilePhotoRender(media.media_url)} 
                                        height='300' 
                                        width='100%'
                                        />:
                                        <video
                                        key={index}
                                        className="VideoInput_video"
                                        width="100%"
                                        height='300'
                                        controls
                                        src={media.media_url}
                                        />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className={`${imageURLs.length?'d-block':'d-none'}`}>
                    
                    <div className='d-flex flex-wrap'>
                        {
                            imageURLs.map((image,index)=>{
                               return( <img key={index} className='m-1' src={image.media_url} height='200' width='200'/>)
                            })
                        }
                    </div>

                </div>
                <div className={`${videoSrc.length?'d-block':'d-none'}`}>
                    
                    <div className='d-flex flex-wrap'>
                        {
                            videoSrc.map((video,index)=>{
                               return(
                                <video
                                key={index}
                                className="VideoInput_video m-1"
                                width="100%"
                                height={150}
                                controls
                                src={video.media_url}
                                />
                               )
                            })
                        }
                    </div>

                </div> */}
            </div>
        )
    }

    const dataToRenderBGs=()=>{
        
        // if(store.postBgImages.length>8){
        
        //     return store.postBgImages.slice(0,8)
        
        // }else{

            return store?.postBgImages?.filter(x=>x.background_type=='image')
        // }
    }

    useEffect(()=>{

        if(dataAvailable){
            
            const feelingObj={
                feelings_name:formData.feelings_name,
                feelings_id:formData.feeling_id
            }
            
            const bgImageObj={
            
                id:formData.post_backgroundid,
                image_url:formData.background_image_url,
                background_type:formData.background_type
            
            }
            
            
            setPostText(formData.content)
            setFeeling(formData.feeling_id!=''?feelingObj:-1)
            setTaggedUser(formData.tagged_user!=''? formData.tagged_user : [])
            setLocation(formData.location)
            setGIF(formData.gif_image_url)
            setPrivacy(formData.privacy)
            setMediaList(formData.media)

            setSelectedBackground(formData.post_backgroundid!=null? bgImageObj:-1)

        }
    },[dataAvailable])

    useEffect(()=>{

        if(view){
            getPostBackgrounds()   
        }

    },[view])

    useEffect(()=>{
        
        if(!view){
            setMediaList([])
            setTaggedUser([])
        
        }
       
    },[view])

    useEffect(()=>{

        if(gif.length){

            const arr= mediaList.filter(x=>x.media_type=='image')
            arr.push({media_url:gif,media_type:'image/gif'})

            setMediaList(arr)

        }

    },[gif])

    return(
        <div>
            <Modal
            view={view}
            setView={setView}
            modalSize='modal-md'
            headerText='Create Post'
            bodyStyle={{minHeight:'300px',maxHeight:'400px'}}
            bodyClassName='p-0 overflow-auto'
            footerComponent={
                footerComponent()
            }
            >
                <div className='p-1'>
                    <div className='add-post-header d-flex align-items-center my-1'>
                        <div>
                            {UserAvatar(1,userData?.profile_image_url,50,50)}
                            {/* <Avatar
                            className="me-75"
                            img={ profileData.profile_image_url_privacy==1? ProfilePhotoRender(profileData.profile_image_url) :undefined}
                            initials
                            imgHeight={50}
                            imgWidth={50}
                            content={profileData.full_name}
                            style={{alignText:'center'}}
                            /> */}
                        </div>
                        <div>
                            <div>
                                <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                                    <strong>
                                        
                                        {userData?.full_name} 
                                        
                                        {feeling!=-1? ` is feeling ${feeling.feelings_name}`:''}
                                        
                                        {tagged_user.length? (` 
                                           
                                           ${feeling!=-1? '':' is'} with 
                                           
                                           ${tagged_user[0].full_name} ${tagged_user.length>1? (`
                                           
                                                and ${tagged_user.slice(0,tagged_user.length-1).length} others`):
                                                
                                                ''}`)
                                        :'' }

                                        {location.length? ` ${feeling!=-1 || tagged_user.length==0?'':' is'} in ${location}`:''}
                                        
                                    </strong>
                                </p>
                            </div>
                            <div>
                                <Button.Ripple 
                                color='gray'
                                size='sm' 
                                className='px-1 p-0'
                                onClick={()=>setViewPrivacyModal(true)}>
                                    {privacyOptionsIcons[privacy]}
                                    {privacyOptions[privacy]}
                                    <ChevronDown size={20}/>
                                </Button.Ripple>
                            </div>
                        </div>
                    </div>
                    <div 
                    // className='overflow-auto' style={{maxHeight:'300px'}}
                    >
                        <PostInputFieldContainer background={selectedBackground!=-1} url={selectedBackground?.image_url}>
                            <CreatePostInput
                            defaultValue={dataAvailable? formData?.content:''}
                            background={selectedBackground!=-1}
                            autocorrect='off'
                            className='form-control' 
                            skin={skin}
                            placeholder={`What's on your mind?`}
                            onChange={(e)=>setPostText(e.target.value)}
                            />
                        </PostInputFieldContainer>
                        {MediaRenderer()}
                    </div>
                    {
                        gif.length==0 && !mediaList.find(x=>x.media_type.startsWith('image') || x.media_type.startsWith('video')) &&
                        <div className='d-flex gap-1 align-items-center'>
                            <Card
                            className='cursor-pointer rounded border d-flex m-0 justify-content-center align-items-center' 
                            style={{height:'40px',width:'40px'}}
                            onClick={()=>setViewBackgroundList(!viewBackgroundList)}>
                                {
                                    viewBackgroundList? <ChevronLeft/>:<span>Aa</span>
                                }
                            </Card>

                            <div className={`${viewBackgroundList? 'd-flex':'d-none'} gap-50 overflow-auto`}>
                                <div style={{height:'40px',width:'40px'}} className={`d-flex justify-content-center align-items-center cursor-pointer bg-black border rounded flex-shrink-0 flex-shrink-0`} onClick={()=>setSelectedBackground(-1)}>
                                    <XCircle/>
                                </div>
                                {
                                    dataToRenderBGs()?.map((x,index)=>{
                                        return(
                                            <div key={index} style={{height:'40px',width:'40px'}} className={`border rounded flex-shrink-0 flex-shrink-0`}>
                                                <img src={`${baseURL}/${x.image_url}`} width='100%' height='100%' className={`rounded cursor-pointer ${selectedBackground.id==x.id && 'border-white'}`} onClick={()=>setSelectedBackground(x)}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    
                    <div className='border-primary mt-1 rounded d-flex align-items-center justify-content-between p-1'>
                        <div>
                            <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                                <strong>Add to your post</strong>
                            </p>
                        </div>
                        <div className='d-flex gap-1 align-items-center'>
                            <div>
                                <img src={Group} className='cursor-pointer' onClick={handleVideoClick}/>
                                {/* <Film size={20} onClick={handleVideoClick}/> */}
                                <input type="file"
                                    ref={videoInputRef}
                                    onChange={handleVideoChange}
                                    style={{display:'none'}} 
                                />
                            </div>
                            <div>
                                <MapPin 
                                size={25} 
                                className='text-primary cursor-pointer' 
                                onClick={()=>setViewLocationModal(true)}
                                />
                            </div>
                            <div>
                                <Users 
                                size={25} 
                                className='text-primary cursor-pointer' 
                                onClick={()=>setVewTagFriendModal(true)}
                                />
                            </div>
                            <div 
                            className='cursor-pointer' 
                            onClick={()=>{
                                if(selectedBackground==-1 && !mediaList.find(x=>x.media_type=='image' || x.media_type.startsWith('video'))){
                                    setViewGIFModal(true)
                                }
                            }}>
                                <img src={GIFIcon}/>
                            </div>
                            <div>
                                <Smile 
                                size={25} 
                                className='text-primary cursor-pointer' 
                                onClick={()=>setViewFeelingModal(true)}
                                />
                            </div>
                            <div className='cursor-pointer' onClick={()=>setViewElementModal(true)}>
                                <MoreHorizontal/>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>   
            <PrivacyModal
            view={viewPrivacyModal}
            setView={setViewPrivacyModal}
            setValue={setPrivacy}
            value={privacy}
            initialValue='public'
            />         
            <SearchLocationModal
            view={viewLocationModal}
            setView={setViewLocationModal}
            setLocation={setLocation}
            />
            <FeelingsModal
            view={viewFeelingModal}
            setView={setViewFeelingModal}
            setValue={setFeeling}
            value={feeling}/>

            <TagFriendModal
            view={viewTagFriendModal}
            setView={setVewTagFriendModal}
            selectedFriend={tagged_user}
            setSelectedFriend={setTaggedUser}/>

            <PostElementModal
            view={viewElementModal}
            setView={setViewElementModal}
            handleMediaClick={handleVideoClick}
            setViewLocationModal={setViewLocationModal}
            setVewTagFriendModal={setVewTagFriendModal}
            setViewFeelingModal={setViewFeelingModal}
            setViewGIFModal={setViewGIFModal}
            gif={gif}
            selectedBackground={selectedBackground}
            mediaList={mediaList}
            />
            
            <GIF
            view={viewGIFModal}
            setView={setViewGIFModal}
            gif={gif}
            setGif={setGIF}
            />

            <EditMediaModal
            view={viewEditMediaModal}
            setView={setViewEditMediaModal}
            mediaArray={mediaList}
            setMedia={setMediaList}
            setGIF={setGIF}
            />

        </div>
    )
}
export default AddPostModal