'use strict'

const assert = require('assert')

exports.filterSinceDateTime = function (messages, sinceDateTime) {
  assert(sinceDateTime instanceof Date)

  const sinceEpoch = sinceDateTime.getTime()
  return messages.filter(message => message.send_time * 1000 >= sinceEpoch)
}
