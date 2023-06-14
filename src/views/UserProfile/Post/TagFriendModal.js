import React, { useEffect, useRef, useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Button, Card, Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import { FriendsContainer, HobbieButton } from '../../Styled-Components'
import Select from 'react-select'
import { addRelation, getUserFriends } from '../../../redux/Action/Profile'
import ButtonLoader from '../../components/button-loader'
import { ParagraphColor, RelationsOptions, baseURL } from '../../../utility/snippets/snippets'
import Modal from "../../components/Modal"
import { Search, X } from 'react-feather'

const TagFriendModal=(props)=>{

    const {view,setView,selectedFriend,setSelectedFriend} = props

    const { skin, setSkin } = useSkin()

    const storeData = useSelector(state=>state.profileReducer)
    const friendsData = storeData?.friends?.all_friends?.data

    const [filteredData,setFilteredData] = useState([])
    const [inputValue,setInputValue] = useState('')

    const [loading,setLoading] = useState(false)
    const [viewFriends,setViewFriends] = useState(false)

    // const [selectedFriend,setSelectedFriend] = useState([])
    const [relation,setRelation] = useState(-1)


    const dropdownRef = useRef(null)

    function handleClickOutside(event) {


        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setViewFriends(false)
        } 
    
    } 

    const removeFriendfromList=(friend)=>{

        const index = selectedFriend.findIndex(x=>x.friend_id==friend.friend_id) 
        const copyData = [...selectedFriend]

        if(index!=-1){
            delete copyData[index]

            setSelectedFriend(copyData.filter(x=>x));
        }

    }
    useEffect(()=>{

        if(viewFriends){
            window.addEventListener('click',handleClickOutside)

            return(()=>{
                window.removeEventListener('click',handleClickOutside)
            })
        }

    },[viewFriends])

    useEffect(()=>{

        if(friendsData.length){
            setFilteredData(friendsData)
        }
    },[friendsData])

    const RenderFriends=()=>{

        return(
            <Card style={{zIndex:1000}} className={`border border-2 w-100`}>
                {
                    filteredData.slice(0,9)?.map(friend=>{
                        return(
                            <FriendsContainer 
                            onClick={()=>{
                                    if(!selectedFriend.find(x=>x?.friend_id==friend.friend_id)){
                                        setSelectedFriend([...selectedFriend,friend]);
                                    }
                                    // if(!data.includes(friend.friend_id)){
                                    //     setData(`${data},${friend.friend_id}`);
                                    // }
                                    // if(!inputValue.includes(friend.full_name)){
                                    //     setInputValue(`${inputValue},${friend.full_name}`)
                                    // }
                                }}
                                
                            className='d-flex gap-1 p-1 cursor-pointer'>
                                <div>
                                    <img src={`${baseURL}/${friend.profile_image_url}`} width={50} height={50} className='border rounded' />
                                </div>
                                <div>
                                    <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>{friend.full_name}</p>
                                </div>
                            </FriendsContainer>
                        )
                    })
                }
            </Card>
        )
    }

    const filterFriends=(value)=>{

        const data = friendsData.filter(x=>x.full_name.toLowerCase().includes(value.toLowerCase()))
        setFilteredData(data)

    }

    useEffect(()=>{
        
        if(view){
            getUserFriends('all',1)
        }
    },[view])

    return(
        <div>
            <Modal
            view={view}
            setView={setView}
            modalSize='modal-lg'
            headerText='Tag Friends'
            bodyClassName='p-0'>
                <Row className='m-0'>

                    <Col sm='12'>
                        <div className='position-relative w-100'>
                        <InputGroup 
                            style={{
                                borderRadius:'20px',
                                padding:'2px',
                                background:'#F0F2F5'
                            }}
                            className='mb-2'>
                                <Input
                                    style={{
                                        background:'transparent',
                                        border:'none'
                                    }}
                                    
                                    value={inputValue}
                                    placeholder='Search Friends'
                                    onClick={()=>setViewFriends(!viewFriends)}
                                    onChange={(e)=>{
                                        setInputValue(e.target.value)
                                        if(e.target.value.length>=3){
                                            filterFriends(e.target.value)
                                        }else{
                                            setFilteredData(friendsData)
                                        }
                                    }}
                                    />  
                                    <InputGroupText 
                                    style={{
                                        background:'transparent',
                                        border:'none'
                                    }}
                                    className='border-none'>
                                    <Search size={20} />
                                    </InputGroupText>
                        </InputGroup>
                        </div>
                        <div className={`${selectedFriend.length?'d-block':'d-none'} my-1 border rounder p-1`}>
                            {
                                selectedFriend.map(friend=>{
                                    return(
                                        <HobbieButton 
                                        onClick={()=>removeFriendfromList(friend)}>
                                            <div className={`text-${ParagraphColor[skin]}`}>
                                                <span>{friend.full_name}</span>
                                                <X className='ms-25'/>
                                            </div>
                                        </HobbieButton>
                                    )
                                })
                            }
                        </div>
                        {RenderFriends()}
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
                                    <span onClick={()=>setView(false)}>Save</span>
                                    
                                </Button.Ripple>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}
export default TagFriendModal