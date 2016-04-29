'use strict'

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .default('slack-channel')
  .default('slack-icon-url')
  .default('mongodb-url', 'mongodb://localhost/chatwork')
  .default('since-datetime', '1970-01-01T00:00:00.000Z')
  .demand([
    'chatwork-api-token',
    'chatwork-room-id',
    'slack-webhook-url'
  ])
  .argv

module.exports = argv
