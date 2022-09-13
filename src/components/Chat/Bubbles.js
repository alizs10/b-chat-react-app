import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../api/messages'
import { AppContext } from '../../Context/AppContext'
import Message from './Message'

function Bubbles() {

  const { activeConversation } = useContext(AppContext)

  const { data:messages, isLoading, isError, error } = useQuery(
    ['messages', activeConversation],
    getMessages,
    {
      refetchOnWindowFocus: false,
      select: data => {
        return data.data.messages
      }
    }
  )

  return (
    <div className='relative row-span-5 pt-12 pb-4 overflow-y-scroll flex flex-col-reverse styled-scrollbar gap-y-14'>
      {messages && (
        messages.map(message => (
          <Message key={message.id} message={message} />
        ))
      )}
    </div>
  )
}

export default Bubbles