import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isEmpty, now } from 'lodash'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../api/messages'
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
import { findDataById } from './Helpers/helpers'
import ViewProfile from './Profile/ViewProfile'


function Chat() {

  const { user } = useSelector(state => state.user)
  const { messages } = useSelector(state => state.messages)
  const dispatch = useDispatch()

  const { activeConversation, setActiveConversation } = useContext(AppContext)

  const [viewProfileVisibility, setViewProfileVisibility] = useState(false)
  const [viewProfileUser, setViewProfileUser] = useState({})

  const handleViewProfile = async id => {
    try {
      let response = await getUserProfile(id)
      if (response.status) {
        setViewProfileUser(response.user)
        setViewProfileVisibility(true)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const [isReplying, setIsReplaying] = useState(false)
  const [replayMsg, setReplayMsg] = useState({})

  const handleReplay = (message) => {
    setReplayMsg(message)
    setIsReplaying(true)
  }

  const queryClient = useQueryClient()

  const { mutate: sendNewMessage } = useMutation(newMessage => {
    sendMessage(newMessage)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', activeConversation])
    }
  })

  const handleSendMessage = async (body) => {
    let payload = {}
    payload.body = body;
    payload.user_id = user.id;
    payload.conversation_id = activeConversation;
    if (isReplying && !isEmpty(replayMsg)) {
      payload.parent_id = replayMsg.id;
      let parent = findDataById(replayMsg.id, messages)
      if (parent) {
        payload.parent = parent;
      } else {
        return false;
      }

    } else {
      payload.parent_id = null;
    }
    payload.created_at = now()
    payload.id = Math.floor(Math.random() * 1000000);
    payload.writer = user;
    payload.pending = true;

    // send message temporary
    sendNewMessage(payload)


    if (setIsReplaying) {
      setIsReplaying(false)
      setReplayMsg({})
    }
    return true;
  }


  return (
    <ChatContext.Provider value={{
      handleViewProfile,
      handleSendMessage
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
              <ReplayTo message={replayMsg} />
            )}
          </div>
          {activeConversation && (
            <ChatInput />
          )}
          <Backdrop toggler={viewProfileVisibility} handleClick={setViewProfileVisibility}>
            <CenterContainer handleClick={setViewProfileVisibility} element={<ViewProfile handleClose={setViewProfileVisibility} user={viewProfileUser} />} />
          </Backdrop>
        </div>
      </ReplayContext.Provider>
    </ChatContext.Provider>
  )
}

export default Chat