import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { ModalCloseButton, baseURL } from '../../../utility/snippets/snippets'
import Modal from '../../components/Modal'
import { NextArrow, PrevArrow } from '../../Styled-Components'
import PostView from './PostView'
import { Card } from 'reactstrap'




const ViewMedia=(props)=>{

    const {view,setView,media,mediaOnly,post} = props

    const [data,setData] = useState({})

    const [activeIndex,setActiveIndex] = useState(0)


    const getData=()=>{
        
        let obj={}
        Object.assign(obj,media[activeIndex])

        obj.active=true

        setData(obj)
    }

    useEffect(()=>{

        if(view){
            getData()
        }

    },[view])

    useEffect(()=>{

        if(view){
            
            getData()

        }
    },[activeIndex])

    return(
        <div>

            <Modal
            view={view}
            setView={setView}
            modalSize='modal-xl'
            bodyClassName='p-0'
            fullscreen={mediaOnly}
            viewHeader={mediaOnly}
            margin={mediaOnly?'m-0':''}
            >
                
                <div className='d-flex position-relative'>
                    {
                        mediaOnly &&
                        <div className='position-absolute right-25 p-1' style={{zIndex:100000}}>
                            {ModalCloseButton(setView,'position-relative','10px','0px')}
                        </div>
                    }
                    <div className={`${mediaOnly?'w-75':'w-100'} position-relative d-flex justify-content-center bg-black`}>
                    {
                        media.length>1?
                        <PrevArrow>
                            <div 
                            className='border cursor-pointer rounded-circle p-1 bg-gray' 
                            onClick={()=>{
                                if(activeIndex>0){
                                    setActiveIndex(activeIndex-1)
                                }
                            }}>
                                    <ChevronLeft size={30}/>
                            </div>
                        </PrevArrow>:''
                    }
                    <div style={{height:'100vh',width:'60%'}}>
                        {
                            data.media_type=='image'?
                            <img 
                            src={`${baseURL}/${data.media_url}`}
                            style={{objectFit:'contain'}} width='100%' height='100%'/>

                            :(data.media_type=='video')?
                            (
                            <video
                            className="VideoInput_video m-0"
                            width="100%"
                            height='100%'
                            controls
                            src={`${baseURL}/${data?.media_url}`}
                            />
                            ):''
                        }
                    </div>

                    { media.length>1?
                        <NextArrow>
                        <div 
                        className='border cursor-pointer rounded-circle p-1 bg-gray' 
                        onClick={()=>{
                            if(activeIndex<media.length-1){
                                setActiveIndex(activeIndex+1)
                            }
                        }}>
                                <ChevronRight size={30}/>
                        </div>
                        </NextArrow>:''
                    }
                    </div>
                    {
                        mediaOnly &&
                        <Card className='border-0 h-100'>
                            <PostView
                            post={post}
                            mediaView={false}/>
                        </Card>
                    }
                </div>
                
            </Modal>

        </div>
    )
}
export default ViewMedia