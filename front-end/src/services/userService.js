import { requestConfig, api } from "../utils/config";

const profile = async(data, token) => {
    
    const config = requestConfig("POST", data, token)

    try {
        const res = await fetch(api + "/users/profile", config).then((res) => res.json()).catch((err) => err)
        return res
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async(data, token) => {

    const config = requestConfig("PUT", data, token, true)

    try {
        const res = await fetch(api + "/users/update", config).then((res) => res.json()).catch((err) => err)
        return res
    } catch (error) {
        console.log(error)
    }

}

const getUserById = async(id) => {

    try {
        const res = await fetch(api + "/users/" + id).then((res) => res.json()).catch((err) => err)
        return res
    } catch (error) {
        console.log(error)
    }
}

const userService = {
    profile,
    updateProfile,
    getUserById,
}

export default userService