import axios from "axios";
import constants from "../../util/constants/Constants";

export const uploadFile = (data) => {
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





















