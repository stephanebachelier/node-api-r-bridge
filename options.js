const port = process.env.PORT || 5000
const host = process.env.HOST || '127.0.0.1'

module.exports = {
  host,
  port,

  baseUrl: `http://${host}:${port}`
}
