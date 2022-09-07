import React from 'react'

function ConfirmUI({ title, message, buttons, handleClose }) {

    const handleCancel = () => {
        buttons[1].onClick()
        handleClose()
    }
    
    const handleConfirm = () => {
        buttons[0].onClick()
        handleClose()
    }


    return (
        <div className='w-fit bg-white border-2 border-gray-200 shadow-md flex flex-col gap-y-2 rounded-corners p-5'>
            <span className='text-base font-bold text-gray-800'>{title}</span>
            <span className='mt-2 text-xs text-gray-600'>{message}</span>

            <div className="mt-4 flex gap-x-2">
                <button onClick={handleConfirm} className="px-3 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300">
                    <i className='fa-regular fa-trash text-xs'></i>
                    <span>{buttons[0].label}</span>
                </button>
                <button onClick={handleCancel} className="px-3 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-xs text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                    <i className='fa-regular fa-trash text-xs'></i>
                    <span>{buttons[1].label}</span>
                </button>
            </div>
        </div>
    )
}

export default ConfirmUI