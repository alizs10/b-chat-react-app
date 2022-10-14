import { AnimatePresence } from 'framer-motion'
import { isEmpty } from 'lodash'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import SidebarContext from '../../Context/SidebarContext'
import Backdrop from '../Helpers/Backdrop'
import CenterContainer from '../Helpers/CenterContainer'
import Profile from '../Profile/Profile'
import Settings from '../Settings/Settings'
import AlertsPopup from './Head/AlertsPopup'
import UserPopup from './Head/UserPopup'
import SearchInChat from './SearchInChat'

function Head() {

    const { user } = useSelector(state => state.user)

    const [userPopupVisibility, setUserPopupVisibility] = useState(false)
    const [alertsPopupVisibility, setAlertsPopupVisibility] = useState(false)
    const [profileVisibility, setProfileVisibility] = useState(false)
    const [settingsVisibility, setSettingsVisibility] = useState(false)

    const { handleToggleSidebar } = useContext(SidebarContext)

    const [photoUploadProgress, setPhotoUploadProgress] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <>
            <div className="z-20 row-span-1 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 grid grid-cols-9">
                <div className="lg:hidden col-span-1 flex-center">
                    <span onClick={handleToggleSidebar} className="cursor-pointer text-lg md:text-2xl text-gray-800 dark:text-gray-200 p-3 h-fit rounded-corners hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                        <i className="fa-regular fa-angle-right"></i>
                    </span>
                </div>
                <SearchInChat />
                <div className="col-span-3 lg:col-span-2 flex justify-end gap-x-2 lg:gap-x-6 mr-2 lg:mr-4 items-center">
                    <span onClick={() => setAlertsPopupVisibility(true)} className={`cursor-pointer text-gray-600 dark:text-gray-200 text-lg lg:text-2xl relative p-2 rounded-corners transition-all duration-300 ${alertsPopupVisibility && "bg-gray-100 dark:bg-gray-600"}`}>
                        <i className='fa-regular fa-bell'></i>
                        <span className='absolute bottom-2 right-0 w-2 h-2 rounded-full bg-yellow-500 dark:bg-yellow-400'></span>
                        <AnimatePresence>
                            {alertsPopupVisibility && (
                                <Backdrop handleClick={setAlertsPopupVisibility} toggler={alertsPopupVisibility}>
                                    <AlertsPopup />
                                </Backdrop>
                            )}
                        </AnimatePresence>
                    </span>
                    <div onClick={() => setUserPopupVisibility(true)} className={`relative cursor-pointer transition-all duration-300 p-2 rounded-corners ${userPopupVisibility && "bg-gray-100 dark:bg-gray-600"}`}>
                        {!isImageLoaded && (
                            <span className='absolute top-0 right-0 bottom-0 left-0 bg-white rounded-corners flex-center'>
                                <MoonLoader color={'#4361EE'} loading={!isImageLoaded} size={30} />
                            </span>
                        )}
                        <img
                            onLoad={e => {
                                if (e.target.complete) {
                                    setIsImageLoaded(true)
                                }
                            }}
                            className='rounded-corners w-12 h-12 lg:w-14 lg:h-14 object-cover object-center' src={isEmpty(user?.profile_photo) ? './assets/images/default-avatar.png' : process.env.REACT_APP_API_URL + '/storage/' + user?.profile_photo} />
                        <span className='absolute bottom-1 right-1 bg-white dark:bg-gray-700 p-[3px] flex-center rounded-full'>
                            <span className='w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-500'></span>
                        </span>
                        <AnimatePresence>
                            {userPopupVisibility && (
                                <Backdrop handleClick={setUserPopupVisibility} toggler={userPopupVisibility}>
                                    <UserPopup settingsToggler={setSettingsVisibility} profileToggler={setProfileVisibility} />
                                </Backdrop>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {profileVisibility && (
                    <Backdrop toggler={profileVisibility} handleClick={setProfileVisibility}>
                        <CenterContainer element={<Profile handleClose={setProfileVisibility} />} handleClick={setProfileVisibility} />
                    </Backdrop>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {settingsVisibility && (
                    <Backdrop toggler={settingsVisibility} handleClick={setSettingsVisibility}>
                        <CenterContainer element={<Settings handleClose={setSettingsVisibility} />} handleClick={setSettingsVisibility} />
                    </Backdrop>
                )}
            </AnimatePresence>
        </>
    )
}

export default Head