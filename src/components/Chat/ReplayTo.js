import React from 'react'

function ReplayTo() {
    return (
        <div className='sticky bottom-0 z-20 grid grid-cols-12 bg-white p-3 text-xs text-gray-800'>
            <div className='flex flex-col gap-y-2 col-span-11'>
                <span>Replay To: Matt Leblanc</span>
                <span>hello who are you?</span>
            </div>
            <span className='flex justify-end col-span-1 items-center h-fit'>
                <span className='cursor-pointer py-1 px-2 text-sm text-gray-800'>
                    <i className='fa-regular fa-xmark'></i>
                </span>
            </span>
        </div>
    )
}

export default ReplayTo