import React, { useRef, useState } from 'react'
import Replay from './Replay'

function MyBubbleWithReplay() {
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
            <div className='relative flex flex-col gap-y-1 w-fit max-w-[70%]'>

                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="flex flex-col rounded-corners w-full text-white text-base overflow-hidden">
                    <div className="flex flex-col gap-y-2  pl-3 pt-3 px-3 pb-2 text-xs bg-white border-r-4 border-r-[#1C42EA] rounded-tr-[25px] text-gray-800">
                        <span>You</span>
                        <span>lorem ipsum dolor sit amet, consectetur adip</span>
                    </div>
                    <span className="p-3 bg-[#1C42EA]">hey you stupid</span>
                </div>

                {replayBtnVisibility && (<Replay setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}

            </div>
        </div>
    )
}

export default MyBubbleWithReplay