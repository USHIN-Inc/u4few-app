import React from 'react'
import './Point.css'

function Point (props) {
  const title = props.title || 'New Point'
  const titleExcerpt = (title.length > 8) ? title.substring(0, 5).trim() + '...' : title

  return (
    <div className='Point rounded bg-primary'>
      <div data-toggle='tooltip' title={title}>{titleExcerpt}</div>
    </div>
  )
}

export default Point
