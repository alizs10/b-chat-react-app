import React, { useContext, useState } from 'react'
import SidebarContext from '../../Context/SidebarContext'
import Backdrop from '../Helpers/Backdrop'
import AlertsPopup from './Head/AlertsPopup'
import UserPopup from './Head/UserPopup'
import SearchInChat from './SearchInChat'

function Head() {

    const [userPopupVisibility, setUserPopupVisibility] = useState(false)
    const [alertsPopupVisibility, setAlertsPopupVisibility] = useState(false)

    const {setSidebarVisibility} = useContext(SidebarContext)

    return (
        <div className="z-20 row-span-1 border-b border-gray-200 bg-white grid grid-cols-9">
            <div className="lg:hidden col-span-1 flex-center">
                <span onClick={() => setSidebarVisibility(true)} className="text-2xl text-gray-800 p-3 h-fit rounded-corners hover:bg-gray-100 transition-all duration-300">
                    <i className="fa-regular fa-angle-right"></i>
                </span>
            </div>
            <SearchInChat />
            <div className="col-span-3 lg:col-span-2 flex justify-end gap-x-6 mr-4 items-center">
                <span onClick={() => setAlertsPopupVisibility(true)} className={`cursor-pointer text-gray-600 text-2xl relative p-2 rounded-corners transition-all duration-300 ${alertsPopupVisibility && "bg-gray-100"}`}>
                    <i className='fa-regular fa-bell'></i>
                    <span className='absolute bottom-2 right-0 w-2 h-2 rounded-full bg-yellow-500'></span>
                    {alertsPopupVisibility && (
                        <Backdrop handleClick={setAlertsPopupVisibility} toggler={alertsPopupVisibility}>
                            <AlertsPopup />
                        </Backdrop>
                    )}
                </span>
                <div onClick={() => setUserPopupVisibility(true)} className={`relative cursor-pointer transition-all duration-300 p-2 rounded-corners ${userPopupVisibility && "bg-gray-100"}`}>
                    <img className='rounded-corners w-14 lg:h-fit' src='/assets/images/user-profile-1.webp' />
                    <span className='absolute bottom-1 right-1 bg-white p-[3px] flex-center rounded-full'>
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