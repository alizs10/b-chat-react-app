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
                <span className='cursor-pointer w-fit flex gap-x-1 items-center'>
                    <img className='w-8 rounded-corners' src='./assets/images/user-profile-1.webp' />
                    <span className="text-gray-600 ml-2">Matt LeBlanc</span>
                </span>

                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="relative ml-8 bg-white p-3 border-2 border-gray-200 rounded-corners w-full text-gray-800 text-base">
                    <p>
                        lorem ipsum dolor
                    </p>
                    {replayBtnVisibility && (<Replay setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}
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

export default Bubble