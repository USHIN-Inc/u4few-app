import React from 'react'
import Rim from './Rim'
import SummaryRim from './SummaryRim'
import FocusRegion from './FocusRegion'
import './SemanticScreen.css'

function SemanticScreen (props) {
  const user = props.user || { id: 1, username: 'anonymous' }
  const nodes = props.nodes || []

  return (
    <div className='SemanticScreen border'>
      <SummaryRim>
        <Rim user={user} nodes={nodes}>
          <FocusRegion />
        </Rim>
      </SummaryRim>
    </div>
  )
}

export default SemanticScreen
