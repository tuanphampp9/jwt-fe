

import axios from 'axios'
const getListGroup = () => {
    return axios.get('http://localhost:8080/api/v1/group/get-list-group');
}

export { getListGroup }