import { isEmpty, isNull } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkUsername, login } from '../../api/auth'
import AuthContext from '../../Context/AuthContext'
import { deleteUser, setUser } from '../../redux/slices/userSlice'

function AuthContextContainer({ children }) {

  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogin = async () => {

    let credentials = { username, password }

    let validation = {
      success: true,
      errors: {}
    };
    if (isEmpty(username)) {
      validation.success = false;
      validation.errors.username = ['username is required']
    }

    if (isEmpty(password)) {
      validation.success = false;
      validation.errors.password = ['password is required']
    }

    if (!validation.success) {
      setErrors(validation.errors)

    } else {

      let res = await login(credentials)

      if (!res.status) {
        setErrors(res.errors)
        dispatch(deleteUser())
      } else {
        localStorage.setItem('token', res.token)
        dispatch(setUser(res.user))
        navigate('/')
      }
    }

  }


  const handleRegister = (data) => {
    console.log(data);
  }


  return (
    <AuthContext.Provider value={{
      username, setUsername,
      email, setEmail,
      password, setPassword,
      passwordConfirmation, setPasswordConfirmation,
      handleLogin, handleRegister,
      errors, setErrors
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextContainer