import React from 'react'

function Backdrop({ handleClick, toggler, children }) {
    return toggler ? (
        <>
            <div onClick={(e) => {
                e.stopPropagation();
                handleClick(false)
            }} className="fixed z-30 top-0 right-0 bottom-0 left-0">
            </div>
            {children}
        </>
    ) : null;
}

export default Backdrop