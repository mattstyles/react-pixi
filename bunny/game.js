
import {Application, Sprite} from 'pixi.js'

import {screen, physics} from './constants'
import {signal, actions} from './events'
import {get} from './resources'
import {rnd, rndInt} from './utils'

const {gravity, friction} = physics

const createBunny = () => {
  const texture = get(0)
  const sprite = new Sprite(texture)
  sprite.gravity = 0.75
  sprite.speedX = rnd(10)
  sprite.speedY = rnd(10) - 5
  sprite.position.x = rndInt(screen.width)
  sprite.position.y = rndInt(screen.height)
  return sprite
}

const update = bunnies => {
  var index = bunnies.length
  while (index--) {
    var b = bunnies[index]
    b.position.x += b.speedX
    b.position.y += b.speedY
    b.speedY += gravity

    if (b.position.x > screen.width) {
      b.speedX *= -1
      b.position.x = screen.width
    } else if (b.position.x < 0) {
      b.speedX *= -1
      b.position.x = 0
    }

    if (b.position.y > screen.height) {
      b.speedY *= friction
      b.position.y = screen.height
      if (Math.random() > 0.5) {
        b.speedY -= Math.random() * 6
      }
    } else if (b.position.y < 0) {
      b.speedY = 0
      b.position.y = 0
    }
  }
}

export const start = view => {
  const {width, height} = screen
  var app = new Application(width, height, {
    view,
    backgroundColor: 0x181818
  })

  var sprite = createBunny()
  var sprites = [sprite]
  app.stage.addChild(sprite)

  app.ticker.add(() => {
    update(sprites)
    app.renderer.render(app.stage)
  })

  signal.on(actions.add, () => {
    var num = 1000
    while (--num) {
      var sprite = createBunny()
      sprites.push(sprite)
      app.stage.addChild(sprite)
    }
  })

  return app
}
