import React from 'react'
import Rim from './Rim'
import FocusRegion from './FocusRegion'
import './SemanticScreen.css'

function SemanticScreen (props) {
  const username = props.user.username
  const focus = props.focus || ''
  const focusNode = props.user.nodes.find(n => n.title === focus)

  const nodes = focusNode ? props.user.nodes.filter(n =>
    (n.parent_id === focusNode.id) || (n.id === focusNode.parent_id)
  ) : props.user.nodes.filter(n =>
    (n.parent_id === null)
  )

  return (
    <div className='SemanticScreen border'>
      <Rim label={username} nodes={nodes}>
        <FocusRegion node={focusNode} />
      </Rim>
    </div>
  )
}

export default SemanticScreen
