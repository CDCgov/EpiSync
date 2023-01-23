import express from 'express'
import { getLogger } from './loggers'
const router = express.Router()
const logger = getLogger('INDEX_ROUTE')

/* GET home page. */
router.get('/', function (_req, res, _next) {
  logger.info('hello world from EpiCast Demo')
  res.render('index', { title: 'EpiCast Demo' })
})

export default router
