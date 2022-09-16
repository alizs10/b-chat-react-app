import { isEmpty } from 'lodash'
import React from 'react'

function ViewProfile({ handleClose, user }) {

    return (
        <div className="relative overflow-hidden w-full h-screen md:h-fit md:w-2/5 shadow-md rounded-corners">
            <div className="absolute top-0 right-0 bottom-0 left-0 -z-10">
                <img className="w-full h-full object-cover object-center" src={isEmpty(user.profile_photo) ? './assets/images/default-avatar.png' : process.env.REACT_APP_API_URL + '/storage/' + user.profile_photo} />

            </div>
            <div
                onClick={e => e.stopPropagation()}
                className="p-3 bg-black/70 h-full">
                <div className='flex justify-between items-center'>
                    <span className="flex gap-x-2 text-gray-200 items-center">
                        <i className="fa-regular fa-circle-user text-base"></i>
                        <span className="text-sm">{isEmpty(user.name) ? user.username : user.name}'s Profile</span>
                    </span>
                    <span onClick={() => handleClose(false)} className='text-gray-200 cursor-pointer flex-center w-8 h-8 text-xs rounded-full hover:bg-gray-800 transition-all duration-300'>
                        <i className="fa-regular fa-xmark"></i>
                    </span>
                </div>


                <div className='w-full py-2 flex flex-col gap-y-4'>

                    <span className="self-center relative w-24 h-24">
                        <img className='rounded-corners w-24 h-24 object-cover object-center' src={isEmpty(user.profile_photo) ? './assets/images/default-avatar.png' : process.env.REACT_APP_API_URL + '/storage/' + user.profile_photo} />
                    </span>

                    {!isEmpty(user.bio) && (
                        <span className="relative border mt-8 py-3 px-4 border-gray-600 rounded-corners self-center">
                            <span className="text-xs px-2 absolute -top-5 left-2 text-gray-200">
                                bio
                            </span>
                            <span className="text-xs text-gray-200">
                                {user.bio}
                            </span>

                        </span>
                    )}

                    <div className="w-4/5 md:w-3/5 my-12 self-center flex flex-col gap-y-2">

                        {!isEmpty(user.name) && (
                            <span className="w-full flex justify-between text-xs">
                                <span className="flex gap-x-2 items-center text-gray-200">
                                    <i className="fa-regular fa-input-text"></i>
                                    <span className="">Name:</span>
                                </span>
                                <span className="text-gray-200">
                                    {user.name}
                                </span>
                            </span>
                        )}
                        {!isEmpty(user.username) && (
                            <span className="w-full flex justify-between text-xs">
                                <span className="flex gap-x-2 items-center text-gray-200">
                                    <i className="fa-regular fa-at"></i>
                                    <span className="">Username:</span>
                                </span>
                                <span className="   text-gray-200">
                                    @{user.username}
                                </span>
                            </span>
                        )}

                    </div>

                    <div className="md:hidden self-center">
                        <button onClick={() => handleClose(false)} className="px-3 py-2 flex-center gap-x-2 items-center border-2 border-gray-400 rounded-corners text-xs text-gray-400">
                            <i className='fa-regular fa-xmark text-xs'></i>
                            <span>Close</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ViewProfile