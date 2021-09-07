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
    infoPrenda: {
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
      appenders: ['out', 'infoPrenda'],
      level: process.env.LOG_LEVEL || 'debug'
    }
  }
})
const LOG = log4JS.getLogger('infoPrenda')
LOG.level = process.env.LOG_LEVEL || 'debug'

LOG.debugJSON = (message, json) => {
  LOG.debug(`${message}: ${JSON.stringify(json)}`)
}

module.exports = LOG
