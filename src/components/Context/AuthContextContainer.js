import React, { useState } from 'react'
import AuthContext from '../../Context/AuthContext'

function AuthContextContainer({ children }) {

  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")


  return (
    <AuthContext.Provider value={{
      username, setUsername,
      email, setEmail,
      password, setPassword,
      passwordConfirmation, setPasswordConfirmation,
      errors, setErrors,
      message, setMessage
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextContainer