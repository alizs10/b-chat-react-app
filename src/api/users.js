import axios from "axios";

export const getUserProfile = async (id) => {

    let url = process.env.REACT_APP_API_URL + `/api/user/${id}/profile`;

    return await axios.get(url, null).then(res => {
        return res.data
    }).catch(err => {
        console.log(err);
    });
}