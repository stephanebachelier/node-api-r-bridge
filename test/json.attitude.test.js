const test = require('ava')
const got = require('got')

const { baseUrl } = require('../options')

test('should access GET /r/json/attitude', async t => {
  const { statusCode, body } = await got.get(`${baseUrl}/r/json/attitude`, {
    json: true
  })

  t.is(statusCode, 200)

  t.deepEqual(body, [
    { group: '(40,55]', rating: 46.7143, advance: 41.1429 },
    { group: '(55,70]', rating: 64.6154, advance: 41.9231 },
    { group: '(70,85]', rating: 77.2, advance: 45.5 }
  ])
})
