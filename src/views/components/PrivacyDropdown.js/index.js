import React, { useState } from "react"
import { Globe,Wifi, WifiOff, PhoneOff, BellOff, Bell, VolumeX, Volume2 } from "react-feather"
import {
    Button,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    UncontrolledButtonDropdown
  } from 'reactstrap'


const PrivacyDropDown=(props)=>{

    const {text} =props

    const [activeIcon, setActiveIcon] = useState(<Globe size={15} />)

    const icons = [
        {
          id: 1,
          item: <WifiOff size={15} />
        },
        {
          id: 2,
          item: <VolumeX size={15} />
        },
        {
          id: 3,
          item: <Volume2 size={15} />
        },
        {
          id: 4,
          item: <Bell size={15} />
        },
        {
          id: 5,
          item: <BellOff size={15} />
        },
        {
          id: 6,
          item: <PhoneOff size={15} />
        }
      ]

    const renderIconItem = icons.map(icon => {
        return (
          <DropdownItem tag='span' key={icon.id} onClick={() => toggleIcon(icon.item)}>
            {icon.item}
          </DropdownItem>
        )
      })

    return(
        <div>
            <UncontrolledButtonDropdown className='dropdown-icon-wrapper' direction='up'>
                <Button color='primary'>{text || 'Public'}</Button>
                <DropdownToggle className='dropdown-toggle-split' color='primary' caret>
                {activeIcon}
                </DropdownToggle>
                <DropdownMenu tag='div' end>
                {renderIconItem}
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
    )
}
export default PrivacyDropDown