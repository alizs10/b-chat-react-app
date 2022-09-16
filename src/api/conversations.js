import request from "../utils/request";

export const checkUsername = async (data) => {

    return request.get('sanctum/csrf-cookie').then(() => {
        return request.post('/api/conversation/new/check-username', data)
    })
}

// export const sendMessage = async data => {

//     return request.get('sanctum/csrf-cookie').then(() => {
//             return request.post(`/api/message/store`, data)
//     })
// }