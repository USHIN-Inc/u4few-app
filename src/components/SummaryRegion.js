import React from 'react'
import Point from './Point'
import './SummaryRegion.scss'

function SummaryRegion (props) {
  const points = props.points || []
  const type = props.type || []
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

  return (
    <div className={'SummaryRegion border ' + type}>
      {displayedPoints}
    </div>
  )
}

export default SummaryRegion
