import React from 'react'
import Node from './Node'
import './SummaryRegion.scss'

function SummaryRegion (props) {
  const nodes = props.nodes || []
  const type = props.type || []
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
    <div className={'SummaryRegion border ' + type}>
      {displayedNodes}
    </div>
  )
}

export default SummaryRegion
