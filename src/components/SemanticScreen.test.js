/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import SemanticScreen from './SemanticScreen'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SemanticScreen />, div)
  ReactDOM.unmountComponentAtNode(div)
})
