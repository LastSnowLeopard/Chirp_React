import toast from "react-hot-toast"
import ProfileService from "../../../utility/api/Services.js/ProfileService"
import { baseURL, groupByKey, handleConfirmText, ParagraphColor } from "../../../utility/snippets/snippets"
import {store} from "../../store"
import Profile from '../../../assets/images/profile/user-uploads/user-03.jpg'
import { UncontrolledDropdown,DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreHorizontal , BookOpen, Briefcase, MoreVertical, MapPin, Edit2 } from 'react-feather'
import Avatar from '@components/avatar'
import { useState } from "react"
import AddUpdateWork from "../../../Views/UserProfile/About/AddUpdateWork"
import AddUpdateEducation from "../../../Views/UserProfile/About/AddUpdateEducation"
import AddUpdatePlaces from "../../../Views/UserProfile/About/AddUpdatePlaces"
import { Set_News_Feed_Post, SET_STORIES_DATA } from "../../Reducers/NewsFeed"
import NewsFeedService from "../../../utility/api/Services.js/NewsFeedService"



export const SET_PROFILE_DATA = 'SET_PROFILE_DATA'
export const SET_HOBBIES_LOADING ='SET_HOBBIES_LOADING'
export const SET_VIEW_BIO_MODAL='SET_VIEW_BIO_MODAL'
export const SET_VIEW_HOBBIES_MODAL = 'SET_VIEW_HOBBIES_MODAL'
export const SET_FRIENDS_LIST = 'SET_FRIENDS_LIST'
export const SET_USER_POSTS = 'SET_USER_POSTS'
export const SET_FEELINGS_DATA = 'SET_FEELINGS_DATA'
export const SET_ABOUT_SECTION_DATA = 'SET_ABOUT_SECTION_DATA'
export const SET_PHOTOS_DATA = 'SET_PHOTOS_DATA'
export const SET_VIDEOS_DATA = 'SET_VIDEOS_DATA'
export const SET_POST_BG_IMAGES = 'SET_POST_BG_IMAGES'
export const SET_POST_LOADING = 'SET_POST_LOADING'
export const SET_ALL_FRIENDS = 'SET_ALL_FRIENDS'

const submitMessage={
    true:'Updated',
    false:'Added'
}


export const setViewHobbieModal =(state)=>{

    store.dispatch({type:SET_VIEW_HOBBIES_MODAL,payload:state})
}

export const setViewBioModal =(state)=>{

    store.dispatch({type:SET_VIEW_BIO_MODAL,payload:state})
}

const getProfile= async (payload)=>{

    const response = await ProfileService.getProfileData(payload)
    return response
}


const getHobbiesAll=async()=>{

    const response = await ProfileService.getAllHobbies()
    return response
}

const getUserHobby = async(payload)=>{

    const response = await ProfileService.getUserHobbies(payload)
    return response
}

export const getUserHobbies=async()=>{

    store.dispatch({type:SET_HOBBIES_LOADING,payload:true})

    const storeData = store.getState().profileReducer
    const profileData = storeData.data.profileData
    const userData = JSON.parse(localStorage.getItem('userData'))

    const payload={
        userId:userData.user_id
    }

    const result = await getUserHobby(payload)

    if(result){
        const hobbies = result.data.data.hobbies
        store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data,user_hobbies:hobbies}})
        store.dispatch({type:SET_HOBBIES_LOADING,payload:false})
    }
    
}
export const getAllHobbies=async()=>{

    const storeData = store.getState().profileReducer

    if(storeData.data?.all_hobbies?.length)
    return

    const allHobbiesResponse = await getHobbiesAll()
    
    if(allHobbiesResponse){
        
        const result = allHobbiesResponse.data.data

        store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data,all_hobbies:result.map(x=>({...x,public_hobby_id:x.hobby_id}))}})
    }

} 

export const getProfileData= async()=>{

    const userData = JSON.parse(localStorage.getItem('userData'))

    const payload={
        userId : userData.user_id
    }

    try {
        const response = await getProfile(payload)

        if(response.data){
            let result = response.data.data
            let recentFrnds = result.recent_friends

            if(recentFrnds.length){
                recentFrnds = recentFrnds.map(x=>({...x,img:ProfilePhotoRender(x.profile_image_url),initials:true,content:x.full_name}))

                result.recent_friends = recentFrnds
            }

            const savedData = {...result,...userData}

            store.dispatch({type:SET_PROFILE_DATA,payload:{profileData:savedData}})
        }
    
    } catch (error) {
        console.log('error:',error)        
    }
}

