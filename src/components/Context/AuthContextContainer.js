import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import AuthContext from '../../Context/AuthContext'

function AuthContextContainer({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({})
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    
    let credentials = { username, password }

    let res = await login(credentials)

    if (!res.status) {
      setErrors(res.errors)
    } else {
      localStorage.setItem('token', res.token)
      setUser(res.user)
      navigate('/')
    }

  }

  const handleRegister = (data) => {
    console.log(data);
  }


  return (
    <AuthContext.Provider value={{
      isAuthenticated, setIsAuthenticated,
      user, setUser,
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