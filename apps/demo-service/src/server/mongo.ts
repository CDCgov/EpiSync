import { MongoClient, Db } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { getLogger } from './loggers'

const logger = getLogger('MONGO')
let client: MongoClient
let mongod: MongoMemoryServer | undefined

export async function attachToDb (): Promise<Db> {
  let mongoUri: string
  if (process.env.MONGO_URI === undefined || process.env.MONGO_URI.length === 0) {
    mongod = await MongoMemoryServer.create()
    mongoUri = mongod.getUri()
  } else {
    mongoUri = process.env.MONGO_URI
  }
  client = new MongoClient(mongoUri)
  client.on('commandStarted', (event) => logger.debug(event))
  client.on('commandSucceeded', (event) => logger.debug(event))
  client.on('commandFailed', (event) => logger.debug(event))

  const dbName = process.env.MONGO_DB ?? 'epicast_demo'
  logger.info(`Connecting to Mongo ${mongoUri} and db ${dbName}`)

  await client.connect()
  // This is another connection check
  await client.db('admin').command({ ping: 1 })

  //
  return client.db(dbName)
}

export async function dropCollections (db: Db, except?: string[]): Promise<void> {
  for (const collection of await db.collections()) {
    const name = collection.collectionName
    if (except?.includes(name) ?? false) continue
    logger.info(`Dropping collection: ${name}`)
    await collection.drop()
  }
}

export async function disconnectToDb (): Promise<void> {
  await client.close()
  if (mongod !== undefined) {
    await mongod.stop()
  }
}
