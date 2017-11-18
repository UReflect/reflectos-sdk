export class Calendar {
  events: Event[] = []

  constructor() {}

  addEvent(event: Event) {
    this.events.push(event)
  }

  getDayEvents(date: Date = new Date()) {
    var arr_tmp: any = []
    this.events.forEach(function(ev) {
      if (date.getDay() == ev.getDate().getDay()) {
        arr_tmp.push(ev)
      }
    })
    return arr_tmp
  }

  getMonthEvents(date: Date = new Date()) {
    var arr_tmp: any = []
    this.events.forEach(function(ev) {
      if (date.getMonth() == ev.getDate().getMonth()) {
        arr_tmp.push(ev)
      }
    })
    return arr_tmp
  }

  getYearEvents(date: Date = new Date()) {
    var arr_tmp: any = []
    this.events.forEach(function(ev) {
      if (date.getFullYear() == ev.getDate().getFullYear()) {
        arr_tmp.push(ev)
      }
    })
    return arr_tmp
  }

  getEvents() {
    return this.events
  }

  getEventsNumber() {
    return this.events.length
  }

  removeEvent(event: Event) {
    var index = this.events.indexOf(event)
    if (index > -1) {
      this.events.splice(index, 1)
      return 0
    }
    return -1
  }
}

export class Event {
  private name: string
  private place: string
  private description: string
  private date: Date

  constructor(
    name: string,
    date: Date = new Date(),
    place: string = '',
    description: string = ''
  ) {
    this.name = name
    this.description = description
    this.place = place
    this.date = date
  }

  setDescription(description: string) {
    this.description = description
  }

  getDescription() {
    return this.description
  }

  setName(name: string) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setDate(date: Date) {
    this.date = date
  }

  getDate() {
    return this.date
  }

  setPlace(place: string) {
    this.place = place
  }

  getPlace() {
    return this.place
  }
}
