import Timer from '../src/timer'

describe('Timer test', () => {
  set('callbackEnd', () => jest.fn())
  set('callbackDuring', () => jest.fn())
  set('timer', () => new Timer(60, 10, callbackEnd))

  it('Timer is instantiable', () => {
    expect(timer).toBeInstanceOf(Timer)
  })

  it('Timer can start', () => {
    jest.useFakeTimers()
    timer.start(callbackDuring)
    jest.runTimersToTime(120 * 1000)

    expect(callbackDuring).toHaveBeenCalledTimes(6)
    expect(callbackEnd).toHaveBeenCalled()
  })

  it("Timer can't start twice", () => {
    jest.useFakeTimers()
    let callback1 = jest.fn()
    let callback2 = jest.fn()

    timer.start(callback1)
    expect(timer.start(callback2)).toBe(-1)
    jest.runTimersToTime(120 * 1000)
    expect(callback1).toHaveBeenCalledTimes(6)
    expect(callback2).toHaveBeenCalledTimes(0)
  })

  it('Timer can restart', () => {
    jest.useFakeTimers()
    let callback1 = jest.fn()
    let callback2 = jest.fn()

    timer.start(callback1)
    jest.runTimersToTime(30 * 1000)
    expect(callback1).toHaveBeenCalledTimes(3)
    expect(timer.restart(callback2)).toBe(0)
    jest.runTimersToTime(120 * 1000)
    expect(callback2).toHaveBeenCalledTimes(6)
  })

  it("Timer can't restart if not started", () => {
    expect(timer.restart(jest.fn())).toBe(-1)
  })

  it('Timer can pause', () => {
    jest.useFakeTimers()
    let callback1 = jest.fn()

    timer.start(callback1)
    jest.runTimersToTime(30 * 1000)

    let seconds = 30
    let parsedDate = new Date()
    let constantDate = new Date(parsedDate.getTime() + 1000 * seconds)
    Date = class extends Date {
      constructor() {
        return constantDate
      }
    }

    timer.pause()

    expect(callback1).toHaveBeenCalledTimes(3)

    jest.runTimersToTime(30 * 1000)

    expect(callback1).toHaveBeenCalledTimes(3)

    timer.start(callback1)

    jest.runTimersToTime(120 * 1000)

    // expect(callback1).toHaveBeenCalledTimes(6) normally
    expect(callback1).toHaveBeenCalledTimes(9)
  })

  it('Timer can reset', () => {
    jest.useFakeTimers()
    let callback1 = jest.fn()

    timer.start(callback1)
    jest.runTimersToTime(30 * 1000)
    expect(callback1).toHaveBeenCalledTimes(3)
    timer.reset()
    jest.runTimersToTime(60 * 1000)
    expect(callback1).toHaveBeenCalledTimes(3)
  })
})
