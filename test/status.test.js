const test = require('ava')
const got = require('got')

const { baseUrl } = require('../options')

test('should access GET /status', async t => {
  const { statusCode } = await got.get(`${baseUrl}/status`)

  t.is(statusCode, 200)
})
