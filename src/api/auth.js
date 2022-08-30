import axios from "axios";
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
                return { status: false, errors: {message: [err.response.data.message]} }
            }

            return err.response.data;
        });
    });
}