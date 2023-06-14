import React from 'react'
import Modal from '../../components/Modal'
import Group from '../../../assets/images/icons/Group.png'
import { ChevronDown, Film, Globe, MapPin, MoreHorizontal, MoreVertical, Smile, Users } from 'react-feather'
import { PostElementModalDiv } from '../../Styled-Components'
import GIFIcon from '../../../assets/images/icons/GIF.png'
import { useSkin } from '@hooks/useSkin'






const PostElementModal=(props)=>{

    const {view,setView,handleMediaClick,setViewLocationModal,setVewTagFriendModal,setViewFeelingModal,setViewGIFModal,gif,selectedBackground,mediaList} = props
    const { skin, setSkin } = useSkin()

    return(
        <div>
         
         <Modal
         view={view}
         setView={setView}
         modalSize='modal-md'
         headerText='Add to your post'
         bodyClassName='p-0'
         >
 
          <div className='d-flex flex-wrap py-1'>
          <PostElementModalDiv
          skin={skin}
          onClick={()=>{
            if(selectedBackground==-1 && gif.length==0){
                setView(false)
                handleMediaClick()  
            }
           }}
           >
            <span>
                <img 
                className='mx-50'
                src={Group} 
                />
                Photos/Videos
            </span>
          </PostElementModalDiv>
           <PostElementModalDiv 
           skin={skin}
           onClick={()=>{
            setView(false)
            setViewLocationModal(true)
           }}>
                <MapPin size={25} className='cursor-pointer mx-50'/>
                Location
            </PostElementModalDiv>
            <PostElementModalDiv
            skin={skin}
            onClick={()=>{
                setView(false)
                setVewTagFriendModal(true)
            }}>
                <Users size={25} className='cursor-pointer mx-50' />
                Tag People
            </PostElementModalDiv>
            <PostElementModalDiv 
            skin={skin}
            onClick={()=>{
                setView(false)
                setViewFeelingModal(true)
            }}>
                <Smile size={25} className='cursor-pointer mx-50'/>
                Feelings
            </PostElementModalDiv>
            <PostElementModalDiv 
            skin={skin}
            onClick={()=>{
                if(selectedBackground==-1 && !mediaList.find(x=>x.media_type.startsWith('image') || x.media_type.startsWith('video'))){
                    setView(false)
                    setViewGIFModal(true)
                }
            }}>
                <img src={GIFIcon} />
                GIF
            </PostElementModalDiv>  
          </div>

         </Modal>

        </div>
    )
}
export default PostElementModal