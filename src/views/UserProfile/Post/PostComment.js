import React, { forwardRef } from 'react'
import { Form, Input, InputGroup } from 'reactstrap'
import { CommentInput, CommentInputGroup } from '../../Styled-Components'
import { useState } from 'react'
import { BookOpen, Briefcase, CheckCircle, Gift, Heart, MoreVertical, Search, Send, Video } from 'react-feather'
import { useSkin } from '@hooks/useSkin'
import { UserAvatar, postUserComment } from '../../../redux/Action/Profile'
import GIF from '../../components/GIFRenderer'
import ButtonLoader from '../../components/button-loader'
import GIFIcon from '../../../assets/images/icons/GIF.png'
import SendIcon from '../../../assets/images/icons/Send.svg'
// import SendIcon from '../../../assets/images/icons/paperPlane.svg'

const PostComment=(props)=>{

    const {post,type,commentId,setReplyId,inputRef,storeData} = props

    const { skin, setSkin } = useSkin()

    const [display,setDisplay] = useState('flex-row')

    const [content,setContent] = useState('')

    const [viewGIFModal,setViewGIFModal] = useState(false)
    const [gif,setGIF] = useState('')

    const [loading,setLoading] = useState(false)

    const userData = JSON.parse(localStorage.getItem('userData'))

    const onSubmit=()=>{

        const gifContent = `${content} ${gif.length? ('['+gif+']') :''}`

        postUserComment(
            post.post_id,
            gifContent,
            commentId,type,setLoading,
            setDisplay,setContent,
            setReplyId,setGIF,storeData
            )

    }

    return(
        <div id={post.post_id}>
            
            <Form onSubmit={onSubmit}>
                <div className='d-flex align-items-start'>
                    
                    {UserAvatar(1,userData.profile_image_url,'34','34',{},userData?.full_name || 'user')}
                    
                    <InputGroup 
                        ref={inputRef}
                        id={`input_group-${post.post_id}`}
                        className={`${display} position-relative`}
                        onClick={()=>setDisplay('flex-column align-items-baseline justify-content-center')}
                        >
                            <CommentInput 
                            id={`comment_input-${post.post_id}`}
                            className='form-control' 
                            display={display}
                            onChange={(e)=>setContent(e.target.value)}
                            placeholder='Write a Comment...'
                            skin={skin}
                            onKeyPress={(e)=>{
                                if (e.charCode === 13){
                                    e.preventDefault()
                                    onSubmit()}
                               }}
                            />
                            <CommentInputGroup className='input-group-text' display={display} skin={skin}>
                                <div className='d-flex align-items-center justify-content-end gap-1'>

                                    <img 
                                    src={GIFIcon} 
                                    className='cursor-pointer'
                                    onClick={()=>setViewGIFModal(true)}/>
                                    {
                                        loading?
                                        <ButtonLoader/>:
                                        <img 
                                        src={SendIcon}
                                        width='30'
                                        height='30'
                                        className='cursor-pointer'
                                        onClick={onSubmit}
                                        type='submit'
                                        />
                                    }
                                    
                                </div>
                            </CommentInputGroup>
                    </InputGroup>
                    
                </div>
            </Form>
            <div className={`${gif.length?'d-block':'d-none'} d-flex justify-content-center w-100 py-1 rounded`}>
                <img src={gif} width='300' height='300' className='rounded' style={{objectFit:'contain'}}/>
            </div>
            
            <GIF
            view={viewGIFModal}
            setView={setViewGIFModal}
            gif={gif}
            setGif={setGIF}
            />

        </div>
    )
}
export default PostComment