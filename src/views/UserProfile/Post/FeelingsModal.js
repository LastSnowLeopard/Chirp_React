import React, { useState } from 'react'
import Modal from '../../components/Modal'
import { useEffect } from 'react'
import { getFeelingsData } from '../../../redux/Action/Profile'
import { useSelector } from 'react-redux'
import { FeelingContainer } from '../../Styled-Components'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { Search } from 'react-feather'



const FeelingsModal=(props)=>{

    const {view,setView,value,setValue} = props

    const store = useSelector(state=>state.profileReducer)
    const feelings = store.feelings

    const [feelingsData,setFeelingData] = useState([])
    const [filterValue,setFilterValue] = useState('')


    useEffect(()=>{
        getFeelingsData()
    },[])

    useEffect(()=>{

        if(feelings.length){
            setFeelingData(feelings)
        }
    },[feelings])

    const fiterFeeling=(value)=>{

        if(value.length>2){
        
            const filteredData = feelingsData.filter(x=>x.feelings_name.startsWith(value))
            setFeelingData(filteredData)
        }else{

            setFeelingData(feelings)
        }

    }
    return(
        <div>
            <Modal 
            view={view}
            setView={setView}
            modalSize='modal-md'
            headerText='How are you feeling?'
            bodyClassName='p-0'
            >
                <div className='p-1'>
                    <InputGroup 
                        style={{
                            borderRadius:'20px',
                            padding:'2px',
                            background:'#F0F2F5'
                        }}
                        className='mb-2'>
                            <InputGroupText 
                            style={{
                                background:'transparent',
                                border:'none'
                            }}
                            className='border-none'>
                            <Search size={20} />
                            </InputGroupText>
                            <Input
                                style={{
                                    background:'transparent',
                                    border:'none'
                                }}
                                placeholder="Search?"
                                onChange={(e)=>fiterFeeling(e.target.value)}
                            />
                    </InputGroup>
                </div>
                <div className='d-flex flex-wrap cursor-pointer'>
                    {
                        feelingsData.map(feeling=>{
                            const selected = feeling.feelings_id==value.feelings_id

                            return(
                                <FeelingContainer
                                selected={selected} 
                                key={feeling.feelings_id} 
                                onClick={()=>{
                                    if(selected){
                                        setValue(-1)
                                    }else{
                                        setValue(feeling)
                                    }
                                    
                                    setView(false)
                                }} >
                                    <div className='img'>
                                        <img src={feeling.feelings_icon_url} height={30} width={30} />
                                    </div>
                                    <div className='flex-grow-1'>
                                        <span>{feeling.feelings_name}</span>
                                    </div>
                                </FeelingContainer>
                            )
                        })
                    }
                </div>
            </Modal>
        </div>
    )
}
export default FeelingsModal