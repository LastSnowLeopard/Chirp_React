import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'reactstrap'
import { baseURL } from '../../../utility/snippets/snippets'
import { useState } from 'react'
import ViewMedia from '../Post/ViewMedia'
import { active } from 'sortablejs'



const AllVideos=(props)=>{

    const {activeIndex} = props

    const key= activeIndex==1?'all':'tagged'
    const storeData = useSelector(state=>state.profileReducer)
    const videosData  = storeData.videos

    const [viewMedia,setViewMedia] = useState(false)
    const [media,setMedia] = useState([])

    return(
        <Card>
            {
                videosData[key].length?
                <div className='d-flex flex-wrap w-100'>
                    {
                        videosData[key].map((video,index)=>{
                            return(
                                <div 
                                key={index} 
                                className='cursor-pointer border rounded-3 m-25' 
                                style={{width:'16%'}}
                                onClick={()=>{
                                    setMedia([video])
                                    setViewMedia(true)  
                                }}>
                                    <video
                                    className="VideoInput_video rounded-3 m-0"
                                    width="100%"
                                    height='200'
                                    controls
                                    src={`${baseURL}/${video?.media_url}`}
                                    />
                                    {/* <video className='rounded-3' src={`${baseURL}/${video.media_url}`} height='150' width='100%' style={{objectFit:'contain'}}/> */}
                                </div>
                            )
                            })
                        
                    }
                </div>:<p className='text-center fs-2'>No Videos</p>
            }
            <ViewMedia
            view={viewMedia}
            setView={setViewMedia}
            media={media}
            mediaOnly={false}/>
        </Card>
    )
}
export default AllVideos