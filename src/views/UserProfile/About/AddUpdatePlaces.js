import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Row,Input } from 'reactstrap'
import ButtonLoader from '../../components/button-loader'
import { ParagraphColor, months } from '../../../utility/snippets/snippets'
import { useSkin } from '@hooks/useSkin'
import YearDropdown from '../../components/YearDropdown'
import MonthDropdown from '../../components/MonthDropdown'
import { addPlaceLived } from '../../../redux/Action/Profile'
import AutoComplete from '../Post/MapAutocomplete'




const AddUpdatePlaces=(props)=>{

    const {view,setView,formData} = props

    const dataAvailable = formData!=undefined

    const { skin, setSkin } = useSkin()

    const [loading,setLoading] = useState(false)

    const [year,setYear] = useState(-1)
    const [month,setMonth] = useState(-1)

    const [check,setCheck] = useState(false)
    const [location,setLocation] = useState('')

    const [placesObj,setPlacesObj] = useState({
        "user_id":JSON.parse(localStorage.getItem('userData')).user_id, 
        "city":'',
        "latlng":"0,0",
        "privacy":"public",
        "date_moved":''
    })

    useEffect(()=>{

        if(view && dataAvailable){

            setLocation(formData?.city)
            let yearFrom = formData?.date_moved.split('-')

            if(yearFrom.length){
             
                setMonth({value:yearFrom[0],label:months[yearFrom[0]]})
                setYear({value:yearFrom[1],label:yearFrom[1]})
                // toSetCityObj(`${yearFrom[0]}-${yearFrom[1]}`,'date_moved')
            }

            setPlacesObj({...formData})
        }

    },[formData])

    const toSetCityObj=(value,key)=>{
        
        let obj={...placesObj}
        obj[key] = value
        setPlacesObj(obj)
    }

    useEffect(()=>{

        if(year!=-1 && month!=-1){

            toSetCityObj(`${month.value}-${year.value}`,'date_moved')
        }
    },[year,month])

    useEffect(()=>{
        
        if(location.length){
            toSetCityObj(location,'city')  
        }
    },[location])

    console.log(' @ PLACE OBJ : ',{...placesObj})

    return(
        <div>
            <Row className='m-0'>
                <Col md='12'>
                    {/* {!check?
                        <Input
                        style={{background:'transparent'}}
                        placeholder='City'
                        value={location}
                        // onChange={(e)=>{
                        //     toSetCityObj(e.target.value,'city')  
                        // }}
                        onChange={(e)=>setCheck(true)}
                        />: */}
                        <AutoComplete
                        dataAvailable={dataAvailable}
                        formDataValue={formData?.city || undefined}
                        setView={setCheck}
                        setLocation={setLocation}
                        notApplyStyle={true}
                        />
                    {/* } */}
                </Col>
                <Col md='12' className='d-flex flex-wrap align-items-center mt-1 gap-1 p-0'>
                    <div>
                        <p className={`text-${ParagraphColor[skin]} m-1 fs-5`}>Date Moved</p>
                    </div>
                    <div>
                        <YearDropdown selected={year} setSelected={setYear}/>
                    </div>
                    <div>
                        <MonthDropdown selected={month} setSelected={setMonth}/>
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
                                <span className={`${loading? 'd-none':'d-inline'}`} onClick={()=>addPlaceLived(placesObj,setLoading,setView,dataAvailable)}>Save</span>
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

export default AddUpdatePlaces