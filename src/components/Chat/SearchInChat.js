import React from 'react'

function SearchInChat() {
    return (
        <div className='col-span-7 flex items-center px-4'>
            <div className='flex bg-[#E4E9FD] text-[#1C42EA] h-3/5 rounded-corners ml-10 w-1/2'>
                <span className='w-[20%] flex-center text-xl'>
                    <i className="fa-regular fa-magnifying-glass"></i>
                </span>
                <input type="text" className="w-[80%] text-lg h-full bg-transparent rounded-r-[25px] focus:outline-none placeholder:text-[#1C42EA]/60" placeholder='Search'/>

            </div>
        </div>
    )
}

export default SearchInChat