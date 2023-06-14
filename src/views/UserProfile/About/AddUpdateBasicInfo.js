import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Row,Input } from 'reactstrap'
import ButtonLoader from '../../components/button-loader'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import { useSkin } from '@hooks/useSkin'
import YearDropdown from '../../components/YearDropdown'
import MonthDropdown from '../../components/MonthDropdown'
import { addLanguage, addPlaceLived } from '../../../redux/Action/Profile'




const AddUpdateBasicInfo=(props)=>{

    const {view,setView} = props

    const { skin, setSkin } = useSkin()

    const [loading,setLoading] = useState(false)
    const [language,setLanguage] = useState('')

    let obj={
        "user_id":JSON.parse(localStorage.getItem('userData')).user_id, 
        'privacy':'public',
        'language':language
    }

    return(
        <div>
            <Row className='m-0'>
                <Col md='12'>
                    <Input
                    style={{background:'transparent'}}
                    placeholder='Language'
                    onChange={(e)=>{
                        setLanguage(e.target.value)  
                    }}
                    />
                </Col>
                <Col sm='12'>
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
                                <span className={`${loading? 'd-none':'d-inline'}`} onClick={()=>addLanguage(obj,setLoading,setView)}>Save</span>
                                {
                                    loading && <ButtonLoader/>
                                }
                            </Button.Ripple>
                        </div>
                    </div>  
                </Col>
            </Row>
        </div>
    )

}

export default AddUpdateBasicInfo