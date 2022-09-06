import React, { useRef, } from 'react'

function CheckBox({ handleToggle, value }) {

    const btnRef = useRef(null)

    return (
        <div className={`w-10 h-6 rounded-corners p-1 transition-all duration-300 ${value ? 'bg-[#4361EE]' : 'bg-gray-200'}`}>
            <span
                ref={btnRef}
                onClick={handleToggle}
                className={`cursor-pointer w-4 h-full shadow-md block bg-white rounded-full transition-all duration-300 ${value && 'ml-4'}`}></span>
        </div>
    )
}

export default CheckBox