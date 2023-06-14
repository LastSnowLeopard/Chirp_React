// import React from 'react'
// import { PostInputFieldContainer, StoryContentContainer, StoryMediaContainer } from '../../../Styled-Components'
// import Modal from  '../../../components/Modal'
// import { baseURL } from '../../../../utility/snippets/snippets'
// import { UserAvatar, getPostBackgrounds } from '../../../../redux/Action/Profile'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'


// const ViewStory=(props)=>{

//     const {view,setView,story} = props
//     const store = useSelector(state=>state.profileReducer)
    

//     const VideoRenderer=()=>{

//         return (
        
//             <video
//             height='100%'
//             width='100%'
//             autoPlay
//             src={`${baseURL}/${story.media_url}`}            
//             />
//         )
            
//     }

//     const AudioRenderer=()=>{

//         const audioUrl = story?.story_type=='spotify_audio'? story?.music_url:`${baseURL}/${story.media_url}`
//         const bgImage = store.postBgImages?.find(x=>x.id==story.background_id)?.image_url ?? story?.media_url
//         const background = story.background_id.length || story?.story_type.includes('audio')

//         return(
//             <div className='h-100'>
//                 <PostInputFieldContainer story width='100%' height='100%' background={background} url={bgImage}>
//                     <audio
//                     src={audioUrl}            
//                     autoPlay
//                     />
//                 </PostInputFieldContainer>
//             </div>
//         )
//     }
    
//     const ImageRenderer=()=>{

//         return(
//             <div className='h-100 d-flex justify-content-center align-items-center'>
//                 <img
//                 src={`${baseURL}/${story.media_url}`}            
//                 width='100%'
//                 height='100%'
//                 />
//             </div>
//         )
//     }


//     const renderMedia=(story_type)=>{
        
//         if(story_type=='video')return VideoRenderer()
//         if(story_type?.includes('audio'))return AudioRenderer()
//         if(story_type=='image')return ImageRenderer()
//     }

    
//     return(
//         <Modal
//         view={view}
//         setView={setView}
//         modalSize='modal-md'
//         headerText='Story'
//         bodyClassName='p-0'
//         >
//             <div className='position-relative'>
//                 <StoryMediaContainer display={story?.story_type!='undefined'}>
//                     {renderMedia(story?.story_type)}
//                 </StoryMediaContainer>
                
//                 {
//                     story?.story_type=='undefined'?
//                     <PostInputFieldContainer 
//                     story
//                     width='500px' 
//                     height='500px' 
//                     background={story?.story_type=='undefined'} 
//                     url={store.postBgImages?.find(x=>x.id==story.background_id)?.image_url}
//                     >
//                         <p className='fs-1 text-white fw-bold p-1 bg-black'>
//                             {story?.text_content}
//                         </p>
//                     </PostInputFieldContainer>:''
//                 }

//                 <StoryContentContainer>
//                     <div>
//                         {UserAvatar(1,story?.profile_image_url,50,50,{},story?.full_name)}
//                     </div>
//                     <div className='d-flex flex-column'>
                        
//                         <span>{story?.full_name}</span>
                        
//                         {
//                             story?.story_type!='undefined'?
//                             <span>{story?.text_content}</span>:null
//                         }
//                     </div>
//                 </StoryContentContainer>
//             </div>
//         </Modal>
//     )
// }
// export default ViewStory



import React, { useState } from 'react'
import { NavButtons, PostInputFieldContainer, StoryContentContainer, StoryMediaContainer, StoryNavigationBtns, StoryProgressBar, StoryProgressContainer } from '../../../Styled-Components'
import Modal from  '../../../components/Modal'
import { baseURL } from '../../../../utility/snippets/snippets'
import { UserAvatar, getPostBackgrounds } from '../../../../redux/Action/Profile'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import StoryMediaComponent from './StoryMediaComponent'
import { useRef } from 'react'
import { GetFontListsForText, deleteStoryHandler } from '../../../../redux/Action/NewsFeed'
import { ChevronLeft, ChevronRight, MoreHorizontal, Trash } from 'react-feather'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'



