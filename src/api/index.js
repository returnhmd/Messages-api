const Router = require('koa-router')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const consola = require('consola')
const { errorCatcher, customCors } = require('../middlewares')
const messagesRouter = require('./messages')

const api = new Router()

api.use(logger())
api.use(errorCatcher(consola.withScope('API')))
api.use(customCors())
api.use(bodyParser())

api.use('/api', messagesRouter.routes())

module.exports = api
