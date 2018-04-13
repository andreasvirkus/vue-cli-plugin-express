const winston = require('winston')
const moment = require('moment')
const split = require('split')
const morgan = require('morgan')

function getLogLevel() {
  if (process.env.LOG_LEVEL) {
    return process.env.LOG_LEVEL.toLowerCase()
  }
  return 'info'
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: getLogLevel(),
      handleExceptions: true,
      formatter: (options) => {
        const logMessage = {
          timestamp: moment().utc().toISOString(),
          level: options.level.toUpperCase(),
          log_message: (options.message ? options.message : (options.meta.name + ':' + options.meta.statusCode))
        }
        if (options.meta && options.meta.stack) {
          logMessage.stack_trace = options.meta.stack
        }
        return JSON.stringify(logMessage)
      }
    })
  ],
  exitOnError: false
})

morgan.token('customFormat', (req, res) => {
  const method = req.method
  const url = req.orginalUrl || req.url
  const host = req.headers.host
  const referrer = req.headers['referer'] || req.headers['referrer']
  const status = res.statusCode

  return `${method} ${url} | from ${host} | to ${referrer} | status ${status}`
})

logger.morgan = morgan(':customFormat', {
  stream: split().on('data', (message) => {
    logger.info(message)
  })
})

export default logger
