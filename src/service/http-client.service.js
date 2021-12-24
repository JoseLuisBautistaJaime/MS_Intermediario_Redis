import fetch from 'node-fetch'
import https from 'https'
import LOG from '../commons/logger'
import {
  InternalServerException,
  CommonException,
  createMessageError
} from '../commons/exceptions'

const HttpMethod = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const agent = new https.Agent({ rejectUnauthorized: false })

const parseResponse = res => {
  return res.json().then(responseBody => ({
    responseBody,
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    headers: res.headers.raw()
  }))
}

const ejecutaOperacionFetch = async (url, isHttps, options) => {
  // eslint-disable-next-line no-param-reassign
  if (isHttps) options.agent = agent

  try {
    const { responseBody, ok, status } = await fetch(url, options).then(
      parseResponse
    )
    LOG.debug('status', status)
    LOG.traceJSON('response', responseBody)

    if (!ok) {
      LOG.error('ERROR: ', responseBody.descripcionError)
    }
    LOG.debug('SERVICE: Ending sendRequestFormData method')
    return responseBody
  } catch (err) {
    if (err instanceof CommonException) throw err

    throw new InternalServerException(
      createMessageError('NMP-API-REDIS-500', { text: err.message })
    )
  }
}

const sendRequest = async ({
  url,
  method,
  body = null,
  headers = {},
  isHttps = true
}) => {
  LOG.debug('SERVICE: Starting sendRequest method')

  LOG.debug(`url - ${url}`)
  LOG.debug(`method - ${method}`)
  LOG.debugJSON('body', body)
  LOG.debugJSON('headers', headers)

  const options = {
    method,
    headers: {
      ...{
        'Content-Type': 'application/json'
      },
      ...headers
    }
  }

  if (
    (method === HttpMethod.POST ||
      method === HttpMethod.PUT ||
      method === HttpMethod.PATCH) &&
    options.headers['Content-Type'] === 'application/json'
  )
    options.body = JSON.stringify(body || {})
  else options.body = body
  const responseBody = await ejecutaOperacionFetch(url, isHttps, options)
  return responseBody
}

export const HttpClientService = {
  sendRequest,
  HttpMethod
}

export default null
