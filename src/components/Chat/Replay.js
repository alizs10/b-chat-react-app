import React from 'react'

function Replay({ dir = "left", replayBtnRef, replayRemover, setReplayBtnVisibility }) {

    const handleMouseOver = () => {
        clearTimeout(replayRemover)
    }

    const handleMouseLeave = () => {
        setReplayBtnVisibility(false)
    }
    return (
        <button ref={replayBtnRef} onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className={`absolute -top-2 ${dir === "left" ? "-right-10" : "-left-12"} shadow-md h-8 w-8 flex-center bg-white rounded-corners text-gray-600 hover:bg-blue-50 hover:text-[#1C42EA] transition-all duration-300`}>
            <i className="fa-regular fa-reply text-xs"></i>
        </button>
    )
}

export default Replay