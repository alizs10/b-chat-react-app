import React from 'react'

import { motion } from 'framer-motion';

function Backdrop({ handleClick, toggler, children }) {
    return toggler ? (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(false)
                }} className="fixed z-30 top-0 right-0 bottom-0 left-0">
            </motion.div>
            {children}
        </>
    ) : null;
}

export default Backdrop