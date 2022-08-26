import React from 'react'
import Bubble from './Bubble'
import BubbleWithReplay from './BubbleWithReplay'
import MyBubble from './MyBubble'
import MyBubbleWithReplay from './MyBubbleWithReplay'

function Bubbles() {
  return (
    <div className='h-[calc(100%_-_6.5rem)] py-12 overflow-y-scroll flex flex-col-reverse styled-scrollbar gap-y-14'>
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
    </div>
  )
}

export default Bubbles