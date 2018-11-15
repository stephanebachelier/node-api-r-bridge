const test = require('ava')
const got = require('got')

const { baseUrl } = require('../options')

const getLetters = require('./helpers/letters')

const DEFAULT_INPUT = 'hello world'
const ITERATIONS = 20
const DEFAULT_LETTERS = getLetters(DEFAULT_INPUT)

test('should access GET /r/hello/sync', async t => {
  const { statusCode, body } = await got.get(`${baseUrl}/r/hello/sync`, {
    json: true
  })

  t.is(statusCode, 200)
  t.is(body.length, ITERATIONS)

  t.true(body.every(line => {
    t.deepEqual(getLetters(line), DEFAULT_LETTERS)
    return true
  }))
})
