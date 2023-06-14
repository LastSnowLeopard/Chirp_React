// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { Heart, MessageSquare, Play, Share2, ThumbsUp } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button, InputGroup, InputGroupText } from 'reactstrap'
import { ParagraphColor, baseURL } from '../../../utility/snippets/snippets'
import { useSelector } from 'react-redux'
import { RepliesRenderer, ToViewMoreComments, UserAvatar, filterCommentContent, likePost } from '../../../redux/Action/Profile'
import { PostMediaContainer, PostOverlay, ReplyButton } from '../../Styled-Components'
import { useState } from 'react'
import ViewMedia from './ViewMedia'
import { useSkin } from '@hooks/useSkin'
import PostComment from './PostComment'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PostView from './PostView'
import ButtonLoader from '../../components/button-loader'
import AddPostModal from './AddPostModal'



const ProfilePosts = ({ data }) => {

    const storeData = useSelector(state=>state.profileReducer)
    const [viewPostModal,setViewPostModal] = useState(false)
    const [postToEdit,setPostToEdit] = useState(-1)
    const userData = JSON.parse(localStorage.getItem('userData'))


    const renderPosts = () => {
      if(storeData.postLoading){

        return <ButtonLoader/>

      }else{
        return data.map((post,index) => {
          return (
            <PostView
            post={post}
            mediaView={true}
            storeData={storeData}
            viewPostModal={viewPostModal}
            setViewPostModal={setViewPostModal}
            postToEdit={postToEdit}
            setPostToEdit={setPostToEdit}
            />
          )
        })
      }
    }
  return (
    <div>
        {renderPosts()}
        <AddPostModal
        view={viewPostModal}
        setView={setViewPostModal}
        formData={viewPostModal? postToEdit : undefined}
        userData={userData}
        />
    </div>
  )
}
export default ProfilePosts
