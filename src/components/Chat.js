import React from 'react'
import Bubbles from './Chat/Bubbles'
import ChatInput from './Chat/ChatInput'
import Head from './Chat/Head'


function Chat() {
  return (
    <div className="relative col-span-6 h-screen grid grid-rows-6">
      <div className='row-span-5'>
        <Head />
        <Bubbles />
      </div>
      <ChatInput />
    </div>
  )
}

export default Chat