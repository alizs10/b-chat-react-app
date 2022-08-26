import React from 'react'
import Bubble from './Bubble'
import BubbleWithReplay from './BubbleWithReplay'
import MyBubble from './MyBubble'
import MyBubbleWithReplay from './MyBubbleWithReplay'
import ReplayTo from './ReplayTo'

function Bubbles() {

  return (
    <div className='relative h-[calc(100%_-_6.5rem)] pt-12 pb-0 overflow-y-scroll flex flex-col styled-scrollbar gap-y-14'>
      <MyBubbleWithReplay />
      <BubbleWithReplay />
      <MyBubble />
      <MyBubble />
      <Bubble />
      <MyBubble />
      <Bubble />
      <Bubble />
      <MyBubble />
      <Bubble />
      <ReplayTo/>
    </div>
  )
}

export default Bubbles