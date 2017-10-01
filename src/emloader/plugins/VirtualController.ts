import Joystick from '../controllers/Joystick'
import ControllerButton from './ControllerButton'
import ControllerSelector from './ControllerSelector'
import {IControlKeyHandler, IControlMapping} from '../model/IControls'
import Controllers from '../controllers/Controllers'
import KeyHandler from '../KeyHandler'
import HTMLHelper from '../helper/HTMLHelper'

namespace plugins {
  export class VirtualController {
    public joystick: Joystick
    public buttons: Array<ControllerButton> = new Array(222) //{[mameKey: string]: MameButton} = {}
    public keyHandler: IControlKeyHandler

    private mainContainer: HTMLElement
    private selector: ControllerSelector

    private baseClass: string = 'emloader-virtual-controller'

    private keyCodeId: Array<string> = new Array(222)

    constructor(public controllers: Controllers, public mapping: IControlMapping) {
      this.mainContainer = document.createElement('div')
      this.mainContainer.className = this.baseClass

      this.setJoystick(controllers.getJoystick(mapping))

      for (var controllerButton in mapping) {
        let keyCode: number = mapping[controllerButton]
        this.buttons[keyCode] = new ControllerButton(controllers, keyCode)
        this.keyCodeId[keyCode] = controllerButton
        this.mainContainer.appendChild(this.buttons[keyCode].getElement())
      }

      this.selector = new ControllerSelector(controllers, mapping, (joystick?: Joystick): void => {
        this.setJoystick(joystick)
      })

      this.mainContainer.appendChild(this.selector.getElement())

      this.updateButtons()

      // Handle keychange visually
      this.controllers.on(Controllers.KEYPRESS, (keyCode: number) => this.onKeyEvent(Controllers.KEYPRESS, keyCode))
      this.controllers.on(Controllers.KEYRELEASE, (keyCode: number) => this.onKeyEvent(Controllers.KEYRELEASE, keyCode))
    }

    public getElement(): HTMLElement {
      return this.mainContainer
    }

    public setKeyHandler(keyHandler: IControlKeyHandler) {
      this.keyHandler = keyHandler
    }

    public getKeyHandler(): IControlKeyHandler {
      return this.keyHandler
    }

    public setJoystick(joystick?: Joystick): void {
      this.joystick = joystick
      this.updateButtons()
    }

    public updateButtons() {
      for (var keyCode in this.buttons) {
        this.updateButton(this.buttons[keyCode], this.keyCodeId[keyCode])
      }
    }

    public updateButton(button: ControllerButton, buttonId: string): void {
      let keyName = KeyHandler.getKey(this.mapping[buttonId])
      let buttonClass = this.baseClass + '-button'
      let classes = [buttonClass, buttonClass + '-' + keyName, buttonClass + '-' + buttonId]

      if (this.joystick) {
        classes.push(buttonClass + '-gamepad')
      }

      button.getElement().className = classes.join(' ')

      switch (buttonId) {
        case 'coin':
        case 'start':
          // this is just a hack to have 1, 2, 3 ... instead of digit1, digit2 ... when use game pad
          button.setValue(buttonId.replace('coin', 'insert coin') + ' (' + keyName.replace('digit', '') + ')')
          break
        default:
          button.setValue(this.joystick ? buttonId.replace('button', '') : keyName)
      }
    }

    private onKeyEvent(eventName: string, keyCode: number) {
      if (this.buttons[keyCode]) {
        // Lazy button.addClass/removeClass(className)
        HTMLHelper[(eventName === Controllers.KEYPRESS ? 'add' : 'remove') + 'Class'](this.buttons[keyCode].getElement(), this.baseClass + '-button-pressed')
      }
    }
  }
}
