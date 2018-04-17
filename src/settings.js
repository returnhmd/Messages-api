const path = require('path')

require('dotenv-safe').load({
  allowEmptyValues: true,
  path: path.join(__dirname, '..', '.env'),
  sample: path.join(__dirname, '..', '.env.example'),
})

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'
const isDev = NODE_ENV === 'development'

module.exports = {
  http: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.MONGODB_CONNECTION_STR,
  },
  env: {
    isProd,
    isTest,
    isDev,
  },
  api: {
    messages: {
      docsInOnePage: 10,
    },
  },
}
