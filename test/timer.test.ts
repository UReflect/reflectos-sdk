import Timer from '../src/timer'

describe('Timer test', () => {
  set('callback_end', () => jest.fn())
  set('callback_during', () => jest.fn())
  set('timer', () => new Timer(60, 10, callback_end))

  it('Timer is instantiable', () => {
    expect(timer).toBeInstanceOf(Timer)
  })

  it('Timer can start', () => {
    jest.useFakeTimers()
    timer.start(callback_during)
    jest.runTimersToTime(120 * 1000)

    expect(callback_during).toHaveBeenCalledTimes(6)
    expect(callback_end).toHaveBeenCalled()
  })

  it("Timer can't start twice", () => {
    jest.useFakeTimers()
    var callback_1 = jest.fn()
    var callback_2 = jest.fn()

    timer.start(callback_1)
    expect(timer.start(callback_2)).toBe(-1)
    jest.runTimersToTime(120 * 1000)
    expect(callback_1).toHaveBeenCalledTimes(6)
    expect(callback_2).toHaveBeenCalledTimes(0)
  })

  it('Timer can restart', () => {
    jest.useFakeTimers()
    var callback_1 = jest.fn()
    var callback_2 = jest.fn()

    timer.start(callback_1)
    jest.runTimersToTime(30 * 1000)
    expect(callback_1).toHaveBeenCalledTimes(3)
    expect(timer.restart(callback_2)).toBe(0)
    jest.runTimersToTime(120 * 1000)
    expect(callback_2).toHaveBeenCalledTimes(6)
  })

  it("Timer can't restart if not started", () => {
    expect(timer.restart(jest.fn())).toBe(-1)
  })

  it('Timer can pause', () => {
    jest.useFakeTimers()
    var callback_1 = jest.fn()

    timer.start(callback_1)
    jest.runTimersToTime(30 * 1000)

    var seconds = 30
    var parsedDate = new Date()
    var constantDate = new Date(parsedDate.getTime() + 1000 * seconds)
    Date = class extends Date {
      constructor() {
        return constantDate
      }
    }

    timer.pause()

    expect(callback_1).toHaveBeenCalledTimes(3)

    jest.runTimersToTime(30 * 1000)

    expect(callback_1).toHaveBeenCalledTimes(3)

    timer.start(callback_1)

    jest.runTimersToTime(120 * 1000)

    // expect(callback_1).toHaveBeenCalledTimes(6) normally
    expect(callback_1).toHaveBeenCalledTimes(9)
  })

  it('Timer can reset', () => {
    jest.useFakeTimers()
    var callback_1 = jest.fn()

    timer.start(callback_1)
    jest.runTimersToTime(30 * 1000)
    expect(callback_1).toHaveBeenCalledTimes(3)
    timer.reset()
    jest.runTimersToTime(60 * 1000)
    expect(callback_1).toHaveBeenCalledTimes(3)
  })
})
