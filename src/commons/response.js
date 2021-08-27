import { CODE_SUCCESS, CODE_UNAUTHORIZED } from '../constansts'
import { MESSAGES } from './messages'

const createResponse = (res, statusCode, data = {}, code = '') => {
  const { template: status, description: message } = MESSAGES[code]
  return res.status(statusCode).send({ ...data, code, status, message })
}

const Ok = (res, data) => {
  const statusCode = 200
  return createResponse(res, statusCode, data, CODE_SUCCESS)
}

const Unauthorized = (res, data) => {
  const statusCode = 401
  return createResponse(res, statusCode, data, CODE_UNAUTHORIZED)
}

export const Response = {
  Ok,
  Unauthorized,
  createResponse
}

export default null
