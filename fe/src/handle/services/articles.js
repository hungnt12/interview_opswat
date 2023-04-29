import axios from "axios";
import {URL_API} from "../../constant/common";
import {handleError} from "../../constant/functions";
import ArticlesResponse from "../mapping/response/articles";
import ArticlesRequest from "../mapping/request/articles";

export const ActionArticlesList = async (request, navigate, callback) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'get',
            url: `${ArticlesRequest.filterParams(URL_API.ARTICLES_LIST, request)}`,
            // data: request
        }))
        return dataParser(result)
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}
export const ActionArticlesItem = async (request, navigate, callback) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'get',
            url: `${URL_API.ARTICLES_ITEM}/${request?.id}`,
        }))
        return ArticlesResponse.exportItem(result?.result)
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}

export const ActionArticlesCreate = async (request, navigate, callback, enqueueSnackbar) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'post',
            url: URL_API.ARTICLES_CREATE,
            data: request
        }))
        if (result?.result?.message) {
            enqueueSnackbar(result?.result?.message, {variant: "success"});
            navigate('/articles/list')
        } else {
            callback(result)
        }
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}

export const ActionArticlesUpdate = async (request, navigate, callback, enqueueSnackbar) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'put',
            url: `${URL_API.ARTICLES_UPDATE}/${request?.id}`,
            data: ArticlesRequest.exportUpdate(request)
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


export const ActionArticlesDelete = async (request, navigate, callback, enqueueSnackbar) => {
    try {
        let result = handleError(await axios({
            headers: {'Authorization': `Bearer ${localStorage.getItem("tk")}`},
            method: 'delete',
            url: `${URL_API.ARTICLES_DELETE}/${request?.id}`,
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

function dataParser(data = {}) {
    return {
        ...data,
        result: (data.result || []).map(item => ArticlesResponse.exportList(item)),
        total_page: Math.ceil(parseInt(data.total) / parseInt(data.page_size))
    }
}
