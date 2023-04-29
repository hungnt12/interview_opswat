import axios from "axios";
import {URL_API} from "../../constant/common";
import {handleError} from "../../constant/functions";
import UsersResponse from "../mapping/response/users";
import UsersRequest from "../mapping/request/users";

export const ActionUsersList = async (request, navigate, callback) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'get',
            url: `${UsersRequest.filterParams(URL_API.USERS_LIST, request)}`,
            // data: request
        }))
        return dataParser(result)
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}

export const ActionUsersDelete = async (request, navigate, callback, enqueueSnackbar) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'delete',
            url: `${URL_API.USERS_DELETE}/${request?.id}`,
        }))
        if (result?.result) {
            enqueueSnackbar(result?.result, {variant: "success"});
            // navigate('/articles/list')
        } else {
            callback(result)
        }
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}

export const ActionUsersCreate = async (request, navigate, callback, callbackSuccess) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'post',
            url: URL_API.USERS_CREATE,
            data: UsersRequest.exportCreate(request)
        }))
        if (result?.result?.message) {
            callbackSuccess(result?.result?.message)
        } else {
            callback(result)
        }
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}

function dataParser(data = {}) {
    return {
        ...data,
        result: (data.result || []).map(item => UsersResponse.exportList(item)),
        total_page: Math.ceil(parseInt(data.total) / parseInt(data.page_size))
    }
}
