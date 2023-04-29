import queryString from "query-string";

const UsersRequest = {
    exportCreate: (data) => {
        return {
            email: data?.email || "",
            username: data?.username || "",
            fullname: data?.fullname || "",
            password: data?.password || "",
        }
    },
    exportUpdate: (data) => {
        return {
            id: data?.id || "",
            title: data?.title || "",
            body: data?.body || "",
        }
    },
    exportFavourite: (data) => {
        return {
            id: data?.id || "",
            favourite_count: data?.favourite_count || "",
            errors: data?.errors || []
        }
    },
    filterParams: (url, params) => {
        console.log(999, params)
        if (((params?.page_index || 0) > 1 || (params?.page_size || 10) > 10)) {
            let query = queryString.stringify({
                page_index: params?.page_index || 1,
                page_size: params?.page_size || 10
            })
            return `${url}?${query}`
        } else {
            return url
        }
    }
}

export const FIELDS_NAME = {
    email: "email",
    username: "username",
    fullname: "fullname",
    password: "password",
}

export const FIELDS_VALIDATION = {
    email: "Email is required",
    password: "Password is required"
}

export default UsersRequest
