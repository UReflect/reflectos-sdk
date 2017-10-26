import HelloWorld from '../src/reflectos-sdk'

/**
 * HelloWorld
 */
describe('HelloWorld test', () => {
  set('hello', () => new HelloWorld('hello'))

  it('HelloWorld is instantiable', () => {
    expect(hello).toBeInstanceOf(HelloWorld)
  })

  it('HelloWorld can say hello', () => {
    expect(() => hello.sayHello()).toConsoleLog()
  })

  it('HelloWorld can say hello and return 0', () => {
    expect(hello.sayHello()).toBe(0)
  })

  it('HelloWorld can say goodbye', () => {
    expect(() => hello.sayGoodbye()).toConsoleLog()
  })

  it('HelloWorld stuff is hello', () => {
    expect(hello.getStuff()).toBe('hello')
  })
})
