import React from 'react'

function NewConversationWindow({ handleClose }) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      className='z-50  w-4/5 md:w-3/5 pb-5 p-3 rounded-corners flex-col gap-y-4 bg-white shadow-lg'>
      <div className='flex justify-between items-center border-b border-gray-200 pb-1'>
        <span className="text-sm text-gray-800">Start A New Conversation</span>
        <span onClick={() => handleClose(false)} className='cursor-pointer flex-center w-8 h-8 text-xs rounded-full hover:bg-gray-200 transition-all duration-300'>
          <i className="fa-regular fa-xmark"></i>
        </span>
      </div>

      <div className="mt-4 w-full grid grid-cols-9 gap-y-2 gap-x-4">
        <div className="col-span-9 text-sm text-gray-600">
          Insert Username:
        </div>
        <div className="text-gray-600 col-span-7 flex gap-x-2 items-center">
          <span>@</span>
          <input type="text" className='w-full border border-gray-200 p-2 focus:outline-none input-focus bg-transparent rounded-corners text-gray-600'
            name="username"
          />
        </div>
        <div className='col-span-2'>
          <button className='btn-hover w-full h-full p-2 bg-[#4361EE] text-white text-sm rounded-corners'>
            Start Conversation
          </button>
        </div>
      </div>
    </div >
  )
}

export default NewConversationWindow