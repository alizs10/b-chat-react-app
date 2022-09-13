import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../api/auth'
import { deleteUser } from '../../../redux/slices/userSlice'
import { notify } from '../../Helpers/notify'

function UserPopup({ profileToggler, settingsToggler }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { mutate: handleLogout } = useMutation(logout, {
        onSuccess: data => onSuccess(data)
    })

    const onSuccess = (res) => {
        let token = localStorage.getItem('token')

        if (token && res) {
            localStorage.removeItem('token')
            dispatch(deleteUser())
            navigate('/auth')
        } else {
            token && localStorage.removeItem('token')
            dispatch(deleteUser())
            navigate('/auth')
        }
        setTimeout(() => {
            notify("successfully logged out", "info")
        }, 1000)
    }

    return (
        <div className="w-48 overflow-hidden flex flex-col absolute right-0 top-20 z-30 shadow-md bg-white rounded-corners">
            <button
                onClick={() => profileToggler(true)}
                className="text-right hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <i className="fa-regular fa-circle-user"></i>
                <span>Your Profile</span>
            </button>
            <button
                onClick={() => settingsToggler(true)}
                className="hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <i className="fa-regular fa-gear"></i>
                <span>Settings</span>
            </button>
            <button onClick={handleLogout} className="hover:bg-red-50 hover:text-red-500 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
            </button>
        </div>
    )
}

export default UserPopup