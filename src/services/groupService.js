

import axios from '../setup/CustomAxios'
const getListGroup = () => {
    return axios.get('/api/v1/group/get-list-group');
}

export { getListGroup }