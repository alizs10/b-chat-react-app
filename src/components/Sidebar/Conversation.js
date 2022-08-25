import React from 'react'

function Conversation({ username, last_message, date, avatar, status }) {
    return (
        <li className='cursor-pointer transition-all duration-300 hover:bg-gray-100 border-b border-gray-100 flex gap-2 w-full p-3 rounded-corners text-gray-700'>
            <div className='relative cursor-pointer w-[15%]'>
                <img className='rounded-corners w-full' src={avatar} />
                <span className='absolute -bottom-1 -right-0 bg-white p-[3px] flex-center rounded-full'>
                    <span className={`w-3 h-3 rounded-full ${status ? "bg-emerald-500" : "bg-gray-400"}`}></span>
                </span>
            </div>
            <div className='w-[85%] flex flex-col gap-y-2'>
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-lg'>{username}</span>
                    <span className='text-sm text-gray-600'>{date}</span>
                </div>
                <span className='text-sm'>{last_message}</span>
            </div>
        </li>
    )
}

export default Conversation