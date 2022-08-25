import React from 'react'

function Replay({dir = "left", replayBtnRef, replayRemover, setReplayBtnVisibility}) {

    const handleMouseOver = () => {
        clearTimeout(replayRemover)
    }

    const handleMouseLeave = () => {
        setReplayBtnVisibility(false)
    }
    return (
        <button ref={replayBtnRef} onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className={`absolute -bottom-12 ${dir === "left" ? "-right-0" : "-left-0"} shadow-sm flex gap-x-2 p-3 items-center bg-white rounded-corners text-[#1C42EA]`}>
            <i className="fa-regular fa-reply text-sm"></i>
        </button>
    )
}

export default Replay