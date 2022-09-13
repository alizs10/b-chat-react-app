import axios from "axios";
import request from "../utils/request";
axios.defaults.withCredentials = true;

export const checkAuthentication = async () => {
    return await request.get('/api/user')
}

export const login = async (credentials) => {
    return await request.get('/sanctum/csrf-cookie').then(response => {
        return request.post('/api/auth/login', credentials)
    });
}


export const logout = async () => {
    return await request.get('/api/auth/logout')
}


export const checkUsername = async value => {
    return await request.get('/sanctum/csrf-cookie').then(response => {
        return request.post('/api/auth/check-username', value)
    });
}

export const register = async data => {
    return await request.get('/sanctum/csrf-cookie').then(response => {
        return request.post('/api/auth/register', data)
    });
}

export const verifyEmail = async data => {
    return await request.get('/sanctum/csrf-cookie').then(response => {
        return request.post('/api/auth/verify', data)
    });
}

export const forgotPassword = async data => {
    return await request.get('/sanctum/csrf-cookie').then(response => {
        return request.post('/api/auth/forgot-password', data)
    });
}

export const resetPassword = async data => {
    return await request.get('/sanctum/csrf-cookie').then(response => {
        return request.post('/api/auth/reset-password', data)
    });
}