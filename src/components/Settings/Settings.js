import React, { useState } from 'react'
import CheckBox from '../Helpers/CheckBox'

function Settings({ handleClose }) {

    const [privateAcc, setPrivateAcc] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [groupInvite, setGroupInvite] = useState(false)
    const [alwaysOffline, setAlwaysOffline] = useState(false)
    const [canSaveChanges, setCanSaveChanges] = useState(false)

    const handleTogglePrivateAcc = () => {
        setPrivateAcc(!privateAcc)
    }

    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const handleToggleGroupInvite = () => {
        setGroupInvite(!groupInvite)
    }

    const handleToggleAlwaysOffline = () => {
        setAlwaysOffline(!alwaysOffline)
    }

    return (
        <div
            onClick={e => e.stopPropagation()}
            className='w-full md:w-2/5 bg-white shadow-md rounded-corners p-3'>
            <div className='flex justify-between items-center border-b border-gray-200 pb-1'>
                <span className="flex gap-x-2 items-center text-gray-800">
                    <i className="fa-regular fa-gear text-base"></i>
                    <span className="text-sm">Settings</span>
                </span>
                <span onClick={() => handleClose(false)} className='cursor-pointer flex-center w-8 h-8 text-xs rounded-full hover:bg-gray-200 transition-all duration-300'>
                    <i className="fa-regular fa-xmark"></i>
                </span>
            </div>


            <div className='w-full mt-4  flex-center flex-col gap-y-2'>


                <span className="w-full flex justify-between text-xs">
                    <span className="flex gap-x-2 items-center text-sm text-gray-600">
                        <i className="fa-regular fa-lock"></i>
                        <span>Private Account</span>
                    </span>
                    <CheckBox handleToggle={handleTogglePrivateAcc} value={privateAcc} />
                </span>

                <span className="w-full flex justify-between text-xs">
                    <span className="flex gap-x-2 items-center text-sm text-gray-600">
                        <i className="fa-regular fa-people-group"></i>
                        <span>Let others invite you to groups</span>
                    </span>
                    <CheckBox handleToggle={handleToggleGroupInvite} value={groupInvite} />
                </span>

                <span className="w-full flex justify-between text-xs">
                    <span className="flex gap-x-2 items-center text-sm text-gray-600">
                        <i className="fa-regular fa-signal-slash"></i>
                        <span>Always offline</span>
                    </span>
                    <CheckBox handleToggle={handleToggleAlwaysOffline} value={alwaysOffline} />
                </span>

                <span className="w-full flex justify-between text-xs">
                    <span className="flex gap-x-2 items-center text-sm text-gray-600">
                        <i className="fa-regular fa-moon-stars"></i>
                        <span>Dark Mode</span>
                    </span>
                    <CheckBox handleToggle={handleToggleDarkMode} value={darkMode} />
                </span>
                <button disabled={!canSaveChanges} className={`${canSaveChanges ? 'bg-[#4361EE] btn-hover text-white' : 'bg-gray-200 text-gray-400'} mt-2 w-full py-2 flex-center rounded-corners flex justify-between text-sm`}>
                    Save Changes
                </button>
            </div>


        </div>
    )
}

export default Settings