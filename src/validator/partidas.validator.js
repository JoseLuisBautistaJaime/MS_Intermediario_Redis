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
      type: 'number | null',
      required: false
    },
    calificacionSiva2: {
      type: 'number | null',
      required: false
    },
    gramaje: {
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
      type: 'number | null',
      required: false
    },
    desplazamiento: {
      type: 'string | null',
      required: false
    },
    ramo: {
      type: 'string | null',
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
