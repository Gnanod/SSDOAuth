import axios from "axios";
import constants from "../../util/constants/Constants";

export const readGDriveFiles = (data) => {

    return axios.request({
        url: constants.backend_url + 'api/oauth/readDrive',
        method: 'GET',
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
    // return axios.post(constants.backend_url + 'api/oauth/readDrive', data)
    //     .then(res => {
    //         console.log(res);
    //         return res;
    //     }).catch(function (error) {
    //         return error;
    //     })
};

export const getThumbnail = (id) => {
    return axios.request({
        url: constants.backend_url + 'api/oauth/thumbnail/'+id,
        method: 'GET',
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

export const downloadFiles = (id) => {
    return axios.request({
        url: constants.backend_url + 'api/oauth/download/' + id,
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

export const deleteFile = (id) => {
    return axios.request({
        url: constants.backend_url + 'api/oauth/deleteFile/' + id,
        method: 'DELETE',
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
//file upload service
export const uploadFile = (data) => {
    //create axios request
    return axios.request({
        url: constants.backend_url + 'api/oauth/fileUpload',
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/octet-stream',
            'Authorization': localStorage.getItem("token")
        },
        data: data
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err);
        console.log(err.data);
        throw err.response;
    })
};





















