const test = require('ava')
const got = require('got')

const { baseUrl } = require('../options')

const getLetters = require('./helpers/letters')

test('should access GET /r/bar/async', async t => {
  const input = 'Lorem ipsum dolor sit amet'
  const iterations = 42
  const letters = getLetters(input)

  const { statusCode, body } = await got.get(`${baseUrl}/r/bar/async/${input}/${iterations}`, {
    json: true
  })

  t.is(statusCode, 200)
  t.is(body.length, iterations)

  t.true(body.every(line => {
    t.deepEqual(getLetters(line), letters)
    return true
  }))
})
