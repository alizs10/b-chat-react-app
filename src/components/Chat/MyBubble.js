import React from 'react'

function MyBubble() {
    return (
        <div className="self-end mr-2 flex gap-x-4 items-end">
            <span className="mb-3 text-xs flex gap-x-4">
                
                <span className="text-[#1C42EA]">2:43 PM</span>
            </span>
            <div className="bg-[#1C42EA] p-3 rounded-corners w-fit max-w-[70%] text-white text-base">
                Hey
            </div>
        </div>
    )
}

export default MyBubble