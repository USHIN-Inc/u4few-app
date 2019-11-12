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

  if (points.length === 0 && pointInputs.length === 0 && type === 'Focus') {
    setPointInputs([
      {
        id: uuidv4(),
        placeholderContent: 'Tap, type, or paste anywhere...'
      }
    ])
  }

  function handleClick (e) {
    e.preventDefault()

    if (pointInputs.length > 0 || (type === 'Focus' && points.length > 0)) {
      return
    }

    setPointInputs([
      ...pointInputs,
      {
        id: uuidv4()
      }
    ])
  }

  function handleDragEnter (e) {
    e.target.classList.add('bg-light')
  }

  function handleDragLeave (e) {
    e.target.classList.remove('bg-light')
  }

  function handleDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop (e) {
    e.preventDefault()
    e.target.classList.remove('bg-light')

    const content = e.dataTransfer.getData('text/plain').trim()

    if (content === '' || (type === 'Focus' && points.length > 0)) {
      return
    }

    setPoints([
      ...points,
      {
        id: uuidv4(),
        content: content,
        category: singularize(type).toLowerCase()
      }
    ])
  }

  function handlePointInputSubmit (e) {
    e.preventDefault()

    const content = e.target[0].value
    const id = e.target[0].id

    if (content === '' || (type === 'Focus' && points.length > 0)) {
      return
    }

    setPoints([
      ...points,
      {
        id: uuidv4(),
        content: content,
        category: singularize(type).toLowerCase()
      }
    ])

    setPointInputs(
      pointInputs.filter(point => point.id !== id)
    )
  }

  function handlePointInputBlur (e) {
    e.preventDefault()

    const content = e.target.value
    const id = e.target.id

    if (content === '' || (type === 'Focus' && points.length > 0)) {
      return
    }

    setPoints([
      ...points,
      {
        id: uuidv4(),
        content: content,
        category: singularize(type).toLowerCase()
      }
    ])

    setPointInputs(
      pointInputs.filter(point => point.id !== id)
    )
  }

  const displayedPoints = []
  points.forEach(n => {
    displayedPoints.push(
      <Point
        key={n.id}
        id={n.id}
        content={n.content}
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
        placeholderContent={n.placeholderContent}
        onPointInputSubmit={handlePointInputSubmit}
        onPointInputBlur={handlePointInputBlur}
      />
    )
  })

  return (
    <div
      className={'Region border ' + type}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className='RegionInner'>
        {displayedPoints}
        {displayedPointInputs}
      </div>
    </div>
  )
}

export default Region
