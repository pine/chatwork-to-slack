import test from 'ava'
import util from '../lib/util'

test('filterSinceDateTime', t => {
  const messages = [
    {
      message_id: 100,
      send_time: Math.floor(new Date('2016-04-30T00:00:00.000+0900').getTime() / 1000) // 1461942000
    },
    {
      message_id: 101,
      send_time: Math.floor(new Date('2016-04-30T00:00:01.000+0900').getTime() / 1000) // 1461942001
    },
    {
      message_id: 102,
      send_time: Math.floor(new Date('2016-04-30T00:00:02.000+0900').getTime() / 1000) // 1461942002
    }
  ]

  const sinceDateTime = new Date('2016-04-30T00:00:01.000+0900') // 1461942001
  const filteredMessages = util.filterSinceDateTime(messages, sinceDateTime)

  t.is(filteredMessages.length, 2)
  t.deepEqual(filteredMessages[0], messages[1])
  t.deepEqual(filteredMessages[1], messages[2])
})
