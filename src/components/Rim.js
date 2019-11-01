import React from 'react'
import Region from './Region'
import './Rim.scss'

function Rim (props) {
  const nodes = props.nodes || []
  const user = props.user || { id: 1, username: 'anonymous' }

  return (
    <div className='Rim'>
      <div className='label bg-info rounded'>{user.username}</div>
      <Region type='Facts' nodes={nodes.filter(n => n.category === 'fact')} />
      <Region type='Merits' nodes={nodes.filter(n => n.category === 'merit')} />
      <Region type='People' nodes={nodes.filter(n => n.category === 'person')} />
      <Region type='Thoughts' nodes={nodes.filter(n => n.category === 'thought')} />
      {props.children}
      <Region type='Actions' nodes={nodes.filter(n => n.category === 'action')} />
      <Region type='Needs' nodes={nodes.filter(n => n.category === 'need')} />
      <Region type='Feelings' nodes={nodes.filter(n => n.category === 'feeling')} />
      <Region type='Topics' nodes={nodes.filter(n => n.category === 'topic')} />
    </div>
  )
}

export default Rim
