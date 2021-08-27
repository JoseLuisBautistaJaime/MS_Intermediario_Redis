import LOG from '../commons/logger'
import { Response } from '../commons/response'
import client from '../service/partidas.service'
import handlerError from '../validator/handler-error'
import { URL_OAUTH_VALIDATOR } from '../constansts'
import { HttpClientService } from '../service/http-client.service'

const { HttpMethod } = HttpClientService

const healthCheck = async (req, res) => {
  return Response.Ok(res)
}

const savePartida = async (req, res) => {
  LOG.info('CTRL: Starting savePartida method')
  try {
    const valido=await validarToken(req)
    if(valido){
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
    })
    return Response.Ok(res)
  } else {
    return Response.Unauthorized(res)
  }
  } catch (err) {
    LOG.error(err)
    return handlerError(res, err)
  }
}

const getPartidas = async (req, res) => {
  LOG.info('CTRL: Starting getPartidas method')
  try {
  LOG.debug('id:{}', req.query.id)
  const valido=await validarToken(req)
  if(valido){
      client.get(req.query.id, async (err, partidas) => {
        if (err) throw err
  
        if (partidas) {
          const controlExcepcion = {
            codigo: '200',
            mensaje: 'Resultado Exitoso'
          }
          const listaPrendasAsociadas = []
          listaPrendasAsociadas.push(JSON.parse(partidas))
          return res.status(200).send({
            controlExcepcion,
            listaPrendasAsociadas
          })
        } else {
          const controlExcepcion = {
            codigo: '200',
            mensaje: 'Resultado Exitoso'
          }
          const listaPrendasAsociadas = []
          return res.status(200).send({
            controlExcepcion,
            listaPrendasAsociadas
          })          
        }
      })
  } else {
    return Response.Unauthorized(res)
  }
} catch (err) {
  LOG.error(err)
  return handlerError(res, err)
}
  LOG.info('CTRL: Ending getPartidas method')
}

const validarToken = async req => {
  LOG.debug('CTRL: Starting validarToken method')
  const token=req.header('oauth.bearer')
  const httpMetadata = {
    url: `${URL_OAUTH_VALIDATOR}/token`,
    method: HttpMethod.POST,
    body:{token},
    headers:req.headers
  }
  const {successful} = await HttpClientService.sendRequest(httpMetadata)
  LOG.debug('CTRL: Ending validarToken method')
  return successful
}

export const PartidasController = {
  healthCheck,
  savePartida,
  getPartidas
}



export default null
