import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../api/auth'
import { deleteUser } from '../../../redux/slices/userSlice'

function UserPopup({profileToggler}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        let token = localStorage.getItem('token')

        if (token) {
            let res = await logout(token)

            if (res) {
                localStorage.removeItem('token')
                dispatch(deleteUser())
                navigate('/auth')
            }
            else {
                console.log(res);
            }
        } else {
            dispatch(deleteUser())
            navigate('/auth')
        }
    }

    return (
        <div className="w-48 overflow-hidden flex flex-col absolute right-0 top-[5.5rem] z-30 shadow-md bg-white rounded-corners">
            <button 
            onClick={() => profileToggler(true)}
            className="text-right hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <i className="fa-regular fa-circle-user"></i>
                <span>Your Profile</span>
            </button>
            <button className="hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <i className="fa-regular fa-gear"></i>
                <span>Settings</span>
            </button>
            <button onClick={handleLogout} className="hover:bg-gray-100 transition-all duration-300 flex-center gap-x-2 py-3 text-xs text-gray-800">
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
            </button>
        </div>
    )
}

export default UserPopup