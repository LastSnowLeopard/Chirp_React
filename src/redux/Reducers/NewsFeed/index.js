import { Action } from "history"

export const Set_News_Feed_Post = 'SET_NEWS_FEED_POST'
export const SET_FRIEND_REQUESTS_DATA = 'SET_FRIEND_REQUESTS_DATA'
export const SET_STORIES_DATA = 'SET_STORIES_DATA'
export const SET_STORIES_LOADING = 'SET_STORIES_LOADING'
export const SET_FONTS_DATA = 'SET_FONTS_DATA'



const initialStates={

    posts:{
        data:[],
        page:1,
        totalPages:1,
        taggedUser:[],
        loading:false
    },
    stories:{},
    storiesLoading:false,
    friendsRequests:[],
    fontsList:[]

}


const NewsFeedReducer=(state=initialStates,action)=>{

    switch(action.type){

        case Set_News_Feed_Post:
            return{
                ...state,
                posts:{...state.posts,...action.payload}
            }
        case SET_FRIEND_REQUESTS_DATA:
            return{
                ...state,
                friendsRequests:action.payload
            }
        case SET_STORIES_DATA:
            return{
                ...state,
                stories:action.payload
            }
        case SET_STORIES_LOADING:
            return{
                ...state,
                storiesLoading:action.payload
            }
        case SET_FONTS_DATA:
            return{
                ...state,
                fontsList:action.payload
            }
        default :
            return state
    }
}

export default NewsFeedReducer