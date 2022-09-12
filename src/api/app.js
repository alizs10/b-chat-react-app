import request from "../utils/request";

export const initialData = async () => {
    return await request.get('/api/initial')
}