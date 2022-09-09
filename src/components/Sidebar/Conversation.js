import { isEmpty } from 'lodash'
import React from 'react'
var moment = require('moment')

function Conversation({ conversation, active, setActiveConversation, setSidebarVisibility }) {

    const handleSelectConversation = () => {
        setActiveConversation(conversation.id)
        if (window.innerWidth < 1024) {
            setSidebarVisibility(false)
        }
    }

    return (
        <li onClick={handleSelectConversation} className={`cursor-pointer transition-all duration-300 ${active ? 'bg-[#abc4ff] ' : 'hover:bg-gray-100 text-gray-700'} border-b border-gray-100 flex gap-2 w-full p-3 rounded-corners `}>
            <div className='relative cursor-pointer w-16 h-16'>
                <img className='rounded-corners w-full h-full object-cover object-center' src={isEmpty(conversation.with_user.profile_photo) ? './assets/images/default-avatar.png' : process.env.REACT_APP_API_URL + '/storage/' + conversation.with_user.profile_photo} />
                <span className='absolute -bottom-1 -right-0 bg-white p-[3px] flex-center rounded-full'>
                    <span className={`w-3 h-3 rounded-full ${conversation.status ? "bg-emerald-500" : "bg-gray-400"}`}></span>
                </span>
            </div>
            <div className='w-[85%] flex flex-col gap-y-2'>
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-lg'>{conversation.with_user.name ? conversation.with_user.name : conversation.with_user.username}</span>
                    <span className='text-sm text-gray-600'>{moment(conversation.created_at).fromNow()}</span>
                </div>
                <span className='text-sm'>{conversation.last_message ? conversation.last_message : 'send first message'}</span>
            </div>
        </li>
    )
}

export default Conversation