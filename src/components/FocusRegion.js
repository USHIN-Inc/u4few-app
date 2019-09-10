import React from 'react'
import './FocusRegion.css'

function FocusRegion (props) {
  const node = props.node || { id: null, title: '', category: '' }

  return (
    <div className='FocusRegion border'>
      <dl className='row'>
        <dt className='col-sm-3'>id</dt>
        <dd className='col-sm-9'>{node.id}</dd>
        <dt className='col-sm-3'>title</dt>
        <dd className='col-sm-9'>{node.title}</dd>
        <dt className='col-sm-3'>category</dt>
        <dd className='col-sm-9'>{node.category}</dd>
      </dl>
    </div>
  )
}

export default FocusRegion
