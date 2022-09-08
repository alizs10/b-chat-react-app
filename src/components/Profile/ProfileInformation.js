import React from 'react'

function ProfileInformation({onEdit}) {
    return (


        <div className="w-4/5 md:w-3/5 mt-4 self-center flex flex-col gap-y-2">

            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-input-text"></i>
                    <span className="text-gray-600">Name:</span>
                </span>
                <span className="text-gray-800">
                    Ali ZohourSoleimani
                </span>
            </span>
            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-at"></i>
                    <span className="text-gray-600">Username:</span>
                </span>
                <span className="text-gray-800">
                    @alizs10
                </span>
            </span>
            <span className="w-full flex justify-between text-xs">
                <span className="flex gap-x-2 items-center">
                    <i className="fa-regular fa-envelope"></i>
                    <span className="text-gray-600">Email:</span>

                </span>

                <span className="text-gray-800">
                    ali.text77@gmail.com
                </span>
            </span>

            <div
            onClick={() => onEdit(true)}
            className="mt-8 flex w-full justify-end">
                <button className="col-span-5 px-3 py-2 flex-center gap-x-2 items-center bg-yellow-200 rounded-corners text-xs text-gray-800">
                    <i className='fa-regular fa-pen text-xs'></i>
                    <span>Edit personal information</span>
                </button>
            </div>

        </div>

    )
}

export default ProfileInformation