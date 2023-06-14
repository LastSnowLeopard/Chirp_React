import React, { useState } from "react"
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import { HobbiesRenderer, ParagraphColor, baseURL } from "../../utility/snippets/snippets"
import CreateUpdateBio from "./CreateUpdateBio"
import { useSkin } from '@hooks/useSkin'
import { useSelector } from "react-redux"
import { getPosts, getUserFriends, getUserPhotos, setViewBioModal, setViewHobbieModal } from "../../redux/Action/Profile"
import OverviewTab from "./About/OverviewTab"
import AddPost from "./Post/AddPost"
import { useEffect } from "react"
import ProfileIndex from "../pages/profile/index"
import ProfilePosts from "./Post/ProfilePosts"
import InputBasics from '../../Views/forms/form-elements/input-groups/index'
import ButtonLoader from "../components/button-loader"
import { Link, useNavigate } from "react-router-dom"
import TableServerSide from "../apps/email/index"
import ViewMedia from "./Post/ViewMedia"


const PostSection=(props)=>{

    // const {store,data,viewBioModal,setViewBioModal,viewHobbieModal,setViewHobbieModal} = props
    const navigate = useNavigate()

    const store = useSelector(state=>state.profileReducer)
    const photosData  = store.photos

    const all_friends = store.friends.all_friends
    
    const data = store.data
    const viewBioModal = store.viewBioModal
    const viewHobbieModal = store.viewHobbiesModal
    

    const hobbiesData = store.data?.user_hobbies
    const { skin, setSkin } = useSkin()
    const [page,setPage] = useState(store.posts.page)

    const [viewMedia,setViewMedia] = useState(false)
    const [media,setMedia] = useState([])


    const HobbieContainer=()=>{
        return(
            <div className="hobbies my-1">
                {HobbiesRenderer({hobbiesData,skin})}
                <Button 
                className="w-100 my-1"
                color={skin=='dark'?'dark':'gray'}
                onClick={()=>setViewHobbieModal(true)}>
                    <span className={`w-100 fw-bolder text-${ParagraphColor[skin]}`}>
                        {
                            data?.user_hobbies?.length?
                            'Edit Hobbies':'Add Hobbies'
                        }
                    </span>
                </Button>
            </div>
        )
    }
    
    const BioContainer=()=>{
        return(
            <div className="bio d-flex flex-column align-items-center">
                <p className={`text-center ${viewBioModal?'d-none':'d-block'}`}>
                    {data?.profileData.bio}
                </p>
                <div
                className={`${viewBioModal? 'd-block':'d-none'} justify-content-center`}
                >
                    <CreateUpdateBio 
                    view={viewBioModal}
                    setView={setViewBioModal}
                    width='100%'
                    // height='100%'
                    />
                </div>
                <Button 
                color={skin=='dark'?'dark':'gray'}
                className={`w-100`}
                onClick={()=>setViewBioModal(true)}>

                    <span className={`w-100 fw-bolder text-${ParagraphColor[skin]}`}>
                        {
                            data?.profileData.bio!=null && data?.profileData.bio!=''?
                            'Edit Bio':'Add Bio'
                        }
                    </span>
                    
                </Button>
            </div>
        )
    }

    useEffect(()=>{

        getPosts(store.posts.page)
        getUserFriends('all',1)
        getUserPhotos(1)

    },[])

    const onScroll = () => {

        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
    
        if (Math.round(scrollTop + clientHeight)+1 >= scrollHeight) {
            setPage(page+1)
        }
    }

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


    return(
        <div>
            <Row className="m-0">
                <Col md='5' className="p-0">
                    <Card className="m-1 px-1">
                        <CardHeader className={`fs-3 fw-bolder ${ParagraphColor[skin]}`}>Intro</CardHeader>
                        <CardBody>
                            {BioContainer()}
                            <div className="my-1">
                                <OverviewTab postSectionCall={true}/>
                                <Button.Ripple 
                                color={skin=='dark'?'dark':'gray'}
                                className={`w-100`}
                                onClick={()=>navigate('/profile/about')}>
                                    <span className={`w-100 fw-bolder text-${ParagraphColor[skin]}`}>Edit Details</span>
                                </Button.Ripple>
                            </div>
                            {HobbieContainer()}
                        </CardBody>
                    </Card>
                    <Card className="m-1 px-1">
                        
                        <CardBody>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className={`m-0 fs-3 fw-bolder ${ParagraphColor[skin]}`}>
                                            Photos
                                        </p>
                                    </div>
                                    <div>
                                        <Link className={`${skin=='light'?'text-primary':'text-white'}`}  to='/profile/photos'>
                                            See All Photos
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="d-flex bg-gray flex-wrap">
                                {
                                    photosData['all'].length?
                                    photosData['all'].slice(0,10).map(photo=>{
                                        return(
                                            <div 
                                            className="border border-2 rounded m-1 cursor-pointer" 
                                            style={{height:'110px',width:'25%'}} 
                                            onClick={()=>{
                                                setMedia([photo])
                                                setViewMedia(true)  
                                            }}>
                                                <img src={`${baseURL}/${photo.media_url}`} width='100%' height='100%'/>
                                                
                                            </div>
                                        )
                                    }):''
                                }
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="m-1 px-1">
                        
                        <CardBody>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className={`m-0 fs-3 fw-bolder ${ParagraphColor[skin]}`}>
                                            Friends
                                        </p>
                                    </div>
                                    <div>
                                        <Link className={`${skin=='light'?'text-primary':'text-white'}`}  to='/profile/friends'>
                                            See All Friends
                                        </Link>
                                    </div>
                                </div>
                                <span>{all_friends.data.length} friends</span>
                            </div>
                            
                            <div className="d-flex bg-gray flex-wrap">
                                {
                                    all_friends.data?.length?
                                    all_friends?.data?.slice(0,10).map(friend=>{
                                        return(
                                            <div className="border border-2 rounded m-1" style={{height:'110px',width:'25%'}} >
                                                <img src={`${baseURL}/${friend.profile_image_url}`} width='100%' height='100%'/>
                                                <p className="fw-bolder">{friend.full_name}</p>

                                            </div>
                                        )
                                    }):''
                                }
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md='7' className="p-0">
                    <div className="mt-1">
                        <Card className="mb-1">
                            <AddPost
                            store={store}
                            profileData={data.profileData}/>
                        </Card>
                    </div>
                    <div>
                        {/* <TableServerSide/> */}
                        <ProfilePosts
                        data={store.posts.data}
                        />
                        {
                            store?.posts?.loading?
                            <ButtonLoader/>:
                            ''
                        }
                    </div>
                </Col>
            </Row>
            <ViewMedia
            view={viewMedia}
            setView={setViewMedia}
            media={media}
            mediaOnly={false}/>
        </div>
    )
}
export default PostSection