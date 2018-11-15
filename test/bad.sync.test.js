const test = require('ava')
const got = require('got')

const { baseUrl } = require('../options')

test('should access GET /r/bad/sync', async t => {
  const { statusCode } = await t.throws(got.get(`${baseUrl}/r/bad/sync`))

  t.is(statusCode, 500)
})
