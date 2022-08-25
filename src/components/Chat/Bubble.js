import React from 'react'

function Bubble() {
    return (
        <div className="ml-2 flex gap-x-4 items-end">
            <div className='flex flex-col gap-y-1 w-fit max-w-[70%]'>
                <span className="text-gray-600 ml-2">Matt LeBlanc</span>

                <div className="bg-white p-3 border-2 border-gray-200 rounded-corners w-full text-gray-800 text-base">
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                </div>

            </div>
            <span className="mb-3 text-xs flex gap-x-4">
                <span className="text-[#1C42EA]">2:43 PM</span>
            </span>
        </div>
    )
}

export default Bubble