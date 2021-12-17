const { messageRabbitDao } = require('./rabbit.service')

const publishMessage = async message => {
  messageRabbitDao.publishMessage(message)
}

module.exports = { publishMessage }
