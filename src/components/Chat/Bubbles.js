import React, { useEffect, useRef } from 'react'
import Bubble from './Bubble'
import BubbleWithReplay from './BubbleWithReplay'
import MyBubble from './MyBubble'
import MyBubbleWithReplay from './MyBubbleWithReplay'
import ReplayTo from './ReplayTo'

function Bubbles() {


  const bubblesRef = useRef(null)
  useEffect(() => {
    console.log(bubblesRef.current.scrollHeight);
    bubblesRef.current.style.scrollBehavior = "smooth" 
    bubblesRef.current.scrollTop = bubblesRef.current.scrollHeight
  }, [])

  return (
    <div ref={bubblesRef} className='relative h-[calc(100%_-_6.5rem)] pt-12 pb-0 overflow-y-scroll flex flex-col styled-scrollbar gap-y-14'>
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
      <ReplayTo/>
    </div>
  )
}

export default Bubbles