import React from 'react'
import { useSelector } from 'react-redux'

function EditProfileInformation({ onCancel, onConfirm }) {

    const { user } = useSelector(state => state.user)

    return (


        <div className="w-4/5 md:w-3/5 mt-4 self-center flex flex-col gap-y-4">

            <span className="relative w-full flex flex-col gap-y-2 text-xs">
                <span className="absolute -top-2 left-3 bg-white px-2 flex gap-x-2 items-center">
                    <span className="text-gray-600 text-[13px]">Name</span>
                </span>
                <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none bg-transparent rounded-corners text-gray-600'
                    value={user?.name}
                    name="name"
                />
            </span>


            <span className="relative w-full flex flex-col gap-y-2 text-xs">
                <span className="absolute -top-2 left-3 bg-white px-2 flex gap-x-2 items-center">
                    <span className="text-gray-600 text-[13px]">Username</span>
                </span>
                <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none bg-transparent rounded-corners text-gray-600'
                    value={user?.username}
                    name="username"
                />
            </span>


            <span className="relative w-full flex flex-col gap-y-2 text-xs">
                <span className="absolute -top-2 left-3 bg-white px-2 flex gap-x-2 items-center">
                    <span className="text-gray-600 text-[13px]">Email</span>
                </span>
                <input type="email" className='w-full border border-gray-200 p-3 focus:outline-none bg-transparent rounded-corners text-gray-600'
                    value={user?.email}
                    name="email"
                />
            </span>


            <div className="mt-2 flex gap-x-2 w-full justify-end">
                <button
                    onClick={onCancel}
                    className="col-span-5 px-3 py-2 flex-center gap-x-2 items-center rounded-corners text-xs border-2 border-gray-200 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                    <i className='fa-regular fa-xmark text-xs'></i>
                    <span>cancel</span>
                </button>
                <button
                    onClick={onConfirm}
                    className="col-span-5 px-3 py-2 flex-center gap-x-2 items-center border-2 border-emerald-400 rounded-corners text-xs text-emerald-500 hover:bg-emerald-50 transition-all duration-300">
                    <i className='fa-regular fa-check text-xs'></i>
                    <span>update profile information</span>
                </button>
            </div>

        </div>

    )
}

export default EditProfileInformation