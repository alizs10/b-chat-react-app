import axios from "axios";
import { convertApiErrors } from "../components/Helpers/helpers";

export const updateProfile = async data => {


    let url = process.env.REACT_APP_API_URL + '/api/profile/update';
    let csrfUrl = process.env.REACT_APP_API_URL + '/sanctum/csrf-cookie';

    console.log(data);
 
    return await axios.get(csrfUrl).then(response => {
        return axios.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form',
                'Accept': 'application/json',
            }
        }).then(response => {

            return { status: true, data: response.data }

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