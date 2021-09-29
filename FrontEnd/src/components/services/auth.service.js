import axios from "axios";
import constants from "../../util/constants/Constants";

export const getAuthUrl = () => {
    return axios.get(constants.backend_url + 'api/oauth/getAuthURL/')
        .then(res => {
            return res;
        }).catch(function (error) {
            return error;
        })
};

//get Token service function
export const getToken=(code)=>{
    let authCode ={
        "code":code
    }
    return axios.post(constants.backend_url + 'api/oauth/getToken',authCode)
        .then(res => {
            return res;
        }).catch(function (error) {
            return error;
        })
}

//get User Details service Function
export const getUserDetails = () => {
    return axios.request({
        url: constants.backend_url + 'api/oauth/getUserInfo',
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Authorization': localStorage.getItem("token")
        }
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err);
        console.log(err.data);
        throw err.response;
    })
};

export const revokeAccess=() =>{
    return axios.request({
        url:  'https://oauth2.googleapis.com/revoke?token='+localStorage.getItem("accessToken"),
        method: 'POST'
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err);
        console.log(err.data);
        throw err.response;
    })
}