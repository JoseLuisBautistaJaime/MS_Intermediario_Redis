import { CODE_SUCCESS } from '../constansts'
import { MESSAGES } from './messages'

const createResponse = (res, statusCode, data = {}, code = '') => {
  if (code !== '') {
    const { template: status, description: message } = MESSAGES[code]
    return res.status(statusCode).send({ ...data, code, status, message })
  }
}

const Ok = (res, data) => {
  const statusCode = 200
  return createResponse(res, statusCode, data, CODE_SUCCESS)
}

export const Response = {
  Ok
}

export default null
