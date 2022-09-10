import React, { useContext, useState } from 'react'
import { getUserProfile } from '../api/users'
import { AppContext } from '../Context/AppContext'
import { ChatContext } from '../Context/ChatContext'
import ReplayContext from '../Context/ReplayContext'
import Bubbles from './Chat/Bubbles'
import ChatInput from './Chat/ChatInput'
import Head from './Chat/Head'
import Preview from './Chat/Preview'
import ReplayTo from './Chat/ReplayTo'
import Backdrop from './Helpers/Backdrop'
import CenterContainer from './Helpers/CenterContainer'
import ViewProfile from './Profile/ViewProfile'


function Chat() {

  const { activeConversation, setActiveConversation } = useContext(AppContext)

  const [viewProfileVisibility, setViewProfileVisibility] = useState(false)
  const [viewProfile, setViewProfile] = useState({})

  const handleViewProfile = async id => {
    try {
      let response = await getUserProfile(id)
      if (response.status) {
        setViewProfile(res.user)
        setViewProfileVisibility(true)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const [isReplying, setIsReplaying] = useState(false)
  const [replayMsg, setReplayMsg] = useState({})

  const handleReplay = (id = null) => {
    let msgTest = {
      body: "hello, this is a test message  to be replayed",
      user: {
        fullName: "Matt LeBlanc"
      }
    }

    setReplayMsg(msgTest)
    setIsReplaying(true)
  }

  return (
    <ChatContext.Provider value={{
      handleViewProfile
    }}>
      <ReplayContext.Provider value={{
        isReplying, setIsReplaying,
        replayMsg, setReplayMsg,
        handleReplay
      }}>
        <div className="fixed bg-[#edf2fb] z-40 top-0 right-0 bottom-0 left-0 lg:relative col-span-9 lg:h-screen lg:col-span-6 grid grid-rows-6">
          <div className='row-span-5 h-full grid grid-rows-6'>
            <Head />
            {activeConversation ? (
              <Bubbles />
            ) : (
              <Preview />
            )}

            {isReplying && (
              <ReplayTo msg={replayMsg} />
            )}
          </div>
          {activeConversation && (
            <ChatInput />
          )}
          <Backdrop toggler={viewProfileVisibility} handleClick={setViewProfileVisibility}>
            <CenterContainer handleClick={setViewProfileVisibility} element={<ViewProfile handleClose={setViewProfileVisibility} user={{ fullName: "Mehran Modiri" }} />} />
          </Backdrop>
        </div>
      </ReplayContext.Provider>
    </ChatContext.Provider>
  )
}

export default Chat