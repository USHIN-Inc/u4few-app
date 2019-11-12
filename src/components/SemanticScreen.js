import React from 'react'
import Rim from './Rim'
import SummaryRim from './SummaryRim'
import Region from './Region'
import './SemanticScreen.css'

function SemanticScreen (props) {
  const user = props.user || { id: 1, username: 'anonymous', rimColor: { background: 'inherit', text: 'inherit' } }
  const points = props.points || []

  return (
    <div className='SemanticScreen border'>
      <SummaryRim>
        <Rim user={user} points={points}>
          <Region type='Focus' />
        </Rim>
      </SummaryRim>
    </div>
  )
}

export default SemanticScreen
