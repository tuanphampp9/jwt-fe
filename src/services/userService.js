import axios from 'axios'
const registerNewUser = (infoUser) => {
    return axios.post('http://localhost:8080/api/v1/register', infoUser)
}

const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin,
        password
    })
}
export { registerNewUser, loginUser }