import { isEmpty } from 'lodash'
import React from 'react'

function Bio({value,onEdit}) {
    return (
        <span className="relative w-fit text-center border py-3 px-4 border-gray-200 rounded-corners self-center">
            <span className="text-xs bg-white px-2 absolute -top-2 left-4 text-gray-600">
                bio
            </span>
            <span className="text-xs text-gray-800">
                {isEmpty(value) ? 'something about yourself' : value}
            </span>
            <span
            onClick={onEdit}
            className="absolute -right-2 -bottom-2 text-xs hover:bg-yellow-50 hover:text-yellow-600 text-gray-600 transition-all duration-300 cursor-pointer shadow-md bg-white flex-center w-7 h-7 rounded-corners">
                <i className="fa-regular fa-pen"></i>
            </span>
        </span>
    )
}

export default Bio