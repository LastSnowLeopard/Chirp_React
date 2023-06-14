import React, { useEffect, useState } from 'react'
import {Label, Button, Col, Input, Row } from 'reactstrap'
import ButtonLoader from '../../components/button-loader'
import YearDropdown from '../../components/YearDropdown'
import { current } from '@reduxjs/toolkit'
import { addUpdateWork } from '../../../redux/Action/Profile'


const AddUpdateWork=(props)=>{

    const {view,setView,loading,setLoading,formData} = props

    const dataAvailable = formData!=undefined

    const [fromYear,setFromYear] = useState(-1)
    const [toYear,setToYear] = useState(-1)

    const [currentWorking,setCurrentWorking] = useState(false)

    const [workObj,setWorkObj]=useState({
        "user_id":JSON.parse(localStorage.getItem('userData')).user_id, 
        "company":'', 
        "position":'',
        "city_town":'',
        "description":'',
        "currently_working_here":0,
        "privacy":"public",
        "from_date":'',
        "to_date":''
    })


    const toSetWorkObj=(value,key)=>{
        
        console.log(' @ CALLED : ', value ,'=======',key)

        let obj={...workObj}
        obj[key] = value
        console.log(' @ OBJ : ',obj)
        setWorkObj(obj)
    }

console.log(' @ WORK OBJ  :  ',workObj)

    useEffect(()=>{

        if(view && dataAvailable){

            setWorkObj({...formData})

            setCurrentWorking(formData?.to==new Date().getFullYear())

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
            toSetWorkObj(fromYear.label,'from_date')
        }
    },[fromYear])

    useEffect(()=>{

        if(toYear!=-1){
            toSetWorkObj(toYear.label,'to_date')
        }
    },[toYear])


    return(
        <div>

            <Row className='m-0'>

                <Col sm='12' className='p-1'>
                    <Input
                    style={{background:'transparent'}}
                    defaultValue={dataAvailable? formData?.company:''}
                        placeholder='Company'
                        onChange={(e)=>toSetWorkObj(e.target.value,'company')}
                    />
                </Col>
                <Col sm='12' className='p-1'>
                    <Input
                    style={{background:'transparent'}}
                    defaultValue={dataAvailable? formData?.position:''}
                        placeholder='Position'
                        onChange={(e)=>toSetWorkObj(e.target.value,'position')}
                    />
                </Col>
                <Col sm='12' className='p-1'>
                    <Input
                    style={{background:'transparent'}}
                    defaultValue={dataAvailable? formData?.city_town:''}
                        placeholder='City/Town'
                        onChange={(e)=>toSetWorkObj(e.target.value,'city_town')}
                    />
                </Col>
                <Col sm='12' className='p-1'>
                    <Input
                    style={{height:'100px',background:'transparent'}}
                    defaultValue={dataAvailable? formData?.description:''}
                        placeholder='Description'
                        onChange={(e)=>toSetWorkObj(e.target.value,'description')}
                    />
                </Col>
                <Col sm='12' className='p-1'>
                    <Label>Time Period</Label>
                    <br/>
                    <div className='form-check form-check-inline'>
                        <Input
                        checked={currentWorking}
                        type='checkbox' 
                        id='basic-cb-checked' 
                        onChange={(e)=>{
                            
                            setCurrentWorking(e.target.checked)

                            if(e.target.checked){
                                
                                toSetWorkObj(1,'currently_working_here')
                                toSetWorkObj(new Date().getFullYear(),'to_date')
                                
                            }else{
                                toSetWorkObj(0,'currently_working_here')
                            }
                        }} />
                        <Label for='basic-cb-checked' className='form-check-label'>
                            I currently Work Here 
                        </Label>
                    </div>
                </Col>
                <Col sm='12' className='d-flex flex-wrap gap-1'>
                    <div className='d-flex gap-1'>
                        From
                        <YearDropdown selected={fromYear} setSelected={setFromYear} />
                    </div>
                    <div className={`${currentWorking?'d-none':'d-flex'} gap-1`}>
                        To
                        <YearDropdown selected={toYear} setSelected={setToYear} />
                    </div>
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
                                <span className={`${loading? 'd-none':'d-inline'}`} onClick={()=>addUpdateWork(workObj,setLoading,setView,dataAvailable)}>Save</span>
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
export default AddUpdateWork