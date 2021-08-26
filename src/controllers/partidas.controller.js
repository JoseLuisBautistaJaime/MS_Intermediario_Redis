import LOG from '../commons/logger'
import { Response } from '../commons/response'
import client from '../service/partidas.service'
import handlerError from '../validator/handler-error'

const healthCheck = async (req, res) => {
  return Response.Ok(res)
}

const savePartida = async (req, res) => {
  LOG.info('CTRL: Starting savePartida method')
  try {
    const canal = req.header('Canal') || 'FMP'
    const data = req.body
    LOG.debugJSON('Request', data)
    const message = JSON.stringify(data)
    client.publish(canal, message, function onError(err, reply) {
      if (err) {
        LOG.error(err)
        throw err
      }
      LOG.debugJSON('Mensage: {} en el canal {} - {}', message, canal, reply)
      LOG.info('CTRL: Ending savePartida  method')
      return Response.Ok(res)
    })
  } catch (err) {
    LOG.error(err)
    return handlerError(res, err)
  }
}

const getPartidas = async (req, res) => {
  LOG.info('CTRL: Starting getPartidas method')
  LOG.debug('id:{}', req.query.id)
  try {
    client.get(req.query.id, async (err, partidas) => {
      if (err) throw err

      if (partidas) {
        const controlExcepcion = {
          codigo: '200',
          mensaje: 'Resultado Exitoso'
        }
        const listaPrendasAsociadas = []
        listaPrendasAsociadas.push(JSON.parse(partidas))
        res.status(200).send({
          controlExcepcion,
          listaPrendasAsociadas
        })
      } else {
        const controlExcepcion = {
          codigo: '200',
          mensaje: 'Resultado Exitoso'
        }
        const listaPrendasAsociadas = []
        res.status(200).send({
          controlExcepcion,
          listaPrendasAsociadas
        })

        LOG.info('CTRL: Ending getPartidas method')
      }
    })
  } catch (err) {
    LOG.error(err)
    return handlerError(res, err)
  }
}
export const PartidasController = {
  healthCheck,
  savePartida,
  getPartidas
}

export default null
