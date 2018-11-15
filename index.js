const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const ms = require('ms')

const debug = require('debug')
const { host, port } = require('./options')

const logError = debug('app:error')
const log = debug('app:log')

const bridge = require('./r-bridge')

router.get('/status', ctx => {
  ctx.body = 'ok'
})

router.get('/r/hello/sync', ctx => {
  ctx.body = bridge.foo()
})

router.get('/r/foo/sync/:input/:times', ctx => {
  const { input, times } = ctx.params

  ctx.body = bridge.foo(input, times)
})

router.get('/r/bar/async/:input/:times', async ctx => {
  const { input, times } = ctx.params

  ctx.body = await bridge.bar(input, times)
})
router.get('/r/baz/async/:input/:times', async ctx => {
  const { input, times } = ctx.params

  ctx.body = await bridge.baz(input, times)
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
