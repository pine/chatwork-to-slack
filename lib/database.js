'use strict'

const co = require('co')
const {MongoClient} = require('mongodb')

class Database {
  constructor({url}) {
    this.url = url
  }

  connect() {
    const _this = this
    return co(function *() {
      _this.db = yield MongoClient.connect(_this.url)
    })
  }

  disconnect() {
    return this.db.close()
  }

  save(messages) {
    if (messages.length > 0) {
      const collection = this.db.collection('messages')
      return collection.insertMany(messages)
    }
    return Promise.resolve()
  }

  filterIfNotExist(messages) {
    const _this = this
    return co(function *() {
      const collection = _this.db.collection('messages')
      const savedMessages = yield collection.find({
        message_id: {
          $in: messages.map(message => message.message_id)
        }
      }).toArray()
      const savedMessageIds = savedMessages.map(message => message.message_id)

      return messages.filter(message =>
        !savedMessageIds.includes(message.message_id)
      )
    })
  }
}

module.exports = Database
