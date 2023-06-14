// import React, { useEffect } from 'react'
// import { NavButtons, PrevArrow, StoriesContainer, StoryBox, StoryNavigationBtns } from '../../../Styled-Components'
// import { ChevronLeft, ChevronRight, Plus, PlusCircle } from 'react-feather'
// import { ProfilePhotoRender, UserAvatar, getPostBackgrounds } from '../../../../redux/Action/Profile'
// import AddStoryModal from './AddStoryModal'
// import { useState } from 'react'
// import { useRef } from 'react'
// import ViewStory from './ViewStoryModal'
// import { useSelector } from 'react-redux'
// import ButtonLoader from '../../../components/button-loader'
// import { baseURL } from '../../../../utility/snippets/snippets'



// const Stories=(props)=>{

//     const userData = JSON.parse(localStorage.getItem('userData'))

//     const profileStore = useSelector(state=>state.profileReducer)
//     const store = useSelector(state=>state.NewsFeedReducer)
//     const storyLoading = store.storiesLoading
//     const stories = store.stories


//     const [view,setView] = useState(false)
//     const [viewStory,setViewStory] = useState(false)
//     const [selectedStory,setSelectedStory] = useState(-1)


//     const containerRef = useRef(null);

//     const scrollLeft = () => {
//         const container = containerRef.current;
//         container.scrollLeft -= 100; // Adjust the scroll amount as needed
//     };

//     const scrollRight = () => {
//         const container = containerRef.current;
//         container.scrollLeft += 100; // Adjust the scroll amount as needed
//     };

//     const RenderThumbnail=(story)=>{

//         const bgImage = story?.background_id?.length!=0 
//         const image = story.story_type=='image' || story?.media_url.includes('webp') || story?.media_url.includes('jpg') || story?.media_url.includes('png')
        
//         const selectedBG = profileStore.postBgImages?.find(x=>x.id==story.background_id)?.image_url

//         const thumbnail = bgImage? selectedBG : (image? story?.media_url:undefined)

//         return thumbnail? ProfilePhotoRender(thumbnail) : undefined
//     }


//     useEffect(()=>{

//         getPostBackgrounds()   
        
//     },[])
    
//     return(
//         <StoriesContainer ref={containerRef}>
            
//             {/* <StoryNavigationBtns>
//                 <NavButtons prev onClick={scrollLeft}>
//                     <ChevronLeft size='28' className='text-primary'/>
//                 </NavButtons>
//                 <NavButtons onClick={scrollRight}>
//                     <ChevronRight size='28' className='text-primary'/>
//                 </NavButtons>
//             </StoryNavigationBtns> */}
            
//             <StoryBox image={`${baseURL}/${userData?.profile_image_url}`} onClick={()=>setView(true)}>
                
//                 <div className='footer'>
//                     <div className='add-button'>
//                         <Plus size='50' strokeWidth={2} className='plus'/>
//                     </div>
//                     <span>
//                         Add Story
//                     </span>
//                 </div>

//             </StoryBox>

//             {
//                 storyLoading?
//                 <ButtonLoader/>:(
//                     stories?.map(story=>{
//                         return(
//                             <StoryBox 
//                             image={RenderThumbnail(story)} 
//                             key={story.id} 
//                             onClick={()=>{setViewStory(true);setSelectedStory(story)}}
//                             >
                                
//                                 <div className='footer'>
//                                     <div className='add-button'>
//                                         {UserAvatar(1,story?.profile_image_url,50,50,{},undefined,'m-0','')}
//                                     </div>
//                                     <span>
//                                         {story.full_name}
//                                     </span>
//                                 </div>

//                             </StoryBox>
//                         )
//                     })
//                 )
//             }

//             <AddStoryModal
//             view={view}
//             setView={setView}
//             userData={userData}
//             />
//             <ViewStory
//             view={viewStory}
//             setView={setViewStory}
//             story={selectedStory}/>
//         </StoriesContainer>
//     )
// }
// export default Stories




import React, { useEffect } from 'react'
import { NavButtons, PrevArrow, StoriesContainer, StoryBox, StoryNavigationBtns } from '../../../Styled-Components'
import { ChevronLeft, ChevronRight, Plus, PlusCircle } from 'react-feather'
import { ProfilePhotoRender, UserAvatar, getPostBackgrounds } from '../../../../redux/Action/Profile'
import AddStoryModal from './AddStoryModal'
import { useState } from 'react'
import { useRef } from 'react'
import ViewStory from './ViewStoryModal'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoader from '../../../components/button-loader'
import { baseURL } from '../../../../utility/snippets/snippets'



