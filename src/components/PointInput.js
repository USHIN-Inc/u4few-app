import React from 'react'
import './PointInput.css'

function PointInput (props) {
  const id = props.id || ''
  const placeholderContent = props.placeholderContent || ''

  return (
    <div className='PointInput'>
      <form onSubmit={props.onPointInputSubmit}>
        <textarea
          className='form-control'
          autoFocus
          id={id}
          placeholder={placeholderContent}
          onBlur={props.onPointInputBlur}
        />
      </form>
    </div>
  )
}

export default PointInput
