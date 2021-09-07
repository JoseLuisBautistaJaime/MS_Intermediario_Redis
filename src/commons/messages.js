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
    description: 'Petición mal formada.'
  },
  'NMP-API-REDIS-401': {
    description: 'Se ha producido un error de autorización'
  },
  'NMP-API-REDIS-403': {
    description: 'Se ha producido un error de autorización'
  },
  'NMP-API-REDIS-404': {
    description: 'No se encontraron resultados.'
  },
  'NMP-API-REDIS-500': {
    template: '<%= text %>',
    description: 'Error interno del servidor.'
  },
  'NMP-API-REDIS-502': {
    template: 'BAD GETAWAY',
    description: 'Error interno del servidor.'
  }
}

export default null
