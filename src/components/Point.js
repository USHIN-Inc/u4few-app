import React from 'react'
import './Point.css'

function Point (props) {
  const content = props.content || 'New Point'
  const contentExcerpt = (content.length > 8) ? content.substring(0, 5).trim() + '...' : content

  function handleClick (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragStart (e) {
    console.log(e.target)
    e.dataTransfer.setData('text/plain', e.target.title)
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDragEnd (e) {
    console.log(e)
  }

  return (
    <div
      className='Point border rounded'
      draggable
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      title={content}
    >
      {contentExcerpt}
    </div>
  )
}

export default Point
