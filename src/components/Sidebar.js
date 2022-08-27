import React, { useRef } from 'react'
import Conversations from './Sidebar/Conversations'

function Sidebar() {

    return (
        <div className="relative grid grid-rows-6 gap-y-2 h-screen bg-white col-span-3">

            <div className='row-span-5 flex flex-col gap-y-2'>

                <div className="flex flex-col gap-y-2 p-3">
                    <span className='font-bold text-2xl py-2 block'><span className="text-[#4361ee]">B</span>CHAT</span>
                </div>

                <Conversations />
            </div>

            <div className='row-span-1 m-4'>

                <button className="flex w-full items-center p-2 rounded-corners bg-[#5F7AF0] btn-hover text-white transition-all duration-300">
                    <span className='p-3 w-fit rounded-corners bg-[#4361EE] px-4 flex-center'>
                        <i className="fa-regular fa-comment-medical text-2xl"></i>
                    </span>
                    <span className='ml-2 whitespace-nowrap text-lg'>Start New Conversation</span>
                </button>
            </div>

        </div>
    )
}

export default Sidebar