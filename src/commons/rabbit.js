/* eslint-disable no-underscore-dangle */
import amqp from 'amqp-connection-manager'
import LOG from './logger'

class Rabbit {
  constructor(rabbitDto) {
    this._url = rabbitDto.url
    this._exchange = rabbitDto.exchange
    this._options = rabbitDto.optionsRabbit
    this._queueIn = rabbitDto.queueIn
    this._queueOut = rabbitDto.queueOut
    this._queueType = rabbitDto.queueType || 'direct'
  }

  async createConnection() {
    LOG.info('Creando conexion Rabbit')

    if (!this._connection) {
      this._connection = await amqp.connect(this._url, this._options)
      await this.createConsumer()
      await this.createPublisher()
    }
    LOG.info('Conexion Rabbit creada')
  }

  async createConsumer() {
    LOG.info('Creando consumidor de mensajes')

    if (!this._consumer) {
      const channel = await this._connection.createChannel()
      channel.assertExchange(this._exchange, this._queueType, {
        durable: true
      })
      channel.assertQueue(this._queueIn)
      this._consumer = channel
    }
    LOG.info('Consumidor de mensajes creado')
  }

  async createPublisher() {
    LOG.info('Creando publicador de mensajes')

    if (!this._publisher) {
      const channel = await this._connection.createChannel()
      channel.assertQueue(this._queueOut)
      this._publisher = channel
    }

    LOG.info('Publicador de mansajes creado')
  }

  get publisher() {
    return this._publisher
  }

  set publisher(publisher) {
    this._publisher = publisher
  }

  get consumer() {
    return this._consumer
  }

  set consumer(consumer) {
    this._consumer = consumer
  }

  get connection() {
    return this._connection
  }

  set connection(connection) {
    this._connection = connection
  }
}

module.exports = Rabbit
