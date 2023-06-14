import React, { useState } from 'react'
import { AlignJustify } from 'react-feather'
import { Button, Card, CardHeader, Col, Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, Row } from 'reactstrap'
import { UserAvatar } from '../../../redux/Action/Profile'
import Friends from '../../../assets/images/icons/Home/Friends.svg'
import Groups from '../../../assets/images/icons/Home/Group.svg'
import Download from '../../../assets/images/icons/Home/Download.svg'
import Pages from '../../../assets/images/icons/Home/Layers.svg'
import SeeMore from '../../../assets/images/icons/Home/ChvronDown.svg'
import Watch from '../../../assets/images/icons/Home/Watch.svg'



const HomeNavbar=(props)=>{

    const userData = JSON.parse(localStorage.getItem('userData'))

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return(
        <div>
            <Navbar
              expand='lg'
              container={false}
              className='pt-0'
            >
              <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
                <AlignJustify size={21} />
              </Button>

              <Collapse isOpen={isOpen} navbar>
                <div className='profile-tabs mt-md-0 w-100'>
                  <Nav className='mb-0 p-1 pt-0' tabs vertical>
                    <NavbarBrand>
                        <div className='d-flex align-items-center py-25 pb-1'>
                            <div>
                                {UserAvatar(1,userData?.profile_image_url,40,40)}
                            </div>
                            <div>
                                <p className='m-0 fs-4'>{userData?.full_name}</p>
                            </div>
                        </div>
                    </NavbarBrand>
                    <NavItem>
                      <NavLink 
                      className='fw-bold px-0 justify-content-start gap-1 mb-50' 
                      active
                      >
                        {/* <div className='d-flex align-items-center'> */}
                            <img src={Friends} />
                            <span className='d-none d-md-block'>Friends</span>
                        {/* </div> */}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                      className='fw-bold px-0 justify-content-start gap-1 mb-50' 
                      >
                        {/* <div className='d-flex align-items-center'> */}
                            <img src={Pages} />
                            <span className='d-none d-md-block'>Page</span>
                        {/* </div> */}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                      className='fw-bold px-0 justify-content-start gap-1 mb-50' 
                      >
                        {/* <div className='d-flex align-items-center'> */}
                            <img src={Groups} />
                            <span className='d-none d-md-block'>Groups</span>
                        {/* </div> */}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                      className='fw-bold px-0 justify-content-start gap-1 mb-50' 
                      >
                        {/* <div className='d-flex align-items-center'> */}
                            <img src={Watch} />
                            <span className='d-none d-md-block'>Watch</span>
                        {/* </div> */}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                      className='fw-bold px-0 justify-content-start gap-1 mb-50' 
                      >
                        {/* <div className='d-flex align-items-center'> */}
                            <img src={Download} />
                            <span className='d-none d-md-block'>Saved</span>
                        {/* </div> */}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                      className='fw-bold px-0 justify-content-start gap-1 mb-50' 
                      >
                        {/* <div className='d-flex align-items-center'> */}
                            <img src={SeeMore} />
                            <span className='d-none d-md-block'>See More</span>
                        {/* </div> */}
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Collapse>
            </Navbar>
        </div>
    )
}
export default HomeNavbar