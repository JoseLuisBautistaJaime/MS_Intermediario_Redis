import { Validator } from 'jsonschema'

const ValidatorSchema = new Validator()

const partidaInfoprendaRequest = {
  id: '/partidaInfoprendaRequest',
  type: 'object',
  properties: {
    idCliente: {
      type: 'string',
      required: true
    },
    nivelCliente: {
      type: 'string',
      required: true
    },
    calificacionAjustada: {
      type: 'number',
      required: true
    },
    calificacionSiva2: {
      type: 'number',
      required: true
    },
    gramaje: {
      type: 'number',
      required: true
    },
    rango: {
      type: 'string',
      required: true
    },
    kilataje: {
      type: 'number',
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
      required: true
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
