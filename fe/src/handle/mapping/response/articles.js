import moment from "moment"
const ArticlesResponse = {
    exportList: (data) => {
        return {
            id: data?.id || "",
            title: data?.title || "",
            body: data?.body || "",
            favourite_count: data?.favourite_count || "",
            created_at: moment(data?.created_at).format("DD/MM/YYYY"),
            updated_at: moment(data?.updated_at).format("DD/MM/YYYY"),
            errors: data?.errors || []
        }
    },
    exportItem: (data) => {
        return {
            id: data?.id || "",
            title: data?.title || "",
            body: data?.body || "",
            errors: data?.errors || []
        }
    }
}

export default ArticlesResponse
export const columns = ["id", "title", "body", "favourite_count", "created_at", "updated_at"]
