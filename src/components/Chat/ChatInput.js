import React from 'react'

function ChatInput() {
  return (
    <div className="row-span-1 flex justify-between gap-x-2 lg:gap-x-4 items-center p-3">
      <textarea type="text" className='p-3 resize-none bg-white shadow-xl h-full w-4/5 rounded-corners focus:outline-none placeholder:text-gray-400 text-gray-800 input-focus transition-all duration-300' placeholder='type here ...' />
      <div className='flex-center flex-col lg:flex-row gap-2 w-1/5'>

        <span className='cursor-pointer py-3 px-5 rounded-corners bg-white flex-center'>
          <i className="fa-regular fa-paper-plane-top text-[#4361ee] text-sm lg:text-lg"></i>
        </span>
        <span className='cursor-pointer py-3 px-5 rounded-corners bg-white flex-center'>
          <i className="fa-regular fa-paperclip text-gray-600 text-sm lg:text-lg"></i>
        </span>
      </div>
      {/* <span className='cursor-pointer py-2 lg:py-3 px-3 lg:px-5 rounded-corners bg-white flex-center'>
        <i className="fa-regular fa-ellipsis-vertical text-gray-600 text-sm lg:text-lg"></i>
      </span> */}

    </div>
  )
}

export default ChatInput