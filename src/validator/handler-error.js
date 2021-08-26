import _ from 'lodash'
import LOG from '../commons/logger'
import { Response } from '../commons/response'
import {
  BadRequestException,
  ConflictException,
  InternalServerException,
  CommonException
} from '../commons/exceptions'
import { MESSAGES } from '../commons/messages'

module.exports = (res, e) => {
  LOG.error(`error: ${JSON.stringify(e)}`)

  let statusCode = 500
  let message

  if (e instanceof CommonException) {
    message = e.message
    LOG.debug(`StatusCode: ${statusCode}`)
    LOG.debug(`message: ${message}`)
    return Response.createResponse(res, statusCode, message)
  }

  if (e instanceof BadRequestException) statusCode = 400
  if (e instanceof ConflictException) statusCode = 409
  if (e instanceof InternalServerException) statusCode = 500

  const { code, mergeVariables } = e
  const { template, description } = MESSAGES[code]
  const compiled = _.template(template)
  message = compiled(mergeVariables)

  LOG.debug('Ending handlerError...')

  return Response.createResponse(res, statusCode, {
    code,
    message,
    description
  })
}