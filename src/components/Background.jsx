import React from 'react'

const Background = ({children}) => {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600 px-4">
    {children}
  </div>
  )
}

export default Background