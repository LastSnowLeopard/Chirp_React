import toast from "react-hot-toast"
import NewsFeedService from "../../../utility/api/Services.js/NewsFeedService"
import { SET_FONTS_DATA, SET_FRIEND_REQUESTS_DATA, SET_STORIES_DATA, SET_STORIES_LOADING, Set_News_Feed_Post } from "../../Reducers/NewsFeed"
import { store } from "../../store"
import { Button } from "reactstrap"
import { RequestsStatus, RequestsStatusButtonIcon, groupByKey } from "../../../utility/snippets/snippets"
import { setNotificationData } from "../../authentication"

export const getPosts=async(page)=>{

    const userData = JSON.parse(localStorage.getItem('userData'))

    const storeData = store.getState().NewsFeedReducer

    try{
        if(storeData.posts.totalPages<page)
        return

        store.dispatch({type:Set_News_Feed_Post,payload:{...store.posts,loading:true}})

        const payload={
            userId:userData.user_id,
            page:page,
            pageSize:'10',
            "requesterId":userData.user_id
        }

        const response = await NewsFeedService.getPostForNewsFeed(payload)

        if(response){

            const posts={
                data:[...storeData.posts.data,...response.data.posts],
                totalPages:response.data.total_page,
                taggedUser:response.data.tagged_user,
                page:page,
                loading:false
            }
            
            store.dispatch({type:Set_News_Feed_Post,payload:posts})

        }
    }catch(err){
        console.log(' get new feed Posts Err : ',err)

        return toast.error('Something Went Wrong !!')
    }
}



export const getRequestsList=async(userId)=>{

    try{

        const response = await NewsFeedService.getFriendsRequests({userId}) 

        if(response){
            
            const result = response?.data
            store.dispatch({type:SET_FRIEND_REQUESTS_DATA,payload:result})

        }
    
    }catch(err){

        console.log(' get request err : ',err)
        return toast.error('Something Went wrong !!')

    }
}


export const searchValues=async(searchValue)=>{

    const payload={
        
        "userId":"34",
        "search":searchValue
        
    }

    try{

        const response = await NewsFeedService.getSearchValues(payload) 

        if(response){
            console.log(' & RESPONSE : ',response)
            return response.data
        }
    
    }catch(err){

        console.log(' get Search value err : ',err)
        return toast.error('Something Went wrong !!')

    }
}

export const sendRequestAPI = async(friendId)=>{

    try{
        const userData= JSON.parse(localStorage.getItem('userData'))

        const payload={
            userId: userData.user_id,
            friendId:friendId
        }
        
        let response = await NewsFeedService.postSendRequest(payload)

        if(response){

            return toast.success('Request sent successfully !!')

        }
    }catch(err){
        console.log('err : ',err)
        return toast.error('Failed to send request !!')
    }
}

export const acceptRequestAPI = async(friendId)=>{

    try{
        const userData= JSON.parse(localStorage.getItem('userData'))

        const payload={
            userId: userData.user_id,
            friendId:friendId
        }
        let response = await NewsFeedService.postAcceptFriendRequest(payload)

        if(response){

            return toast.success('Request Accepted !!')

        }

    }catch(err){
        console.log('err : ',err)
        return toast.error('Failed to send request !!')
    }
}

const searchFriendButtonClickHandler=async(people)=>{

    let response 

    if(RequestsStatus[people.friend_status]=='Send Request'){
        
        sendRequestAPI(people.peopleid)

    }else{

        acceptRequestAPI(people.peopleid)
    }

}

export const RenderSearchFriendButton=(people)=>{

    return(
        <div>
            {
                <Button.Ripple
                outline
                className='rounded-pill'
                color='primary'
                size='sm'
                onClick={()=>searchFriendButtonClickHandler(people)}
                >
                    <span className="me-25">
                        {RequestsStatusButtonIcon[people.friend_status]}
                    </span>
                    {/* {
                        RequestsStatus[status]
                    } */}
                </Button.Ripple>
            }
        </div>
    )

}

export const getStoriesData = async()=>{

    try{
        
        store.dispatch({type:SET_STORIES_LOADING,payload:true})

        const userData= JSON.parse(localStorage.getItem('userData'))

        const result = await NewsFeedService.getAllStories({user_id:userData.user_id})
    
        if(result){
    
            const res = result?.data?.data?.result
            const parsedData = groupByKey(res,'user_id')

            store.dispatch({type:SET_STORIES_DATA,payload:parsedData})
            
            store.dispatch({type:SET_STORIES_LOADING,payload:false})
        }

    }catch(err){

        store.dispatch({type:SET_STORIES_LOADING,payload:false})
        console.log(' STORY ERR : ',err)
        return toast.error('Failed to get Story Data !!')

    }

}

export const getNotificationsData=async()=>{

    try{
        
        const userData = JSON.parse(localStorage.getItem('userData'))
        
        const payload={
            userId: userData.user_id
        }

        const response = await NewsFeedService.getNotifications(payload)

        if(response){
            
            store.dispatch(setNotificationData(response.data))
            setTimeout(()=>getNotificationsData(),30000)
        }

    }catch(err){
        console.log(' Notificaiton err ; ',err)
        setTimeout(()=>getNotificationsData(),30000)
        return toast.error('Failed to Get Notifications Data !!')
    }
}


export const GetFontListsForText=async()=>{

    try{

        const storeData = store.getState().NewsFeedReducer
        const fontList = storeData.fontsList

        if(fontList.length)
        return

        const response = await NewsFeedService.getFontsList()

        if(response){

            const data= response.data.data
            console.log(' * RESPONS E : ',data)
            const options = data.map(x=>({...x,value:x.font_id,label:x.font_name}))
            store.dispatch({type:SET_FONTS_DATA,payload:options})

        }

    }catch(err){

        console.log('font err : ',err)
        return toast.error('Failed to get font data !!')

    }

}


export const deleteStoryHandler=async ({...props})=>{

    const {story_id,setView} = props

    const newsFeedStore = store.getState().NewsFeedReducer
    let storiesData = newsFeedStore.stories
    const userData = JSON.parse(localStorage.getItem('userData'))
    const userStories = storiesData[userData.user_id] ?? []

    const payload={
        
        userId:userData.user_id,
        storyId:story_id

    }
    try{

        const response = await NewsFeedService.postDeleteStory(payload)
        
        if(response){

            console.log(' # RESPONSE : ',response)
            setView(false)

            let arr=[...userStories]
            const index = arr.findIndex(x=>x.id==story_id)

            if(index!=-1){

                arr.splice(index,1)

                storiesData[userData.user_id] = arr
                
                store.dispatch({type:SET_STORIES_DATA,payload:storiesData})
                
                return toast.success('Story deleted !! ')

            }
            
        }

    }catch(err){

        console.log('erro: ',err)
        return toast.error(' Failed to delete story !! ')
    }
}