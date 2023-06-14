// ** React Imports
import { useState,useRef, useEffect } from 'react'

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit, Camera, Edit2, Video } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button, TabContent, TabPane } from 'reactstrap'
import DefaultCover from '../../assets/images/profile/user-uploads/defaultCover.png'
import DefaultProfile from '../../assets/images/portrait/small/avatar-s-4.jpg'
import '../../@core/scss/react/pages/page-profile.scss'
import Avatar from '@components/avatar'
import UploadProfileImageModal from './UploadProfileImageModal'
import EditProfileModal from './EditProfileModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserAvatar } from '../../redux/Action/Profile'
import AvatarGroup from '@components/avatar-group'
// import { getInitials } from '../../utility/snippets/snippets'



const ProfileHeader = (props) => {

  const { data,store ,viewHobbieModal, setViewHobbiesModal,viewBioModal,setViewBioModal }=props

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ** States
  const [isOpen, setIsOpen] = useState(false)
  const [viewUploadImageModal,setViewUploadImageModal] = useState(false)
  const [imageType,setImageType] = useState('')

  const [viewEditProfileModal,setViewEditProfileModal] = useState(false)

  const [active,setActive] = useState('1')

  const [profileImageURL,setProfileImageURL] = useState('')
  const [coverImageURL,setCoverImageURL] = useState('')

  const [imageURL,setImageURL] = useState('')


  const toggle = () => setIsOpen(!isOpen)

  const URL = window.location.pathname

  const toggleTab = tab => {
   
    navigate(`/profile/${tab}`)

  }

  const CoverPhotoRender=()=>{

    if(coverImageURL.includes('blob')){
      return coverImageURL
    }else{
      return `${localStorage.getItem('baseURL')}/${coverImageURL}`
    }
  }


  
  const ProfilePhotoRender=()=>{
    if(profileImageURL?.includes('blob')){
      return profileImageURL
    }else{
      return `${localStorage.getItem('baseURL')}/${profileImageURL}`
    }
  }


  useEffect(()=>{

    if(imageURL!='' && imageURL!=null && !viewUploadImageModal){

      if(imageType=='cover_image'){
        setCoverImageURL(imageURL)
      }else{
        setProfileImageURL(imageURL)
      }
    }

  },[imageURL,viewUploadImageModal])

  useEffect(()=>{

    if(Object.keys(data).length){
     
        setCoverImageURL(data.cover_photo_url)
        setProfileImageURL(data.profile_image_url)

    }

  },[store.data.profileData])

  return (
    <Card className='profile-header m-0'>
      <CardImg 
      className='px-3'
      src={ data.cover_photo_url_privacy==1? (coverImageURL!=null? CoverPhotoRender() : DefaultCover) : DefaultCover} 
      alt='User Profile Image' top 
      style={{height:'400px',objectFit:'cover'}}
      />
      
      <Button color='secondary position-absolute' 
      className='m-1 w-20'
      style={{top:'310px',right:'42px'}}
      onClick={()=>{
        setViewUploadImageModal(true)
        setImageType('cover_image')
        setImageURL('')
        }}>
          <div className='d-flex align-items-center'>
            <Camera size='20px' style={{margin:'5px'}}/>
            <span className='d-none d-md-inline'>Edit Cover Photo </span>
          </div>
      </Button>
      <div className='position-relative'>
        <div className='profile-img-container d-flex flex-column align-items-center'>
          <div className='profile-img position-relative'>
            {UserAvatar(data?.profile_image_url_privacy,profileImageURL,'100%','100%',{height:'100%',width:'100%',alignText:'center'})}
          <Card className='position-absolute m-0 bottom-0 end-0 rounded-circle' style={{boxShadow:'5px 10px 10px lightGray !important',padding:'10px',cursor:'pointer'}}>
            <Camera 
            size='20px' 
            onClick={()=>{
              setImageType('profile_image')  
              setViewUploadImageModal(true)
              setImageURL('')
              }}/>
          </Card>
          </div>
          <div className='profile-title ms-2 mt-2'>
            <h2>{data.full_name}</h2>
          </div>
          <div>
            <span>{data.total_friends} friends</span>
          </div>
          <div>
            <AvatarGroup data={data.recent_friends}/>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <hr/>
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
                  active={URL.includes('posts')}
                  onClick={() => {
                    toggleTab('posts')
                  }}>
                    <span className='d-none d-md-block'>Posts</span>
                    <Rss className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold' 
                  active={URL.includes('about')}
                  onClick={() => {
                    toggleTab('about')
                  }}>
                    <span className='d-none d-md-block'>About</span>
                    <Info className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold' 
                  active={URL.includes('friends')}
                  onClick={() => {
                    toggleTab('friends')
                  }}>
                    <span className='d-none d-md-block'>Friends</span>
                    <Users className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold' 
                  active={URL.includes('photos')}
                  onClick={() => {
                    toggleTab('photos')
                  }}>
                    <span className='d-none d-md-block'>Photos</span>
                    <Image className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold' 
                  active={URL.includes('videos')}
                  onClick={() => {
                    toggleTab('videos')
                  }}>
                    <span className='d-none d-md-block'>Videos</span>
                    <Video className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
              <Button color='primary' onClick={()=>setViewEditProfileModal(true)}>
                <Edit className='d-block d-md-none' size={14} />
                <span className='fw-bold d-none d-md-block'><Edit2 size={20}/>Edit Profile</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
      
      <UploadProfileImageModal 
      view={viewUploadImageModal} 
      setView={setViewUploadImageModal}
      data={data}
      imageType={imageType}
      newImageURL={imageURL}
      setNewImageURL={setImageURL}
      />
      <EditProfileModal
      view={viewEditProfileModal}
      setView={setViewEditProfileModal}
      viewImageModal={viewUploadImageModal}
      setViewImageModal={setViewUploadImageModal}
      viewHobbieModal={viewHobbieModal}
      setViewHobbieModal={setViewHobbiesModal}
      data={data}
      store={store}
      addUpdateBio={viewBioModal}
      setAddUpdateBio={setViewBioModal}
      />
    </Card>
  )
}

export default ProfileHeader
