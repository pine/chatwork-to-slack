'use strict'

const got = require('got')

class ChatWork {
  constructor({token}) {
    this.endpoint = 'https://api.chatwork.com/v1'
    this.token = token
  }

  request(path, options = {}) {
    const fullPath = this.endpoint + '/' + path.replace(/^\//, '')
    options.json = true
    options.headers = Object.assign({'X-ChatWorkToken': this.token}, options.headers)
    return got(fullPath, options)
  }
}

module.exports = ChatWork
