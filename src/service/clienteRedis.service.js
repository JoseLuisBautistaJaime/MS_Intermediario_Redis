import redis from 'redis'
import LOG from '../commons/logger'

const url = process.env.REDIS_URL
const canal = process.env.REDIS_CANAL
if (url === undefined) {
  LOG.error('Es necesaria la variable: REDIS_URL')
  process.exit(1)
}
if (canal === undefined) {
  LOG.error('Es necesaria la variable: REDIS_CANAL')
  process.exit(1)
}
const client = redis.createClient(url)


client.on('message', function (channel, message) {
  LOG.debugJSON(`Se obtiene mensaje:${message} en el canal: ${channel}`)
})
client.subscribe(canal)

module.exports = null
