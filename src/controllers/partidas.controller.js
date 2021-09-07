import LOG from '../commons/logger'
import { Response } from '../commons/response'
import client from '../service/partidas.service'
import handlerError from '../validator/handler-error'
import { PartidasValidator } from '../validator/partidas.validator'
import { handlerErrorValidation } from '../validator/message.mapping'
import {
  URL_OAUTH_VALIDATOR,
  MESSAGE_EXITOSO,
  MESSAGE_SIN_RESULTADOS,
  CODE_SUCCESS,
  CODE_NOT_FOUND,
  CODE_BAD_REQUEST,
  HEADER_ID_CONSUMIDOR,
  HEADER_ID_DESTINO,
  HEADER_OAUTH,
  HEADER_FOLIO,
  HEADER_CANAL
} from '../constansts'
import { BadRequestException, createMessageError } from '../commons/exceptions'
import { HttpClientService } from '../service/http-client.service'

const { HttpMethod } = HttpClientService

const validarHeader = async (req, header) => {
  if (!req.header(header)) {
    throw new BadRequestException(
      createMessageError(CODE_BAD_REQUEST, {
        message: 'El header '.concat(header, ' es requerido')
      })
    )
  }
}

const validarToken = async req => {
  LOG.debug('CTRL: Starting validarToken method')
  await validarHeader(req, HEADER_ID_CONSUMIDOR)
  await validarHeader(req, HEADER_ID_DESTINO)
  await validarHeader(req, HEADER_OAUTH)
  const token = req.header(HEADER_OAUTH)
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
    await validarHeader(req, HEADER_CANAL)
    await validarHeader(req, HEADER_FOLIO)
    const canal = req.header(HEADER_CANAL)
    const folio = canal.concat('-', req.header(HEADER_FOLIO))
    const request = {
      ...data,
      folio
    }

    LOG.debugJSON('Request', request)
    const message = JSON.stringify(request)
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

    if (!req.query.id) {
      throw new BadRequestException(
        createMessageError(CODE_BAD_REQUEST, {
          message: 'El id de partida es requerido'
        })
      )
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
          codigo: CODE_SUCCESS,
          mensaje: MESSAGE_EXITOSO
        }
        listaPrendasAsociadas.push(JSON.parse(partidas))
      } else {
        controlExcepcion = {
          codigo: CODE_NOT_FOUND,
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
