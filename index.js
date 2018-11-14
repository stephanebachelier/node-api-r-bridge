const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const ms = require('ms')

const debug = require('debug')
const { host, port } = require('./options')

const logError = debug('app:error')
const log = debug('app:log')

router.get('/status', ctx => {
  ctx.body = 'ok'
})

const error = async (ctx, next) => {
  try {
    await next()
  } catch ({ message }) {
    ctx.status = 500
    ctx.body = message

    logError('error %s', message)
  }
}

const logger = async (ctx, next) => {
  const { path, method } = ctx
  const start = Date.now()

  await next()
  const { status } = ctx

  log('%s %s ~> %s [%s]', method.toUpperCase(), path, status, ms(Date.now() - start))
}

const app = new Koa()
app
  .use(error)
  .use(logger)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods({
    throw: true
  }))

app.listen({ port, host }, () => {
  log('Server bound on %s:%d', host, port)
})
