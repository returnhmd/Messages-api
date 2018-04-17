const Koa = require('koa')
const consola = require('consola')
const settings = require('./settings')
const api = require('./api')
require('./mongoconnect')

const logApp = consola.withScope('Application')
const app = new Koa()

app.use(api.routes())

app.listen(settings.http.port, () => {
  logApp.start(`App listening on port ${settings.http.port}`)
})
