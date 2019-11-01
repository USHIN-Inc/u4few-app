import React from 'react'
import SummaryRegion from './SummaryRegion'
import './SummaryRim.scss'

function SummaryRim (props) {
  const nodes = props.nodes || []

  return (
    <div className='SummaryRim'>
      <SummaryRegion type='Facts' nodes={nodes.filter(n => n.category === 'fact')} />
      <SummaryRegion type='Merits' nodes={nodes.filter(n => n.category === 'merit')} />
      <SummaryRegion type='People' nodes={nodes.filter(n => n.category === 'person')} />
      <SummaryRegion type='Thoughts' nodes={nodes.filter(n => n.category === 'thought')} />
      {props.children}
      <SummaryRegion type='Actions' nodes={nodes.filter(n => n.category === 'action')} />
      <SummaryRegion type='Needs' nodes={nodes.filter(n => n.category === 'need')} />
      <SummaryRegion type='Feelings' nodes={nodes.filter(n => n.category === 'feeling')} />
      <SummaryRegion type='Topics' nodes={nodes.filter(n => n.category === 'topic')} />
    </div>
  )
}

export default SummaryRim
