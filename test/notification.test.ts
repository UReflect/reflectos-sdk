import { Notification } from '../src/notification'

describe('Notification test', () => {
  set('notification', () => new Notification('title', 'type', 'text'))
  set('notification2', () => new Notification('title', 'type', 'text', 'icon'))

  it('Notification is instantiable', () => {
    expect(notification).toBeInstanceOf(Notification)
  })

  it('Notification2 is instantiable', () => {
    expect(notification).toBeInstanceOf(Notification)
  })

  it('Notification get title ', () => {
    expect(notification.getTitle()).toBe('title')
  })

  it('Notification get type', () => {
    expect(notification.getType()).toBe('type')
  })

  it('Notification get text', () => {
    expect(notification.getText()).toBe('text')
  })

  it('Notification get icon', () => {
    expect(notification.getIcon()).toBe('')
  })

  it('Notification set title ', () => {
    notification.setTitle('titleB')
    expect(notification.getTitle()).toBe('titleB')
  })

  it('Notification set type', () => {
    notification.setType('typeB')
    expect(notification.getType()).toBe('typeB')
  })

  it('Notification set text', () => {
    notification.setText('textB')
    expect(notification.getText()).toBe('textB')
  })

  it('Notification set icon', () => {
    notification.setIcon('iconB')
    expect(notification.getIcon()).toBe('iconB')
  })

  it('Notification emit to core', () => {
    notification.emit('origin', 3)
  })

  it('Notification emitAt to core', () => {
    jest.useFakeTimers()

    notification.emitAt('origin', 3, '* * * * * *')

    jest.runTimersToTime(1000 * 10 * 1)
  })
})
