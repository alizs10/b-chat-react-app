import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../api/messages'
import { AppContext } from '../../Context/AppContext'
import { setLastMessage } from '../../redux/slices/conversationsSlice'
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
  const messagesRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    let scrollHeight = messagesRef?.current.scrollHeight;
    if(messagesRef?.current)
    {
      messagesRef.current.style.scrollBehavior = "smooth";
      messagesRef.current.scrollTop = scrollHeight;
    }

    if(!messages || messages.length == 0) return
    let lastMessage = messages[0]
    dispatch(setLastMessage(lastMessage))
      
    
  }, [messages])

  
  return (
    <div ref={messagesRef} className='relative row-span-5 pt-12 pb-4 overflow-y-scroll flex flex-col-reverse styled-scrollbar gap-y-14'>
      {messages && (
        messages.map(message => (
          <Message key={message.id} message={message} />
        ))
      )}
    </div>
  )
}

export default Bubbles