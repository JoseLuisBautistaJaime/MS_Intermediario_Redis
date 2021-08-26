const redis = require('redis')

let url = process.env.REDIS_URL;
if (url === undefined) {
  console.error('Es necesaria la variable: REDIS_URL')
  process.exit(1)
}

let cert_base64 = process.env.REDIS_CERT_BASE64;
if (cert_base64 === undefined) {
  console.error('Es necesaria la variable: REDIS_CERT_BASE64')
  process.exit(1)
}

let ca = Buffer.from(cert_base64, 'base64').toString('utf-8')
let tls = { ca }

var subscriber = redis.createClient(
  url,
  { tls }
)

subscriber.on('message', function (channel, message) {
  console.log('Message: ' + message + ' on channel: ' + channel + ' is arrive!');
})
subscriber.subscribe('infoprenda')