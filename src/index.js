
import React, {Component} from 'react'
import {render} from 'react-dom'

import element from './element'
import {screen} from './constants'
import {signal, actions} from './events'
import {rnd} from './utils'
import {start} from './game'

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
    <button
      onClick={event => signal.emit(
        actions.position,
        {x: rnd(screen.width), y: rnd(screen.height)}
      )}
    >Click Me</button>
  </div>
)

const App = props => (
  <div style={{flex: 1}}>
    <Game />
    <UI />
  </div>
)

render(
  <App />,
  element
)
