import React, { useContext } from 'react'
import ReplayContext from '../../Context/ReplayContext'

function Replay({ msgId, dir = "left", replayBtnRef, replayRemover, setReplayBtnVisibility }) {

   

    const { handleReplay } = useContext(ReplayContext)

    return (
        <button onClick={() => handleReplay(msgId)} ref={replayBtnRef} className={`absolute -top-2 ${dir === "left" ? "-right-10" : "-left-12"} shadow-md h-8 w-8 flex-center bg-white rounded-corners text-gray-600 hover:bg-blue-50 hover:text-[#1C42EA] transition-all duration-300`}>
            <i className="fa-regular fa-reply text-xs"></i>
        </button>
    )
}

export default Replay