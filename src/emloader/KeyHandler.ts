import IModule from './model/IEmscriptenModule' 
import {KeyCode, KeyCodeKey} from './helper/KeyCode'
import {IControlKeyHandler} from './model/IControls'
import EventEmiter from './event/EventEmiter'
import {Emloader} from './Emloader'

//namespace emloader {
  export default class KeyHandler extends EventEmiter implements IControlKeyHandler {
    static KEYPRESS: string = 'keypress'
    static KEYRELEASE: string = 'keyrelease'

    static getKeyCode(key): number {
      return KeyCode[key]
    }

    static getKey(keyCode: number): string {
      return KeyCodeKey[keyCode]
    }

    static triggerKeyEvent(module: IModule, eventType: string, keyCode: number, charCode: number) {
      return Emloader.triggerEvent(module, eventType, {
        keyCode: keyCode,
        witch: keyCode,
        charCode: charCode
      })
    }

    constructor(private module: IModule) {
      super()
    }

    public pressKey(keyCode: number): void {
      KeyHandler.triggerKeyEvent(this.module, 'keydown', keyCode, 0)
      this.emit(KeyHandler.KEYPRESS, keyCode)
    }

    public releaseKey(keyCode: number): void {
      KeyHandler.triggerKeyEvent(this.module, 'keyup', keyCode, 0)
      this.emit(KeyHandler.KEYRELEASE, keyCode)
    }
  }

  export class FakeKeyHandler extends EventEmiter {
    public pressKey(keyCode: string): void {
      this.emit(KeyHandler.KEYPRESS, keyCode)
    }
    public releaseKey(keyCode: string): void {
      this.emit(KeyHandler.KEYRELEASE, keyCode)
    }
  }
//}
