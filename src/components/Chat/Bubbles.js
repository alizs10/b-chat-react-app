import React, { useEffect, useRef, useState } from 'react'
import Bubble from './Bubble'
import BubbleWithReplay from './BubbleWithReplay'
import MyBubble from './MyBubble'
import MyBubbleWithReplay from './MyBubbleWithReplay'
import ReplayTo from './ReplayTo'

function Bubbles() {

  const [isReplying, setIsReplaying] = useState(false)

  const bubblesRef = useRef(null)
  useEffect(() => {
    console.log(bubblesRef.current.scrollHeight);
    bubblesRef.current.style.scrollBehavior = "smooth"
    bubblesRef.current.scrollTop = bubblesRef.current.scrollHeight
  }, [])

  return (
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
        <ReplayTo />
      )}
    </div>
  )
}

export default Bubbles