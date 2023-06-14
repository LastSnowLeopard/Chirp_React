import React, { useEffect, useState } from 'react'
import {Label, Button, Col, Input, Row } from 'reactstrap'
import ButtonLoader from '../../components/button-loader'
import YearDropdown from '../../components/YearDropdown'
import { addUpdateEducation } from '../../../redux/Action/Profile'


const AddUpdateEducation=(props)=>{

    const {view,setView,loading,setLoading,formData} = props

    const dataAvailable = formData!=undefined
    const [fromYear,setFromYear] = useState(-1)
    const [toYear,setToYear] = useState(-1)

    const [Graduated,setGraduated] = useState(false)


    const [educationObj,setEducationObj] = useState({
        "user_id":JSON.parse(localStorage.getItem('userData')).user_id, 
        "institute_name":'',
        "degree":'',
        "is_graduated":0,
        "privacy":"public",
        "from_date":'',
        "to_date":''

    })

    const toSetEducationObj=(value,key)=>{
        
        let obj={...educationObj}
        obj[key] = value
        setEducationObj(obj)
    }

    useEffect(()=>{

        if(view && dataAvailable){

            setGraduated(formData?.graduated==1)

            let yearFrom = formData?.from.split('-')
            let yearTo = formData?.to.split('-')

            if(yearFrom.length){
                if(yearFrom.length>1){
                    setFromYear({value:yearFrom[1],label:yearFrom[1]})
                }else{
                    setFromYear({value:yearFrom[0],label:yearFrom[0]})
                }
                
            }

            if(yearTo.length){
                if(yearTo.length>1){
                    setToYear({value:yearTo[1],label:yearTo[1]})
                }else{
                    setToYear({value:yearTo[0],label:yearTo[0]})
                }
                
            }
        }

    },[formData])


    useEffect(()=>{

        if(fromYear!=-1){
            toSetEducationObj(fromYear.label,'from_date')
        }
    },[fromYear])

    useEffect(()=>{

        if(toYear!=-1){
            toSetEducationObj(toYear.label,'to_date')
        }
    },[toYear])

    
    return(
        <div>

            <Row className='m-0'>

                <Col sm='12' className='p-1'>
                    <Input
                    style={{background:'transparent'}}
                    defaultValue={formData?.college}
                        placeholder='School'
                        onChange={(e)=>{
                            toSetEducationObj(e.target.value,'institute_name')
                        }}
                    />
                </Col>
                <Col sm='12' className='p-1'>
                    <Label>Time Period</Label>
                    <div className='d-flex gap-1 mt-1'>
                        <div className='d-flex gap-1'>
                            From
                            <YearDropdown selected={fromYear} setSelected={setFromYear} />
                        </div>
                        <div className={`d-flex gap-1`}>
                            To
                            <YearDropdown selected={toYear} setSelected={setToYear} />
                        </div>
                    </div>
                    <br/>
                    <div className='form-check form-check-inline'>
                        <Input 
                        checked={Graduated}
                        type='checkbox' 
                        id='basic-cb-checked'
                        onClick={(e)=>{

                            setGraduated(e.target.checked)

                            if(e.target.checked){
                                
                                toSetEducationObj(1,'is_graduated')
                                
                            }else{
                                toSetEducationObj(0,'is_graduated')
                            }

                        }} />
                        <Label for='basic-cb-checked' className='form-check-label'>
                            Graduated
                        </Label>
                    </div>
                </Col>
               
               
                <Col sm='12' className='p-1'>
                    <Input
                    defaultValue={formData?.description}
                    style={{height:'100px',background:'transparent'}}
                        placeholder='description'
                        // onChange={(e)=>{
                        //     toSetEducationObj(e.target.value,'institute_name')
                        // }}
                    />
                </Col>

                {/* <Col sm='12' className='p-1'>
                    <Label>Concentrations</Label>
                    <Input
                        placeholder='Concentration'
                    />
                </Col>
                <Col sm='12' className='p-1'>
                    <Input
                        placeholder='Concentration'
                    />
                </Col>
                <Col sm='12' className='p-1'>
                    <Input
                        placeholder='Concentration'
                    />
                </Col> */}
                <Col sm='12' className='p-1'>
                    <Input
                    style={{background:'transparent'}}
                    defaultValue={formData?.degree}
                        placeholder='Degree'
                        onChange={(e)=>{
                            toSetEducationObj(e.target.value,'degree')
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
                                <span className={`${loading? 'd-none':'d-inline'}`} onClick={()=>addUpdateEducation(educationObj,setLoading,setView)}>Save</span>
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
export default AddUpdateEducation