import React from 'react'
import './Node.css'

function Node (props) {
  const title = props.title || 'New Node'
  const titleExcerpt = (title.length > 8) ? title.substring(0, 5).trim() + '...' : title

  return (
    <div className='Node rounded bg-primary' data-toggle='tooltip' title={title}>
      <div>{titleExcerpt}</div>
    </div>
  )
}

export default Node
