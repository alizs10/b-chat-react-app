import { isEmpty } from 'lodash'
import React from 'react'

function ProfileInformation({ onEdit, name, email, username }) {

    return (


        <div className="w-4/5 md:w-3/5 mt-4 self-center flex flex-col gap-y-2">

            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-input-text"></i>
                    <span className="text-gray-600">Name:</span>
                </span>
                <span className="text-gray-800">
                    {isEmpty(name) ? 'your name' : name}
                </span>
            </span>
            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-at"></i>
                    <span className="text-gray-600">Username:</span>
                </span>
                <span className="text-gray-800">
                    @{username}
                </span>
            </span>
            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-envelope"></i>
                    <span className="text-gray-600">Email:</span>

                </span>

                <span className="text-gray-800">
                    {email}
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