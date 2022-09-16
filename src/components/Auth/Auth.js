import React, { useContext } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BChatContext } from '../../Context/BChatContext'

function Auth() {

  const location = useLocation()
  const navigate = useNavigate()

  const { setLoading, setProgress } = useContext(BChatContext)

  const handleNavigateToLogin = () => {
    setLoading(true)
    setProgress(70)
    navigate('login')
  }
  return (
    <div className="w-screen h-screen bg-white flex-center flex-col gap-y-2">

      <span className='text-2xl lg:text-3xl font-bold'><span className="text-[#1C42EA]">BUSINESS </span>CHAT <i className="fa-regular fa-comment-dollar"></i></span>
      {location.pathname === "/auth" && (

        <button
          onClick={handleNavigateToLogin}
          className='mt-10 flex gap-x-2 items-center py-3 px-5 rounded-corners bg-[#4361EE] btn-hover text-white transition-all duration-300'>
          <span className='text-lg'>LET'S START</span>
          <i className="fa-regular fa-arrow-right text-base"></i>
        </button>

      )}

      <Outlet />
    </div>
  )
}

export default Auth