import axios from "axios";
import { convertApiErrors } from "../components/Helpers/helpers";
axios.defaults.withCredentials = true;

export const checkAuthentication = async (token) => {
    let url = process.env.REACT_APP_API_URL + '/api/user';

    return await axios.get(url, null, {
        Headers: { 'Authorization': 'Bearer ' + token },
    }).then(res => {
        return res.data;
    }).catch(err => {
        if (err.response.status == 401) {
            return false;
        }
    });
}

export const login = async (credentials) => {
    let url = process.env.REACT_APP_API_URL + '/api/auth/login';

    let csrfUrl = process.env.REACT_APP_API_URL + '/sanctum/csrf-cookie';

    return await axios.get(csrfUrl).then(response => {
        return axios.post(url, credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'withCredentials': true
            }
        }).then(response => {

            return response.data;

        }).catch(err => {

            if (err.response.status == 422) {

                let errData = err.response.data.errors;
                return { status: false, errors: errData }

            } else if (err.response.status == 401) {
                return { status: false, errors: { message: [err.response.data.message] } }
            }

            return err.response.data;
        });
    });
}


export const logout = async (token) => {
    let url = process.env.REACT_APP_API_URL + '/api/auth/logout';

    return await axios.get(url, null, {
        Headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log(err);
    });
}


export const checkUsername = async value => {

    let url = process.env.REACT_APP_API_URL + '/api/auth/check-username';

    let csrfUrl = process.env.REACT_APP_API_URL + '/sanctum/csrf-cookie';

    return await axios.get(csrfUrl).then(response => {
        return axios.post(url, value, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {

            return response.data;

        }).catch(err => {

            if (err.response.status == 422) {

                let errData = err.response.data.errors;
                return { status: false, errors: errData }

            } else if (err.response.status == 401) {
                return { status: false, errors: { message: [err.response.data.message] } }
            }

            return err.response.data;
        });
    });
}  

export const register = async data => {


    let url = process.env.REACT_APP_API_URL + '/api/auth/register';
    let csrfUrl = process.env.REACT_APP_API_URL + '/sanctum/csrf-cookie';

    return await axios.get(csrfUrl).then(response => {
        return axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {

            return response.data;

        }).catch(err => {

            if (err.response.status == 422) {

                let errData = err.response.data.errors;
                return { status: false, errors: convertApiErrors(errData) }

            } else if (err.response.status == 401) {
                return { status: false, errors: { message: err.response.data.message } }
            }

            return err.response.data;
        });
    });


}