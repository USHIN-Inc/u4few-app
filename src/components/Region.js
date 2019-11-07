import React, { useState } from 'react'
import Point from './Point'
import PointInput from './PointInput'
import './Region.scss'
import uuidv4 from 'uuid/v4'
import { singularize } from 'inflected'

function Region (props) {
  const type = props.type || ''
  const [points, setPoints] = useState(props.points || [])
  const [pointInputs, setPointInputs] = useState([])

  function handleOnClick (e) {
    e.preventDefault()

    if (pointInputs.length >= 1) {
      return
    }

    setPointInputs([
      ...pointInputs,
      {
        id: uuidv4(),
        title: 'New Point'
      }
    ])
  }

  function handleDragEnter (e) {
    e.target.classList.add('bg-dark')
  }

  function handleDragLeave (e) {
    e.target.classList.remove('bg-dark')
  }

  function handleDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop (e) {
    e.preventDefault()
    e.target.classList.remove('bg-dark')

    const title = e.dataTransfer.getData('text/plain').trim()

    if (title === '' || (type === 'Focus' && points.length > 0)) {
      return
    }

    setPoints([
      ...points,
      {
        id: uuidv4(),
        title: title,
        category: singularize(type).toLowerCase()
      }
    ])
  }

  const displayedPoints = []
  points.forEach(n => {
    displayedPoints.push(
      <Point
        key={n.id}
        id={n.id}
        title={n.title}
        category={n.category}
      />
    )
  })

  const displayedPointInputs = []
  pointInputs.forEach(n => {
    displayedPointInputs.push(
      <PointInput
        key={n.id}
        id={n.id}
        title={n.title}
      />
    )
  })

  return (
    <div
      className={'Region border ' + type}
      onClick={handleOnClick}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {displayedPoints}
      {displayedPointInputs}
    </div>
  )
}

export default Region
