import React from 'react'

function ReplayTo() {
    return (
        <div className='border-y-2 border-gray-200 sticky bottom-0 z-20 grid grid-cols-12 bg-white p-3 text-xs text-gray-800'>
            <div className='flex flex-col gap-y-2 col-span-11'>
                <span className='text-xs text-gray-600'>Replay To: Matt Leblanc</span>
                <span className='text-sm  text-gray-800'>hello who are you?</span>
            </div>
            <span className='flex justify-end col-span-1 items-center h-fit'>
                <span className='cursor-pointer py-1 px-2 text-sm hover:bg-gray-100 rounded-corners transition-all duration-300 text-gray-800'>
                    <i className='fa-regular fa-xmark'></i>
                </span>
            </span>
        </div>
    )
}

export default ReplayTo