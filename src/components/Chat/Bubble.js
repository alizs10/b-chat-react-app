import { isEmpty } from 'lodash'
import React, { useContext, useRef, useState } from 'react'
import { ChatContext } from '../../Context/ChatContext'
import Replay from './Replay'

let moment = require('moment')

function Bubble({ message }) {

    const {handleViewProfile} = useContext(ChatContext)

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
        <div className="ml-2 flex gap-x-4 items-end">
            <div className='relative flex flex-col gap-y-1 w-fit max-w-[70%]'>
                <span 
                onClick={() => handleViewProfile(message.user_id)}
                className='cursor-pointer w-fit flex gap-x-1 items-center'>
                    <img className='w-8 h-8 object-cover object-center rounded-corners' src={isEmpty(message.writer?.profile_photo) ? './assets/images/default-avatar.png' : process.env.REACT_APP_API_URL + '/storage/' + message.writer?.profile_photo} />
                    <span className="text-gray-600 ml-2">{isEmpty(message.writer.name) ? message.writer.username : message.writer.name}</span>
                </span>

                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="relative ml-8 bg-white p-3 border-2 border-gray-200 rounded-corners w-full text-gray-800 text-base">
                    <p dir='auto'>
                        {message.body}
                    </p>
                    {replayBtnVisibility && (<Replay setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}
                </div>


            </div>
            <div className='flex items-end gap-x-2 ml-8'>
                <span className="text-[12px] mb-1">
                    <span className="text-gray-600">
                        {moment(message.created_at).format('LT')}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Bubble