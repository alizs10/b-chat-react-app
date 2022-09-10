import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import Bubbles from './Chat/Bubbles'
import ChatInput from './Chat/ChatInput'
import Head from './Chat/Head'
import Preview from './Chat/Preview'
import Backdrop from './Helpers/Backdrop'
import CenterContainer from './Helpers/CenterContainer'
import ViewProfile from './Profile/ViewProfile'


function Chat() {

  const { activeConversation, setActiveConversation } = useContext(AppContext)

  const [viewProfileVisibility, setViewProfileVisibility] = useState(false)

  return (
    <div className="fixed bg-[#edf2fb] z-40 top-0 right-0 bottom-0 left-0 lg:relative col-span-9 lg:h-screen lg:col-span-6 grid grid-rows-6">
      <div className='row-span-5 h-full grid grid-rows-6'>
        <Head />
        {activeConversation ? (
          <Bubbles />
        ) : (
          <Preview />
        )}
      </div>
      {activeConversation && (
        <ChatInput />
      )}
      <Backdrop toggler={viewProfileVisibility} handleClick={setViewProfileVisibility}>
        <CenterContainer handleClick={setViewProfileVisibility} element={<ViewProfile handleClose={setViewProfileVisibility} user={{ fullName: "Mehran Modiri" }} />} />
      </Backdrop>
    </div>
  )
}

export default Chat