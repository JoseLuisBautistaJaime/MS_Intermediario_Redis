const redis = require('redis')

const url = process.env.REDIS_URL
if (url === undefined) {
  console.error('Es necesaria la variable: REDIS_URL')
  process.exit(1)
}

const certBase64 = process.env.REDIS_CERT_BASE64
if (certBase64 === undefined) {
  console.error('Es necesaria la variable: REDIS_CERT_BASE64')
  process.exit(1)
}

const ca = Buffer.from(certBase64, 'base64').toString('utf-8')
const tls = { ca }

const subscriber = redis.createClient(url, { tls })

subscriber.on('message', function (channel, message) {
  console.log('Message: ' + message + ' on channel: ' + channel + ' is arrive!');
})
subscriber.subscribe('Infoprenda')
