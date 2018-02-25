import { Cron, CronTask } from '../src/cron'

let cron = require('node-cron')

describe('Cron test', () => {
  set('callbackCron', () => jest.fn())
  set('crontab', () => new Cron(callbackCron))

  it('Cron is instantiable', () => {
    expect(crontab).toBeInstanceOf(Cron)
  })

  it('Cron can add task', () => {
    let task = crontab.addTask(new CronTask('* * * * * *', callbackCron))
    expect(task).toBeInstanceOf(CronTask)
  })

  it("Cron doesn't add task if string is not valid", () => {
    expect(() => {
      crontab.addTask(
        new CronTask('70 * * * * *', function() {
          console.log('ok')
        })
      )
    }).toThrow()
  })

  it('Cron can start a task', () => {
    let task = crontab.addTask(new CronTask('* * * * * *', callbackCron))

    jest.useFakeTimers()

    expect(crontab.startTask(task)).toBe(0) /// CAN START TASK

    expect(crontab.startTask(new CronTask('* * * * * *', callbackCron))).toBe(
      -1
    ) /// CAN'T START TASK THAT ISN'T INSIDE THE CRON

    jest.runTimersToTime(1000 * 10 * 1)

    expect(callbackCron).toHaveBeenCalledTimes(10)
  })

  it('Cron can pause a task', () => {
    let task = crontab.addTask(new CronTask('* * * * * *', callbackCron))

    jest.useFakeTimers()

    crontab.startTask(task)

    jest.runTimersToTime(1000 * 10 * 1)

    expect(callbackCron).toHaveBeenCalledTimes(10)

    expect(crontab.pauseTask(task)).toBe(0) /// CAN PAUSE TASK

    jest.runTimersToTime(1000 * 10 * 1)

    expect(callbackCron).toHaveBeenCalledTimes(10)

    crontab.startTask(task)

    jest.runTimersToTime(1000 * 10 * 1)

    expect(callbackCron).toHaveBeenCalledTimes(20)

    expect(crontab.pauseTask(new CronTask('* * * * * *', callbackCron))).toBe(
      -1
    ) /// CAN'T PAUSE TASK THAT ISN'T INSIDE THE CRON
  })

  it('Cron can remove a task', () => {
    let task = crontab.addTask(new CronTask('* * * * * *', callbackCron))

    jest.useFakeTimers()

    crontab.startTask(task)

    jest.runTimersToTime(1000 * 10 * 1)

    expect(callbackCron).toHaveBeenCalledTimes(10)

    expect(crontab.removeTask(task)).toBe(0) //// CAN REMOVE TASK

    expect(crontab.removeTask(task)).toBe(-1) /// CAN'T REMOVE TASK THAT ISN'T INSIDE THE CRON

    jest.runTimersToTime(1000 * 10 * 1)

    expect(callbackCron).toHaveBeenCalledTimes(10)

    crontab.startTask(task)

    jest.runTimersToTime(1000 * 10 * 1)

    expect(callbackCron).toHaveBeenCalledTimes(10)
  })

  it('Cron can retrieve task', () => {
    let test = new CronTask('* * * * * Wednesday', callbackCron)
    crontab.addTask(new CronTask('* * * * * Monday', callbackCron))
    crontab.addTask(new CronTask('* * * * * Tuesday', callbackCron))
    crontab.addTask(test)

    expect(test.getExecTime()).toBe('* * * * * Wednesday')

    expect(test.getCallback()).toBe(callbackCron)

    let tasks = crontab.getTasks()

    expect(tasks.length).toBe(3)

    tasks.forEach(function(ev) {
      expect(crontab.startTask(ev)).toBe(0)
    })
  })
})

// jest.useFakeTimers()
//
// var executed = 0;
// var executed2 = 0;
// var task = cron.schedule('* * * * * *', function(){executed++;}, true);
//
// var task = cron.schedule('* * * * * *', function(){executed2++;}, true);
// task.start();
//
// //    setInterval(function(){executed++;}, 1000);
//
// jest.runTimersToTime(1000 * 60 * 1);
//
// expect(executed).toBe(60);
// expect(executed2).toBe(60);
//
// //
// // expect(cron.start()).toBe(0);
// //
// // jest.runTimersToTime(1000 * 1000)
// //
// // expect(callbackCron).toHaveBeenCalledTimes(2)
//
