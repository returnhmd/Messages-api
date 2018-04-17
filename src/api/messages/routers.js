const Router = require('koa-router')
const MessageModel = require('./model')
const settings = require('../../settings')

const router = new Router()

router.post('/', async ctx => {
  const { body } = ctx.request
  const { id } = await MessageModel(body).save()
  ctx.status = 201
  ctx.body = { _id: id }
})

router.get('/list/:pagination', async ctx => {
  const { pagination } = ctx.params

  if (!/^[0-9]{1,20}$/.test(pagination.toString())) {
    ctx.throw(418)
  }

  const { docsInOnePage } = settings.api.messages
  const foundMessages = await MessageModel.find()
    .skip(pagination * docsInOnePage)
    .limit(docsInOnePage)

  if (!foundMessages.length) {
    ctx.throw(404)
  }

  ctx.body = foundMessages
})

router.get('/single/:messageId', async ctx => {
  const { messageId } = ctx.params
  const foundMessage = await MessageModel.wrapperFindById(messageId)

  if (!foundMessage) {
    ctx.throw(404)
  }

  ctx.body = foundMessage
})

module.exports = router
