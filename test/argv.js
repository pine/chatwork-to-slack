import test from 'ava'
import proxyquire from 'proxyquire'

test('argv', t => {
  // throws because it has not required parameters.
  t.throws(() => {
    proxyquire('../lib/argv', {
      yargs: require('yargs')([])
        .exitProcess(false).showHelpOnFail(false)
    })
  })

  const argv = proxyquire('../lib/argv', {
    yargs: require('yargs')([
      '--chatwork-api-token=TOKEN',
      '--chatwork-room-id=ID',
      '--slack-webhook-url=URL'
    ])
  })

  t.is(argv['chatwork-api-token'], 'TOKEN')
  t.is(argv['chatwork-room-id'], 'ID')
  t.is(argv['slack-webhook-url'], 'URL')
})
