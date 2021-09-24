import { Validator } from 'jsonschema'

const ValidatorSchema = new Validator()

const partidaInfoprendaRequest = {
  id: '/partidaInfoprendaRequest',
  type: 'object',
  properties: {
    idCliente: {
      type: 'string',
      required: false
    },
    nivelCliente: {
      type: 'string',
      required: false
    },
    calificacionAjustada: {
      type: 'number',
      required: false
    },
    calificacionSiva2: {
      type: 'number',
      required: false
    },
    gramaje: {
      type: 'number',
      required: false
    },
    metal: {
      type: 'number',
      required: false
    },
    kilataje: {
      type: 'number',
      required: false
    },
    rango: {
      type: 'string',
      required: true
    },
    incremento: {
      type: 'number',
      required: false
    },
    desplazamiento: {
      type: 'string',
      required: false
    },
    ramo: {
      type: 'string',
      required: false
    },
    subramo: {
      type: 'string',
      required: true
    }
  }
}

ValidatorSchema.addSchema(partidaInfoprendaRequest, '/partidaInfoprendaRequest')

export const PartidasValidator = {
  ValidatorSchema,
  partidaInfoprendaRequest
}

export default null
