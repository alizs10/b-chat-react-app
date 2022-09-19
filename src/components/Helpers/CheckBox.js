import React, { useRef, } from 'react'

function CheckBox({ handleToggle, name, value }) {

    const btnRef = useRef(null)

    return (
        <div className={`w-10 h-6 rounded-corners p-1 transition-all duration-300 ${value == 1 ? 'bg-[#4361EE]' : 'bg-gray-200'}`}>
            <span
                ref={btnRef}
                onClick={() => handleToggle({name, value})}
                className={`cursor-pointer w-4 h-full shadow-md block bg-white rounded-full transition-all duration-300 ${value == 1 && 'ml-4'}`}></span>
        </div>
    )
}

export default CheckBox