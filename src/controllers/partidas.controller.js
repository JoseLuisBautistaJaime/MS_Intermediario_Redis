import LOG from '../commons/logger'
import { Response } from '../commons/response'
import client from '../service/partidas.service'
import handlerError from '../validator/handler-error'
import { PartidasValidator } from '../validator/partidas.validator'
import { handlerErrorValidation } from '../validator/message.mapping'
import {
  URL_OAUTH_VALIDATOR,
  MESSAGE_EXITOSO,
  MESSAGE_SIN_RESULTADOS
} from '../constansts'
import { HttpClientService } from '../service/http-client.service'

const { HttpMethod } = HttpClientService

const validarToken = async req => {
  LOG.debug('CTRL: Starting validarToken method')
  const token = req.header('oauth.bearer')
  const httpMetadata = {
    url: `${URL_OAUTH_VALIDATOR}/token`,
    method: HttpMethod.POST,
    body: { token },
    headers: req.headers
  }
  const { successful } = await HttpClientService.sendRequest(httpMetadata)
  LOG.debug('CTRL: Ending validarToken method')
  return successful
}

const healthCheck = async (req, res) => {
  return Response.Ok(res)
}

const savePartida = async (req, res) => {
  LOG.info('CTRL: Starting savePartida method')
  try {
    const valido = await validarToken(req)
    if (!valido) {
      return Response.Unauthorized(res)
    }

    const data = req.body
    const validator = PartidasValidator.ValidatorSchema.validate(
      data,
      PartidasValidator.partidaInfoprendaRequest
    )
    if (validator.errors.length) handlerErrorValidation(validator)
    const canal = req.header('Canal') || 'FMP'

    LOG.debugJSON('Request', data)
    const message = JSON.stringify(data)
    client.publish(canal, message, function onError(err, reply) {
      if (err) {
        LOG.error(err)
        throw err
      }
      LOG.debugJSON('Mensage: {} en el canal {} - {}', message, canal, reply)
      LOG.info('CTRL: Ending savePartida  method')
    })
    return Response.Ok(res)
  } catch (err) {
    LOG.error(err)
    return handlerError(res, err)
  }
}
// eslint-disable-next-line consistent-return
const getPartidas = async (req, res) => {
  LOG.info('CTRL: Starting getPartidas method')
  try {
    const valido = await validarToken(req)
    if (!valido) {
      return Response.Unauthorized(res)
    }

    client.get(req.query.id, async (err, partidas) => {
      const listaPrendasAsociadas = []
      let controlExcepcion = {}
      if (err) {
        LOG.error(err)
        throw err
      }
      if (partidas) {
        controlExcepcion = {
          codigo: '200',
          mensaje: MESSAGE_EXITOSO
        }
        listaPrendasAsociadas.push(JSON.parse(partidas))
      } else {
        controlExcepcion = {
          codigo: '404',
          mensaje: MESSAGE_SIN_RESULTADOS
        }
      }
      return res.status(200).send({
        controlExcepcion,
        listaPrendasAsociadas
      })
    })
    LOG.info('CTRL: Ending getPartidas method')
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
