import CacheManager from '../src/CacheManager'

let fs = require('fs')
const path = '/tmp/UR/cache/Cache1-test'

describe('CacheManager test', () => {
  set('cacheManager', () => new CacheManager('Cache1'))

  it('CacheManager is instantiable', () => {
    expect(cacheManager).toBeInstanceOf(CacheManager)
  })

  it('throws without argument', () => {
    expect(() => {
      let cacheManager = new CacheManager()
    }).toThrow()
  })

  it('set a value in cache', () => {
    expect(cacheManager.store('hello', '42')).toBe(true)
    expect(() => {
      cacheManager.store('hello')
    }).toThrow()
    expect(() => {
      cacheManager.store()
    }).toThrow()

    ///// CHECK IF YOU CAN STORE WITHOUT /UR/CACHE/ FOLDER
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
    fs.rmdirSync('/tmp/UR/cache/')
    fs.rmdirSync('/tmp/UR')
    expect(cacheManager.store('hello', '42')).toBe(true)
  })

  it('check if get throw errors', () => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path) //// REMOVE FILE IF EXIST
    }
    expect(() => {
      cacheManager.get()
    }).toThrow() /// TEST IF NO ARGUMENTS
    expect(() => {
      cacheManager.get('hello')
    }).toThrow() /// TEST IF FILE DOESN'T EXIST
  })

  it('check get value', () => {
    cacheManager.store('hello', '42')
    expect(cacheManager.get('hello')).toBe('42') /// TEST IF KEY EXIST
    expect(cacheManager.get('helloe')).toBe(null) /// TEST IF KEY DOESN'T EXIST
  })

  it('check clear', () => {
    cacheManager.store('hello', '42')
    expect(cacheManager.clear()).toBe(true)
    expect(() => {
      cacheManager.get('hello')
    }).toThrow() /// TEST IF FILE DOESN'T EXIST
    expect(() => {
      cacheManager.clear()
    }).toThrow()
  })
})
