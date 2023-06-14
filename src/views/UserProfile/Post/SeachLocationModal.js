import React from 'react'
import Modal from './../../components/Modal'
import MapAutoComplete from './MapAutocomplete'



const SearchLocationModal=(props)=>{

    const {view,setView,location,setLocation,address,setAddress} = props

    

    return(
        <div>
            <Modal
            view={view}
            setView={setView}
            modalSize='modal-lg'
            headerText='Where are you?'
            bodyClassName='p-0'
            >
                <MapAutoComplete setLocation={setLocation} setView={setView}/>
            </Modal>
        </div>
    )
}
export default SearchLocationModal