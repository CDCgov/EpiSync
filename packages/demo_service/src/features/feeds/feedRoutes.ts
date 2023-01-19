import express from 'express'
import { getLogger } from '../../server/loggers'
import asyncHandler from 'express-async-handler'
import { getFileData } from './getFileData'
import { FeedStorage } from '@/epicast/FeedStorage'
const router = express.Router()
const logger = getLogger('FEED_ROUTE')

function getFeedStorage (req: express.Request): FeedStorage {
  return req.state.feedStorage
}

/* List the feed. */
router.get('/files', asyncHandler(async (req, res, _next) => {
  const prefix = req.query.prefix as string ?? ''
  logger.info(`list feed: ${prefix}`)
  const storage = getFeedStorage(req)

  const fileArray = await getFileData(storage, prefix)
  res.status(200).send(fileArray)
}))

/* Download a specific file */
router.get('/content', asyncHandler(async (req, res, _next) => {
  const file = req.query.file as string
  logger.info(`get file: ${file}`)
  const storage = getFeedStorage(req)
  const exists = await storage.doesObjectExist(file)
  if (!exists) {
    res.status(404).send()
    return
  }

  const fileContents = await storage.getObject(file)
  res.status(200).send(fileContents)
}))

export default router