const saveImage=async (imageType,payload)=>{
    let response
    
    if(imageType=='profile_image'){
        response = await ProfileService.createUpdateProfileImage(payload)
    }else{
        response = await ProfileService.createUpdateCoverImage(payload)
    }
    
    return response
}

const imageURLname = {
    'cover_image' :'cover_photo_url',
    'profile_image' :'profile_image_url'
}
export const uploadImage=async(imageType,payload,imageURL)=>{

    const storeData = store.getState().profileReducer

    const response = await saveImage(imageType,payload)

    if(response){
        
        const obj={}
        obj[imageURLname[imageType]]= imageURL

        store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data.profileData,...obj}})
        toast.success(`${imageType.toUpperCase()} updated Successfully !!`)
        return 1
    }else{

        toast.error(`${imageType.toUpperCase()} updated Successfully !!`)
        return 0
    }

}

const deleteProfileImg=async()=>{

    const response = await ProfileService.deleteProfileImage()
    return response

}

export const deleteProfileImage=async(imageType,setDeleteLoading)=>{

    const storeData = store.getState().profileReducer

    const response = await deleteProfileImg()

    if(response){

        const obj={}
        obj[imageURLname[imageType]]= undefined

        store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data.profileData,...obj}})

        toast.success(`${imageType.toUpperCase()} Deleted !!`)
        setDeleteLoading(false)
    }

    return response
}

const getProfileDetailsForEdit=async (payload)=>{

    const result = await ProfileService.getProfileDataForEditProfile(payload)
    return result

}
export const getDetailsForEditProfile=async ()=>{

    const storeData = store.getState().profileReducer

    const userData = JSON.parse(localStorage.getItem('userData'))
    const payload={
        userId:userData.user_id
    }
    
    const response = await getProfileDetailsForEdit(payload)
    
    if(response){

        const result = response.data.data

        // delete result.profile_data
        delete result.user_hobbies

        store.dispatch({type:SET_PROFILE_DATA,payload:{...result,profileData:{...storeData.data.profileData,...result.profile_data}}})
    }
}

const saveBio=async(payload)=>{

    const response = await ProfileService.postUserBio(payload)
    return response
}

export const saveBioHandler=async(bio,setLoading,setView)=>{

    setLoading(true)

    const storeData = store.getState().profileReducer
    let profileData = JSON.parse(JSON.stringify(storeData.data.profileData))
    const userData = JSON.parse(localStorage.getItem('userData'))

    const payload={
        userId:userData.user_id,
        profileId:profileData.profile_id,
        bio:bio,
        overview_text_privacy:profileData.overview_text_privacy
    }

    const result = await saveBio(payload)

    if(result){

        profileData.bio=bio

        store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data,profileData:profileData}})
        toast.success('Bio Updated Successfully !!')
        setLoading(false)
        setView(false)
        
    }

}

const postHobbies=async (payload)=>{

    const response = await ProfileService.postUserHobbies(payload)
    return response
}

export const saveHobbiesHandler=async(userHobbies,previousHobbiesArray,setView,setLoading)=>{

    setLoading(true)

    const storeData = store.getState().profileReducer

    const localData = JSON.parse(localStorage.getItem('userData')) 
    const previousHobbies = groupByKey(previousHobbiesArray,'hobby_id')
    const previousHobbiesKeys = Object.keys(previousHobbies).map(x=>Number(x))
    const userHobbiesKeys = Object.keys(userHobbies)

    const deletedHobbies = previousHobbiesKeys.filter(x=>!userHobbies[Number(x)])

    // .map(x=>x.hobby_id)

    let selectedHobbies = []

    for (const key in userHobbies) {

        if (Object.hasOwnProperty.call(userHobbies, key)) {
            const element = userHobbies[key];
            selectedHobbies.push(...element)
            
        }
    }

    const payload={
        hobbiesData: selectedHobbies.map(x=>({...x,userId:localData.user_id})),
        hobby_deletion_ids:deletedHobbies
    }

    const saveHobbies = await postHobbies(payload)

    if(saveHobbies){

        toast.success('Hobbies Added')
        setLoading(false)
        setView(false)
        store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data,user_hobbies:selectedHobbies}})
    }

}

