const test = require('ava')
const got = require('got')

const { baseUrl } = require('../options')

test('should access GET /r/json/foo', async t => {
  const { statusCode, body } = await t.throws(
    got.get(`${baseUrl}/r/json/foo`, {
      json: true
    })
  )

  t.is(statusCode, 500)
  t.deepEqual(body, {
    message: 'ENOENT: no such file or directory, open \'r/foo.json\''
  })
})
