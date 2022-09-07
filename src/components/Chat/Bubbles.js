import React, { useEffect, useRef, useState } from 'react'
import ReplayContext from '../../Context/ReplayContext'
import Bubble from './Bubble'
import BubbleWithReplay from './BubbleWithReplay'
import MyBubble from './MyBubble'
import MyBubbleWithReplay from './MyBubbleWithReplay'
import ReplayTo from './ReplayTo'

function Bubbles() {

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
    <ReplayContext.Provider value={{
      isReplying, setIsReplaying,
      replayMsg, setReplayMsg,
      handleReplay
    }}>

      <div ref={bubblesRef} className='relative row-span-5 pt-12 pb-0 overflow-y-scroll flex flex-col styled-scrollbar gap-y-14'>
        <MyBubble />
        <MyBubble />
        <Bubble />
        <MyBubble />
        <Bubble />
        <Bubble />
        <MyBubble />
        <Bubble />
        <MyBubbleWithReplay />
        <BubbleWithReplay />

        {isReplying && (
          <ReplayTo msg={replayMsg} />
        )}
      </div>
    </ReplayContext.Provider>
  )
}

export default Bubbles