const getFriendsList=async(payload)=>{

    const response = await ProfileService.getFriends(payload)
    return response

}

const storeFrndsStates={

    'all':'all_friends',
    'birthday':'friends_by_birthday',
    'recent':'friends_by_college',
    'city':'friends_by_city'

}

export const getUserFriends=async(filter,page)=>{

    const userData = JSON.parse(localStorage.getItem('userData'))
    const storeData = store.getState().profileReducer


    if(storeData.friends[storeFrndsStates[filter]].totalPage<page)
    return

    store.dispatch({type:SET_FRIENDS_LIST,payload:{...store.friends,loading:true}})

    const payload={
        "page":page,
        "filter":filter,
        "pageSize":"10",
        "userId" : userData.user_id
    }

    const getFriends = await getFriendsList(payload)

    if(getFriends){

        const result = getFriends.data.data

        let obj={
            ...storeData.friends,
            loading:false
        }

        obj[storeFrndsStates[filter]]={data:result,page:page,totalPage:getFriends.data.total_page}

        
        store.dispatch({type:SET_FRIENDS_LIST,payload:obj})

    }

}

export const FriendsListCard=(friend,skin)=>{

    return(
        <div key={friend.id} className="d-flex align-items-center p-2 w-50">
            <div className="m-1 border rounded" style={{height:'100px',width:'100px',border:'2px solid black'}}>
                <div className="w-100 h-100 border border-2 rounded">
                    <img className="rounded" src={`${baseURL}/${friend.profile_image_url}`} width='100%' height='100%'/>
                </div>
            </div>
            <div className="d-flex align-items-center flex-grow-1">
                <p className={`m-0 fs-4 fw-bolder text-${ParagraphColor[skin]}`}>{friend.full_name}</p>
            </div>
            <div>
                <MoreHorizontal size={22}/>
            </div>
        </div>
    )
}


export const PlacesRenderer=(placesData,skin,keyToRender)=>{

    const [viewForm,setViewForm] = useState(false)
    const [formData,setFormData] = useState(undefined)

    return(
        <div>
                {
                    placesData?.map((place,index)=>{
                        return(
                            place[keyToRender]!=null?
                            <div key={index}>
                                <div className={`d-flex align-items-center justify-content-between`}>
                                    <div className="p-1">
                                        <MapPin size={20}/>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>Lives in <strong>{place[keyToRender]}</strong></p>
                                    </div>
                                    <div>
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag='div' className='btn btn-sm'>
                                                <MoreVertical size={22} color={ParagraphColor[skin]} className='cursor-pointer' />
                                            </DropdownToggle>
                                            <DropdownMenu className="p-0">
                                                <DropdownItem className="w-100" onClick={()=>{setFormData(place);setViewForm(true)}}>
                                                    <Edit2/>Edit
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                                <div className={`${viewForm && formData.place_id==place.place_id?'d-block':'d-none'}`}>
                                    <AddUpdatePlaces
                                    view={viewForm}
                                    setView={setViewForm}
                                    formData={formData}
                                    />
                                </div>
                            </div>:''
                        )
                    })
                }
            </div>
    )
}


