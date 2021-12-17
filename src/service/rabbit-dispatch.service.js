import LOG from '../commons/logger'
import { PartidasRabbitService } from './partidas.rabbit.service'

const { messageRabbitDao } = require('./rabbit.service')

const init = async () => {
  LOG.info('Empezando consumo de mensajes en la queue')
  await messageRabbitDao.consumeMessage(PartidasRabbitService.desencolaMensaje)
}

module.exports = { init }
