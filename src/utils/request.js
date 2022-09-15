import axios from 'axios'
import { notify } from '../components/Helpers/notify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {

        if (error.code === "ERR_NETWORK") {
            notify(error.code, "error")
        }

        if (error.response.status == 422) {
            let errData = error.response.data.errors;
            return { status: false, errors: errData }

        } else if (error.response.status == 401) {
            return { status: false, errors: { message: [error.response.data.message] } }
        }

        return error.response.data;
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