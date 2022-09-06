import React from 'react'

function CenterContainer({element, handleClick}) {
  return (
    <div onClick={() => handleClick(false)} className='bg-black/40 fixed top-0 right-0 bottom-0 left-0 z-40 flex-center'>
        {element}
    </div>
  )
}

export default CenterContainer