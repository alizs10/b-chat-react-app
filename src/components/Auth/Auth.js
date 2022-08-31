import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function Auth() {

  const location = useLocation()
  const [loginFormVisibility, setLoginFormVisibility] = useState(false)
  const [signupFormVisibility, setSignupFormVisibility] = useState(false)

  return (
    <div className="w-screen h-screen bg-white flex-center flex-col gap-y-2">

      <span className='text-2xl lg:text-3xl font-bold'><span className="text-[#1C42EA]">BUSINESS </span>CHAT <i className="fa-regular fa-comment-dollar"></i></span>
      {location.pathname === "/auth" && (
        <Link to="login">
          <button className='mt-10 flex gap-x-2 items-center py-3 px-5 rounded-corners bg-[#4361EE] btn-hover text-white transition-all duration-300'>
            <span className='text-lg'>LET'S START</span>
            <i className="fa-regular fa-arrow-right text-base"></i>
          </button>
        </Link>
      )}

      <Outlet />
      {/* {loginFormVisibility && !signupFormVisibility && (<LoginForm setLoginFormVisibility={setLoginFormVisibility} setSignupFormVisibility={setSignupFormVisibility} />)}
      {signupFormVisibility && !loginFormVisibility && (<SignupForm setLoginFormVisibility={setLoginFormVisibility} setSignupFormVisibility={setSignupFormVisibility} />)} */}

    </div>
  )
}

export default Auth