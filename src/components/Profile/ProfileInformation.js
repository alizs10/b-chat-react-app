import { isEmpty } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendVerificationCode } from '../../api/profile'
import { notify } from '../Helpers/notify'

function ProfileInformation({ onEdit }) {

    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleVerifyEmail = async () => {
        try {
            let res = await sendVerificationCode()

            if(res.status)
            {
                navigate('/auth/verify/'+ user.email)
                setTimeout(() => {
                    notify("verification code sent successfully", "success")
                }, 1000)
            }
        } catch (error) {
            
        }
    }

    return (

        <div className="w-4/5 md:w-3/5 mt-4 self-center flex flex-col gap-y-2">

            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-input-text"></i>
                    <span className="text-gray-600">Name:</span>
                </span>
                <span className="text-gray-800">
                    {isEmpty(user?.name) ? 'your name' : user?.name}
                </span>
            </span>
            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-at"></i>
                    <span className="text-gray-600">Username:</span>
                </span>
                <span className="text-gray-800">
                    @{user?.username}
                </span>
            </span>
            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-envelope"></i>
                    <span className="text-gray-600">Email:</span>

                </span>

                <span className='flex items-center gap-x-2'>

                    <span className="text-gray-800">
                        {user?.email}
                    </span>
                    {isEmpty(user.email_verified_at) && (
                        <span 
                        onClick={handleVerifyEmail}
                        className='text-[#1C42EA] cursor-pointer'>verify</span>
                    )}
                </span>
            </span>

            <div
                onClick={() => onEdit(true)}
                className="mt-8 flex w-full justify-end">
                <button className="col-span-5 px-3 py-2 flex-center gap-x-2 items-center border-2 border-yellow-200  rounded-corners text-xs text-yellow-600 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300">
                    <i className='fa-regular fa-pen text-xs'></i>
                    <span>Edit personal information</span>
                </button>
            </div>

        </div>

    )
}

export default ProfileInformation