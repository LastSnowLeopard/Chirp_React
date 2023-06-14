import React, { useState } from 'react'
import { Save } from 'react-feather'
import { useSelector } from 'react-redux'
import { Button, Input } from 'reactstrap'
import { saveBioHandler } from '../../redux/Action/Profile/index.js'
import ButtonLoader from '../components/button-loader/index.js'
import PrivacyDropDown from '../components/PrivacyDropdown.js'


const CreateUpdateBio=(props)=>{

    const {view,setView,width,height} = props
    
    const [bio,setBio] = useState('')

    const [loading,setLoading] = useState(false)

    const storeData = useSelector(state=>state.profileReducer)
    const profileData = storeData.data.profileData



    return(
        <div>
            <Input
            style={{height:height || '90px',width:width || '220px',background:'transparent'}}
            placeholder='Describe Who You Are'
            onChange={(e)=>setBio(e.target.value)}
            defaultValue={profileData.bio}
            />
            <div className="py-1 d-flex justify-content-end">
                {/* <PrivacyDropDown/> */}
                <div>
                    <Button.Ripple
                    className='mx-1'
                    onClick={()=>setView(false)}>
                        Cancel
                    </Button.Ripple>
                    <Button.Ripple
                    color='primary'
                    onClick={()=>saveBioHandler(bio,setLoading,setView)}
                    >
                        <span className={`${loading? 'd-none':'d-inline'}`}>Save</span>
                        {
                            loading && <ButtonLoader/>
                        }
                    </Button.Ripple>
                </div>
            </div>           
        </div>
    )
}

export default CreateUpdateBio