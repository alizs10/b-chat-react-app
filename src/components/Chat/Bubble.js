import React, { useRef, useState } from 'react'
import Replay from './Replay'

function Bubble() {

    const [replayBtnVisibility, setReplayBtnVisibility] = useState(false)
    const [replayRemover, setReplayRemover] = useState(null)

    const handleMouseOver = () => {
        setReplayBtnVisibility(true)
    }

    const handleMouseLeave = () => {

        function removeReplay() {
            setReplayBtnVisibility(false)
        }

        setReplayRemover(setTimeout(removeReplay, 1000))
    }

    const replayBtnRef = useRef(null)


    return (
        <div className="ml-2 flex gap-x-4 items-end">
            <div className='relative flex flex-col gap-y-1 w-fit max-w-[70%]'>
                <span className="text-gray-600 ml-2">Matt LeBlanc</span>

                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="bg-white p-3 border-2 border-gray-200 rounded-corners w-full text-gray-800 text-base">
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                    lorem ipsum dolor sit amet, consectetur adip
                </div>

                {replayBtnVisibility && (<Replay setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}

            </div>
            <div className='flex items-end gap-x-2 mb-3'>
                <span className="text-xs flex gap-x-4">
                    <span className="text-[#4361ee]">2:43 PM</span>
                </span>
            </div>
        </div>
    )
}

export default Bubble