import { Calendar, Event } from '../src/calendar'

/**
 * HelloWorld
 */
describe('Calendar test', () => {
  set('calendar', () => new Calendar())
  set('name', () => 'lorem')
  set('place', () => 'ipsum')
  set('description', () => 'dolor')
  set('event', () => new Event(name, new Date(), place, description))

  it('Calendar is instantiable', () => {
    expect(calendar).toBeInstanceOf(Calendar)
  })

  it('Event is instantiable', () => {
    expect(event).toBeInstanceOf(Event)
  })

  beforeEach(() => {
    calendar.addEvent(event)
  })

  it('Event can be add', () => {
    expect(calendar.getEventsNumber()).toBe(1)

    let events = calendar.getEvents()

    events.forEach(function(ev) {
      expect(ev.getName()).toBe(name)
      expect(ev.getPlace()).toBe(place)
      expect(ev.getDescription()).toBe(description)
    })
  })

  it('Event can be remove', () => {
    expect(calendar.getEventsNumber()).toBe(1)

    expect(calendar.removeEvent(event)).toBe(0)

    expect(calendar.getEventsNumber()).toBe(0)
  })

  it('Trying to remove non existing event', () => {
    let event = new Event(name, new Date(), place, description)

    expect(calendar.removeEvent(event)).toBe(-1)
  })

  it("Trying to re set event's informations", () => {
    let events = calendar.getEvents()

    events.forEach(function(ev) {
      ev.setName('party')
      ev.setPlace('Paris')
      ev.setDescription('Bring food')
      ev.setDate(new Date('05/05/2018 19:10'))
      expect(ev.getName()).toBe('party')
      expect(ev.getPlace()).toBe('Paris')
      expect(ev.getDescription()).toBe('Bring food')
      expect(ev.getDate()).toEqual(new Date('05/05/2018 19:10'))
    })
  })

  it('Get events on current day', () => {
    let events = calendar.getDayEvents()
    expect(events.length).toBe(1)
  })

  it('Get events on current month', () => {
    let events = calendar.getMonthEvents()
    expect(events.length).toBe(1)
  })

  it('Get events on current year', () => {
    let events = calendar.getYearEvents()
    expect(events.length).toBe(1)
  })

  it('Get events on another day', () => {
    let events = calendar.getDayEvents(new Date('12/09/2017'))
    expect(events.length).toBe(1)

    calendar.addEvent(
      new Event('nouvel evenement', new Date('12/09/2017'), 'Paris')
    )
    expect(calendar.getDayEvents(new Date('12/09/2017')).length).toBe(2)
  })

  it('Get events on another month', () => {
    let events = calendar.getMonthEvents(new Date('12/10/2017'))
    expect(events.length).toBe(0)

    calendar.addEvent(
      new Event('nouvel evenement', new Date('12/10/2017'), 'Paris')
    )
    expect(calendar.getMonthEvents(new Date('12/10/2017')).length).toBe(1)
  })

  it('Get events on another year', () => {
    let events = calendar.getMonthEvents(new Date('12/10/2018'))
    expect(events.length).toBe(0)

    calendar.addEvent(
      new Event('nouvel evenement', new Date('12/10/2018'), 'Paris')
    )
    expect(calendar.getMonthEvents(new Date('12/10/2018')).length).toBe(1)
  })
})
