import LOG from '../commons/logger'
import { AMQP_MESSAGES_QUEUE } from '../constants'

const sender = require('./rabbit-queuesender.service')
const { messageRabbitDao } = require('./rabbit.service')

const procesaMensaje = async messageRecieved => {
  LOG.debug('SERVICE: Starting procesaMensaje method')
  LOG.debug(`messageRecieved - ${JSON.stringify(messageRecieved)}`)
  const { idMensaje, cuerpoMensaje } = messageRecieved.message
  LOG.trace('idMensaje', idMensaje)
  LOG.trace('cuerpoMensaje', cuerpoMensaje)
  LOG.debug('SERVICE: Starting procesaMensaje method')
}

const desencolaMensaje = async message => {
  LOG.debug('SERVICE: Starting desencolaMensaje memthod')

  const messageRecieved = JSON.parse(message.content.toString())
  LOG.traceJSON('---->messageRecieved', messageRecieved)
  messageRabbitDao.ackMessage(message)
  await procesaMensaje(messageRecieved)
  LOG.debug('SERVICE: Ending desencolaMensaje method')
}

const encolaPago = async (idMensaje, cuerpoMensaje) => {
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

export const PartidasRabbitService = {
  encolaPago,
  desencolaMensaje
}

export default null
