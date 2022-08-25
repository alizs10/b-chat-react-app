import React from 'react'
import Conversations from './Sidebar/Conversations'

function Sidebar() {
    return (
        <div className="grid grid-rows-6 h-screen bg-white col-span-3">

            <div className="row-span-1 flex flex-col gap-y-2 p-3">

                <span className='font-bold text-2xl py-2 block'><span className="text-[#4361ee]">B</span>CHAT</span>
                <button className="flex items-center w-full p-[7px] rounded-corners bg-[#5F7AF0] btn-hover text-white transition-all duration-300">
                    <span className='p-3 rounded-corners bg-[#4361EE] mr-2 px-4 flex-center'>
                        <i className="fa-regular fa-comment-medical text-2xl"></i>
                    </span>
                    <span className='text-center text-lg'>Start New Conversation</span>
                </button>

            </div>

            <Conversations />
        </div>
    )
}

export default Sidebar