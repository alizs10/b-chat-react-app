import axios from "axios";

export const initialData = async () => {

    let url = process.env.REACT_APP_API_URL + '/api/initial';

    return await axios.get(url, null).then(res => {
        return res.data
    }).catch(err => {
        console.log(err);
    });


}