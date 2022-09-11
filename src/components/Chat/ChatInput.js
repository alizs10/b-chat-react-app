import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../Context/ChatContext'

function ChatInput() {

  const { handleSendMessage } = useContext(ChatContext)

  const [body, setBody] = useState("")
  const [canSend, setCanSend] = useState(false)

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (body.length > 0 && !canSend) {
        setCanSend(true)
      }

      if (body.length <= 0 && canSend) {
        setCanSend(false)
      }
    }

    return () => unmounted = true;
  }, [body])

  const onSend = () => {
    if (canSend && body.length > 0) {
      let res = handleSendMessage(body)
      if(res)
      {
        setBody("")
      }
    }
  }

  return (
    <div className="row-span-1 flex justify-between gap-x-2 lg:gap-x-4 items-center p-3">
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        className='p-3 resize-none bg-white shadow-xl h-full w-4/5 rounded-corners focus:outline-none placeholder:text-gray-400 text-gray-800 input-focus transition-all duration-300' placeholder='type here ...' />
      <div className='flex-center flex-col lg:flex-row gap-2 w-1/5'>

        <button
          onClick={onSend}
          disabled={!canSend}
          className={`w-8 h-8 md:w-10 md:h-10 text-xs lg:text-sm rounded-corners bg-white flex-center shadow-md ${canSend ? "transition-all duration-300 hover:bg-blue-50" : "opacity-60"}`}>
          <i className="fa-regular fa-paper-plane-top text-[#4361ee]"></i>
        </button>
        <span className='cursor-pointer w-8 h-8  md:w-10 md:h-10 text-xs lg:text-sm rounded-corners bg-white flex-center transition-all duration-300 shadow-md hover:bg-gray-50'>
          <i className="fa-regular fa-paperclip text-gray-600"></i>
        </span>
      </div>

    </div>
  )
}

export default ChatInput