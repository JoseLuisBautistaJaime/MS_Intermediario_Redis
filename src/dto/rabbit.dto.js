/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import cfenv from 'cfenv'
import LOG from '../commons/logger'
import {
  AMQP_URI,
  AMQP_CERTIFICATE,
  AMQP_HAS_CERTIFICATE,
  AMQP_MESSAGES_EXCHANGE,
  AMQP_MESSAGES_QUEUE,
  IS_RABBIT_SERVICE
} from '../constants'

const appEnv = cfenv.getAppEnv()

const RabbitConfiguration = class {
  constructor(
    url,
    exchange,
    queueIn,
    queueOut,
    queueType,
    services,
    optionsRabbit,
    isRabbitService
  ) {
    this._url = url
    this._exchange = exchange
    this._queueIn = queueIn
    this._queueOut = queueOut
    this._queueType = queueType
    this._optionsRabbit = optionsRabbit
    this._rabbitService = isRabbitService
    this.getUrl(services)
  }

  getUrl(services) {
    if (this._rabbitService === true) {
      const rabbit_services = services['p.rabbitmq']
      if (rabbit_services !== undefined) {
        const credentials = rabbit_services[0].credentials.protocols.amqp
        LOG.info('credentialsRabbit', credentials.uri)
        this._url = credentials.uri
      }
    }
  }

  get url() {
    return this._url
  }

  set url(url) {
    this._url = url
  }

  get exchange() {
    return this._exchange
  }

  set exchange(exchange) {
    this._exchange = exchange
  }

  get queueIn() {
    return this._queueIn
  }

  set queueIn(queueIn) {
    this._queueIn = queueIn
  }

  get queueOut() {
    return this._queueOut
  }

  set queueOut(queueOut) {
    this._queueOut = queueOut
  }

  get queueType() {
    return this._queueType
  }

  set queueType(queueType) {
    this._queueType = queueType
  }

  get optionsRabbit() {
    return this._optionsRabbit
  }

  set optionsRabbit(optionsRabbit) {
    this._optionsRabbit = optionsRabbit
  }

  get rabbitService() {
    return this._rabbitService
  }

  set rabbitService(rabbitService) {
    this._rabbitService = _rabbitService
  }
}

const getRabbitOptions = (isRabbitCertificate, certificate) => {
  let options = {}
  if (isRabbitCertificate === true || isRabbitCertificate === 'true') {
    options = {
      cert: [Buffer.from(certificate, 'base64')],
      rejectUnauthorized: false
    }
  } else {
    options = {
      rejectUnauthorized: false
    }
  }
  return options
}

const getRabbitMessages = () => {
  const rabbitOpts = getRabbitOptions(AMQP_HAS_CERTIFICATE, AMQP_CERTIFICATE)
  const rabbitConfig = new RabbitConfiguration(
    AMQP_URI,
    AMQP_MESSAGES_EXCHANGE,
    AMQP_MESSAGES_QUEUE,
    AMQP_MESSAGES_QUEUE,
    'direct',
    appEnv.services,
    rabbitOpts,
    IS_RABBIT_SERVICE
  )
  LOG.info(`Rabbit Connected on: ${AMQP_URI}`)
  return rabbitConfig
}

const rabbitMessages = getRabbitMessages()

Object.freeze(rabbitMessages)

module.exports = {
  rabbitMessages
}
