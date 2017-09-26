
import {BaseTexture, Texture} from 'pixi.js'

export var sprites = [
  'rabbitv3_ash.png'
]

export const load = done => {
  return Promise.all(sprites
    .map(img => new Promise((resolve, reject) => {
      const image = new window.Image()
      image.src = img
      image.onload = () => {
        const base = new BaseTexture(image)
        resolve(new Texture(base))
      }
    }))
  ).then(images => {
    sprites = images
    done()
  })
}

export const get = index => sprites[index]
