import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ReplayContext from '../../Context/ReplayContext'
import Bubble from './Bubble'
import BubbleWithReplay from './BubbleWithReplay'
import Message from './Message'
import MyBubble from './MyBubble'
import MyBubbleWithReplay from './MyBubbleWithReplay'
import ReplayTo from './ReplayTo'

function Bubbles() {

  const { messages } = useSelector(state => state.messages)

  const [isReplying, setIsReplaying] = useState(false)
  const [replayMsg, setReplayMsg] = useState({})

  const bubblesRef = useRef(null)
  useEffect(() => {
    bubblesRef.current.style.scrollBehavior = "smooth"
    bubblesRef.current.scrollTop = bubblesRef.current.scrollHeight
  }, [])


  const handleReplay = (id = null) => {
    let msgTest = {
      body: "hello, this is a test message  to be replayed",
      user: {
        fullName: "Matt LeBlanc"
      }
    }

    setReplayMsg(msgTest)
    setIsReplaying(true)
  }

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