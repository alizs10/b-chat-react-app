import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../api/messages'
import { AppContext } from '../../Context/AppContext'
import ReplayContext from '../../Context/ReplayContext'
import { setMessages } from '../../redux/slices/messagesSlice'
import Bubble from './Bubble'
import BubbleWithReplay from './BubbleWithReplay'
import Message from './Message'
import MyBubble from './MyBubble'
import MyBubbleWithReplay from './MyBubbleWithReplay'
import ReplayTo from './ReplayTo'

function Bubbles() {

  const { messages } = useSelector(state => state.messages)


  const { activeConversation } = useContext(AppContext)


  const dispatch = useDispatch()
  const onSuccess = messages => {
    dispatch(setMessages(messages))
  }

  const { data, isLoading, isError, error } = useQuery(
    ['messages', activeConversation],
    getMessages,
    {
      onSuccess,
      refetchOnWindowFocus: false,
      select: data => {
        return data.data.messages
      }
    }
  )

  const bubblesRef = useRef(null)
  useEffect(() => {
    bubblesRef.current.style.scrollBehavior = "smooth"
    bubblesRef.current.scrollTop = bubblesRef.current.scrollHeight
  }, [])



  return (


    <div ref={bubblesRef} className='relative row-span-5 pt-12 pb-0 overflow-y-scroll flex flex-col-reverse styled-scrollbar gap-y-14'>


      {messages && (
        messages.map(message => (
          <Message key={message.id} message={message} />
        ))
      )}
    </div>

  )
}

export default Bubbles