import React from 'react'
import SummaryRegion from './SummaryRegion'
import './SummaryRim.scss'

function SummaryRim (props) {
  const points = props.points || []

  return (
    <div className='SummaryRim'>
      <SummaryRegion type='Facts' points={points.filter(n => n.category === 'fact')} />
      <SummaryRegion type='Merits' points={points.filter(n => n.category === 'merit')} />
      <SummaryRegion type='People' points={points.filter(n => n.category === 'person')} />
      <SummaryRegion type='Thoughts' points={points.filter(n => n.category === 'thought')} />
      {props.children}
      <SummaryRegion type='Actions' points={points.filter(n => n.category === 'action')} />
      <SummaryRegion type='Needs' points={points.filter(n => n.category === 'need')} />
      <SummaryRegion type='Feelings' points={points.filter(n => n.category === 'feeling')} />
      <SummaryRegion type='Topics' points={points.filter(n => n.category === 'topic')} />
    </div>
  )
}

export default SummaryRim
