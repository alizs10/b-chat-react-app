import request from "../utils/request";

export const updateProfile = async (data, setProgress) => {
    return request.get('sanctum/csrf-cookie').then(() => {
        return request.post(`/api/profile/avatar/update`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form'
                },
                onUploadProgress: (ProgressEvent) => {
                    let progress = (ProgressEvent.loaded/ProgressEvent.total)*100;
                    setProgress(progress)
                }
            })
    })
}

export const deleteAvatar = async () => {
    return await request.get(`/api/profile/avatar/destroy`)
}

export const updateBio = async data => {
    return request.get('sanctum/csrf-cookie').then(() => {
        return request.post(`/api/profile/bio/update`, data)
    })
}

export const updateProfileInfo = async data => {
    return request.get('sanctum/csrf-cookie').then(() => {
        return request.post(`/api/profile/info/update`, data)
    })
}

export const deleteAccount = async data => {
    return request.get('sanctum/csrf-cookie').then(() => {
        return request.post(`/api/profile/delete-account`, data)
    })
}

export const sendVerificationCode = async () => {
    return await request.get(`/api/auth/send-verification-code`)
}
