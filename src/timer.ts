export default class Timer {
  private callback_end: () => void
  private timeout: number
  private interval: number
  private seconds: number = 0
  private timerId: number = 0
  private running: boolean = false
  private timeoutId: number = 0
  private startDate: Date

  constructor(timeout: number, interval: number, callback_end: () => void) {
    this.timeout = timeout
    this.interval = interval
    this.callback_end = callback_end
  }

  start(callback) {
    if (this.running == false) {
      this.running = true
      this.startDate = new Date()
      clearTimeout(this.timeoutId)
      clearTimeout(this.timerId)
      var self = this
      self.timerId = setInterval(function() {
        callback()
      }, self.interval * 1000)

      self.timeoutId = setTimeout(function() {
        clearInterval(self.timerId)
        self.seconds = 0
        self.running = false
        self.callback_end()
      }, this.timeout * 1000 - this.seconds * 1000)
    }
    return -1
  }

  pause() {
    clearInterval(this.timerId)
    clearTimeout(this.timeoutId)
    this.seconds = (new Date() - this.startDate) / 1000
    this.running = false
    return this.seconds
  }

  restart(callback) {
    if (this.running == true) {
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