import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'
import app from '../src/server'

import { CONTEXT_NAME, CONTEXT_VERSION } from '../src/constansts'

const contex = CONTEXT_NAME
const version = CONTEXT_VERSION


chai.use(chaiHttp).use(chaiAsPromised).should()


describe('GET /', () => {
    it('healthCheck', done => {
        chai
            .request(app)
            .get(
                `/${contex}/${version}/`
            )
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('POST /infoprenda', () => {
    it('Debe guardar una partidas', done => {
        const requestBody = {
            idCliente: 22170,
            nivelCliente: 'DIAMANTE',
            calificacionAjustada: 10,
            calificacionSiva2: 7,
            gramaje: 1,
            rango: 'F5',
            kilataje: 12,
            incremento: 25,
            desplazamiento: 5,
            ramo: 'Alhajas',
            subramo: 'Alhajas'
        }
        chai
            .request(app)
            .post(
                `/${contex}/${version}/infoprenda`
            )
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('GET /infoprenda?id=', () => {
    it('Debe recuperar uns partida', done => {
        const id = 'nmp-al-al-108423423'
        chai
            .request(app)
            .get(
                `/${contex}/${version}/infoprenda?id=${id}`
            )
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('GET /infoprenda/recursoNoExtistente', () => {
    it('recursoNoExtistente', done => {
        chai
            .request(app)
            .get(
                `/${contex}/${version}/infoprenda/recursoNoExtistente`
            )
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})
