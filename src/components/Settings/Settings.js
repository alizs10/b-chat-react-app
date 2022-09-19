import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { getUserSettings, updateUserSettings } from '../../api/users'
import { BChatContext } from '../../Context/BChatContext'
import CheckBox from '../Helpers/CheckBox'
import { notify } from '../Helpers/notify'

function Settings({ handleClose }) {

    const { setLoading, setProgress } = useContext(BChatContext)
    const [canSaveChanges, setCanSaveChanges] = useState(false)
    const handleChangeSettings = (setting) => {
        let newValue = setting.value == 1 ? 0 : 1;
        setUserSettings({
            ...userSettings,
            [setting.name]: newValue
        })
        if (!canSaveChanges) setCanSaveChanges(true)
    }

    const { isLoading } = useQuery(['settings'], getUserSettings, {
        onSuccess: data => {
            setUserSettings(data.data.settings)
        }
    })
    const [userSettings, setUserSettings] = useState({
        private_account: 0,
        dark_theme: 0,
        invite_to_groups: 1,
        always_offline: 0,
    })

    const { mutate: updateUserSettingsMutate } = useMutation(updateUserSettings, {
        onSettled: data => {
            if (data.status == 200) {
                if (data.data.status) {
                    notify("your account's settings updated successfully", "success")
                } else {
                    console.log(data);
                }
            }
            setProgress(100)
        }
    })

    const handleUpdateSettings = () => {
        if (canSaveChanges) {

            let formData = new FormData;
            setLoading(true)
            setProgress(70)
            formData.append('_method', "PUT")
            formData.append('always_offline', userSettings.always_offline)
            formData.append('invite_to_groups', userSettings.invite_to_groups)
            formData.append('dark_theme', userSettings.dark_theme)
            formData.append('private_account', userSettings.private_account)
            updateUserSettingsMutate(formData)
        }
    }

    if (isLoading) return

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
                    <CheckBox handleToggle={handleChangeSettings} name='private_account' value={userSettings.private_account} />
                </span>

                <span className="w-full flex justify-between text-xs">
                    <span className="flex gap-x-2 items-center text-sm text-gray-600">
                        <i className="fa-regular fa-people-group"></i>
                        <span>Let others invite you to groups</span>
                    </span>
                    <CheckBox handleToggle={handleChangeSettings} name='invite_to_groups' value={userSettings.invite_to_groups} />
                </span>

                <span className="w-full flex justify-between text-xs">
                    <span className="flex gap-x-2 items-center text-sm text-gray-600">
                        <i className="fa-regular fa-signal-slash"></i>
                        <span>Always offline</span>
                    </span>
                    <CheckBox handleToggle={handleChangeSettings} name='always_offline' value={userSettings.always_offline} />
                </span>

                <span className="w-full flex justify-between text-xs">
                    <span className="flex gap-x-2 items-center text-sm text-gray-600">
                        <i className="fa-regular fa-moon-stars"></i>
                        <span>Dark Mode</span>
                    </span>
                    <CheckBox handleToggle={handleChangeSettings} name='dark_theme' value={userSettings.dark_theme} />
                </span>
                <button
                onClick={handleUpdateSettings}
                disabled={!canSaveChanges} className={`${canSaveChanges ? 'bg-[#4361EE] btn-hover text-white' : 'bg-gray-200 text-gray-400'} mt-2 w-full py-2 flex-center rounded-corners flex justify-between text-sm`}>
                    Save Changes
                </button>
            </div>


        </div>
    )
}

export default Settings