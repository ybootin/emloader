import {IControlKeyHandler, IControlMapping, IJoystick} from '../model/IControls'
import EventEmiter from '../event/EventEmiter'

//namespace emloader {
  export default class Joystick extends EventEmiter implements IJoystick {
    static axes = [['left', 'right'], ['up', 'down']]

    // maps IControl keys as string like this control[button]
    static buttonMap = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', null, null, 'coin', 'start']

    static BUTTONMAPCHANGE: string = 'buttonmapchange'
    static DISCONNECTED: string = 'disconnected'
    static CONNECTED: string = 'connected'
    static CONTROLCHANGE: string = 'controlchange'

    private pressed = {}
    private loopId: number

    private sensibility: number = 0.5

    private customButtonMap: Array<string>

    private handler: IControlKeyHandler

    private gamepad: Gamepad

    private controlMapping: IControlMapping

    public setControlMapping(controlMapping: IControlMapping) {
      if (this.controlMapping !== controlMapping) {
        this.controlMapping = controlMapping
        this.emit(Joystick.CONTROLCHANGE)
      }
    }

    public getControlMapping(): IControlMapping {
      return this.controlMapping
    }

    public setKeyHandler(handler: IControlKeyHandler) {
      this.handler = handler
    }

    public getKeyHandler(): IControlKeyHandler {
      return this.handler
    }

    public connect(gamepad: Gamepad) {
      if (!this.isConnected()) {
        this.gamepad = gamepad

        let loop = () => {
          let gamepad = this.getGamepad()

          // handles axis press / release
          Joystick.axes.forEach((axe: Array<string>, index: number): void => {
            try {
              if (gamepad.axes[index] <= -this.sensibility || gamepad.axes[index] >= this.sensibility) {
                this.keyPress(gamepad.axes[index] <= -this.sensibility ? axe[0] : axe[1])
              } else if (this.pressed[axe[0]] || this.pressed[axe[1]]) {
                this.keyRelease(this.pressed[axe[0]] ? axe[0] : axe[1])
              }
            } catch (e) {} // prevent exception when disconnect
          })

          // handle key press/release
          this.getButtonMap().forEach((bt: string, index: number): void => {
            if (bt) {
              try {
                if (gamepad.buttons[index].pressed) {
                  this.keyPress(bt)
                } else if (this.pressed[bt]) {
                  this.keyRelease(bt)
                }
              } catch (e) {} // prevent exception when disconnect
            }
          })

          this.loopId = requestAnimationFrame(loop)
        }

        loop()

        // must be emit AFTER loop(), to have loopId setted
        this.emit(Joystick.CONNECTED)
      }
    }

    public disconnect() {
      cancelAnimationFrame(this.loopId)
      this.loopId = null
      this.gamepad = null
      this.controlMapping = null
      this.emit(Joystick.DISCONNECTED)
    }

    public isConnected(): boolean {
      return !!this.loopId
    }

    public getGamepad(): Gamepad {
      return this.gamepad ? navigator.getGamepads()[this.gamepad.index] : null
    }

    public getButtonMap(): Array<string> {
      return this.customButtonMap || Joystick.buttonMap
    }

    public setButtonMap(buttonMap: Array<string>) {
      if (buttonMap !== this.customButtonMap) {
        this.customButtonMap = buttonMap
        this.emit(Joystick.BUTTONMAPCHANGE)
      }
    }

    private keyPress(key: string) {
      if (this.handler) {
        this.pressed[key] = true
        this.handler.pressKey(this.controlMapping[key])
      }
    }

    private keyRelease(key: string) {
      if (this.handler) {
        this.pressed[key] = false
        this.handler.releaseKey(this.controlMapping[key])
      }
    }
  }
//}
