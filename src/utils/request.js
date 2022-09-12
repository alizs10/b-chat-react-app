import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return error;
    }
)
let token = localStorage.getItem('token');
axios.defaults.headers.common.Authorization = `Bearer ${token}`;
axios.defaults.headers.common.withCredentials = true;

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}