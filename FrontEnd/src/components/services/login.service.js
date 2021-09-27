import axios from "axios";
import constants from "../../util/constants/Constants";



export const loginUser = (email,password) => {
    return axios.get(constants.backend_url + 'api/admin/getUserType/'+email+ '/' + password)
        .then(res => {
            return res;
        }).catch(function (error) {
            return error;
        })
};
