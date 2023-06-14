import { httpSignin, httpSignup } from "./authConstants"
import {axios,Headers} from "../../../@core/auth/jwt/jwtService"

// POST
const postManageHOF = (manageApi, data,id) => {
    let URL = "http://13.50.151.52"
    // let URL = localStorage.getItem('baseURL')
    if(id){ return axios.post(`${URL}${manageApi}?id=${id}`, data,Headers)}
    
    return axios.post(`${URL}${manageApi}`, data,Headers)
}

// GET
// Get Manage HOF
const getManageHOF = (manageApi) => {
    let URL = "http://13.50.151.52"
    // let URL = localStorage.getItem('baseURL')
    return axios.get(`${URL}${manageApi}`,Headers) 
}

const postSignin = (data, id) => postManageHOF(httpSignin, data, id)
const postSignup = (data, id) => postManageHOF(httpSignup, data, id)




export default {
    postSignin, postSignup
}