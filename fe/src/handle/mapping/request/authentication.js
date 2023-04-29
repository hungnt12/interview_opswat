const AuthenticationRequest = {
    exportLogin: (data) => {
        return {
            token: data?.result?.token || "",
            errors: data?.errors || []
        }
    }
}

export const FIELDS_NAME = {
    title: "title",
    body: "body"
}

export const FIELDS_VALIDATION = {
    title: "Title is required",
    body: "Body is required"
}

export default AuthenticationRequest
