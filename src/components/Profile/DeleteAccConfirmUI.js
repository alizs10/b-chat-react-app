import { isEmpty } from 'lodash'
import React, { useState } from 'react'

function DeleteAccConfirmUI({ title, message, buttons, handleClose }) {

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleCancel = () => {
        buttons[1].onClick()
        handleClose()
    }

    const handleConfirm = () => {
        if (isEmpty(password)) {
            setError("password is required")
        } else {
            setError("")
            buttons[0].onClick(password)
            handleClose()

        }
    }


    return (
        <div className='w-fit bg-white border-2 border-gray-200 shadow-md flex flex-col gap-y-2 rounded-corners p-5'>
            <span className='text-base font-bold text-gray-800'>{title}</span>
            <span className='mt-2 text-xs text-gray-600'>{message}</span>
            <span className='mt-2 text-[13px] text-gray-800'>if you're sure, type your password:</span>
            <input autoFocus={true} type="password" className='w-full border border-gray-200 p-2 focus:outline-none bg-transparent rounded-corners text-gray-800 placeholder:text-gray-600 placeholder:text-[12px]'
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='type your password here'
            />

            {error && (
                <span className='text-xs text-red-500'>{error}</span>
            )}

            <div className="mt-4 flex gap-x-2">
                <button onClick={handleConfirm} className="px-3 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300">
                    <span>{buttons[0].label}</span>
                </button>
                <button onClick={handleCancel} className="px-3 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-xs text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                    <span>{buttons[1].label}</span>
                </button>
            </div>
        </div>
    )
}

export default DeleteAccConfirmUI