import React from 'react'
// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { Edit2, Heart, MessageSquare, MoreHorizontal, Play, Share2, ThumbsUp, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button, InputGroup, InputGroupText, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'
import { ParagraphColor, baseURL } from '../../../utility/snippets/snippets'
import { useSelector } from 'react-redux'
import { RepliesRenderer, ToViewMoreComments, UserAvatar, deletePostHandler, filterCommentContent, likePost } from '../../../redux/Action/Profile'
import { PostBackgroundImageRenderer, PostMediaContainer, PostOverlay, ReplyButton } from '../../Styled-Components'
import { useState } from 'react'
import ViewMedia from './ViewMedia'
import { useSkin } from '@hooks/useSkin'
import PostComment from './PostComment'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import AddPostModal from './AddPostModal'





const PostView=(props)=>{

    const {post,mediaView,storeData,viewPostModal,setViewPostModal,postToEdit,setPostToEdit} = props
    
    const userData=JSON.parse(localStorage.getItem('userData'))

    // const [viewPostModal,setViewPostModal] = useState(false)

    const [viewMediaModal,setViewMediaModal] = useState(false)
    const [mediaData,setMediaData] = useState([])

    const [replyCommentId,setReplyCommentId] = useState(-1)

    const {skin,setSkin} = useSkin()

    const commentBoxRef = useRef(null)

    const [commentLimit,setCommentsLimit] = useState(1)

    const ProfilePhotoRender=(profileImageURL)=>{
        if(profileImageURL?.includes('blob')){
          return profileImageURL
        }else{
          return `${localStorage.getItem('baseURL')}/${profileImageURL}`
        }
      }

    const commentClickFunction=()=>{

      const element = document.getElementById(`input_group-${post.post_id}`)
      const input = document.getElementById(`comment_input-${post.post_id}`)
      
      element.click()
      input.focus()
    }

    return(
        <Card className='post mb-1' key={post?.full_name} style={{borderRadius:!mediaView && '0px !important',margin:!mediaView && '0px'}}>
          <CardBody>
            <div className='d-flex justify-content-start align-items-center mb-1'>
             
              {UserAvatar(1,post?.profile_image_url,40,40,{alignText:'center'},post?.full_name || 'user')}
             
              <div className='profile-user-info flex-grow-1'>
                <p className={`text-${ParagraphColor[skin]} mb-0`}>
                  
                  <strong>{post?.full_name}</strong>
                  {
                    post?.feeling_id!=undefined && post?.feeling_id!='undefined' && post?.feeling_id?.length? 
                    <span> is feeling <strong>{post?.feelings_name}</strong></span>
                    :
                    ''
                  }
                  {
                    post?.tagged_user.length?
                    <span>
                      {(` ${(post?.feeling_id!=undefined && post?.feeling_id!='undefined' && post?.feeling_id?.length)? '':' is '}`)}
                      with 
                      <strong>
                        &nbsp;
                        {post?.tagged_user[0].full_name}
                      </strong>
                      &nbsp;
                      {post?.tagged_user.length>1?(`and ${post?.tagged_user.slice(0,post?.tagged_user.length-1)?.length} others`):''}
                       
                    </span>:''
                  }
                  {
                    post?.location?.length? 
                    <span>
                      {(post?.feeling_id!=undefined && post?.feeling_id!='undefined' && post?.feeling_id?.length) || post.tagged_user.length!=0?' ':' is '} 
                      in 
                      <strong> {post?.location}</strong>
                    </span>
                    :''
                  }
                  
                </p>
                
                <small className='text-muted'>{post?.postTime}</small>
              </div>
              <div className={`${post.user_id==userData.user_id? 'd-block':'d-none'}`}>
                <UncontrolledDropdown className='ms-50'>
                  <DropdownToggle className='cursor-pointer' tag='span'>
                    <MoreHorizontal/>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem className='d-flex align-items-center w-100' onClick={()=>deletePostHandler(post.post_id)}>
                      <Trash className='me-50' size={14}/>
                      Delete
                    </DropdownItem>
                    <DropdownItem className='d-flex align-items-center w-100' onClick={()=>{setViewPostModal(true);setPostToEdit(post)}}>
                      <Edit2 className='me-50' size={14} />
                      Edit
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            
            {post.background_type==null?
              <CardText className='fs-4'>
                <p className={`text-${ParagraphColor[skin]}`}>{post?.content}</p>
              </CardText>
            :
             <div className='height-450'>
                  
                  <PostBackgroundImageRenderer 
                  media='1' 
                  background 
                  url={post.background_image_url}>
                  
                    <span className='fw-bolder text-white fs-2'>{post?.content}</span>
                  
                  </PostBackgroundImageRenderer>   
            </div>
            }
            {
              <div className={`p-1 height-250 justify-content-center align-items-center ${post?.gif_image_url!='undefined' && post?.gif_image_url?.length?'d-flex':'d-none'} `}>
                <img width='250' height='250' src={post.gif_image_url}/>
              </div>
            }
            <div  
            className={`bg-black w-100 ${post?.media?.length && mediaView? 'd-flex':'d-none'} cursor-pointer position-relative overflow-hidden flex-wrap rounded mb-50 border-0`} //////////// <-- height here 
            onClick={(e)=>{
              e.preventDefault()
              setMediaData(post.media)
              setViewMediaModal(true)
              }}>
                {
                    post?.media?.map(x=>{
                        return(
                            <>
                              <PostMediaContainer media={post?.media}>
                                  {
                                  x.media_type=='image'?

                                      <img src={ProfilePhotoRender(x.media_url)} style={{objectFit:'contain'}} width='100%' height='100%'/>

                                      :(x.media_type=='video')?
                                      (
                                      <video
                                      key={post.post_id}
                                      className="VideoInput_video m-0"
                                      width="100%"
                                      height='100%'
                                      controls
                                      src={ProfilePhotoRender(x.media_url)}
                                      />
                                      ):''
                                      
                                  }    
                              </PostMediaContainer>
                            </>
                        )
                    })
                }
                {
                  post.media.length>4?
                  <PostOverlay>
                      <p className='text-white fs-2 fw-bolder'>
                        +{post?.media?.length-4} More
                      </p>
                  </PostOverlay>:''
                }
            </div>
            <Row className='d-flex justify-content-start align-items-center flex-wrap pb-1 post-actions'>
              <Col className='d-flex justify-content-between justify-content-sm-start mb-2' sm='6'>
                <div className='d-flex align-items-center text-muted text-nowrap cursor-pointer'>
                  <ThumbsUp
                    size={22}
                    className={classnames('me-50', {
                    })}
                  />
                  <span>{post?.total_likes}</span>
                </div>
              </Col>
              <Col className='d-flex justify-content-between justify-content-sm-end align-items-center mb-2' sm='6'>
                <a href='/' className='text-nowrap' onClick={e => e.preventDefault()}>
                  <MessageSquare size={18} className='text-body me-50'></MessageSquare>
                  <span className='text-muted me-1'>{post?.commets.length}</span>
                </a>
                <a href='/' className='text-nowrap share-post' onClick={e => e.preventDefault()}>
                  <Share2 size={18} className='text-body mx-50'></Share2>
                  <span className='me-1'>{post?.share}</span>
                </a>
              </Col>
              <Col sm='12' className='d-flex justify-content-between p-1 border-top border-bottom'>
                  <div className='d-flex align-items-center text-nowrap cursor-pointer' onClick={()=>likePost(post,storeData)}>
                    <ThumbsUp
                      size={25}
                      className={classnames('me-50', {
                        'profile-likes': post.is_liked==1
                      })}
                    />
                    <span className='m-0'>Like</span>
                  </div>
                  <div className='d-flex align-items-center text-nowrap cursor-pointer' onClick={()=>commentClickFunction()}>
                    <MessageSquare size={18} className='text-body me-50'></MessageSquare>
                    <span>Comment</span>
                  </div>
                  <div className='d-flex align-items-center text-nowrap cursor-pointer'>
                    <Share2 size={18} className='text-body mx-50'></Share2>
                    <span>Share</span>
                  </div>
              </Col>
            </Row>
            <fieldset className='form-label-group mb-50'>
              <PostComment id={post.post_id} inputRef={commentBoxRef} post={post} type='postComment' storeData={storeData}/>
            </fieldset>
            {
              post?.commets.length>1 && !post?.commentLimit?
              <ReplyButton 
              className={`${skin=='light'?'text-primary':'text-white'} p-1`}
              onClick={()=>ToViewMoreComments(post,storeData)}
              >
                View More Comments
              </ReplyButton>:''
            }
            {post?.commets.slice(0,post.commentLimit ?? 1)?.map(comment => (
                <div key={comment?.user_name} className='d-flex align-items-start my-1'>

                  {UserAvatar(
                    1,
                    comment.user_profile_image,
                    '34',
                    '34',
                    {},
                    comment?.user_name || 'user')}
                  
                  <div className='d-flex flex-column flex-grow-1'>
                  
                    <div className='profile-user-info p-50'>
                  
                      <div className='d-flex align-items-center justify-content-between'>
                        <p className={`text-${ParagraphColor[skin]} m-0 fs-5 fw-bold`}>{comment?.user_name}</p>
                      </div>
                  
                      <p 
                      className={`text-${ParagraphColor[skin]} m-0`}>
                      
                        {filterCommentContent(comment?.content).content}
                      
                      </p>
                      
                      {
                          filterCommentContent(comment?.content)?.URL!=-1?
                          <img src={filterCommentContent(comment?.content).URL} height={100} width={100}/>:''
                      }
                      
                    </div>
                    <div className='ps-5'>
                      <ReplyButton onClick={()=>setReplyCommentId(comment?.comment_id)}>Reply</ReplyButton>
                    </div>
                    <div>
                      {
                        comment?.replies?.map(reply=>{
                          return(
                            RepliesRenderer(reply,skin)
                          )
                        })
                      }
                    </div>
                    <div className={`${replyCommentId==comment?.comment_id? 'd-block':'d-none'}`}>
                        <PostComment post={post} type='reply' commentId={comment?.comment_id?.toString()} setReplyId={setReplyCommentId} storeData={storeData} />
                    </div>
                  </div>
                </div>
            ))}
          </CardBody>
          <ViewMedia
          view={viewMediaModal}
          setView={setViewMediaModal}
          media={mediaData}
          post={post}
          mediaOnly={true}
          />
          {/* <AddPostModal
          view={viewPostModal}
          setView={setViewPostModal}
          formData={viewPostModal? post : undefined}
          /> */}

        </Card>
    )
}
export default PostView