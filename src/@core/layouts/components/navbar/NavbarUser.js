// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import ChripSearchBar from './ChripSearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setNotificationData } from '../../../../redux/authentication'
import { useState } from 'react'
import { getNotificationsData } from '../../../../redux/Action/NewsFeed'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  const dispatch = useDispatch()

  const [unreadNotifications,setUnreadNotifications] = useState(0)
  const authStore = useSelector(state=>state.auth)
  const notificationData = authStore.notifications
  const localData = localStorage.getItem('notificationData')


  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  
  useEffect(()=>{

    if(localData!=null){

        const copyArray = JSON.parse(localData)

        console.log(' :LOCATL  DATA : ',copyArray)

        setUnreadNotifications(copyArray?.filter(x=>x.is_read==0).length ?? 0)
        dispatch(setNotificationData(copyArray))

    }

  },[])


  return (
    <div className='d-flex justify-content-between flex-grow-1'>
        <div style={{marginLeft:'11.67%'}} className='w-50'>
              <ChripSearchBar/>
        </div>
          
        <ul className='nav navbar-nav align-items-center justify-content-between ms-auto'>
            {/* <IntlDropdown /> */}
            
            <NavItem className='d-none d-lg-block'>
              <NavLink className='nav-link-style'>
                <ThemeToggler />
              </NavLink>
            </NavItem>
            {/* <NavbarSearch /> */}
            {/* <CartDropdown /> */}
            <NotificationDropdown 
            skin={skin}
            unreadNotifications={unreadNotifications}
            setUnreadNotifications={setUnreadNotifications}
            />
            <UserDropdown />
          
        </ul>
    </div>
  )
}
export default NavbarUser
