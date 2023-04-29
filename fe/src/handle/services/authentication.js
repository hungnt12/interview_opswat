import axios from "axios";
import {URL_API} from "../../constant/common";
import {handleError} from "../../constant/functions";
import AuthenticationRequest from "../mapping/request/authentication";

export const ActionLogin = async (request, navigate, callback) => {
    try {
        let result = AuthenticationRequest.exportLogin(handleError(await axios({
            method: 'post',
            url: URL_API.LOGIN,
            data: request
        })))
        if (result?.token) {
            localStorage.setItem("tk", result?.token)
            navigate('/')
        } else {
            callback(result)
        }
    } catch (e) {
        console.log("ERROR ==> ", e)
    }
}
