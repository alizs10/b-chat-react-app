import React from 'react'
import { motion } from 'framer-motion';

function CenterContainer({ element, handleClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => handleClick(false)} className='bg-black/40 fixed top-0 right-0 bottom-0 left-0 z-50 flex-center'>
      {element}
    </motion.div>
  )
}

export default CenterContainer