
import {Application, Text} from 'pixi.js'

import {screen} from './constants'
import {signal, actions} from './events'

const MSG = 'Hello'

export const start = view => {
  const {width, height} = screen
  var app = new Application(width, height, {
    view,
    backgroundColor: 0x1099bb
  })

  var text = new Text(MSG)
  text.anchor.set(0.5)
  text.x = width * 0.5
  text.y = height * 0.5

  app.stage.addChild(text)

  app.ticker.add(dt => {
    text.rotation += dt * 0.1
  })

  signal.on(actions.position, ({x, y}) => Object.assign(text, {x, y}))

  return app
}
