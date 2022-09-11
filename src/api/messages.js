export const sendMessage = async data => {

    let url = process.env.REACT_APP_API_URL + '/api/message/store';
    let csrfUrl = process.env.REACT_APP_API_URL + '/sanctum/csrf-cookie';


    return await axios.get(csrfUrl).then(response => {
        return axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
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