import React from 'react'
import Bubble from './Bubble'
import MyBubble from './MyBubble'

function Bubbles() {
  return (
    <div className='row-span-4 py-2 overflow-y-scroll flex flex-col-reverse styled-scrollbar gap-y-2'>
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