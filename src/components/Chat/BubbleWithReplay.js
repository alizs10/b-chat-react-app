import { isEmpty, truncate } from 'lodash'
import React, { useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppContext } from '../../Context/AppContext'
import { ChatContext } from '../../Context/ChatContext'
import { findDataById } from '../Helpers/helpers'
import Replay from './Replay'

let moment = require('moment')

function BubbleWithReplay({ message }) {

    const { handleViewProfile } = useContext(ChatContext)

    const { conversations } = useSelector(state => state.conversations)
    const { activeConversation } = useContext(AppContext)

    const { user } = useSelector(state => state.user)

    const [replayBtnVisibility, setReplayBtnVisibility] = useState(false)
    const [replayRemover, setReplayRemover] = useState(null)


    const handleMouseOver = () => {
        if (!findDataById(activeConversation, conversations).with_user.username) return
        setReplayBtnVisibility(true)
    }

    const handleMouseLeave = () => {

        if (!replayBtnVisibility) return
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
                    <img className='w-8 h-8 object-center object-cover rounded-corners' src={isEmpty(message.writer?.profile_photo) ? './assets/images/default-avatar.png' : process.env.REACT_APP_API_URL + '/storage/' + message.writer?.profile_photo} />
                    <span className="text-gray-600 ml-2">{isEmpty(message.writer.name) ? message.writer.username : message.writer.name}</span>
                </span>
                <div onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} className="ml-8 flex flex-col bg-white border-b-2 border-gray-200 rounded-corners w-full text-gray-800 text-base">
                    <div className="relative flex flex-col gap-y-2 border-l-4 rounded-t-[25px] border-l-[#4361ee] pl-3 pt-3 px-3 pb-2 border-b text-xs">
                        <span>
                            {message.parent.writer.id == user.id ? "You" : (
                                isEmpty(message.parent.writer.name) ? message.parent.writer.username : message.parent.writer.name
                            )}
                        </span>
                        <span dir='auto'>{truncate(message.parent.body)}</span>
                        {replayBtnVisibility && (<Replay message={message} setReplayBtnVisibility={setReplayBtnVisibility} replayRemover={replayRemover} replayBtnRef={replayBtnRef} />)}
                    </div>
                    <span className="p-3" dir='auto'>
                        {message.body}
                    </span>
                </div>


            </div>
            <div className='flex items-end gap-x-2 ml-8'>
                <span className="text-[12px] mb-1">
                    <span className="text-gray-600">
                        {message?.pending ? (
                            <i className="fa-regular fa-clock text-sm"></i>
                        ) : (
                            moment(message.created_at).format('LT')
                        )}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default BubbleWithReplay