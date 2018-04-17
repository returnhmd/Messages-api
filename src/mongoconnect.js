const mongoose = require('mongoose')
const consola = require('consola')
const settings = require('./settings')

const logDb = consola.withScope('MondoDB')
mongoose.connect(`${settings.db.uri}`)
const conn = mongoose.connection

if (settings.env.isDev) mongoose.set('debug', true)

conn.on('open', () => {
  logDb.start(`Successfully connected to ${settings.db.uri}`)
})

conn.on('error', e => {
  logDb.error(e)
})
