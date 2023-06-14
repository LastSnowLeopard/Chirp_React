import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'reactstrap'
import { baseURL } from '../../../utility/snippets/snippets'
import { useState } from 'react'
import ViewMedia from '../Post/ViewMedia'
import { active } from 'sortablejs'



const AllPhotos=(props)=>{

    const {activeIndex} = props

    const key= activeIndex==1?'all':'tagged'
    const storeData = useSelector(state=>state.profileReducer)
    const photosData  = storeData.photos

    const [viewMedia,setViewMedia] = useState(false)
    const [media,setMedia] = useState([])

    return(
        <Card>
            {
                photosData[key].length?
                <div className='d-flex flex-wrap w-100'>
                    {
                        photosData[key].map((photo,index)=>{
                            return(
                                <div 
                                key={index} 
                                className='cursor-pointer border rounded-3 m-25' 
                                style={{width:'16%'}}
                                onClick={()=>{
                                    setMedia([photo])
                                    setViewMedia(true)  
                                }}>
                                    <img className='rounded-3' src={`${baseURL}/${photo.media_url}`} height='200' width='100%' style={{objectFit:'fill'}}/>
                                </div>
                            )
                            })
                        
                    }
                </div>:<p className='text-center fs-2'>No Photos</p>
            }
            <ViewMedia
            view={viewMedia}
            setView={setViewMedia}
            media={media}
            mediaOnly={false}/>
        </Card>
    )
}
export default AllPhotos