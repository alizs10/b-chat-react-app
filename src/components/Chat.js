import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { isEmpty, now } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../api/messages'
import { getUserProfile } from '../api/users'
import { AppContext } from '../Context/AppContext'
import { BChatContext } from '../Context/BChatContext'
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
import { notify } from './Helpers/notify'
import ViewProfile from './Profile/ViewProfile'

import pusherJs from 'pusher-js'

function Chat() {

  const { user } = useSelector(state => state.user)
  const { conversations } = useSelector(state => state.conversations)

  const dispatch = useDispatch()
  useEffect(() => {

    if(!user) return

     // Enable pusher logging - don't include this in production
     pusherJs.logToConsole = true;

     var pusher = new pusherJs(process.env.REACT_APP_PUSHER_APP_KEY, {
       cluster: 'ap1',
       forceTLS: true,

     });
 
     var channel = pusher.subscribe('chat.'+ user.username);
     channel.bind('message', function(data) {
      let newMessage = data.message;
      // dispatch(receiveNewMessage())
     });
  }, [])


  const { activeConversation } = useContext(AppContext)
  const { setLoading, setProgress } = useContext(BChatContext)

  const [viewProfileVisibility, setViewProfileVisibility] = useState(false)
  const [viewProfileUser, setViewProfileUser] = useState({})

  const { mutate: getUserProfileMutate } = useMutation(getUserProfile, {
    onSettled: (data, error) => {
      //success
      if (data.status == 200) {
        if (data.data.status) {
          setViewProfileUser(data.data.user)
          setViewProfileVisibility(true)
        }
      } else {
        notify("something went wrong", "error")
      }
      setProgress(100)
    }
  })

  const handleViewProfile = async id => {
    setLoading(true)
    setProgress(70)
    getUserProfileMutate(id)
  }


  const [isReplying, setIsReplaying] = useState(false)
  const [replayMsg, setReplayMsg] = useState({})
  const [disableChat, setDisableChat] = useState(false)

  useEffect(() => {
    if (conversations) {
      setDisableChat(findDataById(activeConversation, conversations)?.with_user?.username === null)
    }
  }, [conversations])

  const handleReplay = (message) => {
    setReplayMsg(message)
    setIsReplaying(true)
  }

  const queryClient = useQueryClient()
  const messagesQueryData = queryClient.getQueryData(['messages', activeConversation])

  const { mutate: sendNewMessage } = useMutation(sendMessage, {
    onMutate: (newMessage) => {
      queryClient.setQueryData(['messages', activeConversation], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: {
            status: true,
            messages: [newMessage, ...oldQueryData.data.messages]
          }
        }
      })

    },
    onSuccess: (data, newMessage) => {
      
      let res = data;
      queryClient.setQueryData(['messages', activeConversation], (oldQueryData) => {

        let filteredOldMessages = oldQueryData.data.messages.filter(msg => msg.id != newMessage.id)

        return {
          ...oldQueryData,
          data: {
            status: true,
            messages: [res.data.message, ...filteredOldMessages]
          }
        }
      })

    }
  })

  const handleSendMessage = (body) => {

    let payload = {}
    payload.body = body;
    payload.user_id = user.id;
    payload.conversation_id = activeConversation;
    if (isReplying && !isEmpty(replayMsg)) {
      payload.parent_id = replayMsg.id;
      let parent = findDataById(replayMsg.id, messagesQueryData.data.messages)
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
        <div className="fixed bg-[#edf2fb] dark:bg-gray-800 z-40 top-0 right-0 bottom-0 left-0 lg:relative col-span-9 lg:h-screen lg:col-span-6 grid grid-rows-6">
          <div className={`${disableChat ? 'row-span-6' : 'row-span-5'} h-full grid grid-rows-6`}>
            <Head />
            {activeConversation ? (
              <Bubbles />
            ) : (
              <Preview />
            )}

            <AnimatePresence>
              {isReplying && (
                <ReplayTo message={replayMsg} />
              )}
            </AnimatePresence>
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