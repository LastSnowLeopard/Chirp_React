import { httpGetFontList, httpGetNewsFeeds, httpGetNotificationsData, httpGetRequestsList, httpGetSearchValues, httpGetStories, httpPostAcceptFriendRequest, httpPostDeleteStory, httpPostNewStory, httpPostSendFriendRequest } from "../constants/NewsFeedConstants";
import { getHOF, postHOF } from "./ProfileService";



const getPostForNewsFeed=(data)=>postHOF(httpGetNewsFeeds,data)
const getFriendsRequests =(data)=>postHOF(httpGetRequestsList,data)
const getSearchValues =(data)=>postHOF(httpGetSearchValues,data)

const postAcceptFriendRequest = (data) =>postHOF(httpPostAcceptFriendRequest,data)
const postSendRequest = (data)=>postHOF(httpPostSendFriendRequest,data)

const postNewStory = (data)=>postHOF(httpPostNewStory,data)
const getAllStories = (data)=>postHOF(httpGetStories,data)

const getNotifications=(data)=>postHOF(httpGetNotificationsData,data)
const getFontsList=()=>getHOF(httpGetFontList)
const postDeleteStory=(data)=>postHOF(httpPostDeleteStory,data)


export default {

    getPostForNewsFeed,
    getFriendsRequests,
    getSearchValues,
    postAcceptFriendRequest,
    postSendRequest,
    postNewStory,
    getAllStories,
    getNotifications,
    getFontsList,
    postDeleteStory
}