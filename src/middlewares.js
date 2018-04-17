function formatValidationErrors(error) {
  return Object.values(error.errors)
    .reduce((result, curr) => [...result, curr.message], [])
    .join(' | ')
}

module.exports = {
  errorCatcher(logObj, defaultStatus = 500) {
    return async (ctx, next) => {
      try {
        await next()
      } catch (e) {
        const bodyResponce = {}

        if (e.name === 'ValidationError') {
          bodyResponce.status = 400
          bodyResponce.type = e.name
          bodyResponce.error = formatValidationErrors(e)
        } else {
          bodyResponce.status = e.status || defaultStatus
          bodyResponce.error = e.message
          if (logObj) logObj.error(e)
        }

        ctx.status = bodyResponce.status
        ctx.body = { ...bodyResponce }
      }
    }
  },
  customCors() {
    return async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*')
      await next()
    }
  },
}
