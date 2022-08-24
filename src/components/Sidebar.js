import React from 'react'

function Sidebar() {
    return (
        <div className="bg-white col-span-3">

            <div className="h-[20%] flex flex-col gap-y-2 p-3">

                <span className='font-bold text-2xl py-2 block'><span className="text-[#4361ee]">B</span>CHAT</span>
                <button className="flex items-center w-full p-[7px] rounded-corners bg-[#5F7AF0] btn-hover text-white transition-all duration-300">
                    <span className='p-3 rounded-corners bg-[#4361EE] mr-2 px-4 flex-center'>
                    <i className="fa-regular fa-comment-medical text-2xl"></i>
                    </span>
                    <span className='text-center text-lg'>Start New Conversation</span>
                </button>

            </div>

            <div className='h-[calc(80%_-_8.5rem)] relative flex flex-col gap-y-2 pl-3 styled-scrollbar overflow-y-scroll'>

                <span className="bg-white/80 sticky top-0 block text-sm text-gray-600 pb-1 border-b border-gray-200">Conversations (8)</span>
                <ul className='mt-2 flex flex-col gap-y-2 mr-3 pb-3'>
                    <li className='cursor-pointer transition-all duration-300 hover:bg-gray-300 flex gap-2 w-full p-3 rounded-corners bg-gray-200 text-gray-700'>
                        <img className='rounded-corners w-[15%]' src='assets/images/user-profile-1.webp' />
                        <div className='w-[85%] flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>Matt LeBlanc</span>
                                <span className='text-sm text-gray-600'>2:14 pm</span>
                            </div>
                            <span className='text-sm'>How u doing?? Miss u man...</span>
                        </div>
                    </li>
                    <li className='cursor-pointer transition-all duration-300 hover:bg-gray-300 flex gap-2 w-full p-3 rounded-corners bg-gray-200 text-gray-700'>
                        <img className='rounded-corners w-[15%]' src='assets/images/user-profile-1.webp' />
                        <div className='w-[85%] flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>Matt LeBlanc</span>
                                <span className='text-sm text-gray-600'>2:14 pm</span>
                            </div>
                            <span className='text-sm'>How u doing?? Miss u man...</span>
                        </div>
                    </li>
                    <li className='cursor-pointer transition-all duration-300 hover:bg-gray-300 flex gap-2 w-full p-3 rounded-corners bg-gray-200 text-gray-700'>
                        <img className='rounded-corners w-[15%]' src='assets/images/user-profile-1.webp' />
                        <div className='w-[85%] flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>Matt LeBlanc</span>
                                <span className='text-sm text-gray-600'>2:14 pm</span>
                            </div>
                            <span className='text-sm'>How u doing?? Miss u man...</span>
                        </div>
                    </li>
                    <li className='cursor-pointer transition-all duration-300 hover:bg-gray-300 flex gap-2 w-full p-3 rounded-corners bg-gray-200 text-gray-700'>
                        <img className='rounded-corners w-[15%]' src='assets/images/user-profile-2.webp' />
                        <div className='w-[85%] flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>Cristiano</span>
                                <span className='text-sm text-gray-600'>yesterday</span>
                            </div>
                            <span className='text-sm'>Hello Goat!!! Siuuuuuu</span>
                        </div>
                    </li>
                    <li className='cursor-pointer transition-all duration-300 hover:bg-gray-300 flex gap-2 w-full p-3 rounded-corners bg-gray-200 text-gray-700'>
                        <img className='rounded-corners w-[15%]' src='assets/images/user-profile-3.webp' />
                        <div className='w-[85%] flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>David Beckham</span>
                                <span className='text-sm text-gray-600'>yesterday</span>
                            </div>
                            <span className='text-sm'>So HANDSOME...</span>
                        </div>
                    </li>
                    <li className='cursor-pointer transition-all duration-300 hover:bg-gray-300 flex gap-2 w-full p-3 rounded-corners bg-gray-200 text-gray-700'>
                        <img className='rounded-corners w-[15%]' src='assets/images/user-profile-4.webp' />
                        <div className='w-[85%] flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>Johnny Depp</span>
                                <span className='text-sm text-gray-600'>2022/08/25</span>
                            </div>
                            <span className='text-sm'>Congratulations man!!! Big Victory</span>
                        </div>
                    </li>
                    <li className='cursor-pointer transition-all duration-300 hover:bg-gray-300 flex gap-2 w-full p-3 rounded-corners bg-gray-200 text-gray-700'>
                        <img className='rounded-corners w-[15%]' src='assets/images/user-profile-5.webp' />
                        <div className='w-[85%] flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>Mehran Modiri</span>
                                <span className='text-sm text-gray-600'>2022/08/16</span>
                            </div>
                            <span className='text-sm'>LEGEND!</span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar