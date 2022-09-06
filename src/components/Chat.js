import React from 'react'
import Bubbles from './Chat/Bubbles'
import ChatInput from './Chat/ChatInput'
import Head from './Chat/Head'


function Chat({setSidebarVisibility}) {


  return (
    <div className="fixed z-40 top-0 right-0 bottom-0 left-0 lg:relative col-span-9 lg:h-screen lg:col-span-6 grid grid-rows-6">
      <div className='row-span-5 h-full grid grid-rows-6'>
        <Head />
        <Bubbles />
      </div>
      <ChatInput />
    </div>
  )
}

export default Chat