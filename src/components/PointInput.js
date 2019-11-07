import React from 'react'
import './PointInput.css'

function PointInput (props) {
  const id = props.id || ''
  const title = props.title || 'New Point'

  return (
    <div className='PointInput'>
      <input
        className='form-control'
        type='text'
        autoFocus
        defaultValue={title}
        id={id}
      />
    </div>
  )
}

export default PointInput
