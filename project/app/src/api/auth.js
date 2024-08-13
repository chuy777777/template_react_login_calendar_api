import axios from './axios_configuration/axios'

export const signInRequest = (obj) => {
    // let URI = '/auth/signIn'
    // return axios.post(URI, {
    //     username: obj.username,
    //     password: obj.password
    // })
    return new Promise((resolve, reject) => {
        if (obj.username == "user" && obj.password == "user") {
            resolve({
                data: {
                    error: "",
                    message: "Todo salio bien con 'signInRequest'",
                    user: {
                        username: "user"
                    },
                    jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
                request: {}
            })
        } else {
            reject({
                response: {
                    status: 401,
                    data: {
                        error: "Error",
                        message: "Credenciales incorrectas"
                    }
                }
            })
        }
    })
}

export const verifyJwtTokenRequest = (jwtToken) => {
    // let URI = '/auth/verifyJwtToken'
    // return axios.post(URI, {}, {
    //     headers: { Authorization: `Bearer ${jwtToken}` }
    // })
    return new Promise((resolve, reject) => {
        resolve({
            data: {
                error: "",
                message: "Todo salio bien 'verifyJwtTokenRequest'",
                user: {
                    username: "user"
                },
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            request: {}
        })
    })
}