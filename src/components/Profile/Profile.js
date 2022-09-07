import React from 'react'

function Profile({ handleClose }) {
  return (
    <div
    onClick={e => e.stopPropagation()} 
    className="w-full md:w-3/5 bg-white shadow-md rounded-corners p-3">
      <div className='flex justify-between items-center border-b border-gray-200 pb-1'>
        <span className="flex gap-x-2 items-center">
          <i className="fa-regular fa-circle-user text-base"></i>
          <span className="text-sm text-gray-800">Profile</span>
        </span>
        <span onClick={() => handleClose(false)} className='cursor-pointer flex-center w-8 h-8 text-xs rounded-full hover:bg-gray-200 transition-all duration-300'>
          <i className="fa-regular fa-xmark"></i>
        </span>
      </div>


      <div className='w-full py-2 flex flex-col gap-y-4'>

        <span className="self-center relative w-24">
          <img className='rounded-corners w-24' src='./assets/images/user-profile-1.webp' />
          <div className="absolute -right-4 -bottom-2 flex flex-col gap-y-2">
            <span className="hover:bg-yellow-50 hover:text-yellow-600 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center text-xs w-7 h-7 rounded-corners">
              <i className="fa-regular fa-pen"></i>
            </span>
            <span className="hover:bg-red-50 hover:text-red-500 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center text-xs w-7 h-7 rounded-corners">
              <i className="fa-regular fa-trash"></i>
            </span>
          </div>
        </span>

        <span className="relative border py-3 px-4 border-gray-200 rounded-corners self-center">
          <span className="text-xs bg-white px-2 absolute -top-2 left-4 text-gray-600">
            bio
          </span>
          <span className="text-xs text-gray-800">
            Comedian, Actress & father of two beautiful children
          </span>
          <span className="absolute -right-2 -bottom-2 text-xs hover:bg-yellow-50 hover:text-yellow-600 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center w-7 h-7 rounded-corners">
            <i className="fa-regular fa-pen"></i>
          </span>
        </span>

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

          <div className="mt-8 flex w-full justify-end">
            <button className="col-span-5 px-3 py-2 flex-center gap-x-2 items-center bg-yellow-200 rounded-corners text-xs text-gray-800">
              <i className='fa-regular fa-pen text-xs'></i>
              <span>Edit personal information</span>
            </button>
          </div>

        </div>

        <div className="mb-4 self-center w-4/5 md:w-3/5 flex justify-end">
          <button className="px-3 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300">
            <i className='fa-regular fa-trash text-xs'></i>
            <span>Delete Account</span>
          </button>
        </div>

      </div>

    </div>
  )
}

export default Profile