import React, { useState } from 'react'
import Backdrop from '../Helpers/Backdrop'
import AlertsPopup from './Head/AlertsPopup'
import UserPopup from './Head/UserPopup'
import SearchInChat from './SearchInChat'

function Head() {

    const [userPopupVisibility, setUserPopupVisibility] = useState(false)
    const [alertsPopupVisibility, setAlertsPopupVisibility] = useState(false)

    return (
        <div className="z-20 h-[6.5rem] border-b border-gray-200 bg-white grid grid-cols-8">
            <SearchInChat />
            <div className="col-span-1 flex gap-x-4 items-center">
                <span onClick={() => setAlertsPopupVisibility(true)} className='cursor-pointer text-gray-600 text-2xl relative'>
                    <i className='fa-regular fa-bell'></i>
                    <span className='absolute bottom-0 -right-1 w-2 h-2 rounded-full bg-yellow-500'></span>
                    {alertsPopupVisibility && (
                        <Backdrop handleClick={setAlertsPopupVisibility} toggler={alertsPopupVisibility}>
                            <AlertsPopup />
                        </Backdrop>
                    )}
                </span>
                <div onClick={() => setUserPopupVisibility(true)} className='relative cursor-pointer'>
                    <img className='rounded-corners w-14 h-fit' src='/assets/images/user-profile-1.webp' />
                    <span className='absolute -bottom-1 -right-0 bg-white p-[3px] flex-center rounded-full'>
                        <span className='w-3 h-3 rounded-full bg-emerald-500'></span>
                    </span>
                    {userPopupVisibility && (
                        <Backdrop handleClick={setUserPopupVisibility} toggler={userPopupVisibility}>
                            <UserPopup />
                        </Backdrop>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Head