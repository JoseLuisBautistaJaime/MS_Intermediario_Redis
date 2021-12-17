const { RabbitDAO } = require('../dao/rabbit.dao')
const { rabbitMessages } = require('../dto/rabbit.dto')

const messageRabbitDao = new RabbitDAO(rabbitMessages)

module.exports = {
  messageRabbitDao
}
