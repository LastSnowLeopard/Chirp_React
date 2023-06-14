// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import NotificationLight from '../../../../assets/images/icons/notification.png'
import NotificationWhite from '../../../../../src/assets/images/icons/notification-white.png'
// ** Reactstrap Imports
import { Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { getNotificationsData } from '../../../../redux/Action/NewsFeed'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationData } from '../../../../redux/authentication'
import { UserAvatar } from '../../../../redux/Action/Profile'
import { useState } from 'react'

const NotificationDropdown = (props) => {
  // ** Notification Array
  const {skin,unreadNotifications,setUnreadNotifications}=props

  const dispatch = useDispatch()
  
  const authStore = useSelector(state=>state.auth)
  const notificationData = authStore.notifications
  const localData = localStorage.getItem('notifyData')

  const [isOpen,setIsOpen] = useState(false)

  // const notificationsArray = [
  //   {
  //     img: require('@src/assets/images/portrait/small/avatar-s-15.jpg').default,
  //     subtitle: 'Won the monthly best seller badge.',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Congratulation Sam 🎉</span>winner!
  //       </p>
  //     )
  //   },
  //   {
  //     img: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
  //     subtitle: 'You have 10 unread messages.',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>New message</span>&nbsp;received
  //       </p>
  //     )
  //   },
  //   {
  //     avatarContent: 'MD',
  //     color: 'light-danger',
  //     subtitle: 'MD Inc. order updated',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Revised Order 👋</span>&nbsp;checkout
  //       </p>
  //     )
  //   },
  //   {
  //     title: <h6 className='fw-bolder me-auto mb-0'>System Notifications</h6>,
  //     switch: (
  //       <div className='form-check form-switch'>
  //         <Input type='switch' name='customSwitch' id='exampleCustomSwitch' defaultChecked />
  //       </div>
  //     )
  //   },
  //   {
  //     avatarIcon: <X size={14} />,
  //     color: 'light-danger',
  //     subtitle: 'USA Server is down due to hight CPU usage',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Server down</span>&nbsp;registered
  //       </p>
  //     )
  //   },
  //   {
  //     avatarIcon: <Check size={14} />,
  //     color: 'light-success',
  //     subtitle: 'Last month sales report generated',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Sales report</span>&nbsp;generated
  //       </p>
  //     )
  //   },
  //   {
  //     avatarIcon: <AlertTriangle size={14} />,
  //     color: 'light-warning',
  //     subtitle: 'BLR Server using high memory',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>High memory</span>&nbsp;usage
  //       </p>
  //     )
  //   }
  // ]

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notificationData.map((item, index) => {
          return (
            <a
              key={index}
              className='d-flex'
              // href={item.switch ? '#' : '/'}
              // onClick={e => {
              //   if (!item.switch) {
              //     e.preventDefault()
              //   }
              // }}
            >
              <div
                className={classnames('list-item d-flex', {
                  'align-items-start': !item?.switch,
                  'align-items-center': item?.switch
                })}
              >
                {
                  <Fragment>
                    <div className='me-1'>
                      {UserAvatar(1,item?.profile_image_url,40,40,{},item?.full_name)}
                    </div>
                    <div className='list-item-body flex-grow-1'>
                      {`${item?.notification_text} ${item?.full_name}`}
                      {/* <small className='notification-text'>{item?.subtitle}</small> */}
                    </div>
                  </Fragment>
                } 
                 {/* : (
                   <Fragment>
                     {item?.title}
                     {item?.switch}
                   </Fragment>
                 )} */}
              </div>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */


  useEffect(()=>{

    getNotificationsData()
  },[])


  useEffect(()=>{

    setUnreadNotifications(notificationData?.filter(x=>x.is_read==0).length ?? 0)

  },[notificationData])


  useEffect(()=>{

    if(isOpen && unreadNotifications>0){

      const copyArray = JSON.parse(JSON.stringify(notificationData))

      dispatch(setNotificationData(copyArray.map(x=>({...x,is_read:1})))) 
      setUnreadNotifications(0)     

    }

  },[isOpen])

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => {e.preventDefault();setIsOpen(!isOpen)}}>
        <img height={30} src={skin=='light'?NotificationLight:NotificationWhite} />
        <Badge pill color='danger' className={`badge-up ${Number(unreadNotifications)>0? 'd-block':'d-none'}`}>
          {unreadNotifications}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {unreadNotifications}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {/* <li className='dropdown-menu-footer'>
          <Button color='primary' block>
            Read all notifications
          </Button>
        </li> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
