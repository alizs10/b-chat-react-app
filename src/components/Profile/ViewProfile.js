import React from 'react'

function ViewProfile({ handleClose, user }) {



    return (
        <div className="relative overflow-hidden w-full h-screen md:h-fit md:w-2/5 shadow-md rounded-corners">
            <div className="absolute bg-red-300 top-0 right-0 bottom-0 left-0 -z-10">
                <img className="w-full h-full object-cover object-center" src='./assets/images/user-profile-5.webp' />

            </div>
            <div
                onClick={e => e.stopPropagation()}
                className="p-3 bg-black/70 h-full">
                <div className='flex justify-between items-center'>
                    <span className="flex gap-x-2 text-gray-200 items-center">
                        <i className="fa-regular fa-circle-user text-base"></i>
                        <span className="text-sm">{user.fullName}'s Profile</span>
                    </span>
                    <span onClick={() => handleClose(false)} className='text-gray-200 cursor-pointer flex-center w-8 h-8 text-xs rounded-full hover:bg-gray-800 transition-all duration-300'>
                        <i className="fa-regular fa-xmark"></i>
                    </span>
                </div>


                <div className='w-full py-2 flex flex-col gap-y-4'>

                    <span className="self-center relative w-24">
                        <img className='rounded-corners w-24' src='./assets/images/user-profile-5.webp' />

                    </span>

                    <span className="relative border mt-8 py-3 px-4 border-gray-600 rounded-corners self-center">
                        <span className="text-xs px-2 absolute -top-5 left-2 text-gray-200">
                            bio
                        </span>
                        <span className="text-xs text-gray-200">
                            Comedian, Actress & father of two beautiful children
                        </span>

                    </span>

                    <div className="w-4/5 md:w-3/5 my-12 self-center flex flex-col gap-y-2">

                        <span className="w-full flex justify-between text-xs">
                            <span className="flex gap-x-2 items-center text-gray-200">
                                <i className="fa-regular fa-input-text"></i>
                                <span className="">Name:</span>
                            </span>
                            <span className="text-gray-200">
                                {user.fullName}
                            </span>
                        </span>
                        <span className="w-full flex justify-between text-xs">
                            <span className="flex gap-x-2 items-center text-gray-200">
                                <i className="fa-regular fa-at"></i>
                                <span className="">Username:</span>
                            </span>
                            <span className="   text-gray-200">
                                @mehranmodiri
                            </span>
                        </span>


                    </div>

                </div>

            </div>
        </div>
    )
}

export default ViewProfile