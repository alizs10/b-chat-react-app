import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { checkUsername } from '../../api/conversations'
import * as Yup from 'yup';
import { BChatContext } from '../../Context/BChatContext';
import { notify } from '../Helpers/notify';
import { useDispatch, useSelector } from 'react-redux';
import { addConversation } from '../../redux/slices/conversationsSlice';
import { findDataById } from '../Helpers/helpers';
import { AppContext } from '../../Context/AppContext';

import { motion } from 'framer-motion'

function NewConversationWindow({ handleClose }) {

  const { loading, setLoading, setProgress } = useContext(BChatContext)

  const [message, setMessage] = useState("")

  const { conversations } = useSelector(state => state.conversations)
  const { setActiveConversation } = useContext(AppContext)
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const { mutate } = useMutation(checkUsername, {
    onSuccess: (data) => {
      let newConversation = data?.data?.result?.conversation;
      let isExist = false;
      if (newConversation) {
        isExist = findDataById(newConversation.id, conversations);
        if (isExist) {
          console.log(isExist);
          setActiveConversation(isExist.id)
          handleClose()
        }
      } else {
        setMessage(data.data.error)
      }
      if (!isExist && newConversation) {
        queryClient.setQueryData(["conversations"], (oldQueryData) => {

          dispatch(addConversation(data.data.result.conversation))
          return {
            ...oldQueryData,
            data: {
              conversations: [...oldQueryData.data.conversations, data.data.result.conversation]
            }
          }
        })
        handleClose()

      }
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const validationSchema = Yup.object({
    username: Yup.string().required().matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'allowed chars: . _ a-z A-Z 0-9').min(6),
  })

  const handleCheckUsername = async () => {
    if (loading) {
      notify("can't send another request while there's one still in progress", "warning")
      return
    }
    setLoading(true)
    setProgress(70)

    try {
      let data = { username }
      let validatedData = await validationSchema.validate(data, { abortEarly: false })

      if (validatedData) {
        setError("")
        setLoading(true)
        setProgress(70)
        mutate(validatedData)
      }

    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        let validationErrors = {}
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        setError(validationErrors.username)
      }

    }
    setProgress(100)

  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      onClick={e => e.stopPropagation()}
      className='z-50 w-4/5 md:w-2/5 lg:w-1/5 px-5 py-3 rounded-corners flex-col gap-y-4 bg-white dark:bg-gray-800 shadow-lg'>
      <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-500 pb-1'>
        <span className="text-sm text-gray-800 dark:text-white">Start A New Conversation</span>
        <span onClick={() => handleClose(false)} className='cursor-pointer flex-center w-8 h-8 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white transition-all duration-300'>
          <i className="fa-regular fa-xmark"></i>
        </span>
      </div>

      <div className="mt-4 w-full flex flex-col gap-4 md:gap-2">
        {message && (
          <span className='text-center text-xs text-red-500'>{message}</span>
        )}
        <div className="col-span-9 text-sm text-gray-600 dark:text-gray-200">
          Insert Username:
        </div>
        <div className="text-gray-600 dark:text-gray-200 col-span-10 md:col-span-5 flex gap-x-2 items-center">
          <span>@</span>
          <input type="text" className='w-full border border-gray-200 dark:border-gray-500 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-600 dark:text-white'
            value={username}
            onChange={e => setUsername(e.target.value)}
            name="username"
          />
        </div>
        {error && (
          <span className='ml-3 text-xs text-red-500'>{error}</span>
        )}
        <button
          onClick={handleCheckUsername}
          disabled={loading} className={`mt-2 btn-hover w-full py-3 ${loading ? 'bg-gray-200' : 'bg-[#4361EE]'} text-white text-sm rounded-corners`}>
          Start Conversation
        </button>

      </div>
    </motion.div>
  )
}

export default NewConversationWindow