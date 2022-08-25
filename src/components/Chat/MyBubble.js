import React, { useRef, useState } from 'react'
import Replay from './Replay'

function MyBubble() {

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
        <div className="self-end mr-2 flex gap-x-4 items-end">


            <div className='flex items-end gap-x-2 mb-3'>
                <span className="text-xs flex gap-x-4">

                    <span className="text-[#1C42EA]">2:43 PM</span>
                </span>
            </div>
            <div className="relative w-fit max-w-[70%]">
            <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="bg-[#1C42EA] p-3 rounded-corners w-full text-white text-base">
                Hey
            </div>
                {replayBtnVisibility && (<Replay setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}
            </div>

        </div>
    )
}

export default MyBubble