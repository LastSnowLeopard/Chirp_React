import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardHeader, Col, Collapse, Nav, NavItem, NavLink, Navbar, Row } from 'reactstrap'
import { useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { useNavbarColor } from '@hooks/useNavbarColor'
import { AlignJustify } from 'react-feather'
import { useSelector } from 'react-redux'
import AddPost from '../../UserProfile/Post/AddPost'
import { acceptRequestAPI, getPosts, getRequestsList, getStoriesData, searchValues } from '../../../redux/Action/NewsFeed'
import PostView from '../../UserProfile/Post/PostView'
import { elementType } from 'prop-types'
import ButtonLoader from '../../components/button-loader'
import { UserAvatar } from '../../../redux/Action/Profile'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import Stories from './Story'
import NewsFeedService from '../../../utility/api/Services.js/NewsFeedService'
import HomeNavbar from './Navbar'
import AddPostModal from '../../UserProfile/Post/AddPostModal'


const Home = () => {

  const { skin, setSkin } = useSkin()
  const { navbarColor, setNavbarColor } = useNavbarColor()

  const userData = JSON.parse(localStorage.getItem('userData'))

  const [viewPostModal,setViewPostModal] = useState(false)
  const [postToEdit,setPostToEdit] = useState(-1)
  
  const storeData= useSelector(state=>state.profileReducer)
  const store = useSelector(state=>state.NewsFeedReducer)
  const postsData = store?.posts?.data
  const requestsData = store.friendsRequests

  const data = storeData.data

  const [page,setPage] = useState(store.posts.page)

  const PostsRenderer=()=>{

    return(
      <div>

        {

          postsData?.length>0?
          postsData.map(post=>{
            
            return(
              <>
                <PostView
                post={post}
                mediaView={true}
                storeData={store}
                newsFeedPost={true}
                viewPostModal={viewPostModal}
                setViewPostModal={setViewPostModal}
                postToEdit={postToEdit}
                setPostToEdit={setPostToEdit}
                />
              </>
            )

          }):''
        }
        {
          store?.posts?.loading?
          <ButtonLoader/>:
          ''
        }

      </div>
    )
  }

  const RequestsRenderer=()=>{

    return(
      <Card>
        <CardHeader>Friend Requests</CardHeader>
          {
            requestsData?.slice(0,3)?.map(request=>{
              
              return(
                <div className='px-1 mb-1 '>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-center align-items-center'>
                        {UserAvatar(1,request?.friend_profile_image,50,50)}
                      </div>
                      <div className='flex-grow-1'>
                        <div>
                          <p className={`text-${ParagraphColor[skin]} m-0 fw-bolder fs-5`}>
                            {request.friend_name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='py-1'>
                      <Button.Ripple style={{borderRadius:'10px'}} color='primary' onClick={()=>acceptRequestAPI(request?.friend_id)}>
                        Confirm
                      </Button.Ripple>
                      <Button.Ripple style={{boxShadow:'1px 1px 13px lightGray',borderRadius:'10px'}} className='ms-1' color='white'>
                        Delete
                      </Button.Ripple>
                    </div>
                </div>
              )
            })
          }
      </Card>
    )

  }

const onScroll = () => {

  const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

  if (Math.round(scrollTop + clientHeight)+1 >= scrollHeight) {
      setPage(page+1)
    }
}


useEffect(()=>{

    getPosts(store.posts.page)
    getRequestsList(userData.user_id)
    getStoriesData()
    // searchValues()
},[])

useEffect(()=>{

    if(store.posts.data){

      window.addEventListener('scroll', ()=>onScroll())
      
      return () => window.removeEventListener('scroll', onScroll)

    }

},[store.posts.data])

useEffect(()=>{

   if(store.posts.data.length){
        getPosts(page)
    }
},[page])

  return (
    <div id='newsFeed' className='py-2'>
       <Row className='m-0'>
          <Col sm='2' className='p-0 pe-1 position-fixed top-10'>
            <HomeNavbar/>
          </Col>
          <Col sm='7' className=' p-0 pe-1' style={{margin:'0 16.66%'}}>
              <Row className='m-0'>
                  <Col sm='12'>
                    <Stories/>
                  </Col>
                  <Col sm='12'>
                    <Card>
                      <AddPost
                      store={storeData}
                      profileData={data.profileData}
                      />
                    </Card>
                  </Col>
                  <Col sm='12'>
                    {PostsRenderer()}
                  </Col>
              </Row>
          </Col>
          <Col sm='3' className='p-0 pe-1 position-fixed top-10 end-0'>
            {RequestsRenderer()}
          </Col>
       </Row>
       <AddPostModal
        view={viewPostModal}
        setView={setViewPostModal}
        formData={viewPostModal? postToEdit : undefined}
        userData={userData}
        />
    </div>
  )
}

export default Home