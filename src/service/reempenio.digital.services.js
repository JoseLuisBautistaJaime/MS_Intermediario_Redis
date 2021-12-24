import LOG from '../commons/logger'
import { HttpClientService } from './http-client.service'
import {
  AMQP_MESSAGES_QUEUE,
  OAUTH_AUTHORIZATION,
  OAUTH_ID_DESTINO,
  OAUTH_ID_CONSUMIDOR,
  URL_OAUTH_VALIDATOR
} from '../constants'

const sender = require('./rabbit-queuesender.service')
const { messageRabbitDao } = require('./rabbit.service')

const { HttpMethod } = HttpClientService

const generarToken = async () => {
  LOG.debug('SERVICE: Starting generarToken method')

  const headers = {
    Authorization: OAUTH_AUTHORIZATION,
    idConsumidor: OAUTH_ID_CONSUMIDOR,
    idDestino: OAUTH_ID_DESTINO,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const httpMetadata = {
    url: URL_OAUTH_VALIDATOR,
    method: HttpMethod.POST,
    body: new URLSearchParams({
      // eslint-disable-next-line prettier/prettier
      'grant_type': 'client_credentials',
      scope: 'UserProfile.me'
    }),
    headers
  }
  const response = await HttpClientService.sendRequest(httpMetadata)
  LOG.debug('SERVICE: Ending generarToken method')
  return response
}

const encolaMensaje = async (idMensaje, cuerpoMensaje) => {
  LOG.debug('SERVICE: Starting encolaPago method')
  const queueMessage = {
    queue: AMQP_MESSAGES_QUEUE,
    message: {
      idMensaje,
      cuerpoMensaje
    }
  }
  LOG.debugJSON('queueMessage', queueMessage)
  await sender.publishMessage(queueMessage)
  LOG.debug('SERVICE: Ending encolaPago method')
}

const procesaMensaje = async messageRecieved => {
  LOG.debug('SERVICE: Starting procesaMensaje method')
  LOG.debug(`messageRecieved - ${JSON.stringify(messageRecieved)}`)
  const { partidaFolio, clienteId, pag, tags } = messageRecieved
  LOG.trace('partidaFolio', partidaFolio)
  LOG.trace('clienteId', clienteId)
  LOG.trace('pag', pag)
  LOG.traceJSON('tags', tags)
  // eslint-disable-next-line camelcase
  const { access_token } = await generarToken()
  LOG.trace('access_token', access_token)

  LOG.debug('SERVICE: Starting procesaMensaje method')
}

const desencolaMensaje = async message => {
  LOG.debug('SERVICE: Starting desencolaMensaje memthod')
  const messageRecieved = JSON.parse(message.content.toString())
  LOG.traceJSON('messageRecieved', messageRecieved)
  messageRabbitDao.ackMessage(message)
  await procesaMensaje(messageRecieved)
  LOG.debug('SERVICE: Ending desencolaMensaje method')
}

const init = async () => {
  LOG.info('Empezando consumo de mensajes en la queue')
  await messageRabbitDao.consumeMessage(desencolaMensaje)
}

module.exports = { init }

export const PartidasRabbitService = {
  encolaMensaje,
  desencolaMensaje
}

export default null
