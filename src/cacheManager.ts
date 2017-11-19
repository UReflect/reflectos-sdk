import fs from 'fs'

export class CacheManager {
  private cacheName: string
  private filePath: string

  constructor(cacheName: string) {
    if (!cacheName) {
      throw new Error('Missing first argument')
    }
    this.cacheName = cacheName
    this.filePath = '/tmp/UR/cache/' + cacheName + '-test'
  }

  store(name: string, value: string) {
    if (!name || !value) {
      throw new Error('Missing argument')
    }
    if (!fs.existsSync('/tmp/UR')) {
      fs.mkdirSync('/tmp/UR')
    }
    if (!fs.existsSync('/tmp/UR/cache')) {
      fs.mkdirSync('/tmp/UR/cache')
    }
    let self = this

    let exists = fs.existsSync(self.filePath)

    let obj: any
    if (exists) {
      let data = fs.readFileSync(self.filePath, 'utf8')
      let obj = JSON.parse(data) // now it an object
      obj[name] = value // add some data
      let json = JSON.stringify(obj) // convert it back to json
      fs.writeFileSync(self.filePath, json, 'utf8') // write it back
    } else {
      let obj: { [index: string]: string } = {}
      obj[name] = value
      let json = JSON.stringify(obj)
      fs.writeFileSync(self.filePath, json, 'utf8')
    }
    return true
  }

  get(name: string) {
    if (!name) {
      throw new Error('Missing argument')
    }

    const exists = fs.existsSync(this.filePath)

    if (!exists) {
      throw new Error("File doesn't exist")
    }

    let data = fs.readFileSync(this.filePath, 'utf8')
    let obj = JSON.parse(data) // now it an object
    if (obj[name] === undefined) return null
    return obj[name]
  }

  clear() {
    let exists = fs.existsSync(this.filePath)
    if (!exists) {
      throw new Error("File doesn't exist")
    }
    fs.unlinkSync(this.filePath)
    return true
  }
}
