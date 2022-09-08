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

        setReplayRemover(setTimeout(removeReplay, 10000))
    }

    const replayBtnRef = useRef(null)


    return (
        <div className="self-end mr-2 flex justify-end gap-x-4 items-end ">
            <div className='flex items-end gap-x-2'>
                <span className="text-[12px] mb-1">
                    <span className="text-gray-600">2:43 PM</span>
                </span>
            </div>
            <div className='relative flex flex-col gap-y-1 w-fit max-w-[70%]'>

                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="flex flex-col rounded-corners w-full text-white text-base overflow-hidden">
                    <div className="flex flex-col gap-y-2  pl-3 pt-3 px-3 pb-2 text-xs bg-white border-r-4 border-r-[#4361ee] rounded-tr-[25px] text-gray-800">
                        <span>You</span>
                        <span>lorem ipsum dolor sit amet, consectetur adip</span>
                    </div>
                    <span className="p-3 bg-[#4361ee]">hey you stupid</span>
                </div>

                {replayBtnVisibility && (<Replay dir="right" setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}

            </div>
        </div>
    )
}

export default MyBubbleWithReplay