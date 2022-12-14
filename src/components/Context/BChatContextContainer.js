import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import { BChatContext } from '../../Context/BChatContext'

function BChatContextContainer({ children }) {

  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(70)
 
  return (
    <BChatContext.Provider value={{
      loading, setLoading,
      progress, setProgress
    }}>
      {children}
      {loading && (
        <LoadingBar color={'#4361EE'} progress={progress}
          onLoaderFinished={() => {
            setProgress(0)
            setLoading(false)
          }} />
      )}
      <ToastContainer />
    </BChatContext.Provider>
  )
}

export default BChatContextContainer