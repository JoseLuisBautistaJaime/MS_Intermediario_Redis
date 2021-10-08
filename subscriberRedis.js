const redis = require('redis')

let url = process.env.REDIS_URL;
if (url === undefined) {
  console.error('Es necesaria la variable: REDIS_URL')
  process.exit(1)
}

var subscriber = redis.createClient(url)

subscriber.on('message', function (channel, message) {
  console.log('Message: ' + message + ' on channel: ' + channel + ' is arrive!');
})
subscriber.subscribe('Infoprenda')