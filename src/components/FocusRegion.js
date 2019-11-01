import React from 'react'
import './FocusRegion.css'

function FocusRegion (props) {
  function handleDragStart (e) {
    e.dataTransfer.setData('text/plain', e.target.value)
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDragEnd (e) {
    e.target.value = ''
    e.target.focus()
  }

  return (
    <div className='FocusRegion border'>
      <input
        className='form-control'
        type='text'
        autoFocus
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </div>
  )
}

export default FocusRegion
