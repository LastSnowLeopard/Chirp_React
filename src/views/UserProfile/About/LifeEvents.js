import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEventsList } from '../../../redux/Action/Profile'
import Select from 'react-select'
import { Label } from 'reactstrap'
import { useSkin } from '@hooks/useSkin'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import AddUpdateEvent from './AddUpdateEvent'
import { PlusCircle } from 'react-feather'



const LifeEvents=(props)=>{


    const { skin, setSkin } = useSkin()

    const store = useSelector(state=>state.profileReducer)
    const aboutSectionData = store.aboutSectionData
    const eventsData = aboutSectionData.EventService

    const [eventOptions,setEventOptions] = useState([])
    const [event,setEvent] = useState(-1)

    const [eventView,setEventView] = useState(false)


    useEffect(()=>{

        getEventsList(setEventOptions)

    },[])



    return(
        <div>
            <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>Life Events</p>
            <p 
            className={`${eventView? 'd-none':'d-block'} text-${ParagraphColor[skin]} fw-bolder m-1 fs-4 cursor-pointer`}
            onClick={()=>{
                setEventView(true)
            }}
            >
                <PlusCircle size={25}/>    
                <span className='mx-1'>Add Life Event</span>
            </p>
            <div className={`${eventView?'d-block':'d-none'}`}>
                
                <AddUpdateEvent
                view={eventView}
                setView={setEventView}
                eventOptions={eventOptions}
                event={event}
                setEvent={setEvent}
                />

            </div>
            <hr/>
            <div>
                {
                    eventsData?.map((event,index)=>{
                        return(
                            <div key={index}>
                                <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>{event.event_name}</p>
                                <span className='p-1'>{event.content}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default LifeEvents