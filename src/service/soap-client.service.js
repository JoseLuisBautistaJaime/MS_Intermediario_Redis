/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import soapRequest from 'easy-soap-request'
import https from 'https'
import convertXMLtoJSON from 'xml-js'
import JSONtoXML from 'jsontoxml'

import {
  InternalServerException,
  createMessageError
} from '../commons/exceptions'
import LOG from '../commons/logger'
import { SOAP_TIMEOUT } from '../commons/constants'

const nativeType = value => {
  const nValue = Number(value)
  if (!Number.isNaN(nValue)) return nValue

  const bValue = value.toLowerCase()
  if (bValue === 'true') return true
  if (bValue === 'false') return false

  return value
}

const removeJsonTextAttribute = (value, parentElement) => {
  try {
    const keyNo = Object.keys(parentElement._parent).length
    const keyName = Object.keys(parentElement._parent)[keyNo - 1]
    parentElement._parent[keyName] = nativeType(value)
  } catch (e) {
    LOG.error(`Error: ${JSON.stringify(e)}`)
  }
}

export const createSoapRequestBody = async (
  requestBodyName,
  requestBodyData,
  xmlnsSoapEnv,
  xmlnsMic
) => {
  LOG.debug('SERVICE: Starting createSoapRequestBody method')
  const soapXML = '__format'

  const xml = JSONtoXML({
    __format: [
      {
        name: 'soapenv:Envelope',
        attrs: {
          'xmlns:soapenv': xmlnsSoapEnv
        },
        children: [
          {
            name: 'soapenv:Header'
          },
          {
            name: 'soapenv:Body',
            children: [
              {
                name: requestBodyName,
                attrs: { xmlns: xmlnsMic },
                children: [requestBodyData]
              }
            ]
          }
        ]
      }
    ]
  })
  const soapRequestBody = xml
    .replace(`</${soapXML}>`, '')
    .replace(`<${soapXML}>`, '')

  LOG.debug(`soapRequestBody: ${soapRequestBody}`)

  LOG.debug('SERVICE: Ending createSoapRequestBody method')
  return soapRequestBody
}

export const sendSoapRequest = async ({
  url,
  headers,
  requestBodyName,
  requestBodyData,
  xmlnsSoapEnv,
  xmlnsMic
}) => {
  LOG.debug('SERVICE: Starting sendSoapRequest')
  try {
    LOG.debug(`url: ${url}`)
    LOG.debugJSON('headers', headers)
    LOG.debug(`requestBodyName: ${requestBodyName}`)
    LOG.debugJSON('requestBodyData', requestBodyData)
    LOG.debug(`xmlnsSoapEnv: ${xmlnsSoapEnv}`)
    LOG.debug(`xmlnsMic: ${xmlnsMic}`)

    const xml = await createSoapRequestBody(
      requestBodyName,
      requestBodyData,
      xmlnsSoapEnv,
      xmlnsMic
    )

    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    const result = await soapRequest({
      url,
      headers: { ...headers, 'Content-Type': 'text/xml;charset=UTF-8' },
      xml,
      timeout: Number(SOAP_TIMEOUT),
      extraOpts: {
        httpsAgent: agent
      }
    })
    const resultJSON = JSON.parse(
      convertXMLtoJSON.xml2json(result.response.body, {
        compact: true,
        spaces: 4,
        textFn: removeJsonTextAttribute
      })
    )

    LOG.debugJSON('resultJSON', resultJSON)

    LOG.debug('SERVICE: Ending sendSoapRequest method')
    return resultJSON['SOAP-ENV:Envelope']['SOAP-ENV:Body']
  } catch (err) {
    if (err.message)
      throw new InternalServerException(
        createMessageError('NMP-API-REDIS-500', { message: err.message })
      )
    const resultJSON = JSON.parse(
      convertXMLtoJSON.xml2json(err, {
        compact: true,
        spaces: 4,
        textFn: removeJsonTextAttribute
      })
    )
    LOG.error(`Error: ${JSON.stringify(resultJSON)}`)
    const message =
      resultJSON['SOAP-ENV:Envelope']['SOAP-ENV:Body']['SOAP-ENV:Fault']
    throw new InternalServerException(
      createMessageError('NMP-API-REDIS-500', {
        message: JSON.stringify(message)
      })
    )
  }
}
