import express from 'express'
import { PartidasController } from '../controllers/partidas.controller'

const router = express.Router()

router.route('/').get(PartidasController.healthCheck)

router
  .route('/infoprenda')
  .post(PartidasController.savePartida)
  .get(PartidasController.getPartidas)

module.exports = router
