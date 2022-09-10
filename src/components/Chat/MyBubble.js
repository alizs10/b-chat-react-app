import React, { useRef, useState } from 'react'
import Replay from './Replay'

let moment = require('moment')

function MyBubble({ message }) {

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
        <div className="flex justify-end gap-x-4 w-full">
            <div className='flex items-end gap-x-2'>
                <span className="text-[12px] mb-1">
                    <span className="text-gray-600 whitespace-nowrap">
                        { moment(message.created_at).format('LT')}
                    </span>
                </span>
            </div>
            <div className="mr-2 relative w-fit max-w-[70%]">
                <div dir='auto' onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="bg-[#4361ee] p-3 rounded-corners w-full text-white text-base">
                    {message.body}
                </div>
                {replayBtnVisibility && (<Replay message={message} dir="right" setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}
            </div>

        </div>
    )
}

export default MyBubble