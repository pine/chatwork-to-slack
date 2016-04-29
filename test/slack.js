import test from 'ava'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

const Slackr = sinon.spy()
const Slack = proxyquire('../lib/slack', {
  'node-slackr': Slackr
})

test('constructor', t => {
  const slack = new Slack({webhookUrl: 'URL', channel: 'CHANNEL', iconUrl: 'ICON'})

  t.true(slack.slack instanceof Slackr)
  t.true(Slackr.called)
  t.is(Slackr.args[0][0], 'URL')
  t.deepEqual(Slackr.args[0][1], {
    channel: 'CHANNEL',
    icon_url: 'ICON',
    username: 'ChatWork'
  })
})

test('notifyMessages', async t => {
  const slack = new Slack({})
  slack.slack = {notify: sinon.spy(() => Promise.resolve())}

  const messages = [{body: 'body'}]
  await slack.notifyMessages(messages)

  t.true(slack.slack.notify.called)
  t.is(slack.slack.notify.args[0][0], 'body')
})
