import axios from "axios";
import {URL_API} from "../../constant/common";
import {handleError} from "../../constant/functions";
import {UserResponse} from "../mapping/response/users";

export const ActionUsersList = async (request, navigate, callback) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'get',
            url: URL_API.USERS_LIST,
            data: request
        }))
        return dataParser(result)
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}


function dataParser(data = {}) {
    return {
        ...data,
        result: (data.result || []).map(item => UserResponse.exportList(item)),
        total_page: Math.ceil(parseInt(data.total) / parseInt(data.page_size))
    }
}