const ViewStory=(props)=>{

    const {view,setView,stories} = props
    
    let intervalId

    const store = useSelector(state=>state.profileReducer)
    const profileStore = useSelector(state=>state.profileReducer)
    const backgrounds = profileStore.postBgImages
    
    const [currentIndex,setCurrentIndex] = useState(0)
    const [story,setStory] = useState({})

    const [elapsedDuration,setElapsedDuration] = useState(0)
    const [totalDuration,setTotalDuration] = useState(0)

    const [fontColor,setFontColor] = useState({})
    const [selectedBackground,setSelectedBackground] = useState(-1)
    const [media,setMedia] = useState('')
    const [storyType,setStoryType] = useState('')
    const [storyContent,setStoryContent] = useState('') 
    const [selectedAudio,setSelectedAudio] = useState(-1)
    const [fontStyle,setFontStyle] = useState(-1)

    const audioRef = useRef(null)
    const videoRef  = useState(null)

    const nextIndex = currentIndex+1
    const lastIndex = stories.length-1

    const ProgressBarRenderer=()=>{

        const count = stories.length
        const width = 100/count

        return(

            
            stories?.length ? 
                stories.map(x=>{
                    
                    const current = x?.id == story?.id

                    return(
                        <StoryProgressBar containerWidth={width} current={current} width={(elapsedDuration / totalDuration) * 100}>
                            <div className='progress'>
                                .
                            </div>
                        </StoryProgressBar>
                    )
                }):''
            
        )
    }
    
    const durationCalculateForTextAndImage=()=>{

        const maxDuration = totalDuration // Maximum duration in seconds
        const increment = 0.1 // Increment value for elapsed duration
        
        const nextIndex = currentIndex+1
        const lastIndex = stories.length-1

        intervalId = setInterval(() => {
        setElapsedDuration((prevDuration) => {
            const newDuration = prevDuration + increment
            
            if (newDuration > totalDuration) {

                clearInterval(intervalId)
                
                setElapsedDuration(0)

                if(nextIndex<=lastIndex){
                
                    setCurrentIndex(nextIndex)
                
                }
                else{
                    console.log(' $ NEW DURATION : ',newDuration)
                    setView(false)
                }

                return totalDuration
            }
            
            return newDuration
        })
        }, increment * 1000) // Run every increment in milliseconds
        
    }

    const nextStory=()=>{

        const nextIndex = currentIndex+1
        const lastIndex = stories.length-1

        if(nextIndex<=lastIndex){

            setCurrentIndex(nextIndex)

        }
    }

    const prevStory=()=>{
        
        const prevIndex = currentIndex-1
        
        if(prevIndex>=0){

            setCurrentIndex(prevIndex)

        }

    }

    const initFunction=()=>{
        
        clearInterval(intervalId)

        const currentStory = stories[currentIndex]
        
        setTotalDuration(0)

        const bgId = currentStory.background_id
        const background = backgrounds.find(x=>x.id == bgId)

        const storyText = currentStory.text_content
        const music_url = currentStory.music_url
        const type = currentStory.story_type
        
        const mediaURL = currentStory.media_url
        const media = mediaURL!='undefined'? mediaURL:''
        const fontColor = {color_code:currentStory.font_color}
        const musicURL = music_url!='null' ? {preview_url: music_url} : -1
        const fontStyle = {value:currentStory?.font_id,label:currentStory?.font_name}

        if(musicURL==-1 && type!='video'){
            setTotalDuration(20)
        }

        setSelectedBackground(background)
        setFontColor(fontColor)
        setMedia(media)
        setStoryType(type)
        setSelectedAudio(musicURL)
        setStoryContent(storyText)
        setStory(currentStory)
        setFontStyle(fontStyle)

    }
    useEffect(()=>{

        if(view){

            getPostBackgrounds()
            GetFontListsForText()

            initFunction()
            
        }else{

            clearInterval(intervalId)
            setCurrentIndex(0)
            
        }
        return () => {
            
            clearInterval(intervalId)
            setElapsedDuration(0)
        }

    },[view,currentIndex])

    useEffect(()=>{

        if(totalDuration!=0){
            durationCalculateForTextAndImage(intervalId)
        }
    },[totalDuration])

    console.log(' ; total Duration  ;',totalDuration)

    return(
        <Modal
        view={view}
        setView={setView}
        modalSize='modal-md'
        headerText='Story'
        bodyClassName='p-0'
        >
            <div className='position-relative'>
                <StoryNavigationBtns>

                    {  currentIndex-1>=0 &&
                        <NavButtons prev={true} onClick={prevStory}>
                            <ChevronLeft size='28' className='text-primary'/>
                        </NavButtons>
                    }
                    {  nextIndex<=lastIndex  &&
                        <NavButtons onClick={nextStory}>
                            <ChevronRight size='28' className='text-primary'/>
                        </NavButtons>
                    }
                </StoryNavigationBtns>
                <StoryProgressContainer>
                    {ProgressBarRenderer()}
                </StoryProgressContainer>

                <StoryContentContainer>
                    <div>
                        {UserAvatar(1,story?.profile_image_url,50,50,{},story?.full_name)}
                    </div>
                    <div className='d-flex flex-column'>
                        
                        <span>{story?.full_name}</span>
                        <span>{story?.text_content}</span>
                        
                    </div>
                </StoryContentContainer>
                <div>
                    <StoryMediaComponent 
                    type={storyType}
                    isCropped={true}
                    fontColor={fontColor}
                    selectedBackground={selectedBackground}
                    image={media}
                    setImage={setMedia}
                    storyText={storyContent}
                    setStoryText={setStoryContent}
                    selectedAudio={selectedAudio}
                    toViewStory={true}
                    audioRef={audioRef}
                    setTotalDuration={setTotalDuration}
                    videoRef={videoRef}
                    fontStyle={fontStyle}
                    setFontStyle={setFontStyle}
                    >
                        <div className='position-absolute top-0 p-1 pt-2 end-0'>
                           
                            <UncontrolledDropdown className='ms-50'>
                            
                                <DropdownToggle className='cursor-pointer' tag='span'>
                            
                                    <MoreHorizontal size={30} className='text-white' />
                            
                                </DropdownToggle>
                            
                                <DropdownMenu end>
                            
                                    <DropdownItem className='d-flex align-items-center w-100' onClick={()=>deleteStoryHandler({story_id:story.id,setView})}>
                                        <Trash className='me-50' size={14}/>
                                        Delete
                                    </DropdownItem>
                            
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </div>
                    </StoryMediaComponent>
                </div>
            </div>
        </Modal>
    )
}
export default ViewStory