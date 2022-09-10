import { isEmpty, truncate } from 'lodash'
import React, { useContext } from 'react'
import ReplayContext from '../../Context/ReplayContext'

function ReplayTo({message}) {

    const {setIsReplaying, setReplayMsg} = useContext(ReplayContext)

    const handleCloseReplay = () => {
        setReplayMsg({})
        setIsReplaying(false)
    }

    return (
        <div className='self-end sticky bottom-0 left-0 right-0 border-y-2 border-gray-200  w-full z-20 grid grid-cols-12 bg-white p-3 text-xs text-gray-800'>
            <div className='flex flex-col gap-y-2 col-span-11'>
                <span className='text-xs text-gray-600'>Replay To: {isEmpty(message.writer.name) ? message.writer.username : message.writer.name}</span>
                <span className='text-sm  text-gray-800'>{truncate(message.body)}</span>
            </div>
            <span className='flex justify-end col-span-1 items-center h-fit'>
                <span 
                onClick={handleCloseReplay}
                className='cursor-pointer py-1 px-2 text-sm hover:bg-gray-100 rounded-corners transition-all duration-300 text-gray-800'>
                    <i className='fa-regular fa-xmark'></i>
                </span>
            </span>
        </div>
    )
}

export default ReplayTo