import React, { useEffect, useRef, useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Button, Card, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown } from 'reactstrap'
import ButtonLoader from '../../components/button-loader'
import { useSelector } from 'react-redux'
import { ParagraphColor, RelationsOptions, baseURL } from '../../../utility/snippets/snippets'
import { addRelation, getUserFriends } from '../../../redux/Action/Profile'
import { FriendsContainer } from '../../Styled-Components'
import Select from 'react-select'
import { Edit2, MoreVertical } from 'react-feather'



const AddFamilyMember=(props)=>{

    const {view,setView,formData} = props
    const { skin, setSkin } = useSkin()

    const storeData = useSelector(state=>state.profileReducer)
    const friendsData = storeData?.allFriendsForUser

    const [filteredData,setFilteredData] = useState([])
    const [inputValue,setInputValue] = useState('')

    const [loading,setLoading] = useState(false)
    const [viewFriends,setViewFriends] = useState(false)

    const [selectedFriend,setSelectedFriend] = useState(-1)
    const [relation,setRelation] = useState(-1)


    const dropdownRef = useRef(null)

    function handleClickOutside(event) {


        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setViewFriends(false)
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
            <Card style={{zIndex:1000}} className={`border border-2 position-absolute end-0 w-100 ${viewFriends?'d-block':'d-none'}`}>
                {
                    filteredData.slice(0,9)?.map(friend=>{
                        return(
                            <FriendsContainer onClick={()=>{setSelectedFriend(friend);setViewFriends(false);setInputValue(friend.friend_name)}} className='d-flex gap-1 p-1 cursor-pointer'>
                                <div>
                                    <img src={`${baseURL}/${friend.friend_profile_image}`} width={50} height={50} className='border rounded' />
                                </div>
                                <div>
                                    <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>{friend.friend_name}</p>
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


    const onsubmit=()=>{

        const payload={
            "user_id":JSON.parse(localStorage.getItem('userData')).user_id, 
            "relationship":relation,                    // use values available in facebook value like brother,sister,father e.g
            "relation_person_id":selectedFriend.friend_id,                   // use friend list id to display list use exiting api
            "privacy":"public",
            'full_name':selectedFriend.friend_name
        }

        setLoading(true)
        addRelation(payload,setView,setLoading)
        

    }
    useEffect(()=>{
        getUserFriends('all',1)
    },[])

    return(
        <div>
            <Row className='m-0'>

                <Col sm='12'>
                    <div className='position-relative w-100'>
                        <Input
                        style={{background:'transparent'}}
                        value={inputValue}
                        placeholder='Family Member'
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
                        {RenderFriends()}
                    </div>
                </Col>
                <Col sm='12'>
                    <div>
                        <Label>Select Relation</Label>
                        <Select
                            options={RelationsOptions}
                            onChange={(e)=>setRelation(e.value)}
                        />
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
                                <span className={`${loading? 'd-none':'d-inline'}`} onClick={()=>onsubmit()}>Save</span>
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
export default AddFamilyMember