const Stories=(props)=>{

    const userData = JSON.parse(localStorage.getItem('userData'))
    const profileImage = `http://13.50.151.52/chrip/${userData?.profile_image_url}`

    const dispatch = useDispatch()

    const profileStore = useSelector(state=>state.profileReducer)
    const store = useSelector(state=>state.NewsFeedReducer)
    const storyLoading = store.storiesLoading
    const storiesObj = store.stories
    // const stories = Object.keys(storiesObj) ?? []

    const [stories,setStories] = useState([])

    const [view,setView] = useState(false)
    const [viewStory,setViewStory] = useState(false)
    const [selectedStories,setSelectedStories] = useState([])


    const containerRef = useRef(null);

    const scrollLeft = () => {
        const container = containerRef.current;
        container.scrollLeft -= 100; // Adjust the scroll amount as needed
    };

    const scrollRight = () => {
        const container = containerRef.current;
        container.scrollLeft += 100; // Adjust the scroll amount as needed
    };

    const RenderThumbnail=(story)=>{

        const bgImage = story?.background_id?.length!=0

        const image = story?.story_type=='image'
        
        const selectedBG = profileStore?.postBgImages?.find(x=>x.id==story?.background_id)?.image_url

        const thumbnail = bgImage? selectedBG : (image? story?.media_url:undefined)

        return thumbnail? ProfilePhotoRender(thumbnail) : undefined
    }


    useEffect(()=>{

        getPostBackgrounds()   
        
    },[])

    useEffect(()=>{

        const keys = Object.keys(store.stories)
        
        console.log(' %% STORIES : ',store.stories)

        if(keys.length){
            
            setStories(keys)

        }else{
            setStories([])
        }

    },[store])
    
    return(
        <StoriesContainer ref={containerRef}>
            
            {/* <StoryNavigationBtns>
                <NavButtons prev onClick={scrollLeft}>
                    <ChevronLeft size='28' className='text-primary'/>
                </NavButtons>
                <NavButtons onClick={scrollRight}>
                    <ChevronRight size='28' className='text-primary'/>
                </NavButtons>
            </StoryNavigationBtns> */}
            
            <StoryBox image={profileImage} onClick={()=>setView(true)}>
                
                <div className='footer'>
                    <div className='add-button'>
                        <Plus size='50' strokeWidth={2} className='plus'/>
                    </div>
                    <span>
                        Add Story
                    </span>
                </div>

            </StoryBox>

            {
                storyLoading?
                <ButtonLoader/>:(

                    // <StoryBox 
                    // image={RenderThumbnail(story)} 
                    // key={story?.id} 
                    // onClick={()=>{setViewStory(true);setSelectedStories(userStories.reverse())}}
                    // >
                        
                    //     <div className='footer'>
                    //         <div className='add-button'>
                    //             {UserAvatar(1,story?.profile_image_url,50,50,{},undefined,'m-0','')}
                    //         </div>
                    //         <span>
                    //             {story?.full_name}
                    //         </span>
                    //     </div>

                    // </StoryBox>
                    stories?.map(userId=>{

                        const userStories = storiesObj[userId]

                        const story = userStories.length ? userStories[0] : -1

                        return(
                            story!=-1?
                            (
                                <StoryBox 
                                image={RenderThumbnail(story)} 
                                key={story?.id} 
                                onClick={()=>{setViewStory(true);setSelectedStories(userStories.reverse())}}
                                >
                                    
                                    <div className='footer'>
                                        <div className='add-button'>
                                            {UserAvatar(1,story?.profile_image_url,50,50,{},undefined,'m-0','')}
                                        </div>
                                        <span>
                                            {story?.full_name}
                                        </span>
                                    </div>

                                </StoryBox>
                            ):''
                        )
                    })
                )
            }

            <AddStoryModal
            view={view}
            setView={setView}
            userData={userData}
            />
            {
                viewStory &&
                <ViewStory
                view={viewStory}
                setView={setViewStory}
                stories={selectedStories}
                setStories={setSelectedStories}
                />
            }
        </StoriesContainer>
    )
}
export default Stories