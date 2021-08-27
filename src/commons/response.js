import { CODE_SUCCESS, CODE_UNAUTHORIZED, CODE_NOT_FOUND, CODE_BAD_REQUEST, CODE_INTERNAL_SERVER_ERROR} from '../constansts'
import { MESSAGES } from './messages'

const createResponse = (res, statusCode, data = {}, code = '') => {
  const { template: status, description: message } = MESSAGES[code]
  return res.status(statusCode).send({ ...data, code, status, message })
}

const Ok = (res, data) => {
  const statusCode = 200
  return createResponse(res, statusCode, data, CODE_SUCCESS)
}

const BadRequest = (res, data) => {
  const statusCode = 400
  return createResponse(res, statusCode, data, CODE_BAD_REQUEST)
}

const Unauthorized = (res, data) => {
  const statusCode = 401
  return createResponse(res, statusCode, data, CODE_UNAUTHORIZED)
}

const NotFound = (res, data) => {
  const statusCode = 404
  return createResponse(res, statusCode, data, CODE_NOT_FOUND)
}

const InernalError = (res, data) => {
  const statusCode = 500
  return createResponse(res, statusCode, '', CODE_INTERNAL_SERVER_ERROR)
}
export const Response = {
  Ok,
  BadRequest,
  Unauthorized,
  NotFound,
  InernalError,
  createResponse
}

export default null
