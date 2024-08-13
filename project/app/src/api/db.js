import axios from './axios_configuration/axios'

export const updateUserRequest = (obj, jwtToken) => {
    let URI = '/db/updateUser'
    return axios.post(URI, {
        username: obj.username
    }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
    })
}


