import React from 'react'
import Node from './Node'
import './Region.scss'

function Region (props) {
  const nodes = []

  props.nodes.forEach(n => {
    nodes.push(
      <Node
        key={n.id}
        id={n.id}
        title={n.title}
        category={n.category}
      />
    )
  })

  const classVar = 'Region border ' + props.type

  return (
    <div className={classVar}>
      {nodes}
    </div>
  )
}

export default Region
