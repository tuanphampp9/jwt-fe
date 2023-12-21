import axios from '../setup/CustomAxios'
const registerNewUser = (infoUser) => {
    return axios.post('/api/v1/register', infoUser)
}

const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin,
        password
    })
}

const logoutUser = () => {
    return axios.post('/api/v1/logout')
}

const getAllUsers = () => {
    return axios.get('/api/v1/user/getListUser')
}

const getListUserWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/user/getListUser?page=${page}&limit=${limit}`)
}

const createNewUser = (infoUser) => {
    return axios.post('/api/v1/user/create', infoUser)
}

const updateInfoUser = (infoUpdate, userId) => {
    return axios.put(`/api/v1/user/update/${userId}`, infoUpdate)
}

const deleteUser = (userId) => {
    return axios.delete(`/api/v1/user/delete/${userId}`)
}

const getMe = () => {
    return axios.get('/api/v1/account')
}
export { registerNewUser, loginUser, getAllUsers, getListUserWithPaginate, createNewUser, updateInfoUser, deleteUser, getMe, logoutUser }