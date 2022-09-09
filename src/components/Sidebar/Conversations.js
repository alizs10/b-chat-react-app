import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Conversation from './Conversation'

function Conversations({ setSidebarVisibility }) {

    const { conversations } = useSelector(state => state.conversations)

    const [activeConversation, setActiveConversation] = useState(2)

    return (

        <div className='h-full relative flex flex-col gap-y-2 pl-3 styled-scrollbar overflow-y-scroll'>

            <span className="bg-white/80 z-20 sticky top-0 block text-sm text-gray-600 pb-1 border-b border-gray-200">Conversations ({!isEmpty(conversations) ? conversations.length : 0})</span>
            {!isEmpty(conversations) && (
                <ul className='mt-2 flex flex-col gap-y-2 pb-3 mr-3'>
                    {conversations.map(conversation => (
                        <Conversation key={conversation.id} setSidebarVisibility={setSidebarVisibility} setActiveConversation={setActiveConversation} conversation={conversation} active={activeConversation == conversation.id ? true : false} />
                    ))}
                </ul>
            )}
        </div>

    )
}

export default Conversations