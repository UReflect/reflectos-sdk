let cron = require('node-cron')

export class Cron {
  tasks: CronTask[] = []

  startTask(task: CronTask) {
    let index = this.tasks.indexOf(task)
    if (index > -1) {
      task.getScheduleTask().start()
      return 0
    }
    return -1
  }

  pauseTask(task: CronTask) {
    let index = this.tasks.indexOf(task)
    if (index > -1) {
      task.getScheduleTask().stop()
      return 0
    }
    return -1
  }

  removeTask(task: CronTask) {
    let index = this.tasks.indexOf(task)
    if (index > -1) {
      task.getScheduleTask().destroy()
      this.tasks.splice(index, 1)
      return 0
    }
    return -1
  }

  addTask(task: CronTask) {
    this.tasks.push(task)
    return task
  }

  getTasks() {
    return this.tasks
  }
}

export class CronTask {
  private callback: () => void
  private execTime: string
  private scheduleTask: any

  constructor(execTime: string, callback: () => void) {
    if (!cron.validate(execTime)) {
      throw new Error("Le string n'est pas bon")
    }
    this.execTime = execTime
    this.callback = callback
    this.scheduleTask = cron.schedule(this.execTime, this.callback, false)
  }

  getScheduleTask() {
    return this.scheduleTask
  }

  getCallback() {
    return this.callback
  }

  getExecTime() {
    return this.execTime
  }
}
