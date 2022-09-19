import { isEmpty } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import Conversation from './Conversation'

function Conversations({ setSidebarVisibility }) {

    const { conversations } = useSelector(state => state.conversations)

    return (

        <div className='h-full relative flex flex-col gap-y-2 pl-3 styled-scrollbar overflow-y-scroll'>

            <span className="bg-white/80 z-20 sticky top-0 block text-sm text-gray-600 pb-1 border-b border-gray-200">Conversations ({!isEmpty(conversations) ? conversations.length : 0})</span>
            {!isEmpty(conversations) ? (
                <ul className='mt-2 flex flex-col gap-y-2 pb-3 mr-3'>
                    {conversations.map(conversation => (
                        <Conversation key={conversation.id} setSidebarVisibility={setSidebarVisibility} conversation={conversation} />
                    ))}
                </ul>
            ) : (
                <span className='mt-4 text-gray-600 text-xs'>you don't have any conversations yet!</span>
            )}
        </div>

    )
}

export default Conversations