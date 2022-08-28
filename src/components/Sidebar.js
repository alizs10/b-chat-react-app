import React, { useRef, useState } from 'react'
import Conversations from './Sidebar/Conversations'

function Sidebar({ setSidebarVisibility }) {

    return (
    <div className="lg:shadow-md fixed top-0 bottom-0 left-0 w-full z-30 lg:relative grid grid-rows-6 gap-y-2 lg:h-screen bg-white col-span-3">

            <div className='row-span-5 flex flex-col gap-y-2'>

                <div className="flex flex-col gap-y-2 p-3">
                    <span className='flex justify-between items-center'>
                        <span className='font-bold text-2xl py-2 block'><span className="text-[#4361ee]">B</span>CHAT</span>
                        <div className="lg:hidden flex-center">
                            <span onClick={() => setSidebarVisibility(false)} className="cursor-pointer text-lg md:text-2xl text-gray-800 p-3 h-fit rounded-corners hover:bg-gray-100 transition-all duration-300">
                                <i className="fa-regular fa-angle-left"></i>
                            </span>
                        </div>
                    </span>
                </div>

                <Conversations setSidebarVisibility={setSidebarVisibility} />
            </div>

            <div className='row-span-1 flex-center p-3'>

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