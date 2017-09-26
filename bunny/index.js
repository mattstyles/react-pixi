
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

const UI = ({num}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }}
    onMouseDown={event => {
      event.preventDefault()
      signal.emit(actions.add)
    }
  }
  >
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        color: 'white'
      }}
    >
      {`Bunnies: ${num}`}
    </div>
  </div>
)

const App = props => (
  <div style={{flex: 1}}>
    <Game />
    <UI num={props.num} />
  </div>
)

load(() => {
  render(
    <App num={1} />,
    element
  )
})

signal.on('num', num => {
  render(
    <App num={num} />,
    element
  )
})
