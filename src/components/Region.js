import React, { useState } from 'react'
import Node from './Node'
import './Region.scss'
import uuidv4 from 'uuid/v4'
import { singularize } from 'inflected'

function Region (props) {
  const type = props.type || ''
  const [nodes, setNodes] = useState(props.nodes || [])

  function handleDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    console.log(e)
  }

  function handleDragEnter (e) {
    e.target.classList.add('bg-light')
  }

  function handleDragLeave (e) {
    e.target.classList.remove('bg-light')
  }

  function handleDrop (e) {
    e.preventDefault()
    e.target.classList.remove('bg-light')

    let title = e.dataTransfer.getData('text/plain')
    title = title.trim()

    if (title === '') return

    setNodes([
      ...nodes,
      {
        id: uuidv4(),
        title: title,
        category: singularize(type).toLowerCase()
      }
    ])
  }

  const displayedNodes = []
  nodes.forEach(n => {
    displayedNodes.push(
      <Node
        key={n.id}
        id={n.id}
        title={n.title}
        category={n.category}
      />
    )
  })

  return (
    <div
      className={'Region border ' + type}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {displayedNodes}
    </div>
  )
}

export default Region
