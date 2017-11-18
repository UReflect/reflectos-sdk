var fs = require('fs')

export default class CacheManager {
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
    var self = this

    var exists = fs.existsSync(self.filePath)

    var obj: any
    if (exists) {
      var data = fs.readFileSync(self.filePath, 'utf8')
      obj = JSON.parse(data) //now it an object
      obj[name] = value //add some data
      json = JSON.stringify(obj) //convert it back to json
      fs.writeFileSync(self.filePath, json, 'utf8') // write it back
    } else {
      obj = {}
      obj[name] = value
      var json = JSON.stringify(obj)
      fs.writeFileSync(self.filePath, json, 'utf8')
    }
    return true
  }

  get(name: string) {
    if (!name) {
      throw new Error('Missing argument')
    }

    var exists = fs.existsSync(this.filePath)

    if (!exists) {
      throw new Error("File doesn't exist")
    }

    var data = fs.readFileSync(this.filePath, 'utf8')
    var obj: any
    obj = JSON.parse(data) //now it an object
    if (obj[name] === undefined) return null
    return obj[name]
  }

  clear() {
    var exists = fs.existsSync(this.filePath)
    if (!exists) {
      throw new Error("File doesn't exist")
    }
    fs.unlink(this.filePath)
    return true
  }
}
