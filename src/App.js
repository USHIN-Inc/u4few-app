import React from 'react'
import SemanticScreen from './components/SemanticScreen'
import './App.css'

function App () {
  return (
    <div className='App'>
      <SemanticScreen
        suser={testAppState.me}
        spoints={testAppState.me.points}
      />

    </div>
  )
}

const testAppState = {
  me: {
    username: 'alexg',
    rimColor: {
      text: '#111',
      background: '#eee'
    },
    points: [
      {
        id: 1,
        content: 'U4U',
        category: 'topic'
      },
      {
        id: 2,
        content: 'Frontend',
        category: 'topic'
      },
      {
        id: 4,
        content: '@alex Finish the frontend for U4U, like, soon!',
        category: 'action'
      },
      {
        id: 5,
        content: 'Development Team',
        category: 'person'
      },
      {
        id: 6,
        content: 'Alex Garcia',
        category: 'person'
      }
    ]
  },
  users: [
    {
      username: 'paula',
      rimColor: {
        text: '#fff',
        background: '#00f'
      },
      points: [
        {
          id: 1,
          content: 'U4U',
          category: 'topic'
        },
        {
          id: 2,
          content: 'Frontend',
          category: 'topic'
        },
        {
          id: 4,
          content: '@alex Finish the frontend for U4U, like, soon!',
          category: 'action'
        },
        {
          id: 5,
          content: 'Development Team',
          category: 'person'
        },
        {
          id: 6,
          content: 'Alex Garcia',
          category: 'person'
        }
      ]
    }
  ]
}

export default App
