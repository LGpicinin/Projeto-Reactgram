import { requestConfig, api } from "../utils/config";

const createPhoto = async(data, token) => {
    const config = requestConfig("POST", data, token, true)

    try {
        const res = await fetch(api + '/photos/', config).then((res) => res.json()).catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const getUserPhotos = async(id, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + '/photos/user/' + id, config).then((res) => res.json()).catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const deletePhoto = async(id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(api + '/photos/' + id, config).then((res) => res.json()).catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const editPhoto = async(id, data, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + '/photos/' + id, config).then((res) => res.json()).catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const photoService = {
    createPhoto,
    getUserPhotos,
    deletePhoto,
    editPhoto,
}

export default photoService