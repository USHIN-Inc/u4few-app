import React from 'react'
import SemanticScreen from './components/SemanticScreen'
import './App.css'

function App () {
  return (
    <div className='App'>
      <SemanticScreen
        user={USER}
      />
    </div>
  )
}

const USER = {
  id: 1,
  username: 'alexg',
  nodes: [
    {
      id: 1,
      title: 'U4U',
      category: 'topic',
      parent_id: null
    },
    {
      id: 2,
      title: 'Frontend',
      category: 'topic',
      parent_id: 5
    },
    {
      id: 4,
      title: '@alex Finish the frontend for U4U, like, soon!',
      category: 'action',
      parent_id: 2
    },
    {
      id: 5,
      title: 'Development Team',
      category: 'person',
      parent_id: 1
    },
    {
      id: 6,
      title: 'Alex Garcia',
      category: 'person',
      parent_id: 5
    }
  ]
}

export default App
