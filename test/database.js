import test from 'ava'
import mongodb from 'mongodb'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/test'

const MongoClient = {}
const Database = proxyquire('../lib/database.js', {
  mongodb: {MongoClient}
})

test.beforeEach(async t => {
  t.context.db = await mongodb.MongoClient.connect(MONGODB_URL)
  await t.context.db.dropDatabase()
})

test.after(async () => {
  const db = await mongodb.MongoClient.connect(MONGODB_URL)
  await db.dropDatabase()
})

test.serial('constructor', t => {
  const database = new Database({url: 'URL'})
  t.is(database.url, 'URL')
})

test.serial('connect', async t => {
  MongoClient.connect = sinon.spy(() => Promise.resolve('DB'))

  const database = new Database({url: 'URL'})
  await database.connect()

  t.true(MongoClient.connect.calledWith('URL'))
  t.is(database.db, 'DB')
})

test.serial('disconnect', async t => {
  const database = new Database({})
  database.db = {close: sinon.spy(() => Promise.resolve())}

  await database.disconnect()

  t.true(database.db.close.called)
})

test.serial('save', async t => {
  const database = new Database({})
  database.db = t.context.db

  const messages = [{message_id: 100, body: 'body'}]
  await database.save(messages)

  const collection = t.context.db.collection('messages')
  const savedMessages = await collection.find({message_id: 100}).toArray()
  t.is(savedMessages.length, 1)
  t.truthy(savedMessages[0]._id)
  t.is(savedMessages[0].message_id, 100)
  t.is(savedMessages[0].body, 'body')
})

test.serial('filterIfNotExist', async t => {
  const database = new Database({})
  database.db = t.context.db

  const messages = [
    {message_id: 100, body: 'body_100'},
    {message_id: 101, body: 'body_101'}
  ]
  const collection = t.context.db.collection('messages')
  await collection.insertOne(messages[0])

  const notExistedMessages = await database.filterIfNotExist(messages)
  t.is(notExistedMessages.length, 1)
  t.is(notExistedMessages[0].message_id, 101)
  t.is(notExistedMessages[0].body, 'body_101')
})
