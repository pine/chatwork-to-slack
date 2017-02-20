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

      const stringMessageIds = messages
        .map(message => message.message_id.toString())
      const integerMessageIds = messages
        .map(message => Number(message.message_id))
        .filter(id => Number.isInteger(id))
      const messageIds = [...integerMessageIds, ...stringMessageIds]

      const savedMessages = yield collection.find({
        message_id: { $in: messageIds }
      }).toArray()

      const savedStringMessageIds = savedMessages
        .map(message => message.message_id.toString())
      const savedIntegerMessageIds = savedMessages
        .map(message => Number(message.message_id))
        .filter(id => Number.isInteger(id))
      const savedMessageIds = [...savedStringMessageIds, ...savedIntegerMessageIds]

      return messages.filter(message =>
        !savedMessageIds.includes(message.message_id)
      )
    })
  }
}

module.exports = Database
