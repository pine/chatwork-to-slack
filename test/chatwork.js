import test from 'ava'
import nock from 'nock'
import pTimeout from 'p-timeout'
import ChatWork from '../lib/chatwork'

test('constructor', t => {
  const chatwork = new ChatWork({token: 'TOKEN'})
  t.is(chatwork.endpoint, 'https://api.chatwork.com/v2')
  t.is(chatwork.token, 'TOKEN')
})

test('request', async t => {
  nock('https://api.chatwork.com')
    .matchHeader('X-ChatWorkToken', 'TOKEN')
    .intercept('/v2/path', 'GET')
    .reply(200, `"body"`)

  const chatwork = new ChatWork({token: 'TOKEN'})
  const response = await pTimeout(chatwork.request('/path'), 100)

  t.is(response.body, 'body')
})
