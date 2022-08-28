import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'

function Conversations({setSidebarVisibility}) {

    const [conversations, setConversations] = useState([
        {
            id: 1,
            status: 1, // 0 => offline, 1 => online
            last_message: "How You Doing?? MISS YOU!",
            username: "Matt Leblanc",
            date: "2:45 PM",
            avatar: "assets/images/user-profile-1.webp"
        },
        {
            id: 2,
            status: 0, // 0 => offline, 1 => online
            last_message: "Come back GOAT :)",
            username: "Cristiano",
            date: "yesterday",
            avatar: "assets/images/user-profile-2.webp"
        },
        {
            id: 3,
            status: 0, // 0 => offline, 1 => online
            last_message: "So Handsome",
            username: "David Beckham",
            date: "2022/08/16",
            avatar: "assets/images/user-profile-3.webp"
        },
        {
            id: 4,
            status: 0, // 0 => offline, 1 => online
            last_message: "Big win! have fun...",
            username: "Johnny Depp",
            date: "2022/08/12",
            avatar: "assets/images/user-profile-4.webp"
        },
        {
            id: 5,
            status: 0, // 0 => offline, 1 => online
            last_message: "LEGEND!",
            username: "Mehran Modiri",
            date: "2022/08/01",
            avatar: "assets/images/user-profile-5.webp"
        },
    ])
    const [activeConversation, setActiveConversation] = useState(2)


    return (

        <div className='h-full relative flex flex-col gap-y-2 pl-3 styled-scrollbar overflow-y-scroll'>

            <span className="bg-white/80 z-20 sticky top-0 block text-sm text-gray-600 pb-1 border-b border-gray-200">Conversations ({conversations.length})</span>
            <ul className='mt-2 flex flex-col gap-y-2 pb-3 mr-3'>
                {conversations.map(conversation => (
                    <Conversation setSidebarVisibility={setSidebarVisibility} setActiveConversation={setActiveConversation} conversation={conversation} active={activeConversation == conversation.id ? true : false}/>
                ))}
            </ul>
        </div>

    )
}

export default Conversations