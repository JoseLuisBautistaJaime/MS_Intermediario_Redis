export const MESSAGES = {
  'NMP-API-REDIS-200': {
    template: 'SUCCESS',
    description: 'Se ha realizado correctamente la operación'
  },
  'NMP-API-REDIS-204': {
    template: 'NO CONTENT',
    description: 'Se ha realizado correctamente la operación'
  },
  'NMP-API-REDIS-400': {
    template: '<%= message %>',
    description: 'BAD REQUEST'
  },
  'NMP-API-REDIS-401': {
    template: 'Se ha producido un error de autorización'
  },
  'NMP-API-REDIS-403': {
    template: 'Se ha producido un error de autorización'
  },
  'NMP-API-REDIS-404': {
    template: 'El recurso no existe',
    description: 'No se encontraron resultados.'
  },
  'NMP-API-REDIS-500': {
    template: '<%= text %>',
    description: 'Error interno del servidor.'
  },
  'NMP-API-REDIS-502': {
    template: 'Bad Getaway',
    description: 'Error interno del servidor.'
  }
}

export default null
