
import {EventEmitter} from 'eventemitter3'

export const actions = {
  position: 'action:position',
  add: 'action:add'
}

export const signal = new EventEmitter()
