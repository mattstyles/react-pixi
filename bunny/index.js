
import React, {Component} from 'react'
import {render} from 'react-dom'

import element from './element'
import {screen} from './constants'
import {signal, actions} from './events'
import {start} from './game'
import {load} from './resources'

class Game extends Component {
  componentDidMount = () => {
    start(this.view)
  }

  setRef = view => {
    this.view = view
  }

  render () {
    const {width, height} = screen
    return (
      <canvas
        style={{position: 'absolute', top: 0, left: 0}}
        ref={this.setRef}
        {...{width, height}}
      />
    )
  }
}

const UI = props => (
  <div style={{position: 'relative'}}>
    <div
      onMouseDown={event => signal.emit(
        actions.add
      )}
    >Click Me</div>
  </div>
)

const App = props => (
  <div style={{flex: 1}}>
    <Game />
    <UI />
  </div>
)

load(() => {
  render(
    <App />,
    element
  )
})