export const JobsRenderer=({userJobs,postSectionCall,skin,viewAll})=>{

    const [viewForm,setViewForm] = useState(false)
    const [formData,setFormData] = useState(undefined)
    const [loading,setLoading] = useState(false)


    if(userJobs?.length){

        const dataToMap = !viewAll?[userJobs[userJobs.length-1]]:userJobs
        const jobs = dataToMap

        return(
            <div>
                { 
                jobs.map(job=>{
                        return(
                                <div className={`${postSectionCall?'m-0':'mt-1'}`}>
                                    <div className={`d-flex align-items-center justify-content-between ${postSectionCall?'m-0':'my-1'}`}>
                                        <div className='p-1'>
                                            <Briefcase size={20}/>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                                                Works at <strong>{job.company}</strong>
                                            </p>
                                            <span className={`${postSectionCall?'d-none':'d-inline'}`}>
                                                {job.from} to {job.to}
                                            </span>
                                        </div>
                                        <div className={`${postSectionCall?'d-none':'d-block'}`}>
                                            <UncontrolledDropdown>
                                                <DropdownToggle tag='div' className='btn btn-sm'>
                                                    <MoreVertical size={22} color={ParagraphColor[skin]} className='cursor-pointer' />
                                                </DropdownToggle>
                                                <DropdownMenu className="p-0">
                                                    <DropdownItem className="w-100" onClick={()=>{setFormData(job);setViewForm(true)}}>
                                                        <Edit2/>Edit
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                    <div className={`${viewForm && formData.work_id==job.work_id?'d-block':'d-none'}`}>
                                            <AddUpdateWork
                                            view={viewForm}
                                            setView={setViewForm}
                                            loading={loading}
                                            setLoading={setLoading}
                                            formData={formData}
                                            />
                                        </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    

    return('')
}

export const EducationRenderer=({userEducation,postSectionCall,skin,viewAll})=>{

    const [viewForm,setViewForm] = useState(false)
    const [formData,setFormData] = useState(undefined)
    const [loading,setLoading] = useState(false)

    if(userEducation?.length){


        const dataToMap = !viewAll?[userEducation[userEducation.length-1]]:userEducation
        const jobs = dataToMap
        
        return(
            <div>
                {
                    jobs.map(job=>{
                        return(
                            <div>
                                <div className={`d-flex align-items-center justify-content-between ${postSectionCall?'m-0':'my-1'}`}>
                                    <div className='p-1'>
                                        <BookOpen size={20}/>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                                            Studies at <strong>{job.college}</strong>
                                        </p>
                                        <span className={`${postSectionCall?'d-none':'d-inline'}`}>
                                            {job.from} to {job.to}
                                        </span>
                                    </div>
                                    <div className={`${postSectionCall?'d-none':'d-block'}`}>
                                            <UncontrolledDropdown>
                                                <DropdownToggle tag='div' className='btn btn-sm'>
                                                    <MoreVertical size={22} color={ParagraphColor[skin]} className='cursor-pointer' />
                                                </DropdownToggle>
                                                <DropdownMenu className="p-0">
                                                    <DropdownItem className="w-100" onClick={()=>{setFormData(job);setViewForm(true)}}>
                                                        <Edit2/>Edit
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                    </div>
                                </div>
                                <div className={`${viewForm && formData.education_id==job.education_id?'d-block':'d-none'}`}>
                                    <AddUpdateEducation
                                    view={viewForm}
                                    setView={setViewForm}
                                    loading={loading}
                                    setLoading={setLoading}
                                    formData={formData}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
        // return(
        //     <div className='mt-1'>
        //         {
        //             userEducation?.map(job=>{
        //                 return(
        //                     <div className='my-1 d-flex align-items-center justify-content-between'>
        //                         <div className='p-1'>
        //                             <BookOpen size={20}/>
        //                         </div>
        //                         <div className='flex-grow-1'>
        //                             <p className={`${ParagraphColor[skin]} m-0 fs-5`}>
        //                                 Studies at <strong>{job.college}</strong>
        //                             </p>
        //                             <span>
        //                                 {job.from} to {job.to}
        //                             </span>
        //                         </div>
        //                         <div>
        //                             <UncontrolledDropdown>
        //                                 <DropdownToggle tag='div' className='btn btn-sm'>
        //                                     <MoreVertical size={22} color={ParagraphColor[skin]} className='cursor-pointer' />
        //                                 </DropdownToggle>
        //                             </UncontrolledDropdown>
        //                         </div>
        //                     </div>
        //                 )
        //             })
        //         }
        //     </div>
        // )
    }

    return('')
}

export const uploadPost=async (payload)=>{

    const response = await ProfileService.createPost(payload)
    return response
}

export const newPost= async (payload,setView,setLoading,media)=>{

    const url = window.location.pathname

    const condition = url.includes('Home')
    const storeData = store.getState().profileReducer
    
    const newsFeedStore = store.getState().NewsFeedReducer
    const newsFeedPostReducer = Set_News_Feed_Post
    const newsFeedPosts = storeData.posts.data 
    
    const profilePostsReducer = SET_USER_POSTS
    const profileOostsData = storeData.posts.data
    const postsData = condition ? newsFeedPosts : profileOostsData
    const reducer = condition ? newsFeedPostReducer :profilePostsReducer

    const posts = condition ? newsFeedStore.posts : storeData.posts

    const userData = JSON.parse(localStorage.getItem('userData'))

    setLoading(true)
    const result = await uploadPost(payload)

    if(result){

        let obj={
            post_id:64,
            total_likes:0,
            user_id:payload.get("userid"),
            full_name:userData?.full_name,
            profile_image_url:userData.profile_image_url,
            content:payload.get('content'),
            location:payload.get('location'),
            location_lat_lng:"",
            post_type:"normal",
            tagged_user_ids:payload.get('tagged_user'),
            life_event_id:payload.get('life_event_id'),
            feeling_id:payload.get('feeling_id'),
            event_date:payload.get('event_date'),
            privacy:payload.get('privacy'),
            created_at:"",
            feelings_name:payload.get('feelings_name'),
            feelings_icon_url:null,
            event_name:null,
            event_icon_url:null,
            is_liked:0,
            tagged_user:"",
            media:media.filter(x=>!x.media_type.includes('gif')),
            commets:[],
            gif_image_url:payload.get('gif_image_url'),
            background_type:payload.get('background_id')!=''?'image':null,
            background_image_url:payload.get('background_image_url')
        }

        let arr=[...postsData]
        arr.unshift(obj)
        
        store.dispatch({type:reducer,payload:{...posts,data:arr}})

        
        setLoading(false)
        setView(false)

    }else{
        setLoading(false)
    }
}

const getPostsForUser=async(payload)=>{

    const result = await ProfileService.getUserPosts(payload)
    return result
}

export const getPosts=async(page)=>{

    const userData = JSON.parse(localStorage.getItem('userData'))

    const storeData = store.getState().profileReducer

    if(storeData.posts.totalPages<page)
    return

    store.dispatch({type:SET_USER_POSTS,payload:{...store.posts,loading:true}})

    const payload={
        userId:userData.user_id,
        page:page,
        pageSize:'10'
    }

        const response = await getPostsForUser(payload)

        if(response){

            const posts={
                data:[...storeData.posts.data,...response.data.posts],
                totalPages:response.data.total_page,
                taggedUser:response.data.tagged_user,
                page:page,
                loading:false
            }
            
            store.dispatch({type:SET_USER_POSTS,payload:posts})

        }
}


const likePostAPI=async(payload)=>{

    const result = await ProfileService.postUserLike(payload)
    return result 

}

export const likePost=async (post,storeData)=>{

    // const storeData = store.getState().profileReducer
    const url = window.location.pathname
    const condition = url.includes('Home')

    const posts=storeData.posts
    const postData= posts.data
    
    const reducer = condition ? Set_News_Feed_Post : SET_USER_POSTS

    const index=postData.findIndex(x=>x.post_id==post.post_id)

    const payload={
        user_id:post.user_id,
        post_id:post.post_id
    }

    const response = await likePostAPI(payload)

    if(response){
        
        let liked
        let count = postData[index].total_likes

        if(post.is_liked==0){
            liked=1
            count +=1
        }else{
            liked=0
            if(count!=0){
                count -=1
            }
        }

        if(index!=-1){

            postData[index] = {...postData[index],is_liked:liked,total_likes:count}
        }

        const obj={
            data:[...postData],
            totalPages:posts.total_page,
            taggedUser:posts.tagged_user,
            page:posts.page,
            loading:false
        }

        store.dispatch({type:reducer,payload:obj})
        
    }
}


export const getFeelingsData=async()=>{

    const storeData = store.getState().profileReducer
    const feelings = storeData.feelings

    if(feelings.length)
    return

    const response = await ProfileService.getFeelingsList()

    if(response){
        const result = response.data.data

        store.dispatch({type:SET_FEELINGS_DATA,payload:result})
    }
}


export const addUpdateWork=async(obj,setLoading,setView,isEdit)=>{

    let payload={...obj}
    payload.from = obj.from_date || obj.from
    payload.to = obj.to_date

    const storeData = store.getState().profileReducer
    const userJobs = storeData?.data.user_jobs

    setLoading(true)

    try{
        let response

        if(!isEdit){
            response = await ProfileService.postWork(payload)
        }else{
            response = await ProfileService.updateWork(payload)
        }
        

        if(response){

            
            let arr=[...userJobs]

            if(!isEdit){

                arr.unshift(payload)

            }else{

                const index = arr.findIndex(x=>x.work_id==payload.work_id)

                if(index!=-1){
                    arr[index] = payload
                }
            }
            store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data,user_jobs:[...arr]}})

            toast.success(`Successfully ${submitMessage[isEdit]}`)
            setView(false)
            setLoading(false)
        }
    }catch(err){

        console.log('err:',err)
        toast.error('Something Went wrong !!')
        setLoading(false)
    
    }
}


export const getAboutSectionData=async()=>{

    const userData = JSON.parse(localStorage.getItem('userData'))

    const response = await ProfileService.getAboutSectionData({user_id:userData.user_id})

    if(response){

        store.dispatch({type:SET_ABOUT_SECTION_DATA,payload:response.data.data})
    }
    
}

export const addUpdateEducation=async(obj,setLoading,setView)=>{

    let payload = {...obj}
    payload['from'] = obj.from_date
    payload['to'] = obj.to_date
    payload['college'] = obj.institute_name

    const storeData = store.getState().profileReducer
    const userEducation = storeData?.data.user_education

    setLoading(true)
console.log("& EDUCATION PAYLOAD::",payload)
    try{
        const response = await ProfileService.postEducation(payload)

        if(response){

            let arr=[...userEducation]
            arr.unshift(payload)

            store.dispatch({type:SET_PROFILE_DATA,payload:{...storeData.data,user_education:[...arr]}})

            toast.success('Successfully Added')
            setView(false)
            setLoading(false)
        }
    }catch(err){

        console.log('err:',err)
        toast.error('Something Went wrong !!')
        setLoading(false)
    
    }
}


export const addPlaceLived=async(payload,setLoading,setView,dataAvailable)=>{

    const storeData = store.getState().profileReducer
    const placesData = storeData.aboutSectionData.placesLived

    console.log(' @ PAYLOAD  : ',payload)
    try{
        let response

        if(!dataAvailable){
            
            response = await ProfileService.postPlacesLived(payload)
        
        }else{

            response = await ProfileService.updatePlaces(payload)
        }

        if(response){

            let arr=[...placesData]
            
            if(!dataAvailable){
            
                arr.push(payload)
            
            }else{

                const index = arr.findIndex(x=>x.place_id==payload.place_id)

                if(index!=-1){

                    arr[index] = {...payload}
                }

            }
            
            store.dispatch({type:SET_ABOUT_SECTION_DATA,payload:{...store.aboutSectionData,placesLived:arr}})

            setLoading(false)
            setView(false)
        }

    }catch(err){
        toast.error('Something Went Wrong')
        setLoading(false)
    }
}

export const addRelation=async (payload,setView,setLoading)=>{

    
    const storeData = store.getState().profileReducer
    const relationsData = storeData.aboutSectionData.RelationShip

    try{
        const response = await ProfileService.postRelationships(payload)

        if(response){

            let arr=[...relationsData]
            arr.unshift(payload)
            
            store.dispatch({type:SET_ABOUT_SECTION_DATA,payload:{...store.aboutSectionData,RelationShip:arr}})

            setView(false)
            setLoading(false)

        }
    }catch(err){
        toast.error('Something went wrong !!')
        setLoading(false)
    }
}


export const getEventsList=async(setData)=>{

    const response = await ProfileService.getEventList()

    if(response){
        const result = response.data.data

        const options = result.map(x=>({...x,label:x.event_name,value:x.event_id}))
        setData(options)
        
    }
}



export const addLifeEvents=async(payload,setLoading,setView)=>{

    setLoading(true)
    
    const storeData = store.getState().profileReducer
    const eventsData = storeData.aboutSectionData.EventService


    try{

        const response = await ProfileService.postLifeEvents(payload)

        if(response){
            
            let arr=[...eventsData]
            arr.unshift(payload)
            
            store.dispatch({type:SET_ABOUT_SECTION_DATA,payload:{...store.aboutSectionData,EventService:arr}})

            setLoading(false)
            setView(false)
        }

    }catch(err){

        console.log(err)
        toast.error('Something Went Wrong !!')
        setLoading(false)
    }
}


export const addLanguage=async (payload,setView,setLoading)=>{

    try{
        const response = await ProfileService.postLanguage(payload)

        if(response){

            setView(false)
            setLoading(false)

        }
    }catch(err){
        toast.error('Something went wrong !!')
        setLoading(false)
    }
}



export const getUserPhotos=async(tag)=>{

    const storeData = store.getState().profileReducer
    const photosData = storeData.photos

    let key = tag==1?'all':'tagged'

    const payload={
        "user_id":JSON.parse(localStorage.getItem('userData')).user_id, 
        'type':tag==1? 'photo':'tagged'
    }


    const response = await ProfileService.getPhotosOfUser(payload)

    
    if(response){

        if(Array.isArray(response.data.data)){
            store.dispatch({type:SET_PHOTOS_DATA,payload:{...photosData,[key]:response.data.data}})
        }else{
            store.dispatch({type:SET_PHOTOS_DATA,payload:{...photosData,[key]:[]}})
        }
        
    }

}


export const getUserVides=async(tag)=>{

    const storeData = store.getState().profileReducer
    const videos = storeData.videos

    let key = tag==1?'all':'tagged'

    const payload={
        "user_id":JSON.parse(localStorage.getItem('userData')).user_id, 
        'type':tag==1? 'video':'tagged'
    }


    const response = await ProfileService.getVideosOfUser(payload)

    if(response){

        const result = response.data.data
        if(result?.response){
            store.dispatch({type:SET_VIDEOS_DATA,payload:{...videos,[key]:result.response}})
        }else{
            store.dispatch({type:SET_VIDEOS_DATA,payload:{...videos,[key]:[]}})
        }
    }

}


export const ProfilePhotoRender=(profileImageURL)=>{
    
    if(profileImageURL=='' || profileImageURL==null ){
        return null
    }else if(profileImageURL?.includes('blob')){
      return profileImageURL
    }else{
      return `${localStorage.getItem('baseURL')}/${profileImageURL}`
    }
}

export const UserAvatar=(privacy,imgURL,width,height,style,content,className,imgBorder)=>{

    const userData = JSON.parse(localStorage.getItem('userData'))

    return(
        <Avatar
              className={className ?? 'me-75'}
              img={ privacy==1? (imgURL!='' && imgURL!=null?ProfilePhotoRender(imgURL):null) :null}
              imgHeight={height}
              imgWidth={width}
              initials
              content={content ?? userData?.full_name}
              style={style}
              contentStyles={{position:'relative',display:'inline-block',top:'50%',height:height,width:width}}
              imgContainerBorder={imgBorder}
          />
    )
}

export const filterCommentContent=(content)=>{

    const contentSplit = content.split('[')
    
    const originalContent = contentSplit[0]

    let URL=-1

    if(contentSplit.length>1){
        URL = contentSplit[1].replace(']','')
    }

    return {content:originalContent,URL}
}

export const postUserComment=async (postId,content,commentId,type,setLoading,setDisplay,setContent,setReplyId,setGIF,storeData)=>{

    // const storeData = store.getState().profileReducer
    const url = window.location.pathname
    const reducer = url.includes('Home') ? Set_News_Feed_Post : SET_USER_POSTS

    const posts = storeData.posts.data
    const postIndex = posts.findIndex(x=>x.post_id==postId)
    const userData = JSON.parse(localStorage.getItem('userData'))

    let comment 

    setLoading(true)

    let payload={
        "post_id":postId.toString(),
        "userId":userData.user_id.toString(), 
        "content":content,
        "comment_id":commentId,
        'user_profile_image':userData.profile_image_url,
        'user_id':userData.user_id,
        'user_name':userData.full_name,
        replies:[]
    }

    let response

    if(type!='reply'){

        response = await ProfileService.postComment(payload)
        
        payload.comment_id = response.data.data.comment_id

        posts[postIndex].commets.unshift(payload)

    }else{
        
        const commentIndex = posts[postIndex].commets.findIndex(x=>x.comment_id==commentId)
        
        posts[postIndex].commets[commentIndex]?.replies.unshift(payload)

        response = await ProfileService.postCommentReply(payload)
    }

    if(response){

        setLoading(false)
        setContent('')
        setGIF('')
        setDisplay('flex-row')

        store.dispatch({type:reducer,payload:{...storeData.posts,data:[...posts]}})
        if(setReplyId){
            setReplyId(-1)
        }
    }

}



export const RepliesRenderer=(reply,skin)=>{
    return(
        <div key={reply?.user_name} className='d-flex align-items-start pt-1'>
            {UserAvatar(1,reply.user_profile_image,'34','34',{},reply?.user_name || 'user')}
            <div className='d-flex flex-column flex-grow-1'>
            <div className='profile-user-info p-50'>
                <div className='d-flex align-items-center justify-content-between'>
                <p className={`text-${ParagraphColor[skin]} m-0 fs-5 fw-bold`}>{reply?.user_name}</p>
                </div>
                <p className={`text-${ParagraphColor[skin]} m-0`}>{filterCommentContent(reply?.content)?.content}</p>
                {
                    filterCommentContent(reply?.content)?.URL!=-1?
                    <img src={filterCommentContent(reply?.content).URL} height={100} width={100}/>:''
                }
            </div>
            </div>
        </div>
    )
}

export const ToViewMoreComments=(post,storeData)=>{

    // const storeData = store.getState().profileReducer
    const url = window.location.pathname
    const condition = url.includes('Home')
    const reducer = condition ? Set_News_Feed_Post : SET_USER_POSTS

    const posts = storeData.posts.data
    const postIndex = posts.findIndex(x=>x.post_id==post.post_id)

    if(postIndex!=-1){

        posts[postIndex].commentLimit = posts[postIndex].commets.length

        store.dispatch({type:reducer,payload:{...storeData.posts,data:[...posts]}})
    }

}

export const getPostBackgrounds=async()=>{

    const storeData = store.getState().profileReducer

    try{

        if(storeData?.postBgImages?.length)
        return
        
        const response = await ProfileService.getpostBackgroundImages()

        if(response.data){
            store.dispatch({type:SET_POST_BG_IMAGES,payload:response.data.data})
        }
    }catch(err){
        console.log('err : ',err)
        return toast.error(' Failed to get BG Images !!')
    }
}


export const deleteHandler=(index,mediaArray,setMediaArray,media,setGIF)=>{

    if(media.media_type.includes('gif')){
        setGIF('')
    }

    if(mediaArray.length==1){
        setMediaArray([])
    }else{
        setMediaArray(mediaArray.splice(index,1))
    }
}


export const deletePostHandler=async(postId)=>{

    const userData = JSON.parse(localStorage.getItem('userData'))
    const storeData = store.getState().profileReducer
    const postsData = storeData.posts

    let posts = storeData.posts.data
    const index= posts.findIndex(x=>x.post_id==postId)



    const payload={
        "user_id":userData.user_id,
        "post_id":postId
    }


    const confirm = await handleConfirmText('Confirm')

    if(confirm){

        store.dispatch({type:'SET_POST_LOADING',payload:true})

        const response = await ProfileService.deletePost(payload)

        if(index!=-1){
            posts.splice(index,1)

        }
        const obj={
            data:[posts],
            totalPages:postsData.totalPages,
            taggedUser:postsData.taggedUser,
            page:postsData.page,
            loading:true
        }
        
        store.dispatch({type:SET_USER_POSTS,payload:obj})

        setTimeout(()=>{
            store.dispatch({type:'SET_POST_LOADING',payload:false})
        },500)
    }

}


export const getAllFriendsData=async()=>{

    const userData = JSON.parse(localStorage.getItem('userData'))

    const payload = {
        userId:userData.user_id    
    }

    const response = await ProfileService.getAllFriendsForUser(payload)

    if(response){
        store.dispatch({type:SET_ALL_FRIENDS,payload:response.data})
    }

}


export const postStory= async (payload,setView,setLoading,image)=>{

    const storeData = store.getState().profileReducer
    
    const newsFeedStore = store.getState().NewsFeedReducer
    let storiesData = newsFeedStore.stories
    const userData = JSON.parse(localStorage.getItem('userData'))
    const userStories = storiesData[userData.user_id] ?? []


    setLoading(true)
    const result = await NewsFeedService.postNewStory(payload)

    if(result){

        let obj={
            user_id:userData.user_id,
            privacy_level:payload.get('privacy'),
            media_url:image,
            text_content:payload.get('text_content'),
            music_url:payload.get('music_url'),
            story_type:payload.get('story_type'),
            thumb_nail_url:payload.get('thumb_nail_url'),
            background_id:payload.get('background_id'),
            profile_image_url:userData?.profile_image_url,
            full_name:userData?.full_name
        }

        let arr=[...userStories]
        arr.unshift(obj)
        storiesData[userData.user_id] = arr
        
        store.dispatch({type:SET_STORIES_DATA,payload:storiesData})

        setLoading(false)
        setView(false)
        return toast.success('Story updated successfully !!')

    }else{
        setLoading(false)
    }
}