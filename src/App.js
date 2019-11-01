import React from 'react'
import SemanticScreen from './components/SemanticScreen'
import './App.css'

function App () {
  return (
    <div className='App'>
      <SemanticScreen
        data={DATA}
      />
    </div>
  )
}

const DATA = {
  user: {
    id: 1,
    username: 'alexg'
  },
  nodes: [
    {
      id: 1,
      title: 'U4U',
      category: 'topic'
    },
    {
      id: 2,
      title: 'Frontend',
      category: 'topic'
    },
    {
      id: 4,
      title: '@alex Finish the frontend for U4U, like, soon!',
      category: 'action'
    },
    {
      id: 5,
      title: 'Development Team',
      category: 'person'
    },
    {
      id: 6,
      title: 'Alex Garcia',
      category: 'person'
    }
  ]
}

export default App
