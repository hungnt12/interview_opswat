import queryString from "query-string";

const ArticlesRequest = {
    exportCreate: (data) => {
        return {
            title: data?.title || "",
            body: data?.body || "",
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
        if ((params?.page_index || 0) > 1 || (params?.page_size || 10) > 10) {
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

export default ArticlesRequest
