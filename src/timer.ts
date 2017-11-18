export default class Timer {
  private callbackEnd: () => void
  private timeout: number
  private interval: number
  private seconds: number = 0
  private timerId: any
  private running: boolean = false
  private timeoutId: any
  private startDate: Date

  constructor(timeout: number, interval: number, callbackEnd: () => void) {
    this.timeout = timeout
    this.interval = interval
    this.callbackEnd = callbackEnd
  }

  start(callback: () => void) {
    if (this.running === false) {
      this.running = true
      this.startDate = new Date()
      clearTimeout(this.timeoutId)
      clearTimeout(this.timerId)
      let self = this
      self.timerId = window.setInterval(function() {
        callback()
      }, self.interval * 1000)

      self.timeoutId = window.setTimeout(function() {
        clearInterval(self.timerId)
        self.seconds = 0
        self.running = false
        self.callbackEnd()
      }, this.timeout * 1000 - this.seconds * 1000)
    }
    return -1
  }

  pause() {
    clearInterval(this.timerId)
    clearTimeout(this.timeoutId)
    this.seconds = (+new Date() - +this.startDate) / 1000
    this.running = false
    return this.seconds
  }

  restart(callback: () => void) {
    if (this.running === true) {
      clearInterval(this.timerId)
      clearTimeout(this.timeoutId)
      this.seconds = 0
      this.running = false
      this.start(callback)
      return 0
    }
    return -1
  }

  reset() {
    clearInterval(this.timerId)
    this.seconds = 0
    this.running = false
  }
}
