import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'
import app from '../src/server'
import nock from 'nock'
import { CONTEXT_NAME, CONTEXT_VERSION } from '../src/constansts'
const { URL_OAUTH_VALIDATOR } = process.env
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
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(200, {
            successful: true
        })

    it('Debe guardar una partidas', done => {
        const requestBody = {
            idCliente: '22170',
            nivelCliente: 'DIAMANTE',
            calificacionAjustada: 10,
            calificacionSiva2: 7,
            gramaje: 1,
            rango: 'F5',
            kilataje: 12,
            incremento: 25,
            desplazamiento: '5',
            ramo: 'Alhajas',
            subramo: 'Alhajas'
        }
        chai
            .request(app)
            .post(
                `/${contex}/${version}/infoprenda`
            )
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .set('Canal', 'CanalMock')
            .set('Folio', 'Folio123')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})


describe('POST /infoprenda BADREQUEST', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(200, {
            successful: true
        })

    it('Debe lanzar un error 400 por parametros Faltantes', done => {
        const requestBody = {
            idCliente: 22170,
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
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .set('Canal', 'CanalMock')
            .set('Folio', 'Folio123')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
    })
})

describe('POST /infoprenda BADREQUEST', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(200, {
            successful: true
        })

    it('Debe lanzar un error 400 por inconsistencias', done => {
        chai
            .request(app)
            .post(
                `/${contex}/${version}/infoprenda`
            )
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .set('Canal', 'CanalMock')
            .set('Folio', 'Folio123')
            .send('')
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
    })
})

describe('POST /infoprenda Cabecera Canal Faltante', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(200, {
            successful: true
        })

    it('Debe lanzar un error por Cabecera Canal Faltante', done => {
        const requestBody = {
            idCliente: '3637017',
            nivelCliente: 'DIAMANTE',
            calificacionAjustada: 10,
            calificacionSiva2: 7,
            gramaje: 9.4,
            rango: 'F4',
            kilataje: 14.0,
            incremento: 15.0,
            desplazamiento: '5.0',
            ramo: 'Alhajas',
            subramo: 'Alhajas'
        }
        chai
            .request(app)
            .post(
                `/${contex}/${version}/infoprenda`
            )
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .set('Folio', 'Folio123')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
    })


})


describe('POST /infoprenda Cabecera Folio Faltante', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(200, {
            successful: true
        })
    it('Debe lanzar un error por Cabecera Folio Faltante', done => {
        const requestBody = {
            idCliente: '22170',
            nivelCliente: 'DIAMANTE',
            calificacionAjustada: 10,
            calificacionSiva2: 7,
            gramaje: 1,
            rango: 'F5',
            kilataje: 12,
            incremento: 25,
            desplazamiento: '5',
            ramo: 'Alhajas',
            subramo: 'Alhajas'
        }
        chai
            .request(app)
            .post(
                `/${contex}/${version}/infoprenda`
            )
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .set('Canal', 'CanalMock')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
    })
})

describe('POST /infoprenda UNAUTHORIZED', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(401, {
            codigoError: 'NMP-902',
            descripcionError: 'oracle.security.jps.internal.trust.token.TokenProviderException: Validate operation failed.',
            tipoError: 'Cliente',
            severidad: '1'
        })

    it('Debe lanzar un error 401 no autorizado', done => {
        const requestBody = {
            idCliente: 22170,
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
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .set('Canal', 'CanalMock')
            .set('Folio', 'Folio123')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
    })
})

describe('GET /infoprenda?id=', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(200, {
            successful: true
        })

    it('Debe recuperar una partida', done => {
        const id = 'CanalMock-Folio123'
        chai
            .request(app)
            .get(
                `/${contex}/${version}/infoprenda?id=${id}`
            )
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('GET /infoprenda?id=', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(200, {
            successful: true
        })

    it('Partida no existente', done => {
        const id = '12345'
        chai
            .request(app)
            .get(
                `/${contex}/${version}/infoprenda?id=${id}`
            )
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('GET /infoprenda?id= -UNAUTHORIZED', () => {
    nock(URL_OAUTH_VALIDATOR)
        .post(`/token`)
        .reply(401, {
            codigoError: 'NMP-902',
            descripcionError: 'oracle.security.jps.internal.trust.token.TokenProviderException: Validate operation failed.',
            tipoError: 'Cliente',
            severidad: '1'
        })

    it('Consulta no autorizada', done => {
        const id = '6789'
        chai
            .request(app)
            .get(
                `/${contex}/${version}/infoprenda?id=${id}`
            )
            .set('idConsumidor', '1')
            .set('idDestino', '1')
            .set('oauth.bearer', '2479ryefiudh=')
            .end((err, res) => {
                res.should.have.status(401)
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
