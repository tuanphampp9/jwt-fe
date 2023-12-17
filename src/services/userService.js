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

const getAllUsers = () => {
    return axios.get('http://localhost:8080/api/v1/user/getListUser')
}

const getListUserWithPaginate = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/getListUser?page=${page}&limit=${limit}`)
}

const createNewUser = (infoUser) => {
    return axios.post('http://localhost:8080/api/v1/user/create', infoUser)
}

const updateInfoUser = (infoUpdate, userId) => {
    return axios.put(`http://localhost:8080/api/v1/user/update/${userId}`, infoUpdate)
}

const deleteUser = (userId) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete/${userId}`)
}
export { registerNewUser, loginUser, getAllUsers, getListUserWithPaginate, createNewUser, updateInfoUser, deleteUser }