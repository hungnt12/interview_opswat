// export const columns = ["name", "code", "population", "size", "density"]
const UsersResponse = {
    exportList: (data) => {
        return {
            email: data?.email || "",
            username: data?.username || "",
            fullname: data?.fullname || "",
            errors: data?.errors || []
        }
    }
}

export default UsersResponse
export const columns = ["email", "username", "fullname"]
