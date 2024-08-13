import axios from "axios";

const URL_API=import.meta.env.VITE_URL_API

const instance = axios.create({
    baseURL: URL_API,
    withCredentials: true
})

export default instance