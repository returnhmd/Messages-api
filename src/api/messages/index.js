const Router = require('koa-router')
const messagesRouter = require('./routers')

const router = new Router()
router.use('/messages', messagesRouter.routes())

module.exports = router
