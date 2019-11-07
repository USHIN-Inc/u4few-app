import React from 'react'
import Region from './Region'
import './Rim.scss'

function Rim (props) {
  const points = props.points || []
  const user = props.user || { id: 1, username: 'anonymous' }

  return (
    <div className='Rim'>
      <div className='banner'>{user.username}</div>
      <Region type='Facts' points={points.filter(n => n.category === 'fact')} />
      <Region type='Merits' points={points.filter(n => n.category === 'merit')} />
      <Region type='People' points={points.filter(n => n.category === 'person')} />
      <Region type='Thoughts' points={points.filter(n => n.category === 'thought')} />
      {props.children}
      <Region type='Actions' points={points.filter(n => n.category === 'action')} />
      <Region type='Needs' points={points.filter(n => n.category === 'need')} />
      <Region type='Feelings' points={points.filter(n => n.category === 'feeling')} />
      <Region type='Topics' points={points.filter(n => n.category === 'topic')} />
    </div>
  )
}

export default Rim
