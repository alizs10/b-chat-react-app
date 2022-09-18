import React, { useContext, useEffect, useRef, useState } from 'react'
import { mixed, object, ValidationError } from 'yup'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfirmUI from '../Helpers/ConfirmUI';
import { notify } from '../Helpers/notify';
import ProfileInformation from './ProfileInformation';
import Bio from './Bio';
import EditBio from './EditBio';
import EditProfileInformation from './EditProfileInformation';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { deleteAccount, deleteAvatar, updateBio, updateProfile, updateProfileInfo } from '../../api/profile';
import { setUser } from '../../redux/slices/userSlice';
import DeleteAccConfirmUI from './DeleteAccConfirmUI';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { BChatContext } from '../../Context/BChatContext';



function Profile({ handleClose }) {

  const { setLoading, setProgress } = useContext(BChatContext)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})
  const [avatar, setAvatar] = useState({})
  const [bio, setBio] = useState(user?.bio ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [username, setUsername] = useState(user?.username ?? "")
  const [name, setName] = useState(user?.name ?? "")

  const [isEditingBio, setIsEditingBio] = useState(false)
  const [isEditingProfileInformation, setIsEditingProfileInformation] = useState(false)

  const profilePhotoInputRef = useRef(null)
  const profilePhotoViewRef = useRef(null)

  const imageValidationSchema = object().shape({
    profile_photo: mixed().test("fileSize", "The image should be less than 2mb", (file) => {
      return file.size <= 2000000
    }).test("mimes", "supported mime types: jpeg, gif, png and webp", (file) => {
      let type = file.type;
      let allowedMimes = ['jpeg', 'jpg', 'png', 'webp'];
      let mime = type.split("/")[1]
      return allowedMimes.includes(mime);
    }),
  })

  const handleProfilePhotoChange = async e => {

    let file = e.target.files[0];
    setAvatar(file)
    let inputs = {
      profile_photo: file
    }

    try {
      let res = await imageValidationSchema.validate(inputs, { abortEarly: false })

      if (res) {

        // upload here
        let formData = new FormData;
        formData.append('profile_photo', res.profile_photo)
        formData.append('_method', "PUT")

        let response = await updateProfile(formData, setPhotoUploadProgress)

        if (response.status) {
          dispatch(setUser(response.data.user))
          notify("your profile photo updated successfully", "success")
        }

        if (response.errors) {
          notify("couldn't update your profile photo", "error")
          setErrors(response.errors)
          profilePhotoInputRef.current.value = null;
          setAvatar({})

        }


      }

    } catch (error) {
      if (error instanceof ValidationError) {
        let validationErrors = {}
        error.inner.forEach((err) => {

          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors)
      }
      profilePhotoInputRef.current.value = null;
      setAvatar({})
    }

  }

  const handleRemoveProfilePhoto = () => {

    let options = {
      title: 'Remove Profile Photo',
      message: 'Are you sure you want to remove your profile photo?',
      buttons: [
        {
          label: 'Yes, Delete it',
          onClick: () => {
            handleDeleteAvatar()
          }
        },
        {
          label: 'No',
          onClick: () => {
            notify("canceled", "warning")
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      overlayClassName: "overlay-custom-class-name",
      customUI: ({ onClose, title, message, buttons }) => {
        return <ConfirmUI handleClose={onClose} buttons={buttons} title={title} message={message} />
      }
    };

    // first user should confirm
    confirmAlert(options)
  }

  const handleDeleteAvatar = async () => {

    try {
      let res = await deleteAvatar()

      if (res.status) {
        console.log(res);
        dispatch(setUser(res.data.user))
        notify("your profile photo deleted successfully", "success")

      }

    } catch (error) {
      console.log(error);
    }


  }

  const handleCancelEditBio = () => {


    let options = {
      title: 'Cancel Edit Bio',
      message: 'Discard changes?',
      buttons: [
        {
          label: 'Yes, Cancel it',
          onClick: () => {
            setIsEditingBio(false)
            notify("canceled", "success")
          }
        },
        {
          label: 'Edit bio',
          onClick: () => {
            notify("canceled", "warning")
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      overlayClassName: "overlay-custom-class-name",
      customUI: ({ onClose, title, message, buttons }) => {
        return <ConfirmUI handleClose={onClose} buttons={buttons} title={title} message={message} />
      }
    };

    // first user should confirm
    confirmAlert(options)

  }
  const handleEditBio = () => {


    let options = {
      title: 'Update Bio',
      message: 'Save changes and update bio?',
      buttons: [
        {
          label: 'Update',
          onClick: () => {
            handleUpdateBio();
          }
        },
        {
          label: 'cancel',
          onClick: () => {
            notify("canceled", "warning")
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      overlayClassName: "overlay-custom-class-name",
      customUI: ({ onClose, title, message, buttons }) => {
        return <ConfirmUI handleClose={onClose} buttons={buttons} title={title} message={message} />
      }
    };

    // first user should confirm
    confirmAlert(options)

  }

  const handleUpdateBio = async () => {

    try {

      let formData = new FormData;
      formData.append('bio', bio)
      formData.append('_method', "put")
      let response = await updateBio(formData)
      if (response.status) {
        dispatch(setUser(response.data.user))
        setIsEditingBio(false)
        notify("your bio updated successfully", "success")
      }
    } catch (error) {

    }
  }

  const handleCancelEditProfileInformation = () => {

    let options = {
      title: 'Discard changes',
      message: 'Discard changes?',
      buttons: [
        {
          label: 'Discard changes',
          onClick: () => {
            setIsEditingProfileInformation(false)
            notify("Discard changes", "info")
          }
        },
        {
          label: 'continue editing',
          onClick: () => {
            notify("canceled", "warning")
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      overlayClassName: "overlay-custom-class-name",
      customUI: ({ onClose, title, message, buttons }) => {
        return <ConfirmUI handleClose={onClose} buttons={buttons} title={title} message={message} />
      }
    };

    // first user should confirm
    confirmAlert(options)

  }

  const handleEditProfileInformation = () => {


    let options = {
      title: 'Update Profile Information',
      message: 'Save changes and update information?',
      buttons: [
        {
          label: 'Update',
          onClick: () => {
            handleUpdateProfileInfo()
          }
        },
        {
          label: 'continue editing',
          onClick: () => {
            notify("canceled", "warning")
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      overlayClassName: "overlay-custom-class-name",
      customUI: ({ onClose, title, message, buttons }) => {
        return <ConfirmUI handleClose={onClose} buttons={buttons} title={title} message={message} />
      }
    };

    // first user should confirm
    confirmAlert(options)

  }

  const handleUpdateProfileInfo = async () => {

    try {

      let formData = new FormData;
      formData.append('name', name)
      formData.append('username', username)
      formData.append('email', email)
      formData.append('_method', "PUT")
      let response = await updateProfileInfo(formData)

      if (response.status) {
        dispatch(setUser(response.data.user))
        setIsEditingProfileInformation(false)
        setErrors({})
        notify("your information updated successfully", "success")

      }

      if (response.errors) {
        setErrors(response.errors)
        notify("Couldn't update your profile information", "error")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate: deleteAccountMutate } = useMutation(deleteAccount, {
    onSettled: (data, error) => {
      // request success
      if (data.status == 200) {
        if (data.data.status) {
          localStorage.removeItem('token')
          dispatch(setUser({}))
          navigate('/auth')
          setTimeout(() => {
            notify("your account deleted successfully", "success")
          }, 500)
        } else {
          notify(data.data.message, "error")
        }
      } else {
        console.log(error);
      }
      setProgress(100)
    }
  })

  const handleDeleteAcc = () => {

    let options = {
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          label: 'Yes, Delete My Account',
          onClick: async (pin) => {
            setLoading(true)
            setProgress(70)
            deleteAccountMutate({ password: pin })
          }
        },
        {
          label: 'cancel',
          onClick: () => {
            notify("canceled", "warning")
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [32],
      overlayClassName: "overlay-custom-class-name",
      customUI: ({ onClose, title, message, buttons }) => {
        return <DeleteAccConfirmUI handleClose={onClose} buttons={buttons} title={title} message={message} />
      }
    };

    // first user should confirm
    confirmAlert(options)

  }

  const [photoUploadProgress, setPhotoUploadProgress] = useState(0);

  useEffect(() => {
    if(photoUploadProgress == 100)
    {
      setTimeout(() => {
        setPhotoUploadProgress(0)
      }, 3000)
    }

  }, [photoUploadProgress])
  return (
    <div
      onClick={e => e.stopPropagation()}
      className="relative overflow-hidden w-full md:w-3/5 bg-white shadow-md rounded-corners p-3">
      
      <div style={{ width: `${photoUploadProgress}%`}} className={`absolute top-0 left-0 h-1 ${photoUploadProgress == 100 ? 'bg-emerald-400' : 'bg-[#4361EE]'} transition-all`}></div>
      
      <div className='flex justify-between items-center border-b border-gray-200 pb-1'>
        <span className="flex gap-x-2 items-center">
          <i className="fa-regular fa-circle-user text-base"></i>
          <span className="text-sm text-gray-800">Profile</span>
        </span>
        <span onClick={() => handleClose(false)} className='cursor-pointer flex-center w-8 h-8 text-xs rounded-full hover:bg-gray-200 transition-all duration-300'>
          <i className="fa-regular fa-xmark"></i>
        </span>
      </div>

      <div className='w-full py-2 flex flex-col gap-y-4'>
        <span className="self-center relative w-24">
          <img ref={profilePhotoViewRef} className='border-2 border-gray-200 rounded-corners w-24 h-24 object-cover object-center'
            src={isEmpty(user?.profile_photo) ? './assets/images/default-avatar.png' : process.env.REACT_APP_API_URL + '/storage/' + user?.profile_photo} />
          <div className="absolute -right-4 -bottom-2 flex flex-col gap-y-2">
            <span onClick={() => profilePhotoInputRef.current.click()} className="hover:bg-yellow-50 hover:text-yellow-600 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center text-xs w-7 h-7 rounded-corners">
              <i className="fa-regular fa-pen"></i>
              <input ref={profilePhotoInputRef}
                onChange={e => handleProfilePhotoChange(e)}
                name='profile-photo' type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" />
            </span>
            {!isEmpty(user.profile_photo) && (
              <span
                onClick={handleRemoveProfilePhoto}
                className="hover:bg-red-50 hover:text-red-500 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center text-xs w-7 h-7 rounded-corners">
                <i className="fa-regular fa-trash"></i>
              </span>
            )}
          </div>
        </span>
        {errors.profile_photo && (
          <span className="self-center text-xs text-red-500">{errors.profile_photo}</span>
        )}

        {isEditingBio ? (
          <EditBio value={bio} handleChange={setBio} onCancel={handleCancelEditBio} onConfirm={handleEditBio} />
        ) : (
          <Bio value={bio} onEdit={setIsEditingBio} />
        )}

        {isEditingProfileInformation ? (
          <EditProfileInformation errors={errors} name={name} email={email} username={username} handleName={setName} handleUsername={setUsername} handleEmail={setEmail} onCancel={handleCancelEditProfileInformation} onConfirm={handleEditProfileInformation} />
        ) : (
          <ProfileInformation name={name} email={email} username={username} onEdit={setIsEditingProfileInformation} />
        )}

        <div className="mb-4 self-center w-4/5 md:w-3/5 flex justify-end">
          <button
            onClick={handleDeleteAcc}
            className="px-3 py-2 flex-center gap-x-2 items-center border-2 rounded-corners text-xs text-gray-600 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300">
            <i className='fa-regular fa-trash text-xs'></i>
            <span>Delete Account</span>
          </button>
        </div>

      </div>

    </div>
  )
}

export default Profile