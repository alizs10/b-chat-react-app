import { isEmpty, truncate } from 'lodash'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Replay from './Replay'

let moment = require('moment')

function MyBubbleWithReplay({ message }) {

    const { user } = useSelector(state => state.user)

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
                    <span className="text-gray-600">
                        {moment(message.created_at).format('LT')}
                    </span>
                </span>
            </div>
            <div className='mr-2 relative flex flex-col gap-y-1 w-fit max-w-[70%]'>

                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="flex flex-col rounded-corners w-full text-white text-base overflow-hidden">
                    <div className="flex flex-col gap-y-2  pl-3 pt-3 px-3 pb-2 text-xs bg-white border-r-4 border-r-[#4361ee] rounded-tr-[25px] text-gray-800">
                        <span>
                            {message.parent.writer.id == user.id ? "You" : (
                                isEmpty(message.parent.writer.name) ? message.parent.writer.username : message.parent.writer.name
                            )}
                        </span>
                        <span dir='auto'>{truncate(message.parent.body)}</span>
                    </div>
                    <span className="p-3 bg-[#4361ee]" dir='auto'>{message.body}</span>
                </div>

                {replayBtnVisibility && (<Replay message={message} dir="right" setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}

            </div>
        </div>
    )
}

export default MyBubbleWithReplay