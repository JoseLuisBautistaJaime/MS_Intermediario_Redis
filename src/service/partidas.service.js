import redis from 'redis'
import LOG from '../commons/logger'

const url = process.env.REDIS_URL
if (url === undefined) {
  LOG.error('Es necesaria la variable: REDIS_URL')
  process.exit(1)
}

const client = redis.createClient(url)

client.on('connect', function onConect() {
  LOG.info(`Redis connected!!! on ${url}`)
})

module.exports = client
