'use strict'

const Slackr = require('node-slackr')
const throat = require('throat')
const promiseRetry = require('promise-retry')

class Slack {
  constructor({webhookUrl, channel, iconUrl}) {
    this.slack = new Slackr(webhookUrl, {
      channel,
      icon_url: iconUrl,
      username: 'ChatWork'
    })
  }

  notifyMessages(messages) {
    return Promise.all(messages.map(throat(1, message => promiseRetry(() =>
      this.slack.notify(message.body)
    ))))
  }
}

module.exports = Slack
