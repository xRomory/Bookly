import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 z-50"></div>
    </div>
  )
}

export default LoadingSpinner