import React from 'react'

const RenderPerson = ({ name, number, handleRemove }) => {
  return (
    <div>
      <li>
        {name} {number}
        <button onClick={handleRemove}>poista</button>
      </li>
    </div>

  )
}

export default RenderPerson