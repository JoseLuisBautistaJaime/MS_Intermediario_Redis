import { Validator } from 'jsonschema'

const ValidatorSchema = new Validator()

const partidaInfoprenda = {
  id: '/partidaInfoprenda',
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
      required: true
    },
    desplazamiento: {
      type: 'string',
      required: true
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

ValidatorSchema.addSchema(partidaInfoprenda, '/partidaInfoprenda')

export const ProductValidator = {
  ValidatorSchema,
  partidaInfoprenda
}

export default null
