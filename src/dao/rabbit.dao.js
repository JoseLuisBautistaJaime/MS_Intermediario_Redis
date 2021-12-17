/* eslint-disable no-underscore-dangle */
import LOG from '../commons/logger'
import Rabbit from '../commons/rabbit'

const RabbitDAO = class {
  constructor(rabbitDto) {
    this._rabbitDto = rabbitDto
  }

  async createConnection() {
    if (!this._rbconnection) {
      this._rbconnection = new Rabbit(this._rabbitDto)
      await this._rbconnection.createConnection()
    }
  }

  publishMessage(message) {
    LOG.debug('Publicando mensaje en Queue')
    const messageOut = JSON.stringify(message)
    this._rbconnection.publisher.sendToQueue(
      this._rbconnection._queueOut,
      Buffer.from(messageOut)
    )
    LOG.debug('Mensaje publicado en Queue')
  }

  async ackMessage(message) {
    LOG.debug('acknowledgeMessage status: START ')
    this._rbconnection.consumer.ack(message)
    LOG.debug('acknowledgeMessage status: END ')
  }

  async nackMessage(message) {
    LOG.debug('nacknowledgeMessage status: START ')
    this._rbconnection.consumer.nack(message, false)
    LOG.debug('nacknowledgeMessage status: END ')
  }

  async consumeMessage(callback) {
    LOG.info('Inicia consumidor de mensajes: ', this._rabbitDto._queueIn)
    await this.createConnection()
    this._rbconnection.consumer.consume(this._rabbitDto._queueIn, async msg => {
      if (msg) {
        await callback(msg, this._rabbitDto._queueIn)
      }
    })
  }
}

module.exports = {
  RabbitDAO
}
