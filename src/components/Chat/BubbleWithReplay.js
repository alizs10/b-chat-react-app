import React, { useRef, useState } from 'react'
import Replay from './Replay'

function BubbleWithReplay() {
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
                <span className='cursor-pointer w-fit flex gap-x-1 items-center'>
                    <img className='w-8 rounded-corners' src='./assets/images/user-profile-1.webp' />
                    <span className="text-gray-600 ml-2">Matt LeBlanc</span>
                </span>
                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="ml-8 flex flex-col bg-white border-b-2 border-gray-200 rounded-corners w-full text-gray-800 text-base">
                    <div className="relative flex flex-col gap-y-2 border-l-4 rounded-t-[25px] border-l-[#4361ee] pl-3 pt-3 px-3 pb-2 border-b text-xs">
                        <span>You</span>
                        <span>lorem ipsum dolor sit amet, consectetur adip</span>
                    {replayBtnVisibility && (<Replay setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}
                    </div>
                    <span className="p-3">hey you stupid</span>
                </div>


            </div>
            <div className='flex items-end gap-x-2 ml-8'>
                <span className="text-[12px] mb-1">
                    <span className="text-gray-600">2:43 PM</span>
                </span>
            </div>
        </div>
    )
}

export default BubbleWithReplay