
import React from 'react'

const Notification = ({ input }) => {

  if (input === null) {
    return null
  }
  
  return (
    <div className="message">
      {input}
    </div>
  )
}

export default Notification