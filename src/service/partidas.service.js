import redis from 'redis'
import LOG from '../commons/logger'

const url = process.env.REDIS_URL
if (url === undefined) {
  LOG.error('Es necesaria la variable: REDIS_URL')
  process.exit(1)
}

const certBase64 = process.env.REDIS_CERT_BASE64
if (certBase64 === undefined) {
  LOG.error('Es necesaria la variable: REDIS_CERT_BASE64')
  process.exit(1)
}

const ca = Buffer.from(certBase64, 'base64').toString('utf-8')
const tls = { ca }

const client = redis.createClient(url, { tls })

client.on('connect', function onConect() {
  LOG.info(`Redis connected!!! on ${url}`)
})

module.exports = client
