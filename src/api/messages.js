import request from "../utils/request";

export const getMessages = async ({ queryKey }) => {
    let id = queryKey[1];
    return await request.get(`/api/conversation/${id}/messages`)
}

export const sendMessage = async data => {
    return request.get('sanctum/csrf-cookie').then(() => {
            return request.post(`/api/message/store`, data)
    })
}