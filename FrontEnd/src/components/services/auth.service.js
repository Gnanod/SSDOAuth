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


