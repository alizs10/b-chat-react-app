import React from 'react'

function LoginForm({setSignupFormVisibility, setLoginFormVisibility}) {
    
    
    const handleSwitchToSignup = () => {
        setSignupFormVisibility(true)
        setLoginFormVisibility(false)
    }

    return (
        <>
            <form className='mx-auto p-3 flex flex-col gap-y-2'>
                <div className='flex flex-col gap-y-2 mt-2'>
                    <label className="ml-3 text-sm text-gray-600">Username</label>
                    <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800' />
                </div>
                <div className='flex flex-col gap-y-2 mt-2'>
                    <label className="ml-3 text-sm text-gray-600">Password</label>
                    <input type="password" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800' />
                </div>
                <button type='submit' className='mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners bg-[#4361EE] btn-hover text-white transition-all duration-300'>
                    <span className='text-lg'>Login</span>
                    <i className="fa-regular fa-arrow-right-to-arc text-base"></i>
                </button>
            </form>
            <div className='flex gap-x-2 items-end text-sm mx-auto'>
                <span className="text-gray-600">Not a memeber?</span>
                <button onClick={() => handleSwitchToSignup()} className='text-[#1C42EA]'>Sign up!</button>
            </div>
        </>
    )
}

export default LoginForm