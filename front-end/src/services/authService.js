import { requestConfig, api } from "../utils/config";

//register
const register = async(data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => {return err});

        if(res){
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res;
        
    } catch (error) {
        console.log(error)
    }
}

//logout
const logout = () => {
    localStorage.removeItem("user")
}

//login
const login = async(data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/login", config).then((res) => res.json()).catch((err) => err)

        if (res._id){
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res

    } catch (error) {
        console.log(error)
    }
}

//get user by id
const getUser = async(id) => {
    const url = api + "/users/" + id

    try {
        const user = await fetch(url)
        return user
    } catch (error) {
        console.log(error)
    }
}

const authService = {
    register,
    logout,
    login,
    getUser,
}

export default authService