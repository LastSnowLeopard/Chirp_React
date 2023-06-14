import React, { useState } from 'react'
import { Button, Input, Label } from 'reactstrap'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ButtonLoader from '../../components/button-loader'
import { addLifeEvents } from '../../../redux/Action/Profile'



const AddUpdateEvent=(props)=>{

    const {view,setView,eventOptions,event,setEvent} = props

    const [date,setDate] = useState('')
    const [description,setDescription] = useState('')
    const [loading,setLoading] = useState(false)
    
    const clickhandler=()=>{

        const payload={
            "user_id":JSON.parse(localStorage.getItem('userData')).user_id.toString(), 
            "content":description,
            "location_lat_lng":"",
            "location":"",
            "post_type":'event',
            "life_event_id":event.value,
            "event_date":date,
            "privacy":"public"
        }

        addLifeEvents(payload,setLoading,setView)
    }


    return(
        <div>
            <div>
                <Label>Select Event</Label>
                <Select
                options={eventOptions}
                onChange={(e)=>setEvent(e)}
                />
            </div>
            <div className='my-1'>
                <Label>Select Event Date</Label>
                <Flatpickr
                    className='form-control'
                    options={{
                        mode:'single',
                        dateFormat:'Y-m-d',
                    }}
                    onChange={(a,date) => setDate(date)}
                />
            </div>
            <div>
                <Label>Enter Description</Label>
                <Input
                style={{background:'transparent'}}
                placeholder='description'
                onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
                <hr/>
                <div className="py-1 d-flex justify-content-end">
                    <div>
                        <Button.Ripple
                        className='mx-1'
                        onClick={()=>setView(false)}>
                            Cancel
                        </Button.Ripple>
                        <Button.Ripple
                        color='primary'
                        // onClick={()=>saveBioHandler(bio,setLoading,setView)}
                        >
                            <span className={`${loading? 'd-none':'d-inline'}`} onClick={()=>clickhandler()}>Save</span>
                            {
                                loading && <ButtonLoader/>
                            }
                        </Button.Ripple>
                    </div>
                </div>  
            </div>
        </div>
    )
}
export default AddUpdateEvent