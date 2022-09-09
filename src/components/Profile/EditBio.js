import React from 'react'

function EditBio({value, onCancel, onConfirm, handleChange}) {
  return (

    <span className="relative w-full md:w-3/5 border border-gray-200 rounded-corners self-center">
      <span className="text-xs bg-white px-2 absolute -top-2 left-4 text-gray-600">
        bio
      </span>
      <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none bg-transparent rounded-corners text-gray-600'
        name="bio"
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
      <span className="absolute -right-12 -bottom-2 flex gap-x-2 items-center">

        <span 
        onClick={onConfirm}
        className="text-xs hover:bg-emerald-50 hover:text-emerald-600 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center w-7 h-7 rounded-corners">
          <i className="fa-regular fa-check"></i>
        </span>

        <span 
        onClick={onCancel}
        className="text-xs hover:bg-red-50 hover:text-red-600 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center w-7 h-7 rounded-corners">
          <i className="fa-regular fa-xmark"></i>
        </span>
      </span>
    </span>

  )
}

export default EditBio