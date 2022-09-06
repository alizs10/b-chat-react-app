import React, { useContext, useState } from 'react'
import SidebarContext from '../../Context/SidebarContext'
import Backdrop from '../Helpers/Backdrop'
import CenterContainer from '../Helpers/CenterContainer'
import Profile from '../Profile/Profile'
import Settings from '../Settings/Settings'
import AlertsPopup from './Head/AlertsPopup'
import UserPopup from './Head/UserPopup'
import SearchInChat from './SearchInChat'

function Head() {

    const [userPopupVisibility, setUserPopupVisibility] = useState(false)
    const [alertsPopupVisibility, setAlertsPopupVisibility] = useState(false)
    const [profileVisibility, setProfileVisibility] = useState(false)
    const [settingsVisibility, setSettingsVisibility] = useState(true)

    const { setSidebarVisibility } = useContext(SidebarContext)

    return (
        <>
            <div className="z-20 row-span-1 border-b border-gray-200 bg-white grid grid-cols-9">
                <div className="lg:hidden col-span-1 flex-center">
                    <span onClick={() => setSidebarVisibility(true)} className="cursor-pointer text-lg md:text-2xl text-gray-800 p-3 h-fit rounded-corners hover:bg-gray-100 transition-all duration-300">
                        <i className="fa-regular fa-angle-right"></i>
                    </span>
                </div>
                <SearchInChat />
                <div className="col-span-3 lg:col-span-2 flex justify-end gap-x-2 lg:gap-x-6 mr-2 lg:mr-4 items-center">
                    <span onClick={() => setAlertsPopupVisibility(true)} className={`cursor-pointer text-gray-600 text-lg lg:text-2xl relative p-2 rounded-corners transition-all duration-300 ${alertsPopupVisibility && "bg-gray-100"}`}>
                        <i className='fa-regular fa-bell'></i>
                        <span className='absolute bottom-2 right-0 w-2 h-2 rounded-full bg-yellow-500'></span>
                        {alertsPopupVisibility && (
                            <Backdrop handleClick={setAlertsPopupVisibility} toggler={alertsPopupVisibility}>
                                <AlertsPopup />
                            </Backdrop>
                        )}
                    </span>
                    <div onClick={() => setUserPopupVisibility(true)} className={`relative cursor-pointer transition-all duration-300 p-2 rounded-corners ${userPopupVisibility && "bg-gray-100"}`}>
                        <img className='rounded-corners w-12 lg:w-14 lg:h-fit' src='/assets/images/user-profile-1.webp' />
                        <span className='absolute bottom-1 right-1 bg-white p-[3px] flex-center rounded-full'>
                            <span className='w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-500'></span>
                        </span>
                        {userPopupVisibility && (
                            <Backdrop handleClick={setUserPopupVisibility} toggler={userPopupVisibility}>
                                <UserPopup settingsToggler={setSettingsVisibility} profileToggler={setProfileVisibility} />
                            </Backdrop>
                        )}
                    </div>
                </div>
            </div>

            <Backdrop toggler={profileVisibility} handleClick={setProfileVisibility}>
                <CenterContainer element={<Profile handleClose={setProfileVisibility}/>} handleClick={setProfileVisibility}/>
            </Backdrop>

            <Backdrop toggler={settingsVisibility} handleClick={setSettingsVisibility}>
                <CenterContainer element={<Settings handleClose={setSettingsVisibility}/>} handleClick={setSettingsVisibility}/>
            </Backdrop>
        </>
    )
}

export default Head