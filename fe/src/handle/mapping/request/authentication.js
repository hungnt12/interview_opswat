const AuthenticationRequest = {
    exportLogin: (data) => {
        return {
            token: data?.result?.token || "",
            errors: data?.errors || []
        }
    },
    requestLogin: (data) => {
        return {
            email: data?.email || "",
            password: data?.password || "",
        }
    }
}

export default AuthenticationRequest
