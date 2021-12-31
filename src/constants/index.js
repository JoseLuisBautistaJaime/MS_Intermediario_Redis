// context API
export const { CONTEXT_NAME } = process.env
export const { CONTEXT_VERSION } = process.env
// Operation Status
export const SUCCESS = 'SUCCESS'
export const NOT_FOUND = 'NOT FOUND'
export const BAD_REQUEST = 'BAD REQUEST'
export const UNAUTHORIZED = 'UNAUTHORIZED'
export const INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR'

// Operation Code
export const CODE_SUCCESS = 'NMP-API-REDIS-200'
export const CODE_BAD_REQUEST = 'NMP-API-REDIS-400'
export const CODE_UNAUTHORIZED = 'NMP-API-REDIS-401'
export const CODE_FORBIDDEN = 'NMP-API-REDIS-403'
export const CODE_NOT_FOUND = 'NMP-API-REDIS-404'
export const CODE_INTERNAL_SERVER_ERROR = 'NMP-API-REDIS-500'
export const CODE_INTERNAL_BAD_GETAWAY = 'NMP-API-REDIS-502'
// Messages
export const MESSAGE_SUCCESS = 'Se ha realizado correctamente la operación'
export const MESSAGE_EXITOSO = 'Resultado Exitoso'
export const MESSAGE_SIN_RESULTADOS =
  'No se encontraron prendas recuperadas candidatas a beneficio Infoprenda'
export const { LOG_LEVEL } = process.env

// Headers
export const HEADER_OAUTH = 'oauth.bearer'
export const HEADER_ID_CONSUMIDOR = 'idConsumidor'
export const HEADER_ID_DESTINO = 'idDestino'
export const HEADER_FOLIO = 'Folio'
export const HEADER_CANAL = 'Canal'
// OAUTH
export const { URL_OAUTH_VALIDATOR } = process.env
export const { OAUTH_AUTHORIZATION } = process.env
export const { OAUTH_ID_DESTINO } = process.env
export const { OAUTH_ID_CONSUMIDOR } = process.env
// MQ Sender
export const { AMQP_URI } = process.env
export const { AMQP_MESSAGES_QUEUE_IN } = process.env
export const { AMQP_MESSAGES_QUEUE_OUT } = process.env
export const { AMQP_MESSAGES_EXCHANGE } = process.env
export const { AMQP_CERTIFICATE } = process.env
export const { AMQP_HAS_CERTIFICATE } = process.env
export const { IS_RABBIT_SERVICE } = process.env
export const { TIEMPO_ESPERA_CAMBIO_ESTADO } = process.env
export const { URL_OAG_CONSULTA_CREDITOS } = process.env
