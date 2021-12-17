import log4JS from 'log4js'
import httpContext from 'express-http-context'

log4JS.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d{ISO8601}] [%x{id}]%] [%[%-5.5p%]] - [%[%-18c%]] %m',
        tokens: {
          id: () => {
            return httpContext.get('reqId') || ''
          }
        }
      }
    },
    intermediario: {
      type: 'file',
      filename: './logs/api.log',
      layout: {
        type: 'pattern',
        pattern: '[%d{ISO8601}] [%x{id}]%] [%[%-5.5p%]] - [%[%-18c%]] %m',
        tokens: {
          id: () => {
            return httpContext.get('reqId') || ''
          }
        }
      }
    }
  },
  categories: {
    default: {
      appenders: ['out', 'intermediario'],
      level: process.env.LOG_LEVEL || 'debug'
    }
  }
})
const LOG = log4JS.getLogger('intermediario')
LOG.level = process.env.LOG_LEVEL || 'debug'

LOG.traceJSON = (message, json) => {
  LOG.trace(`${message}: ${JSON.stringify(json)}`)
}
LOG.debugJSON = (message, json) => {
  LOG.debug(`${message}: ${JSON.stringify(json)}`)
}

module.exports = LOG
