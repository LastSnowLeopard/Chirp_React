import React from 'react'
import { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import GIF from '../../components/GIFRenderer'
import { useSelector } from 'react-redux'
import { useSkin } from '@hooks/useSkin'
import AddUpdatePlaces from './AddUpdatePlaces'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import { PlusCircle } from 'react-feather'
import { PlacesRenderer } from '../../../redux/Action/Profile'




const PlacesTab=(props)=>{

    
    const { skin, setSkin } = useSkin()

    const store = useSelector(state=>state.profileReducer)
    const aboutSectionData = store.aboutSectionData
    const placesData = aboutSectionData.placesLived

    const [placesView,setPlacesView] = useState(false)

    return(
        <div>
            <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>Places Lived</p>
            <p 
            className={`${placesView? 'd-none':'d-block'} text-${ParagraphColor[skin]} fw-bolder m-1 fs-4 cursor-pointer`}
            onClick={()=>{
                setPlacesView(true)
            }}
            >
                <PlusCircle size={25}/>    
                <span className='mx-1'>Add City</span>
            </p>
            <div className={`${placesView?'d-block':'d-none'}`}>
                <AddUpdatePlaces 
                view={placesView}
                setView={setPlacesView}/>
            </div>
            <hr/>
            {PlacesRenderer(placesData,skin,'city')}
        </div>
    )
}
export default PlacesTab 