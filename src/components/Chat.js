import React, { useEffect, useRef } from 'react'
import { useSwipeable } from 'react-swipeable';
import Bubbles from './Chat/Bubbles'
import ChatInput from './Chat/ChatInput'
import Head from './Chat/Head'


function Chat({setSidebarVisibility}) {

  const handlers = useSwipeable({
    // onSwiping: (SwipeEventData) => handleSwipeChat(SwipeEventData),
    onSwipedRight: () => setSidebarVisibility(true),
    ...{
      delta: 150,                             // min distance(px) before a swipe starts. *See Notes*
      preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
      trackTouch: true,                      // track touch input
      trackMouse: false,                     // track mouse input
      rotationAngle: 0,                      // set a rotation angle
      swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
      touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    },
  });


  return (
    <div {...handlers} className="fixed z-20 top-0 right-0 bottom-0 left-0 lg:relative col-span-9 lg:h-screen lg:col-span-6 grid grid-rows-6">
      <div className='row-span-5 h-full grid grid-rows-6'>
        <Head />
        <Bubbles />
      </div>
      <ChatInput />
    </div>
  )
}

export default Chat