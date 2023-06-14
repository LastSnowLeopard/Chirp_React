import React, { useEffect } from 'react'
import { useState } from 'react'
import { AlignJustify, Rss, Info, Image, Users, Edit, Camera, Edit2, Video } from 'react-feather'
import { useSelector } from 'react-redux'
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button, TabContent, TabPane } from 'reactstrap'
import { useSkin } from '@hooks/useSkin'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import AllPhotos from './AllVideos'
import TaggedPhotos from './TaggedVideos'
import { getUserPhotos, getUserVides } from '../../../redux/Action/Profile'
import AllVideos from './AllVideos'
import TaggedVideos from './TaggedVideos'





const Videos=(props)=>{

    const { skin, setSkin } = useSkin()

    const store = useSelector(state=>state.profileReducer)

    // ** States
    const [active, setActive] = useState('1')
    const [isOpen, setIsOpen] = useState(false)

    
    const toggle = () => setIsOpen(!isOpen)

    const toggleTab = tab => {
        setActive(tab)
    }

    useEffect(()=>{

        getUserVides(active)

    },[active])


    return(
        <Card className='friends-tabs'>
            <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>Video</p>
            <Navbar tabs container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
            <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
                <AlignJustify size={21} />
            </Button>
            <Collapse isOpen={isOpen} navbar>
                <div className='profile-tabs d-flex align-items-center justify-content-between flex-wrap mt-1 mt-md-0'>
                <Nav className='mb-0' tabs>
                    <NavItem>
                        <NavLink 
                        className='fw-bold' 
                        active={active=='1'}
                        onClick={() => {
                            toggleTab('1')
                        }}>
                            <span className='d-none d-md-block'>All Videos</span>
                            <Video className='d-block d-md-none' size={14} />
                        </NavLink>
                    </NavItem>

                    <NavItem>
                            <NavLink className='fw-bold' 
                                active={active=='2'}
                                onClick={() => {
                                    toggleTab('2')
                                }}>
                                    <span className='d-none d-md-block'>Tagged</span>
                                    <Video className='d-block d-md-none' size={14} />
                            </NavLink>
                    </NavItem>
                </Nav>
                </div>
            </Collapse>
            </Navbar>
            <TabContent activeTab={active}>
                <TabPane tabId='1'>
                    <AllVideos activeIndex={active}/>
                </TabPane>
                <TabPane tabId='2'>
                    <AllVideos activeIndex={active}/>
                </TabPane>
                
            </TabContent>
        </Card>
    )
}
export default Videos