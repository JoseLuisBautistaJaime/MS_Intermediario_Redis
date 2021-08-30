import newrelic from 'newrelic'
import express from 'express'
import httpContext from 'express-http-context'
import bodyParser from 'body-parser'
import cors from 'cors'
import cfenv from 'cfenv'
import { CONTEXT_NAME, CONTEXT_VERSION } from '../constansts'
import LOG from '../commons/logger'
import { Response } from '../commons/response'
import appRoutes from '../routes'

const app = express()
const appEnv = cfenv.getAppEnv()

const PORT = process.env.PORT || appEnv.port

app.use(httpContext.middleware)
app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req)
  httpContext.ns.bindEmitter(res)
  httpContext.set('reqId', new Date().getTime())
  next()
})

app.locals.newrelic = newrelic
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptionsDelegate = (req, callback) => {
  const regex = new RegExp('(http|https)://[A-Za-z0-9-.]+.nmp.com.mx')
  const corsOptions = regex.test(req.header('Origin'))
    ? { origin: true }
    : { origin: false }
  callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate))

app.use(`/${CONTEXT_NAME}/${CONTEXT_VERSION}`, appRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  if (error.status === 400) {
    res.json(Response.BadRequest(res))
  } else if (error.status === 401) {
    res.json(Response.Unauthorized(res))
  } else if (error.status === 404) {
    res.json(Response.NotFound(res))
  } else if (error.status === 502) {
    res.json(Response.InernalBadGetaway(res))
  } else {
    res.json(Response.InernalError(res))
  }
  next()
})

app.listen(PORT, appEnv.bind, () =>
  LOG.info(`server running on ${appEnv.url}/${CONTEXT_NAME}/${CONTEXT_VERSION}`)
)

module.exports = app
