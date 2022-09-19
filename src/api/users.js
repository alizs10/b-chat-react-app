import axios from "axios";
import request from "../utils/request";

export const getUserProfile = async (id) => {
    return await request.get(`/api/user/${id}/profile`);
}

export const getUserSettings = async () => {
    return await request.get('/api/user/settings');
}

export const updateUserSettings = async (settings) => {
    return await request.post('/api/user/settings', settings);
}