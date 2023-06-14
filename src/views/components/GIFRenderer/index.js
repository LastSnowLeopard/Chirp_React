import React, { useEffect, useMemo, useState } from 'react'
import { GiphyFetch } from "@giphy/js-fetch-api";
import toast from 'react-hot-toast';
import { Col, Input, Row } from 'reactstrap';
import Modal from "../../components/Modal"
import { GIPHY_API_KEY } from '../../../utility/api/constants/API';
import axios from 'axios';



const gf = new GiphyFetch(GIPHY_API_KEY);


const GIF=(props)=>{

    const {view,setView,git,setGif} = props

    const [inputValue,setInputValue] = useState('')
    const [data,setData] = useState([])


    const search = async () => {
        try {
            const result = await gf.search(inputValue);
            
            if(result){
                setData(result.data)
            }
        } catch (error) {
            console.error(`search`, error);
            return toast.error('Failed to Fetch GIF !!')
        }
    };

    useEffect(() => {
    
        if(view){

            const url = `https://api.giphy.com/v1/gifs/search?q=funny&api_key=${GIPHY_API_KEY}`;
            axios
            .get(url)
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [view]);
    
    useMemo(()=>{
        if(inputValue.length>=3){
            
            search()

        }else{
            setData([])
        }
    },[inputValue])


    return(
        <div>
            <Modal
            view={view}
            setView={setView}
            modalSize='modal-lg'
            headerText='Add GIF'
            bodyClassName='p-0'
            >
                <Row className='m-0'>
                    <Col md='12' className='p-1'>
                        <Input placeholder='Search GIF' onChange={(e)=>setInputValue(e.target.value)}/>
                    </Col>
                    <Col md='12'>
                        <div className='d-flex flex-wrap'>
                            {
                                data.map((gif,index)=>{
                                    return(
                                        <div className='border rounded'>
                                            <img 
                                            className='cursor-pointer'
                                            src={gif.images.fixed_height.url} 
                                            width={100} 
                                            height={100} 
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                console.log('# SELECTED GIF :',gif)
                                                setGif(gif.images.fixed_height.url)
                                                fetch(gif.images.fixed_height.url)
                                                .then(response => response.blob())
                                                .then(blob => {
                                                    console.log('# GIF FILE :',blob)
                                                });
                                                setView(false)
                                            }}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>  
    )
}
export default GIF

