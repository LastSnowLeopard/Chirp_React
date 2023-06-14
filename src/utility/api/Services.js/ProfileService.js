import axios from "axios"
import {httpCreatePost, httpCreateUpdateCoverImage, httpCreateUpdateProfileImage,httpDeletePost,httpDeleteProfileImage,httpGetAboutSectionData,httpGetAllFriendsForUser,httpGetAllHobbies,httpGetEventList,httpGetFeelingsList,httpGetFriendsList,httpGetPhotos,httpGetPostBackgroundImages,httpGetPostsForUser,httpGetProfileData, httpGetProfileDataForEditProfile, httpGetUserHobbies, httpGetVideos, httpPostCity, httpPostCommentReply, httpPostComments, httpPostEducation, httpPostLanguage, httpPostLifeEvents, httpPostLike, httpPostRelationships, httpPostUpdateEvent, httpPostUpdateLanguage, httpPostUpdatePlaces, httpPostUpdatePost, httpPostUpdateWork, httpPostUserBio, httpPostUserHobbies, httpPostWork, httpPostWorkEducation} from '../constants/ProfileConstants'

// POST
export const postHOF = (api, data,id) => {
    // let URL = "http://13.50.151.52"
    let URL = localStorage.getItem('baseURL')
    if(id){ return axios.post(`${URL}${api}`, data)}
    
    return axios.post(`${URL}${api}`, data)
}

// GET

export const getHOF = (api) => {
    // let URL = "http://13.50.151.52"
    let URL = localStorage.getItem('baseURL')
    return axios.get(`${URL}${api}`) 
}

const deleteHOF = (api) => {
    // let URL = "http://13.50.151.52"
    let URL = localStorage.getItem('baseURL')
    return axios.delete(`${URL}${api}`) 
}


const getProfileData=(data)=>postHOF(httpGetProfileData,data)
const createUpdateProfileImage=(data)=>postHOF(httpCreateUpdateProfileImage,data)
const deleteProfileImage=(data)=>deleteHOF(httpDeleteProfileImage,data)
const createUpdateCoverImage=(data)=>postHOF(httpCreateUpdateCoverImage,data)

const getProfileDataForEditProfile=(data)=>postHOF(httpGetProfileDataForEditProfile,data)
const getAllHobbies=(data)=>getHOF(httpGetAllHobbies)
const getUserHobbies=(data)=>postHOF(httpGetUserHobbies,data)
const postUserBio=(data)=>postHOF(httpPostUserBio,data)
const postUserHobbies=(data)=>postHOF(httpPostUserHobbies,data)

const getFriends=(data)=>postHOF(httpGetFriendsList,data)

const createPost=(data)=>postHOF(httpCreatePost,data)

const getUserPosts=(data)=>postHOF(httpGetPostsForUser,data)
const postUserLike=(data)=>postHOF(httpPostLike,data)
const getFeelingsList = (data) =>getHOF(httpGetFeelingsList)

const postEducation=(data)=>postHOF(httpPostEducation,data)
const postWork =(data)=>postHOF(httpPostWork,data)
const postPlacesLived = (data)=> postHOF(httpPostCity,data)
const postRelationships = (data)=>postHOF(httpPostRelationships,data)
const postLifeEvents= (data)=>postHOF(httpPostLifeEvents,data)
const getEventList=(data)=>getHOF(httpGetEventList)
const postLanguage = (data) =>postHOF(httpPostLanguage,data)


const getPhotosOfUser=(data)=>postHOF(httpGetPhotos,data)
const getVideosOfUser=(data)=>postHOF(httpGetVideos,data)

const getAboutSectionData=(data)=>postHOF(httpGetAboutSectionData,data)

const postComment=(data)=>postHOF(httpPostComments,data)
const postCommentReply=(data)=>postHOF(httpPostCommentReply,data)
const getpostBackgroundImages = (data) =>getHOF(httpGetPostBackgroundImages)
const deletePost = (data)=>postHOF(httpDeletePost,data)
const getAllFriendsForUser=(data)=>postHOF(httpGetAllFriendsForUser,data)



// update-profile  

const updatePost = (data)=>postHOF(httpPostUpdatePost,data)
const updateWork = (data)=>postHOF(httpPostUpdateWork,data) // DONE
const updatePlaces = (data)=>postHOF(httpPostUpdatePlaces,data) // DONE
const updateLanguage = (data)=>postHOF(httpPostUpdateLanguage,data)
const updateEvent = (data)=>postHOF(httpPostUpdateEvent,data)




export default {
    getProfileData,
    createUpdateProfileImage,
    createUpdateCoverImage,
    deleteProfileImage,
    getProfileDataForEditProfile,
    getAllHobbies,
    getUserHobbies,
    postUserBio,
    postUserHobbies,
    getFriends,
    createPost,
    getUserPosts,
    postUserLike,
    getFeelingsList,
    postEducation,
    postWork,
    getAboutSectionData,
    postPlacesLived,
    postRelationships,
    postLifeEvents,
    getEventList,
    postLanguage,
    getPhotosOfUser,
    getVideosOfUser,
    postComment,
    postCommentReply,
    getpostBackgroundImages,
    deletePost,
    getAllFriendsForUser,
    updatePost,
    updateWork,
    updatePlaces,
    updateLanguage,
    updateEvent
}