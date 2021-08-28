import {
  CODE_SUCCESS,
  CODE_UNAUTHORIZED,
  CODE_NOT_FOUND,
  CODE_BAD_REQUEST,
  CODE_INTERNAL_SERVER_ERROR,
  CODE_INTERNAL_BAD_GETAWAY
} from '../constansts'

const createResponse = (res, statusCode, data = {}, code = '') => {
  return res.status(statusCode).send({ ...data, code })
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
  return createResponse(res, statusCode, data, CODE_INTERNAL_SERVER_ERROR)
}

const InernalBadGetaway = (res, data) => {
  const statusCode = 502
  return createResponse(res, statusCode, data, CODE_INTERNAL_BAD_GETAWAY)
}

export const Response = {
  Ok,
  BadRequest,
  Unauthorized,
  NotFound,
  InernalError,
  InernalBadGetaway,
  createResponse
}

export default null
