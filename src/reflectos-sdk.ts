// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

export default class HelloWorld {
  stuff: string

  constructor(stuff: string) {
    this.stuff = stuff
  }

  sayHello() {
    console.log('hi')
    return 0
  }

  sayGoodbye() {
    console.log('goodbye')
  }

  getStuff() {
    return this.stuff
  }
}
