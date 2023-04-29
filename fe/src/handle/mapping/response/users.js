export default class UsersResponse {
    constructor(data = {}) {
        this.setData(data)
    }

    setData(data = {}) {
        this.name = data?.name || "";
        this.code = data?.code || "";
        this.size = data?.size || "";
        this.density = data?.density || "";
        this.population = data?.population || "";
    }

    exportList() {
        return {
            name: this.name,
            code: this.code,
            size: this.size,
            density: this.density,
            population: this.population,
        }
    }
}
// export const columns = ["name", "code", "population", "size", "density"]
export const UserResponse = {
    exportList: (data) => {
        return {
            email: data?.email || "",
            username: data?.username || "",
            fullname: data?.fullname || "",
            errors: data?.errors || []
        }
    }
}

// export default UsersResponse
export const columns = ["email", "username", "fullname"]
