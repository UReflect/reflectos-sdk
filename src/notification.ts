import { Cron, CronTask } from './cron'

export class Notification {
  private title: string
  private type: string
  private text: string
  private icon: string
  private cron: Cron = new Cron()

  constructor(title: string, type: string, text: string, icon: string = '') {
    this.title = title
    this.type = type
    this.text = text
    this.icon = icon
  }

  emit(origin: string, level: number) {
    let _self = this

    SdkManager.interface.emitNotification(this.title, this.type, this.text)
  }

  emitAt(origin: string, level: number, cron: string) {
    let _self = this
    let cronTask: CronTask = new CronTask(cron, () =>
      SdkManager.interface.emitNotification(this.title, this.type, this.text)
    )
    this.cron.addTask(cronTask)
    this.cron.startTask(cronTask)
  }

  getTitle() {
    return this.title
  }

  getType() {
    return this.type
  }

  getText() {
    return this.text
  }

  getIcon() {
    return this.icon
  }

  setTitle(title: string) {
    this.title = title
  }

  setType(type: string) {
    this.type = type
  }

  setText(text: string) {
    this.text = text
  }

  setIcon(icon: string) {
    this.icon = icon
  }
}

///// CORE

export interface InterfaceNotifications {
  emitNotification(title: string, type: string, text: string): void
}

export class SdkManager {
  static interface: InterfaceNotifications = {
    emitNotification(title: string, type: string, text: string): void {
      console.log('')
    }
  }

  static init(mInterface: InterfaceNotifications) {
    this.interface = mInterface
  }
}
