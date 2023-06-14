import { SET_PROFILE_DATA } from "../../Action/Profile"

const initialState={

    data:{
        profileData:{}
    },
    hobbiesLoading:false,
    viewHobbiesModal:false,
    viewBioModal:false,
    friends:{
        all_friends:{
            data:[],
            page:1,
            totalPage:1
        },
        friends_by_birthday:{
            data:[],
            page:1,
            totalPage:1
        },
        friends_by_college:{
            data:[],
            page:1,
            totalPage:1
        },
        friends_by_city:{
            data:[],
            page:1,
            totalPage:1
        },
        loading:false
    },
    posts:{
        data:[],
        page:1,
        totalPages:1,
        taggedUser:[],
        loading:false
    },
    photos:{
        all:[],
        tagged:[]
    },
    videos:{
        all:[],
        tagged:[]
    },
    feelings:[],
    aboutSectionData:{},
    postBgImages:[],
    postLoading:false,
    allFriendsForUser:[]
}

const profileReducer= (state=initialState,action)=>{

    switch(action.type){

        case 'SET_PROFILE_DATA':
            return {
                ...state,
                data:{...state.data,...action.payload}
            }
        case 'SET_ALL_FRIENDS':
            return {
                ...state,
                allFriendsForUser:action.payload
            }
        case 'SET_POST_LOADING':
            return{
                ...state,
                postLoading:action.payload
            }
        case 'SET_POST_BG_IMAGES':
            return {
                ...state,
                postBgImages:action.payload
            }
        case 'SET_PHOTOS_DATA':
            return {
                ...state,
                photos:{...state.photos,...action.payload}
            }
        case 'SET_VIDEOS_DATA':
            return {
                ...state,
                videos:{...state.videos,...action.payload}
            }
        case 'SET_ABOUT_SECTION_DATA':
            return {
                ...state,
                aboutSectionData:{...state.aboutSectionData,...action.payload}
            }
        case 'SET_FEELINGS_DATA':
            return {
                ...state,
                feelings:action.payload
            }
        case 'SET_USER_POSTS':
            return {
                ...state,
                posts:{...state.posts,...action.payload}
            }
        case 'SET_HOBBIES_LOADING':
            return{
                ...state,
                hobbiesLoading:action.payload
            }
        case 'SET_VIEW_HOBBIES_MODAL':
            return{
                ...state,
                viewHobbiesModal:action.payload
            }
        case 'SET_VIEW_BIO_MODAL':
            return{
                ...state,
                viewBioModal:action.payload
            }
        case 'SET_FRIENDS_LIST':
            return{
                ...state,
                friends:{...state.friends,...action.payload}
            }
        case 'RESET_PROFILE_STATES':
            return{
                data:{
                    profileData:{}
                },
                hobbiesLoading:false,
                viewHobbiesModal:false,
                viewBioModal:false,
                friends:{
                    all_friends:{
                        data:[],
                        page:1,
                        totalPage:1
                    },
                    friends_by_birthday:{
                        data:[],
                        page:1,
                        totalPage:1
                    },
                    friends_by_college:{
                        data:[],
                        page:1,
                        totalPage:1
                    },
                    friends_by_city:{
                        data:[],
                        page:1,
                        totalPage:1
                    },
                    loading:false
                },
                posts:{
                    data:[],
                    page:1,
                    totalPages:1,
                    taggedUser:[],
                    loading:false
                },
                photos:{
                    all:[],
                    tagged:[]
                },
                feelings:[],
                aboutSectionData:{}
            }
        default:
            return state
    }
}

export default profileReducer