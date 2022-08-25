import React, { useRef } from 'react'
import Conversations from './Sidebar/Conversations'

function Sidebar() {

    const handleMouseOver = () => {
        newConversationTextRef.current.classList.remove('hidden');
    }
    const handleMouseLeave = () => {
        newConversationTextRef.current.classList.add('hidden');
    }

    const newConversationTextRef = useRef(null)

    return (
        <div className="relative flex flex-col gap-y-2 h-screen bg-white col-span-3">

            <div className=" flex flex-col gap-y-2 p-3">
                <span className='font-bold text-2xl py-2 block'><span className="text-[#4361ee]">B</span>CHAT</span>
            </div>

            <Conversations />

            <button onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="absolute bottom-5 left-5 z-30 flex items-center w-[4.5rem] hover:w-4/5 p-[7px] rounded-corners bg-[#5F7AF0] btn-hover text-white transition-all duration-300">
                <span className='p-3 w-fit rounded-corners bg-[#4361EE] px-4 flex-center'>
                    <i className="fa-regular fa-comment-medical text-2xl"></i>
                </span>
                <span ref={newConversationTextRef} className='hidden ml-2 whitespace-nowrap text-lg'>Start New Conversation</span>
            </button>

        </div>
    )
}

export default Sidebar