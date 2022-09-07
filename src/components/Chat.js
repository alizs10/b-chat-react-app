import React, { useState } from 'react'
import Bubbles from './Chat/Bubbles'
import ChatInput from './Chat/ChatInput'
import Head from './Chat/Head'
import Backdrop from './Helpers/Backdrop'
import CenterContainer from './Helpers/CenterContainer'
import ViewProfile from './Profile/ViewProfile'


function Chat({ setSidebarVisibility }) {

  const [viewProfileVisibility, setViewProfileVisibility] = useState(true)

  return (
    <div className="fixed z-40 top-0 right-0 bottom-0 left-0 lg:relative col-span-9 lg:h-screen lg:col-span-6 grid grid-rows-6">
      <div className='row-span-5 h-full grid grid-rows-6'>
        <Head />
        <Bubbles />
      </div>
      <ChatInput />
      <Backdrop toggler={viewProfileVisibility} handleClick={setViewProfileVisibility}>
        <CenterContainer handleClick={setViewProfileVisibility} element={<ViewProfile handleClose={setViewProfileVisibility} user={{fullName: "Mehran Modiri"}}/>} />
      </Backdrop>
    </div>
  )
}

export default Chat